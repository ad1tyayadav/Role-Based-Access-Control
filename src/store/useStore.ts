import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserSlice, createUserSlice } from './slices/userSlice';
import { RoleSlice, createRoleSlice } from './slices/roleSlice';

type Store = UserSlice & RoleSlice;

export const useStore = create<Store>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createRoleSlice(...args),
    }),
    {
      name: 'rbac-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);