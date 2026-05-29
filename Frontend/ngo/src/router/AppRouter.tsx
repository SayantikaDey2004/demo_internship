import { Route, Routes } from 'react-router-dom'

import Layout from '../components/Layout'
import Admin from '../pages/Admin'
import FormSubmit from '../pages/FormSubmit'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Signup from '../pages/Signup'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<FormSubmit />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
