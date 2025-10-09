
'use client';

import { useUser } from '@/firebase/auth/use-user';

export function useAdmin() {
  const { profile, isLoading } = useUser();
  
  const isAdmin = profile?.role === 'admin';

  return { isAdmin, isLoading };
}
