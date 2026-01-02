const CORNER_SHAPE_VAR = '--corner-shape'

function SquircleCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      className="rounded-3xl border border-red-500/20 bg-gray-800/50 p-6"
      style={{
        borderRadius: '28px',
        [CORNER_SHAPE_VAR as any]: 'squircle',
        ['corner-shape' as any]: `var(${CORNER_SHAPE_VAR})`,
      }}
    >
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-gray-300">
        {children}
      </div>
    </section>
  )
}

function SquircleBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-2xl border border-white/10 bg-gray-900/50 px-3 py-1 text-xs text-gray-200"
      style={{
        borderRadius: '999px',
        [CORNER_SHAPE_VAR as any]: 'squircle',
        ['corner-shape' as any]: `var(${CORNER_SHAPE_VAR})`,
      }}
    >
      {label}
    </span>
  )
}

export default function NewYearSquircle() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-900 p-6">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8">
          <div
            className="rounded-3xl border border-red-500/20 bg-linear-to-r from-red-600/20 via-gray-900 to-yellow-400/10 p-6"
            style={{
              borderRadius: '32px',
              [CORNER_SHAPE_VAR as any]: 'squircle',
              ['corner-shape' as any]: `var(${CORNER_SHAPE_VAR})`,
            }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <SquircleBadge label="謹賀新年" />
              <SquircleBadge label="CSS only" />
              <SquircleBadge label="corner-shape" />
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              お正月らしい “Squircle” ページ
            </h1>
            <p className="mt-3 text-gray-300 leading-relaxed">
              `corner-shape: squircle` を使って、角丸をより自然な「ふくらみ」に。
              未対応ブラウザでは通常の `border-radius` にフォールバックします。
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5">
          <SquircleCard title="1) 祝い札（お正月の見出しカード）">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="rounded-3xl border border-white/10 bg-gray-900/40 p-4"
                style={{
                  borderRadius: '24px',
                  [CORNER_SHAPE_VAR as any]: 'squircle',
                  ['corner-shape' as any]: `var(${CORNER_SHAPE_VAR})`,
                }}
              >
                <div className="text-xs text-gray-400">祝</div>
                <div className="mt-1 text-white font-semibold">謹賀新年</div>
                <div className="mt-2 text-sm text-gray-300">
                  角がキツく見えない、やわらかい印象。
                </div>
              </div>

              <div
                className="rounded-3xl border border-white/10 bg-gray-900/40 p-4"
                style={{
                  borderRadius: '24px',
                  [CORNER_SHAPE_VAR as any]: 'squircle',
                  ['corner-shape' as any]: `var(${CORNER_SHAPE_VAR})`,
                }}
              >
                <div className="text-xs text-gray-400">紅白</div>
                <div className="mt-1 text-white font-semibold">めでたい配色</div>
                <div className="mt-2 text-sm text-gray-300">
                  Tailwind トークンのみで表現。
                </div>
              </div>

              <div
                className="rounded-3xl border border-white/10 bg-gray-900/40 p-4"
                style={{
                  borderRadius: '24px',
                  [CORNER_SHAPE_VAR as any]: 'squircle',
                  ['corner-shape' as any]: `var(${CORNER_SHAPE_VAR})`,
                }}
              >
                <div className="text-xs text-gray-400">干支</div>
                <div className="mt-1 text-white font-semibold">テキストで軽量</div>
                <div className="mt-2 text-sm text-gray-300">
                  画像なし・JSなしでも雰囲気を作れる。
                </div>
              </div>
            </div>
          </SquircleCard>

          <SquircleCard title="2) コーナーシェイプの使い方">
            <div className="rounded-xl border border-white/10 bg-gray-900/60 p-4 overflow-x-auto">
              <pre className="text-xs leading-relaxed text-gray-200">
                <code>{`/* フォールバックとして border-radius を残す */
.card {
  border-radius: 28px;
  corner-shape: squircle;
}`}</code>
              </pre>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              ※ `corner-shape` は提案/実験段階のため、ブラウザ対応状況に依存します。
            </p>
          </SquircleCard>

          <SquircleCard title="3) お正月っぽい“のし”風帯">
            <div className="relative overflow-hidden">
              <div
                className="rounded-3xl border border-red-500/20 bg-gray-900/40 p-5"
                style={{
                  borderRadius: '26px',
                  [CORNER_SHAPE_VAR as any]: 'squircle',
                  ['corner-shape' as any]: `var(${CORNER_SHAPE_VAR})`,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-200 font-semibold">
                      のし風バナー
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      角の“ふくらみ”で紙っぽさを演出
                    </div>
                  </div>
                  <div className="text-xs text-yellow-200">2026</div>
                </div>

                <div className="mt-4 h-1 w-full rounded-full bg-linear-to-r from-red-500/60 via-white/40 to-yellow-400/50" />
              </div>
            </div>
          </SquircleCard>
        </div>
      </div>
    </div>
  )
}
