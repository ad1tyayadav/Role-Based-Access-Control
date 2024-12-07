import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from '../common/Button';
import toast from 'react-hot-toast';

export const Settings: React.FC = () => {
  const handleExport = () => {
    const data = {
      users: JSON.parse(localStorage.getItem('users') || '[]'),
      roles: JSON.parse(localStorage.getItem('roles') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rbac-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Data Management</h3>
          <div className="flex gap-4">
            <Button
              variant="primary"
              icon={Shield}
              onClick={handleExport}
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}