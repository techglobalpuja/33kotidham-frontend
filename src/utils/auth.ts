// Authentication utilities
import { setCookie, destroyCookie } from 'nookies';

/**
 * Store authentication token in localStorage and cookies
 */
export const storeAuthToken = (token: string, tokenType: string = 'Bearer') => {
  if (typeof window !== 'undefined') {
    // Store in localStorage for client-side access
    localStorage.setItem('auth_token', token);
    localStorage.setItem('token_type', tokenType);
  }
  
  // Store in cookies for server-side access
  // Set cookie to expire in 7 days (604800 seconds)
  setCookie(null, 'auth_token', token, {
    maxAge: 604800,
    sameSite: true,
    path: '/',
  });
  
  setCookie(null, 'token_type', tokenType, {
    maxAge: 604800,
    sameSite: true,
    path: '/',
  });
};

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = (): { token: string | null; tokenType: string | null } => {
  if (typeof window !== 'undefined') {
    return {
      token: localStorage.getItem('auth_token'),
      tokenType: localStorage.getItem('token_type') || 'Bearer'
    };
  }
  return { token: null, tokenType: null };
};

/**
 * Clear authentication token from localStorage and cookies
 */
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token_type');
  }
  
  // Clear cookies
  destroyCookie(null, 'auth_token');
  destroyCookie(null, 'token_type');
};

/**
 * Get authorization header value
 */
export const getAuthHeader = (): string | null => {
  const { token, tokenType } = getAuthToken();
  if (!token) return null;
  return `${tokenType} ${token}`;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const { token } = getAuthToken();
  return !!token;
};