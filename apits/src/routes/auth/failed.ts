import { ControllerCreator } from '../controller';

const failedController: ControllerCreator = () => async () => ({
  status: 401,
  body: { message: 'user failed to authenticate' },
});

export default failedController;
