import { ServiceDependencies } from '../setup/setupServiceDependencies';
import formatEvent from '../utils/formatEvent';
import getEventIdsForUser from './getEventIdsForUser';
import searchVenues from './searchVenues';

type SearchEventsDependencies = ServiceDependencies & {
  searchVenues: ReturnType<typeof searchVenues>;
  getEventIdsForUser: ReturnType<typeof getEventIdsForUser>;
};

interface SearchEventParams {
  query: {
    lat?: number;
    lon?: number;
    radius?: number;
    sports?: string;
    date?: string;
    excludeFull?: string;
    venue?: string;
    after?: string;
    before?: string;
    isParticipant?: boolean;
  };
  userId: string;
}

const searchEvents = ({
  eventCollection,
  searchVenues,
  getEventIdsForUser,
}: SearchEventsDependencies) => async ({
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
}: SearchEventParams) => {
  const basicMatchQuery: any = {};
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
  } else {
    basicMatchQuery.linkOnly = { $ne: true };
    basicMatchQuery.canceledAt = { $exists: false };
  }

  if (sports) {
    basicMatchQuery.sport = { $in: sports.split(':') };
  }
  if (after || before || date) {
    const startsAtQuery: any = {};
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

  const excludeFullQuery: any = {};
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
