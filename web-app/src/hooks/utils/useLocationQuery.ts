import { useLocation } from 'react-router';
import qs from 'qs';

const useLocationQuery = () => {
  const { search } = useLocation();
  return qs.parse(search, { ignoreQueryPrefix: true });
};

export default useLocationQuery;
