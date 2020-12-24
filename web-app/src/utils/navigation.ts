export const pathnameToNavigationValue = (pathname: string) => {
  const topNavigation = pathname.split('/')[1];
  return topNavigation === '' ? 'home' : topNavigation;
};

export const navigationValueToRoute = (value: string) =>
  value === 'home' ? '/' : `/${value}`;
