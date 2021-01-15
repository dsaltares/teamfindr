const getEventUrl = (eventId: string) =>
  `${window.location.protocol}//${window.location.host}/#/events/${eventId}`;

export default getEventUrl;
