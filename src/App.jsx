// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';   // your admin dashboard UI
import UserLayout from './layouts/UserLayout';     // your user dashboard UI
import { Navigate } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login-admin" element={<AdminLogin />} />
        <Route path="login-user" element={<UserLogin />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/*"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        />

        {/* default redirect to user login */}
        <Route path="*" element={<Navigate to="/login-user" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
