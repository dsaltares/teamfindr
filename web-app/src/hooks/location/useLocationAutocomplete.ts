import { useState, useEffect } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import { useServices } from '../../providers/ServicesProvider';
import { Coordinates, Locations, LocationType } from '../../types';

interface UseLocationTypeArgs {
  query: string;
  around?: Coordinates;
  restrictToType?: LocationType;
}

const useLocationAutocomplete = ({
  query,
  around,
  restrictToType,
}: UseLocationTypeArgs) => {
  const services = useServices();
  const debouncedQuery = useDebounce(query, 200);
  const [suggestions, setSuggestions] = useState<Locations>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const newSuggestions = await services.location.getLocationSuggestions(
        debouncedQuery,
        around,
        restrictToType
      );
      if (newSuggestions) {
        setSuggestions(newSuggestions);
      }
      setLoading(false);
    };
    performSearch();
  }, [
    debouncedQuery,
    setSuggestions,
    setLoading,
    services,
    around,
    restrictToType,
  ]);

  return { suggestions, setSuggestions, loading };
};

export default useLocationAutocomplete;
