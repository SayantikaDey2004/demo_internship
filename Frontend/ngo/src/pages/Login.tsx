import { type FormEvent, useMemo, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { apiRequest, getApiErrorMessage, setAuth } from '../lib/api'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

type LoginResponse = {
  token: string
  role: string
  name: string
  email: string
}

export default function Login() {
  const navigate = useNavigate()
  const { role } = useParams<{ role: string }>()
  const activeRole = useMemo(() => (role === 'admin' ? 'admin' : 'user'), [role])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const { data, error: apiError } = await apiRequest<LoginResponse>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
    )

    setIsSubmitting(false)

    if (apiError || !data) {
      setError(getApiErrorMessage(apiError, 'Unable to login'))
      return
    }

    setAuth(data.token, data.role, { name: data.name, email: data.email })
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>
            {activeRole === 'admin' ? 'Admin login' : 'User login'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={activeRole === 'admin' ? 'default' : 'outline'}
              size="sm"
              asChild
            >
              <NavLink to="/login/admin">Admin</NavLink>
            </Button>
            <Button
              variant={activeRole === 'user' ? 'default' : 'outline'}
              size="sm"
              asChild
            >
              <NavLink to="/login/user">User</NavLink>
            </Button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
          <p className="text-xs text-muted">
            Need access? Contact your NGO administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
