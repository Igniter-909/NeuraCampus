import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { ROLE_PERMISSIONS } from '@/constants/permissions';
import type { Permission } from '@/constants/permissions';
// import type { Role } from '@/constants/roles';

export function usePermissions() {
  const { getUser } = useAuth();

  const hasPermission = useCallback((permission: Permission): boolean => {
    const user = getUser();
    if (!user) return false;

    const rolePermissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || [];
    return rolePermissions.includes(permission);
  }, [getUser]);

  const hasAllPermissions = useCallback((permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  }, [hasPermission]);

  const hasAnyPermission = useCallback((permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  }, [hasPermission]);

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };
} 