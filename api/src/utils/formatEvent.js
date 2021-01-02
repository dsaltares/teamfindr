const formatMongoRecord = require('./formatMongoRecord');

const formatEvent = (mongoEvent) => ({
  ...formatMongoRecord(mongoEvent),
  createdBy: formatMongoRecord(mongoEvent.createdBy),
  venue: formatMongoRecord(mongoEvent.venue),
  participants: [],
});

module.exports = formatEvent;
