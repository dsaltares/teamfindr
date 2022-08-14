import createRoute, { type Handler } from '@lib/api/createRoute';
import getUserById from '@lib/data/getUserById';
import updateUser from '@lib/data/updateUser';

const patchUserHandler: Handler = async ({
  query: { userId },
  body: { user },
  user: requestUser,
}) => {
  const requestUserId = requestUser?.id as string;
  if (requestUserId !== userId) {
    return {
      status: 403,
      body: { message: 'cannot update a different user' },
    };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      status: 405,
      body: { message: 'user not found' },
    };
  }

  const updatedUser = await updateUser({ userId, user });
  return {
    status: 200,
    body: { user: updatedUser },
  };
};

export default createRoute([
  {
    method: 'patch',
    handler: patchUserHandler,
    requiresAuth: true,
  },
]);
