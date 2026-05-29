import { NavLink, Outlet } from 'react-router-dom'
import { HeartHandshake } from 'lucide-react'

import { getAuthToken } from '../lib/api'
import { Button } from './ui/button'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Submit Form', to: '/submit' },
  { label: 'Sign out', to: '/signout' },
]

export default function Layout() {
  const isAuthed = Boolean(getAuthToken())

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-white/80 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <HeartHandshake className="h-5 w-5" />
            </span>
            <div>
              <p className="text-lg font-semibold text-ink">She Can Foundation</p>
              <p className="text-xs text-muted">NGO operations portal</p>
            </div>
          </div>
          {isAuthed ? (
            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-primary'
                        : 'text-ink hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          ) : null}
          {!isAuthed ? (
            <div className="flex flex-col items-end gap-2 text-sm sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Log in</span>
                <Button variant="ghost" size="sm" asChild>
                  <NavLink to="/login/admin">Admin</NavLink>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <NavLink to="/login/user">User</NavLink>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Sign up</span>
                <Button variant="outline" size="sm" asChild>
                  <NavLink to="/signup/admin">Admin</NavLink>
                </Button>
                <Button size="sm" asChild>
                  <NavLink to="/signup/user">User</NavLink>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main className="container py-10">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-white">
        <div className="container flex flex-col gap-2 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <span>She Can Foundation NGO platform</span>
          <span>Support, volunteers, and programs in one place.</span>
        </div>
      </footer>
    </div>
  )
}
