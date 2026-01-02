import { createFileRoute } from '@tanstack/react-router'

import NewCssFeatures2026 from '@/components/NewCssFeatures2026'

export const Route = createFileRoute('/demo/css-2026')({
  component: Css2026Page,
})

function Css2026Page() {
  return <NewCssFeatures2026 />
}
