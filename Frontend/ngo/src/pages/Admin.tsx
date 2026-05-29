import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

const activity = [
  {
    id: 'REQ-2181',
    requester: 'Community Health Center',
    status: 'Needs review',
    owner: 'Anita Rao',
  },
  {
    id: 'REQ-2179',
    requester: 'Bridge Shelter',
    status: 'Approved',
    owner: 'Kiran Mehta',
  },
  {
    id: 'REQ-2174',
    requester: 'Rural Education Trust',
    status: 'Assigned',
    owner: 'Sharon Dsouza',
  },
]

export default function Admin() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Across all programs</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-ink">68</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Volunteers ready</CardTitle>
            <CardDescription>Verified this week</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-ink">214</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Responses sent</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-ink">92</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent submissions</CardTitle>
          <CardDescription>Monitor the latest incoming requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activity.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 rounded-lg border border-border bg-slate-50 px-4 py-3 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{item.id}</p>
                  <p className="text-sm text-muted">{item.requester}</p>
                </div>
                <div className="text-sm text-muted">{item.status}</div>
                <div className="text-sm text-ink">Owner: {item.owner}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
