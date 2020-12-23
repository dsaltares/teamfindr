export interface User {
  id: string;
  email: string;
  avatar: string;
}

export type AuthProvider = 'facebook' | 'google' | 'twitter';
