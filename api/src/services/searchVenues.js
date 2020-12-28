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
  const mongoVenues = await venueCollection.find(query).toArray();
  return mongoVenues.map(formatMongoRecord);
};

module.exports = searchVenues;
