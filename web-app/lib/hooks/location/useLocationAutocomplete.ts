import { useState, useEffect } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import { useServices } from '@components/providers/ServicesProvider';
import type { Coordinates, Locations, LocationType } from '@lib/types';

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
    let isSubscribed = true;
    const performSearch = async () => {
      setLoading(true);
      const newSuggestions = await services.location.getLocationSuggestions(
        debouncedQuery,
        around,
        restrictToType
      );
      if (!isSubscribed) {
        return;
      }
      if (newSuggestions) {
        setSuggestions(newSuggestions);
      }
      setLoading(false);
    };
    void performSearch();

    return () => {
      isSubscribed = false;
    };
  }, [
    debouncedQuery,
    setSuggestions,
    setLoading,
    services,
    around,
    restrictToType,
  ]);

  return { suggestions, loading };
};

export default useLocationAutocomplete;
