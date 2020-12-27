import axios from 'axios';
import { User, AuthProvider } from '../types';
import { API_URL } from '../endpoints';

const userService = {
  verify: async (): Promise<User | null> => {
    try {
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
    } catch (error) {
      if (error?.response?.status === 401) {
        return null;
      }
      throw error;
    }
  },
  openIdpAuthPage: (provider: AuthProvider) => {
    window.open(`${API_URL}/auth/${provider}`, '_self');
  },
  logout: () => {
    window.open(`${API_URL}/auth/logout`, '_self');
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

export default userService;
