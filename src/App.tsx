import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { UserList } from './components/users/UserList';
import { RoleList } from './components/roles/RoleList';

function App() {
  const [currentView, setCurrentView] = useState('users');

  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UserList />;
      case 'roles':
        return <RoleList />;
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}

export default App;