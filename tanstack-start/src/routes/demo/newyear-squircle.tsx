import { createFileRoute } from '@tanstack/react-router'

import NewYearSquircle from '@/components/NewYearSquircle'

export const Route = createFileRoute('/demo/newyear-squircle')({
  component: NewYearSquirclePage,
})

function NewYearSquirclePage() {
  return <NewYearSquircle />
}
