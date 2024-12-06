import { create } from 'zustand';
import { User, Role, Permission } from '../types';
import { generateId } from '../utils/helpers';

interface Store {
  users: User[];
  roles: Role[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
}

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    description: 'Full system access'
  },
  {
    id: '2',
    name: 'Editor',
    permissions: ['read', 'write'],
    description: 'Can read and write content'
  }
];

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    roleId: '1',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const useStore = create<Store>((set) => ({
  users: defaultUsers,
  roles: defaultRoles,
  
  addUser: (user) => set((state) => ({
    users: [...state.users, { ...user, id: generateId(), createdAt: new Date().toISOString() }]
  })),
  
  updateUser: (id, updatedUser) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    )
  })),
  
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  
  addRole: (role) => set((state) => ({
    roles: [...state.roles, { ...role, id: generateId() }]
  })),
  
  updateRole: (id, updatedRole) => set((state) => ({
    roles: state.roles.map(role =>
      role.id === id ? { ...role, ...updatedRole } : role
    )
  })),
  
  deleteRole: (id) => set((state) => ({
    roles: state.roles.filter(role => role.id !== id)
  }))
}));