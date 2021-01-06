const formatMongoRecord = ({ _id, ...otherFields }: any): any => ({
  id: _id,
  ...Object.entries(otherFields).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value instanceof Date ? value.toISOString() : value,
    }),
    {}
  ),
});

export default formatMongoRecord;
