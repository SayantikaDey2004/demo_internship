import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        404
      </p>
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="text-base text-muted">
        The page you are looking for does not exist yet.
      </p>
      <Button asChild>
        <a href="/">Return home</a>
      </Button>
    </div>
  )
}
