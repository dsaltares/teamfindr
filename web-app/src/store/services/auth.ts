import axios from 'axios';
import { User, AuthProvider } from '../types';

const authService = {
  verify: async (): Promise<User> => {
    const {
      data: { user },
    } = await axios.get('http://localhost:5000/auth/verify', {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return user;
  },
  openIdpAuthPage: (provider: AuthProvider) => {
    window.open(`http://localhost:5000/auth/${provider}`, '_self');
  },
  logout: () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  },
};

export default authService;
