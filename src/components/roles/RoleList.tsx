import React, { useState } from 'react';
import { Edit2, Trash2, Shield } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { RoleForm } from './RoleForm';
import toast from 'react-hot-toast';

export const RoleList: React.FC = () => {
  const { roles, deleteRole } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      deleteRole(id);
      toast.success('Role deleted successfully');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow">
    <div className="p-6 border-b border-gray-700">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Roles</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Shield className="h-4 w-4 mr-2" />
          Add Role
        </button>
      </div>
    </div>
  
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role Name</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Permissions</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-700">
              <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-gray-300">{role.name}</td>
              <td className="px-4 md:px-6 py-4 text-gray-300">{role.description}</td>
              <td className="px-4 md:px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-900 text-indigo-200"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setEditingRole(role.id)}
                  className="text-indigo-400 hover:text-indigo-300 mr-4"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {(showForm || editingRole) && (
      <RoleForm
        roleId={editingRole}
        onClose={() => {
          setShowForm(false);
          setEditingRole(null);
        }}
      />
    )}
  </div>
  
  );
};