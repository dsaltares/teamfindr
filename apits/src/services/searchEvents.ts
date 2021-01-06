import formatEvent from '../utils/formatEvent';

const searchEvents = ({
  eventCollection,
  searchVenues,
  getEventIdsForUser,
}) => async ({
  query: {
    lat,
    lon,
    radius,
    sports,
    date,
    excludeFull,
    venue,
    after,
    before,
    isParticipant,
  },
  userId,
}) => {
  const basicMatchQuery = {};
  const sortQuery = { startsAt: 1 };

  if (lat && lon && radius) {
    const venues = await searchVenues({ lat, lon, radius });
    basicMatchQuery.venue = {
      $in: venues.map((venue) => venue.id),
    };
  }

  if (isParticipant) {
    const eventIds = await getEventIdsForUser(userId);
    basicMatchQuery['_id'] = {
      $in: eventIds,
    };
  }

  if (sports) {
    basicMatchQuery.sport = { $in: sports.split(':') };
  }
  if (after || before || date) {
    const startsAtQuery = {};
    if (after) {
      startsAtQuery['$gte'] = new Date(after);
    }
    if (before) {
      startsAtQuery['$lt'] = new Date(before);
      sortQuery.startsAt = -1;
    }
    if (date) {
      const fromDate = new Date(date);
      fromDate.setUTCHours(0, 0, 0, 0);

      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 1);
      startsAtQuery['$gte'] = fromDate;
      startsAtQuery['$lt'] = toDate;
    }

    basicMatchQuery.startsAt = startsAtQuery;
  }
  if (venue) {
    basicMatchQuery.venue = venue;
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
        $sort: sortQuery,
      },
    ])
    .toArray();
  return mongoEvents.map(formatEvent);
};

export default searchEvents;
