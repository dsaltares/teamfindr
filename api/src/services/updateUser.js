const formatMongoRecord = require('../utils/formatMongoRecord');

const updateUser = ({ userCollection }) => async ({ userId, user }) => {
  const { value: updatedUser } = await userCollection.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        ...user,
        updatedAt: new Date(),
      },
    },
    { returnOriginal: false }
  );
  return formatMongoRecord(updatedUser);
};

module.exports = updateUser;
