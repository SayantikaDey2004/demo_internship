import { type FormEvent, useState } from 'react'
import { apiRequest, getAuthToken } from '../lib/api'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'

export default function FormSubmit() {
  const [organization, setOrganization] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('Food and essentials')
  const [summary, setSummary] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    const token = getAuthToken()
    if (!token) {
      setError('Please log in as an admin to submit requests.')
      return
    }

    setIsSubmitting(true)

    const message = [
      `Contact: ${contact}`,
      `Phone: ${phone || 'N/A'}`,
      `Category: ${category}`,
      `Summary: ${summary}`,
    ].join('\n')

    const { error: apiError } = await apiRequest(
      '/api/forms/submit',
      {
        method: 'POST',
        body: JSON.stringify({
          title: organization,
          email,
          message,
        }),
      },
      true
    )

    setIsSubmitting(false)

    if (apiError) {
      setError(apiError?.message || 'Unable to submit request')
      return
    }

    setOrganization('')
    setContact('')
    setEmail('')
    setPhone('')
    setCategory('Food and essentials')
    setSummary('')
    setSuccess('Request submitted successfully.')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Community support request</CardTitle>
          <CardDescription>
            Submit a new request for supplies, counseling, or outreach.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="org">Organization</Label>
                <Input
                  id="org"
                  placeholder="Helping Hands"
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Primary contact</Label>
                <Input
                  id="contact"
                  placeholder="Maria Lopez"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@ngo.org"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Request category</Label>
              <select
                id="category"
                className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-ink shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Food and essentials</option>
                <option>Healthcare support</option>
                <option>Education resources</option>
                <option>Volunteer assistance</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Describe what support is needed."
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {success ? (
              <p className="text-sm text-emerald-600">{success}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit request'}
              </Button>
              <Button variant="outline" type="button">
                Save draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
