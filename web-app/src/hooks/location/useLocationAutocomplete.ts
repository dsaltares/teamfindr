import { useState, useEffect } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import { useServices } from '../../providers/ServicesProvider';
import { Locations } from '../../types';

const useLocationAutocomplete = (query: string) => {
  const services = useServices();
  const debouncedQuery = useDebounce(query, 200);
  const [suggestions, setSuggestions] = useState<Locations>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const newSuggestions = await services.location.getLocationSuggestions(
        debouncedQuery
      );
      if (newSuggestions) {
        setSuggestions(newSuggestions);
      }
      setLoading(false);
    };
    performSearch();
  }, [debouncedQuery, setSuggestions, setLoading, services]);

  return { suggestions, setSuggestions, loading };
};

export default useLocationAutocomplete;
