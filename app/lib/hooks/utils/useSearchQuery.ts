import { useLocation } from 'react-router';
import qs from 'qs';

const useSearchQuery = () => {
  const { search } = useLocation();
  return qs.parse(search, { ignoreQueryPrefix: true });
};

export default useSearchQuery;
