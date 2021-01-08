import { ControllerCreator } from '../controller';

const patchUserController: ControllerCreator = ({
  getUserById,
  updateUser,
}) => async ({
  params: { userId },
  body: { user },
  user: { id: requestUserId },
}) => {
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

export default patchUserController;
