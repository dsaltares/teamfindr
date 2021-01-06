const GetVenuesController = ({ searchVenues }) => async ({
  query: { lat, lon, radius },
}) => {
  const venues = await searchVenues({ lat, lon, radius });
  return {
    status: 200,
    body: { venues },
  };
};

export default GetVenuesController;
