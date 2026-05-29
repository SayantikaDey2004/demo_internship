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
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
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

    const { error: apiError } = await apiRequest(
      '/api/forms/submit',
      {
        method: 'POST',
        body: JSON.stringify({
          title,
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

    setTitle('')
    setEmail('')
    setMessage('')
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
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Request title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
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
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe what support is needed."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
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
