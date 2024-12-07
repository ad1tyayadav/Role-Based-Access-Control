import { StateCreator } from 'zustand';
import { Role } from '../../types';
import { generateId } from '../../utils/helpers';

export interface RoleSlice {
  roles: Role[];
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

export const createRoleSlice: StateCreator<RoleSlice> = (set) => ({
  roles: defaultRoles,

  addRole: (role) => set((state) => ({
    roles: [...state.roles, { ...role, id: generateId() }]
  })),

  updateRole: (id, updatedRole) => set((state) => ({
    roles: state.roles.map(role => role.id === id ? { ...role, ...updatedRole } : role)
  })),

  deleteRole: (id) => set((state) => ({
    roles: state.roles.filter(role => role.id !== id)
  }))
});