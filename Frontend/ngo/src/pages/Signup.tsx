import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/api'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const { error: apiError } = await apiRequest(
      '/api/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role: 'user' }),
      },
    )

    setIsSubmitting(false)

    if (apiError) {
      setError(apiError?.message || 'Unable to create account')
      return
    }

    navigate('/login')
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Create a staff account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Alex Morgan"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@ngo.org"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create account'}
            </Button>
          </form>
          <p className="text-xs text-muted">
            By signing up you agree to the volunteer policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
