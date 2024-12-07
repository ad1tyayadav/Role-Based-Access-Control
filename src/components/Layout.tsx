import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiBarChart, FiShield, FiUser, FiBarChart2, FiMenu, FiX } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: FiBarChart },
  { id: 'users', label: 'Users', path: '/users', icon: FiUser },
  { id: 'roles', label: 'Roles', path: '/roles', icon: FiShield },
  { id: 'analytics', label: 'Analytics', path: '/analytics', icon: FiBarChart2 },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-800 text-gray-300 transition-all duration-300 fixed top-0 left-0 h-screen transform ${isSidebarOpen ? 'translate-x-0 z-50' : '-translate-x-full z-40'
          } lg:relative lg:translate-x-0 lg:z-0`}
      >
        <div className="p-4 text-2xl font-bold text-white">Admin Panel</div>
        <nav className="space-y-1">
          {navItems.map(({ id, label, path, icon: Icon }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-indigo-700 text-white' : 'hover:bg-gray-700'
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay to close sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-900 text-gray-100">
        {/* Mobile toggle button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md z-60"
        >
          {isSidebarOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>

        {children}
      </main>
    </div>
  );
};
