import axios from 'axios';
import { User, AuthProvider } from '../types';
import { API_URL } from '../../endpoints';

const authService = {
  verify: async (): Promise<User> => {
    const {
      data: { user },
    } = await axios.get(`${API_URL}/auth/verify`, {
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
    window.open(`${API_URL}/auth/${provider}`, '_self');
  },
  logout: () => {
    window.open(`${API_URL}/auth/logout`, '_self');
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
      `${API_URL}/users/${id}`,
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
