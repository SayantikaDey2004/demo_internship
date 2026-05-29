import { ArrowRight, ClipboardList, HeartHandshake, Users } from 'lucide-react'

import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-8 rounded-2xl border border-border bg-white/80 p-8 shadow-soft md:grid-cols-[1.2fr_0.8fr]">
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
            <Button variant="outline" asChild>
              <a href="/admin">Open admin view</a>
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Active programs</CardTitle>
              <CardDescription>Live outreach this month</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-ink">12</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending reviews</CardTitle>
              <CardDescription>Needs approval this week</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-ink">48</CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: ClipboardList,
            title: 'Track submissions',
            copy: 'Every request gets a status, owner, and follow-up date.',
          },
          {
            icon: Users,
            title: 'Coordinate volunteers',
            copy: 'Match skills to needs with one shared schedule.',
          },
          {
            icon: HeartHandshake,
            title: 'Report impact',
            copy: 'Share updates with donors and partners in seconds.',
          },
        ].map((item) => (
          <Card key={item.title} className="h-full">
            <CardHeader>
              <item.icon className="h-5 w-5 text-primary" />
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.copy}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  )
}
