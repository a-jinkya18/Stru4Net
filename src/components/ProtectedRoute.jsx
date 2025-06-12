// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role: neededRole }) {
  const { role } = useSelector((s) => s.auth);
  if (role !== neededRole) {
    // not logged in or wrong role → send to that role’s login
    return <Navigate to={neededRole === 'admin' ? '/login-admin' : '/login-user'} />;
  }
  return children;
}
