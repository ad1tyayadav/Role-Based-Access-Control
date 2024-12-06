export type Permission = 'read' | 'write' | 'delete' | 'manage_users' | 'manage_roles';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  isActive: boolean;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  roleId: string;
}