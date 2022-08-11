const Currencies = ['EUR', 'RON', 'GBP', 'USD'];

type CurrencyFlagDict = Record<string, string>;
export const CurrencyFlags: CurrencyFlagDict = {
  EUR: '🇪🇺',
  RON: '🇷🇴',
  GBP: '🇬🇧',
  USD: '🇺🇸',
};

export default Currencies;
