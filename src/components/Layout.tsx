import React from 'react';
import { Menu, Users, Shield, Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const navItems = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
  {/* Navigation Bar */}
  <nav className="bg-gray-800 border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Menu className="h-8 w-8 text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-white">Admin Dashboard</span>
        </div>
      </div>
    </div>
  </nav>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-64">
        <nav className="space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentView === id
                  ? 'bg-indigo-900 text-indigo-200'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  </div>

  {/* Toast Notifications */}
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: '#374151',
        color: '#fff',
      },
    }}
  />
</div>

  );
};