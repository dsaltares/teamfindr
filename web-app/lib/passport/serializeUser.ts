import type { User } from '@lib/types';

type DoneFn = (error: Error | null, userId: string) => void;

const serializeUser = () => (user: User, done: DoneFn) => {
  done(null, user.id);
};

export default serializeUser;
