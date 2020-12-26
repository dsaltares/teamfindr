export interface User {
  id: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export type AuthProvider = 'facebook' | 'google' | 'twitter';

export type Coordinates = [number, number];
