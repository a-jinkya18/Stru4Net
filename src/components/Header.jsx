// src/components/Header.jsx
import React from 'react';
import { UserCircle } from 'lucide-react';

const Header = () => (
  <header className="w-full bg-blue-900 text-white flex items-center justify-between px-6 h-16">
    <h1 className="text-xl font-semibold">Stru4Net</h1>
    <div className="flex items-center space-x-3">
      <span className="bg-blue-700 px-3 py-1 rounded-full">A</span>
      <UserCircle size={28} />
    </div>
  </header>
);

export default Header;
