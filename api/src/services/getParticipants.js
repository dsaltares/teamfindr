const formatMongoRecord = require('../utils/formatMongoRecord');

const formatParticipant = (participant) => ({
  ...formatMongoRecord(participant),
  user: formatMongoRecord(participant.user),
});

const getParticipants = ({ participantCollection }) => async (eventId) => {
  const mongoParticipants = await participantCollection
    .aggregate([
      {
        $match: {
          event: eventId,
        },
      },
      {
        $lookup: {
          from: 'User',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $addFields: { user: { $arrayElemAt: ['$user', 0] } } },
      {
        $sort: { createdAt: 1 },
      },
    ])
    .toArray();

  return mongoParticipants.map(formatParticipant);
};

module.exports = getParticipants;
