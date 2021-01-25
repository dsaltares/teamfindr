import { ServiceDependencies } from '../setup/setupServiceDependencies';

const deletePushDeviceByEndpoint = ({
  logger,
  pushDeviceCollection,
}: ServiceDependencies) => async (endpoint: string) => {
  const { value } = await pushDeviceCollection.findOneAndDelete({
    'subscription.endpoint': endpoint,
  });
  if (value) {
    logger.info('deleted push subscription', { userId: value.user });
  }
};

export default deletePushDeviceByEndpoint;
