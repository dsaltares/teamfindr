import { Services } from '../setup/setupServices';
import { DoneFn } from './types';

const deserializeUser = ({ getUserById }: Services) => async (
  id: string,
  done: DoneFn
) => {
  const user = await getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('Failed to deserialize user'));
  }
};

export default deserializeUser;
