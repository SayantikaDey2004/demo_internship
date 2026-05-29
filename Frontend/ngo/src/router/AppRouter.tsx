import { Navigate, Route, Routes } from 'react-router-dom'
import { getAuthToken } from '../lib/api'

import Layout from '../components/Layout'
import FormSubmit from '../pages/FormSubmit'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Signout from '../pages/Signout'
import Signup from '../pages/Signup'

export default function AppRouter() {
  const isAuthed = Boolean(getAuthToken())

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={isAuthed ? <Home /> : <Navigate to="/login/user" replace />}
        />
        <Route
          path="/submit"
          element={isAuthed ? <FormSubmit /> : <Navigate to="/login/user" replace />}
        />
        <Route
          path="/signout"
          element={isAuthed ? <Signout /> : <Navigate to="/login/user" replace />}
        />
        <Route path="/login" element={<Navigate to="/login/user" replace />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup" element={<Navigate to="/signup/user" replace />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
