const todayAtMidnight = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export default todayAtMidnight;
