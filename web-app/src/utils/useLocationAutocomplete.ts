import { debounce } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import getLocationSuggestions, {
  LocationSuggestions,
} from './getLocationSuggestions';

const useLocationAutocomplete = (query: string) => {
  const debouncedQuery = useDebounce(query, 200);
  const [suggestions, setSuggestions] = useState<LocationSuggestions>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const newSuggestions = await getLocationSuggestions(debouncedQuery);
      if (newSuggestions) {
        setSuggestions(newSuggestions);
      }
      setLoading(false);
    };
    performSearch();
  }, [debouncedQuery, setSuggestions, setLoading]);

  return { suggestions, setSuggestions, loading };
};

export default useLocationAutocomplete;
