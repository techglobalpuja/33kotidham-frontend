'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUserInfo } from '@/store/slices/authSlice';
import { getAuthToken } from '@/utils/auth';

/**
 * AuthInitializer component
 * Automatically fetches user information when the app loads if a valid token exists
 */
export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch user info if we have a token but no user data
    const { token } = getAuthToken();
    
    if (token && user && user.isAuthenticated && !user.name) {
      // We have a token and user is marked as authenticated, but don't have full user data
      dispatch(fetchUserInfo());
    }
  }, [dispatch, user]);

  // This component doesn't render anything
  return null;
}
