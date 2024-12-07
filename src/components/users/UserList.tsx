import React, { useState } from 'react';
import { Edit2, Trash2, UserPlus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { UserForm } from './UserForm';
import { formatDate } from '../../utils/helpers';
import { Button } from '../common/Button';
import toast from 'react-hot-toast';

export const UserList: React.FC = () => {
  const { users, roles, deleteUser } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      toast.success('User deleted successfully');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow relative top-8 sm:top-0">
      <div className="p-4 sm:p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-white">Users</h2>
          <Button
            onClick={() => setShowForm(true)}
            icon={UserPlus}
          >
            Add User
          </Button>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {roles.find(role => role.id === user.roleId)?.name}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingUser(user.id)}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showForm || editingUser) && (
        <UserForm
          userId={editingUser}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};