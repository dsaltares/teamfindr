const splitFullName = (name) => {
  const nameParts = name.split(' ');
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
  };
};

module.exports = splitFullName;
