type CssFeature = {
  id: number
  title: string
  subtitle?: string
  description: string
  code: string
}

const FEATURES: Array<CssFeature> = [
  {
    id: 1,
    title: 'コーナーシェイプ（Squircles & More）',
    description:
      '`border-radius` だけでなく、角の形状（bevel / notch / scoop / squircle など）を指定できる提案です。',
    code: `/* 各角に異なる形状を指定可能 */
.box {
  border-radius: 20px;
  corner-shape: bevel;      /* 直線カット */
  /* corner-shape: notch; */    /* 矩形カット */
  /* corner-shape: scoop; */    /* 内側カーブ */
  /* corner-shape: squircle; */ /* 滑らかな角丸 */
}`,
  },
  {
    id: 2,
    title: '`shape()` 関数',
    description:
      '`clip-path` で使える新しい関数。CSS単位（`rem` / `%`）や `calc()` を使ってレスポンシブに形を作れます。',
    code: `.star {
  clip-path: shape(from 0 0, line to 100% 50%, curve to 50% 100% ...);
  background: gold;
}`,
  },
  {
    id: 3,
    title: 'スタイリング可能な `<select>`',
    subtitle: '`appearance: base-select`',
    description:
      '長年難しかった `<select>` のドロップダウン/オプション部分までCSSでスタイリングできるようになります。',
    code: `select {
  appearance: base-select;
}

::picker(select) {
  background: white;
  border: 1px solid #ccc;
  animation: slide-down 0.2s;
}

option { padding: 10px; }
option:checked { background: #e0e0e0; }
option::checkmark { content: "✔"; color: green; }`,
  },
  {
    id: 4,
    title: 'スクロールマーカー',
    subtitle: '`::scroll-marker`',
    description:
      'JavaScriptなしでカルーセルのナビゲーションドット（マーカー）を自動生成し、スタイルできます。',
    code: `.carousel {
  scroll-marker-group: after;
  display: flex;
  overflow-x: scroll;
}

.item {
  scroll-marker: initial;
}

::scroll-marker {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: gray;
}

::scroll-marker:target-current {
  background: blue;
}`,
  },
  {
    id: 5,
    title: 'コンテナスクロール状態クエリ',
    subtitle: 'Container Scroll State Queries',
    description:
      '要素が「スクロール中」「端に到達」「stickyで固定中」などの状態に応じてCSSを当てられます。',
    code: `.container {
  container-type: scroll-state;
}

.sticky-header {
  position: sticky;
  top: 0;
}

@container style(stuck: top) {
  .sticky-header {
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    background: white;
  }
}`,
  },
  {
    id: 6,
    title: '`stretch` キーワード',
    description:
      '`width` / `height` に指定できる新しい値。「マージンを含んだ状態で親要素にフィット」するサイズ計算ができます。',
    code: `.child {
  width: stretch;
  height: stretch;
  margin: 20px;
}`,
  },
  {
    id: 7,
    title: 'テキストボックスのトリミング',
    subtitle: '`text-box-trim`',
    description:
      'フォントが持つ上下の余白（leading）をトリミングして、テキストの見た目の整列を正確にできます。',
    code: `h1 {
  text-box-trim: both;
  text-box-edge: cap alphabetic;
}`,
  },
  {
    id: 8,
    title: '`sibling-index()` 関数',
    description:
      '兄弟要素の中でのインデックス（何番目か）を整数で返し、stagger（段階的）アニメーションなどに使えます。',
    code: `li {
  animation-delay: calc(sibling-index() * 0.1s);
}`,
  },
  {
    id: 9,
    title: '`if()` 関数',
    subtitle: 'Inline Conditionals',
    description:
      'CSSの値の中で条件分岐（if）を表現できるようになる提案です。',
    code: `.button {
  background: if(style(--theme: dark) ? black : white);
  flex-direction: if(media(width < 300px) ? column : row);
}`,
  },
  {
    id: 10,
    title: 'カスタム関数',
    subtitle: '`@function`',
    description:
      'Sassのように、ネイティブCSSで関数を定義し、計算結果を返せます。',
    code: `@function --calculate-alpha(--color, --opacity) {
  result: okLCH(from var(--color) l c h / var(--opacity));
  return: var(result);
}

.box {
  background: --calculate-alpha(red, 50%);
}`,
  },
]

function FeatureCard({ feature }: { feature: CssFeature }) {
  return (
    <section className="rounded-2xl border border-cyan-500/15 bg-gray-800/50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 font-semibold">
          {feature.id}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white">
            {feature.title}{' '}
            {feature.subtitle ? (
              <span className="text-sm font-medium text-gray-400">
                ({feature.subtitle})
              </span>
            ) : null}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {feature.description}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-gray-900/60 p-4 overflow-x-auto">
        <pre className="text-xs leading-relaxed text-gray-200">
          <code>{feature.code}</code>
        </pre>
      </div>
    </section>
  )
}

export default function NewCssFeatures2026() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-900 p-6">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            10 NEW CSS Features You Need To Know For 2026
          </h1>
          <p className="mt-3 text-gray-400 leading-relaxed">
            2026年に向けて注目すべき、JavaScriptを使わずにCSSだけで高度な表現が可能になる10の新機能まとめ（提案段階/実験的なものを含む）。
          </p>
          <a
            className="mt-4 inline-flex items-center rounded-lg border border-cyan-500/20 bg-gray-800 px-3 py-2 text-sm text-cyan-200 hover:bg-gray-700/60"
            href="https://www.youtube.com/watch?v=svqu6FDiMAs"
            target="_blank"
            rel="noreferrer"
          >
            参考動画（YouTube）
          </a>
        </header>

        <div className="grid grid-cols-1 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  )
}
