import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Permission } from '../../types';
import toast from 'react-hot-toast';

interface RoleFormProps {
  roleId?: string | null;
  onClose: () => void;
}

const availablePermissions: Permission[] = ['read', 'write', 'delete', 'manage_users', 'manage_roles'];

export const RoleForm: React.FC<RoleFormProps> = ({ roleId, onClose }) => {
  const { roles, addRole, updateRole } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as Permission[]
  });

  useEffect(() => {
    if (roleId) {
      const role = roles.find(r => r.id === roleId);
      if (role) {
        setFormData({
          name: role.name,
          description: role.description,
          permissions: role.permissions
        });
      }
    }
  }, [roleId, roles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error('Role name is required');
      return;
    }

    if (roleId) {
      updateRole(roleId, formData);
      toast.success('Role updated successfully');
    } else {
      addRole(formData);
      toast.success('Role created successfully');
    }
    onClose();
  };

  const togglePermission = (permission: Permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-5 border shadow-lg rounded-md bg-gray-800 border-gray-700 w-full max-w-lg mx-4 md:mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">{roleId ? 'Edit Role' : 'Add Role'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Role Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    {permission
                      .split('_')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              {roleId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};