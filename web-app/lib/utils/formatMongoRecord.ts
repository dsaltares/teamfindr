type MongoRecord = {
  _id: string;
} & object;

type FormattedMongoRecord = {
  id: string;
} & object;

const formatMongoRecord = ({
  _id,
  ...otherFields
}: MongoRecord): FormattedMongoRecord => ({
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
