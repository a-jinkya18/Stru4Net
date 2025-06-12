// src/layouts/AdminLayout.jsx
import React from 'react';
import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Analytics from '../components/Analytics';

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
