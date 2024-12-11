import { login as directusLogin, logout as directusLogout, refreshToken } from './directus';
import { User } from './types';

export async function login(email: string, password: string): Promise<User | null> {
  try {
    const auth = await directusLogin(email, password);
    if (!auth) return null;

    const user: User = {
      id: auth.user.id,
      email: auth.user.email,
      name: auth.user.first_name ? `${auth.user.first_name} ${auth.user.last_name || ''}` : auth.user.email,
      role: auth.user.role.name === 'Administrator' ? 'admin' : 'user'
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await directusLogout();
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export async function refreshUserToken(): Promise<User | null> {
  try {
    const auth = await refreshToken();
    if (!auth) return null;

    const user: User = {
      id: auth.user.id,
      email: auth.user.email,
      name: auth.user.first_name ? `${auth.user.first_name} ${auth.user.last_name || ''}` : auth.user.email,
      role: auth.user.role.name === 'Administrator' ? 'admin' : 'user'
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}