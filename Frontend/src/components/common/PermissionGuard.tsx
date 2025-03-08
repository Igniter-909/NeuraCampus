// src/components/common/PermissionGuard.tsx
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { ROLE_PERMISSIONS } from '@/constants/permissions';
import { Role } from '@/types/roles';
import { Permission } from '@/constants/permissions';

interface PermissionGuardProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export default function PermissionGuard({ 
  permission, 
  children, 
  fallback = null 
}: PermissionGuardProps) {
  const { getUser } = useAuth();
  const user = getUser();
  
  if (!user) {
    return fallback;
  }
  
  const userRole = user.role as Role;
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  
  // Super admin has all permissions
  const hasPermission = 
    userPermissions.includes('*' as Permission) || 
    userPermissions.includes(permission);
  
  return hasPermission ? <>{children}</> : <>{fallback}</>;
}

// Usage example:
// <PermissionGuard permission={PERMISSIONS.MANAGE_COLLEGES}>
//   <CreateCollegeButton />
// </PermissionGuard>