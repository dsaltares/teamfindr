import { ServiceDependencies } from './setupServiceDependencies';

const createIndexes = async ({
  logger,
  venueCollection,
}: ServiceDependencies) => {
  logger.info('creating indexes');
  await venueCollection.createIndex({ 'location.geo': '2dsphere' });
};

export default createIndexes;
