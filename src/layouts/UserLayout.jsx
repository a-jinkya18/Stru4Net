// src/layouts/UserLayout.jsx
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'; // could be a different menu
import { Routes, Route } from 'react-router-dom';
import UserHome from '../pages/UserHome';    // build whatever user should see

export default function UserLayout() {
    return (
        <Routes>
            <Route index element={<UserHome />} />
        </Routes>

    );
}
