// src/layouts/UserLayout.jsx
import { Routes, Route } from 'react-router-dom';
import UserHome from '../pages/UserHome';    // build whatever user should see

export default function UserLayout() {
    return (
        <Routes>
            <Route index element={<UserHome />} />
        </Routes>

    );
}
