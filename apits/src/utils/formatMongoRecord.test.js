import formatMongoRecord from './formatMongoRecord';

describe('formatMongoRecord', () => {
  it('replaces _id with id', () => {
    const id = Symbol('id');
    const otherField = Symbol('otherField');

    const mongoRecord = { _id: id, otherField };
    const result = formatMongoRecord(mongoRecord);

    expect(result).toEqual({
      id,
      otherField,
    });
  });
});
