const formatMongoRecord = require('../utils/formatMongoRecord');

const formatEvent = (mongoEvent) => ({
  ...formatMongoRecord(mongoEvent),
  createdBy: formatMongoRecord(mongoEvent.createdBy),
  venue: formatMongoRecord(mongoEvent.venue),
  participants: [],
});

const searchEvents = ({ eventCollection, searchVenues }) => async ({
  lat,
  lon,
  radius,
  sports,
  date,
  excludeFull,
}) => {
  const basicMatchQuery = {};

  if (lat && lon && radius) {
    const venues = await searchVenues({ lat, lon, radius });
    basicMatchQuery.venue = {
      $in: venues.map((venue) => venue.id),
    };
  }

  if (sports) {
    basicMatchQuery.sport = { $in: sports.split(':') };
  }
  if (date) {
    const fromDate = new Date(date);
    fromDate.setUTCHours(0, 0, 0, 0);

    const toDate = new Date(fromDate);
    toDate.setDate(toDate.getDate() + 1);

    basicMatchQuery.startsAt = {
      $gte: fromDate,
      $lt: toDate,
    };
  }

  const excludeFullQuery = {};
  if (excludeFull) {
    excludeFullQuery['$expr'] = {
      $gt: ['$capacity', '$numParticipants'],
    };
  }

  const mongoEvents = await eventCollection
    .aggregate([
      {
        $match: basicMatchQuery,
      },
      {
        $match: excludeFullQuery,
      },
      {
        $lookup: {
          from: 'Venue',
          localField: 'venue',
          foreignField: '_id',
          as: 'venue',
        },
      },
      { $addFields: { venue: { $arrayElemAt: ['$venue', 0] } } },
      {
        $lookup: {
          from: 'User',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      { $addFields: { createdBy: { $arrayElemAt: ['$createdBy', 0] } } },
      {
        $sort: { startsAt: 1 },
      },
    ])
    .toArray();
  return mongoEvents.map(formatEvent);
};

module.exports = searchEvents;
