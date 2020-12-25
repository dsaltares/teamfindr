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
  uploadImage: async (file: File): Promise<string> => {
    const endpoint = 'https://api.cloudinary.com/v1_1/teamfindr/image/upload';
    const preset = 'teamfindr';
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', preset);
    const {
      data: { secure_url: url },
    } = await axios.post(endpoint, fd);
    return url;
  },
  patchUser: async (id: string, user: Partial<User>): Promise<User> => {
    const {
      data: { user: updatedUser },
    } = await axios.patch(
      `http://localhost:5000/users/${id}`,
      {
        user,
      },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );
    return updatedUser;
  },
};

export default authService;
