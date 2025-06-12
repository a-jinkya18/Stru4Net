import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-[#1F2937] text-white p-5">
      <h1 className="text-2xl font-bold mb-10">Stru4Net</h1>
      <ul className="space-y-5">
        <li><Link to="/" className="hover:text-gray-300">Dashboard</Link></li>
        <li><Link to="/analytics" className="hover:text-gray-300">Analytics</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
