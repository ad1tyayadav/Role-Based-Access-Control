import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { UserFormData } from '../../types';
import { validateEmail } from '../../utils/helpers';
import toast from 'react-hot-toast';

interface UserFormProps {
  userId?: string | null;
  onClose: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ userId, onClose }) => {
  const { users, roles, addUser, updateUser } = useStore();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    roleId: roles[0]?.id || ''
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  useEffect(() => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          password: ''
        });
      }
    }
  }, [userId, users]);

  const validate = () => {
    const newErrors: Partial<UserFormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!userId && !formData.password) newErrors.password = 'Password is required';
    if (!formData.roleId) newErrors.roleId = 'Role is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      if (userId) {
        updateUser(userId, {
          name: formData.name,
          email: formData.email,
          roleId: formData.roleId
        });
        toast.success('User updated successfully');
      } else {
        addUser({
          name: formData.name,
          email: formData.email,
          roleId: formData.roleId,
          isActive: true
        });
        toast.success('User created successfully');
      }
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="relative mx-4 sm:mx-auto p-5 w-full max-w-md sm:w-96 shadow-lg rounded-md bg-gray-800 border border-gray-700">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-white">{userId ? 'Edit User' : 'Add User'}</h3>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
        <X className="h-6 w-6" />
      </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      {/* Password Input (Only for Adding a User) */}
      {!userId && (
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
        </div>
      )}

      {/* Role Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Role</label>
        <select
          value={formData.roleId}
          onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
        {errors.roleId && <p className="mt-1 text-sm text-red-400">{errors.roleId}</p>}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
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
          {userId ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};