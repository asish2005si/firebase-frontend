
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '../provider';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useFirebaseApp } from '../provider';

interface UserProfile {
    role?: string;
    // Add other profile fields here
}

export interface UserState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUser(): UserState {
  const auth = useAuth();
  const app = useFirebaseApp();
  const [userState, setUserState] = useState<UserState>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!auth || !app) {
        setUserState(s => ({ ...s, isLoading: false }));
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          if (user.isAnonymous) {
            setUserState({ user, profile: { role: 'guest' }, isLoading: false, error: null });
          } else {
            const db = getFirestore(app);
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserState({ user, profile: userDoc.data() as UserProfile, isLoading: false, error: null });
            } else {
                setUserState({ user, profile: null, isLoading: false, error: null });
            }
          }
        } catch (error: any) {
            setUserState({ user: null, profile: null, isLoading: false, error });
        }
      } else {
        setUserState({ user: null, profile: null, isLoading: false, error: null });
      }
    });

    return () => unsubscribe();
  }, [auth, app]);

  return userState;
}
