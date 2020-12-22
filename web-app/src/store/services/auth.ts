import axios from 'axios';
import { User } from '../types';

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
  openTwitterAuthPage: () => {
    window.open('http://localhost:5000/auth/twitter', '_self');
  },
  openFacebookAuthPage: () => {
    window.open('http://localhost:5000/auth/facebook', '_self');
  },
  openGoogleAuthPage: () => {
    window.open('http://localhost:5000/auth/google', '_self');
  },
  logout: () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  },
};

export default authService;
