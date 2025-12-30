import { build } from 'vite';
import { spawn, type ChildProcess } from 'node:child_process';
import WebSocket from 'ws';
import type { RollupWatcher } from 'rollup';

type DevToolsTarget = {
  url?: string;
  webSocketDebuggerUrl?: string;
};

const TARGET_URL = 'http://localhost:5173/'; // 対象タブのURL
const DEVTOOLS_TARGETS_URL = 'http://localhost:9222/json';
const DEFAULT_CHROME_BIN =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEFAULT_CHROME_USER_DATA_DIR = '/tmp/chrome-remote-debug';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRollupWatcher(value: unknown): value is RollupWatcher {
  if (typeof value !== 'object' || value === null) return false;
  return (
    'on' in value &&
    typeof (value as { on?: unknown }).on === 'function' &&
    'close' in value &&
    typeof (value as { close?: unknown }).close === 'function'
  );
}

async function isDevToolsAvailable(): Promise<boolean> {
  try {
    const res = await fetch(DEVTOOLS_TARGETS_URL);
    return res.ok;
  } catch {
    return false;
  }
}

function startChromeRemoteDebugging(): ChildProcess {
  const userDataDir =
    process.env.CHROME_USER_DATA_DIR || DEFAULT_CHROME_USER_DATA_DIR;

  const chromeBin = process.env.CHROME_BIN || DEFAULT_CHROME_BIN;
  const args = [
    '--remote-debugging-port=9222',
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
  ];

  // macOSは既存プロセスに吸収されて引数が反映されないことがあるため、open -na で別インスタンス起動する
  if (process.platform === 'darwin' && !process.env.CHROME_BIN) {
    const child = spawn('open', ['-na', 'Google Chrome', '--args', ...args], {
      detached: true,
      stdio: 'ignore',
    });

    child.unref();
    return child;
  }

  const child = spawn(chromeBin, args, {
    detached: true,
    stdio: 'ignore',
  });

  child.unref();
  return child;
}

async function ensureChromeDevToolsRunning(): Promise<void> {
  if (await isDevToolsAvailable()) return;

  console.log(
    'DevTools is not available. Launching Chrome with --remote-debugging-port=9222...'
  );
  startChromeRemoteDebugging();

  const timeoutMs = 15_000;
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isDevToolsAvailable()) {
      console.log('DevTools is now available.');
      return;
    }
    await sleep(200);
  }

  throw new Error(
    'Timed out waiting for DevTools to become available on http://localhost:9222. If Chrome is already running, close it or use a dedicated --user-data-dir.'
  );
}

async function reloadTargetTab(): Promise<void> {
  // 1. DevToolsのタブ一覧を取得
  const res = await fetch(DEVTOOLS_TARGETS_URL);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch DevTools targets: ${res.status} ${res.statusText}`
    );
  }

  const targets = (await res.json()) as DevToolsTarget[];
  const target = targets.find(
    (t) => typeof t?.url === 'string' && t.url.startsWith(TARGET_URL)
  );

  if (!target) {
    console.warn('Target tab not found:', TARGET_URL);
    return;
  }

  if (!target.webSocketDebuggerUrl) {
    console.warn('Target has no webSocketDebuggerUrl:', target.url);
    return;
  }

  // 2. 該当タブの WebSocket に接続
  const ws = new WebSocket(target.webSocketDebuggerUrl, {
    perMessageDeflate: false,
  });

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error('WebSocket open timeout')),
      5_000
    );
    ws.once('open', () => {
      clearTimeout(timer);
      resolve();
    });
    ws.once('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });

  // 3. Page.reload を送信
  const commandId = 1;
  ws.send(
    JSON.stringify({
      id: commandId,
      method: 'Page.reload',
      params: { ignoreCache: true }, // キャッシュ無視リロード
    })
  );

  await new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      ws.close();
      resolve();
    }, 5_000);

    ws.on('message', (msg) => {
      try {
        const data = JSON.parse(msg.toString()) as { id?: number };
        if (data?.id === commandId) {
          clearTimeout(timer);
          console.log('Reloaded:', TARGET_URL);
          ws.close();
          resolve();
        }
      } catch {
        // ignore
      }
    });

    ws.once('close', () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

async function main(): Promise<void> {
  if (typeof fetch !== 'function') {
    throw new Error(
      'Global fetch is not available. Use Node.js 18+ to run this script.'
    );
  }

  await ensureChromeDevToolsRunning();

  const buildResult = await build({
    build: {
      watch: {}, // --watch 相当
    },
  });

  if (!isRollupWatcher(buildResult)) {
    throw new Error(
      'Vite build() did not return a watcher. Ensure build.watch is enabled and Vite is running in watch mode.'
    );
  }

  const watcher = buildResult;

  watcher.on('event', async (event) => {
    if (event.code === 'END') {
      console.log('Vite build finished. Reloading tab...');
      try {
        await ensureChromeDevToolsRunning();
        await reloadTargetTab();
      } catch (err) {
        console.error('Reload failed:', err);
      }
    } else if (event.code === 'ERROR') {
      console.error('Build error:', event.error);
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
