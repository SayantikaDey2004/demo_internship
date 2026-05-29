import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest, clearAuth, getAuthToken } from '../lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function Signout() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSignout = async () => {
    setError('')
    setIsSubmitting(true)

    const token = getAuthToken()
    if (token) {
      await apiRequest('/api/auth/logout', { method: 'POST' }, true)
    }

    clearAuth()
    setIsSubmitting(false)
    navigate('/login/user')
  }

  useEffect(() => {
    void handleSignout()
  }, [])

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Signing out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted">
            {isSubmitting ? 'Ending your session...' : 'Redirecting to login.'}
          </p>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  )
}
