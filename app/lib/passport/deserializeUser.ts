import getUserById from '@lib/data/getUserById';
import type { DoneFn } from './types';

const deserializeUser = async (id: string, done: DoneFn) => {
  const user = await getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('Failed to deserialize user'));
  }
};

export default deserializeUser;
