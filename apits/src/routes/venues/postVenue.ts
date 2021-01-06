const postVenue = ({ createVenue }) => async ({
  body: { venue },
  user: { id: userId },
}) => {
  const createdVenue = await createVenue({ userId, venue });
  return {
    status: 201,
    body: { venue: createdVenue },
  };
};

export default postVenue;
