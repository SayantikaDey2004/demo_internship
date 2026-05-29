import { ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-border bg-white/80 p-8 shadow-soft">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            NGO Intake Portal
          </p>
          <h1 className="text-4xl font-semibold text-ink md:text-5xl">
            Keep every community request organized and on time.
          </h1>
          <p className="text-base text-muted">
            Capture new submissions, coordinate volunteers, and publish updates
            without losing track of impact.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="/submit">
                Start a submission <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
