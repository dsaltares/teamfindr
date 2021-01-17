import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { PushDevice } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

const getPushDevicesForUser = ({
  pushDeviceCollection,
}: ServiceDependencies) => async (userId: string) => {
  const mongoPushDevices = await pushDeviceCollection
    .find({ user: userId })
    .toArray();

  return mongoPushDevices.map(formatMongoRecord) as PushDevice[];
};

export default getPushDevicesForUser;
