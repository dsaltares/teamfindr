const deleteParticipant = ({
  logger,
  participantCollection,
  eventCollection,
}) => async ({ eventId, userId }) => {
  logger.info('deleting participant', { eventId, userId });
  await participantCollection.deleteOne({
    user: userId,
    event: eventId,
  });
  await eventCollection.updateOne(
    { _id: eventId },
    { $inc: { numParticipants: -1 } }
  );
};

export default deleteParticipant;
