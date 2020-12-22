const formatMongoRecord = ({ _id, ...otherFields }) => ({
  id: _id,
  ...otherFields,
});

module.exports = formatMongoRecord;
