import { ServiceDependencies } from '../setup/setupServiceDependencies';

const deletePushDeviceByEndpoint = ({
  pushDeviceCollection,
}: ServiceDependencies) => async (endpoint: string) => {
  await pushDeviceCollection.deleteOne({
    'subscription.endpoint': endpoint,
  });
};

export default deletePushDeviceByEndpoint;
