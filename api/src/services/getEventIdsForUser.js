const getEventIdsForUser = ({ participantCollection }) => async (userId) => {
  const mongoParticipants = await participantCollection
    .find({ user: userId })
    .toArray();
  return mongoParticipants.map((participant) => participant.event);
};

module.exports = getEventIdsForUser;
