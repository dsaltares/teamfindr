const formatMongoRecord = ({ _id, ...otherFields }) => ({
  id: _id,
  ...Object.entries(otherFields).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value instanceof Date ? value.toISOString() : value,
    }),
    {}
  ),
});

module.exports = formatMongoRecord;
