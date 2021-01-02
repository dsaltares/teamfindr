const formatEvent = require('../utils/formatEvent');

const getEventById = ({ eventCollection }) => async (id) => {
  const mongoEvents = await eventCollection
    .aggregate([
      {
        $match: { _id: id },
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
    ])
    .toArray();

  return mongoEvents.length > 0 ? formatEvent(mongoEvents[0]) : null;
};

module.exports = getEventById;
