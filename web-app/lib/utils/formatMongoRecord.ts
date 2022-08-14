const formatMongoRecord = ({ _id, ...otherFields }: any) => ({
  id: _id as unknown as string,
  ...Object.entries(otherFields).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value instanceof Date ? value.toISOString() : value,
    }),
    {}
  ),
});

export default formatMongoRecord;
