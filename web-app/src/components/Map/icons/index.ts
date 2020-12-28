import L from 'leaflet';

export const Marker = L.icon({
  iconUrl: '/icons/marker.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 60],
  popupAnchor: [0, -20],
});

export const Pin = L.icon({
  iconUrl: '/icons/pin.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 60],
  popupAnchor: [0, -15],
});
