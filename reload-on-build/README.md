# React + TypeScript + Vite

## reload-on-build (ビルド完了で特定タブをリロード)

このリポジトリには、`vite build --watch` の完了（`END`）をフックして、Chrome DevTools Protocol 経由で特定 URL のタブに `Page.reload` を送るスクリプト [reload-on-build.mjs](reload-on-build.mjs) を追加しています。

### 使い方

1. （任意）Chrome をリモートデバッグ有効で起動（macOS 例）

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-remote-debug
```

2. リロードしたいタブを開く

3. 対象 URL を [reload-on-build.mjs](reload-on-build.mjs) の `TARGET_URL` に合わせる（検証用のデフォルトは `http://localhost:5173/`）

4. ビルド watch + リロード連動を起動

```bash
npm run build:watch:reload
```

補足:

- スクリプトは DevTools (`http://localhost:9222/json`) に接続できない場合、Chrome を `--remote-debugging-port=9222` 付きで自動起動します（macOS では `open -na` で別インスタンス起動）。
- 自動起動時はデフォルトで `--user-data-dir=/tmp/chrome-remote-debug` を使います（既存Chromeに吸収されて9222が開かないのを防ぐため）。
- Chrome の実行ファイルパスを変えたい場合は `CHROME_BIN` 環境変数で上書きできます（例: `CHROME_BIN=/path/to/chrome npm run build:watch:reload`）。
- user-data-dir を変えたい場合は `CHROME_USER_DATA_DIR` で上書きできます。
- DevTools のターゲット一覧取得は `http://localhost:9222/json` を使用します。ポートを変える場合は [reload-on-build.mjs](reload-on-build.mjs) の `DEVTOOLS_TARGETS_URL` を変更してください。

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
