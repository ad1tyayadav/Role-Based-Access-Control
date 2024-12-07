import { StateCreator } from 'zustand';
import { User } from '../../types';
import { generateId } from '../../utils/helpers';

export interface UserSlice {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  updateUser: (id: string, user: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (id: string) => void;
}

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

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  users: defaultUsers,

  addUser: async (user) => {
    const existingUser = get().users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    set((state) => ({
      users: [...state.users, { ...user, id: generateId(), createdAt: new Date().toISOString() }]
    }));
    return { success: true };
  },

  updateUser: async (id, updatedUser) => {
    if (updatedUser.email) {
      const existingUser = get().users.find(u => u.email.toLowerCase() === updatedUser.email?.toLowerCase() && u.id !== id);
      if (existingUser) {
        return { success: false, error: 'Email already exists' };
      }
    }

    set((state) => ({
      users: state.users.map(user => user.id === id ? { ...user, ...updatedUser } : user)
    }));
    return { success: true };
  },

  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  }))
});