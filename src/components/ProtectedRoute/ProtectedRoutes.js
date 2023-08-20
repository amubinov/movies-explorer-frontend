import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({ isLogged, children }) => {

  if (!isLogged) {
    <Navigate to='/' />
  }
  return children
}
