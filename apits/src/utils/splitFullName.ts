type SplitName = {
  firstName: string;
  lastName: string;
};

const splitFullName = (name: string): SplitName => {
  const nameParts = name.split(' ');
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
  };
};

export default splitFullName;
