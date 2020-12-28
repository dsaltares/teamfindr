const formatMongoRecord = require('../utils/formatMongoRecord');

const searchVenues = ({ venueCollection }) => async ({ lat, lon, radius }) => {
  const query = {};
  if (lat && lon && radius) {
    query['location.geo'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
        $maxDistance: radius,
        $minDistance: 0,
      },
    };
  }
  console.log('query:', JSON.stringify(query, null, 2));
  const mongoVenues = await venueCollection.find(query).toArray();
  console.log('venues:', mongoVenues);
  return mongoVenues.map(formatMongoRecord);
};

module.exports = searchVenues;
