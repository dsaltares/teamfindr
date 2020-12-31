import currencyCodes from 'currency-codes';
import useCurrentLocation from './useCurrentLocation';

const DEFAULT_CURRENCY = 'EUR';

const useCurrencyFromCurrentLocation = () => {
  const { location } = useCurrentLocation();
  if (!location) {
    return DEFAULT_CURRENCY;
  }

  const country = location.country;
  const countryData = currencyCodes.country(country.toLowerCase());
  if (countryData.length === 0) {
    return DEFAULT_CURRENCY;
  }

  return countryData[0].code;
};

export default useCurrencyFromCurrentLocation;
