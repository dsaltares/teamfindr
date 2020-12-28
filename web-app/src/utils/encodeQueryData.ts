const encodeQueryData = (data: any) => {
  const queryParts: string[] = Object.keys(data).reduce(
    (acc: string[], key: string): string[] => {
      const value = data[key];
      if (!key || !value) {
        return acc;
      }
      return [
        ...acc,
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      ];
    },
    []
  );
  return queryParts.join('&');
};

export default encodeQueryData;
