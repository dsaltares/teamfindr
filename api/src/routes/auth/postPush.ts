import { ControllerCreator } from '../controller';

const postPush: ControllerCreator = ({ upsertPushDevice }) => async (req) => {
  await upsertPushDevice({
    userId: req.user.id,
    subscription: req.body.subscription,
  });
  return {
    status: 201,
    body: {},
  };
};

export default postPush;
