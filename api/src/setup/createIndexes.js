const createIndexes = async ({ logger, venueCollection }) => {
  logger.info('creating indexes');
  await venueCollection.createIndex({ 'location.geo': '2dsphere' });
  logger.info('creating indexes done');
};

module.exports = createIndexes;
