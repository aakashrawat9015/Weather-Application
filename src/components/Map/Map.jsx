import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';



const Map = ({ lat, lon, onLocationChange }) => {
  const API_KEY = import.meta.env.VITE_MAP_API_KEY;
  const [markerPos, setMarkerPos] = useState([lat, lon]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    setMarkerPos([lat, lon]);
  }, [lat, lon]);

  function MapClick({ onLocationChange }) {
    const map = useMap();

    useEffect(() => {
      const reverseGeocode = async (lat, lon) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
          );
          const data = await response.json();
          const rawName = data?.address || 'Unknown location';
          return extractLocationName(rawName);
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          return 'Unknown location';
        }
      };

      function extractLocationName(address) {
        const town =
          address.town ||
          address.village ||
          address.hamlet ||
          address.city ||
          address.county ||
          'Unknown';

        const state = address.state || address.state_district || 'Unknown';
        const country = address.country || 'Unknown';

        return `${town}, ${state}, ${country}`;
      }

      const handleClick = async (e) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        setMarkerPos([clickLat, clickLng]);
        setZoom(map.getZoom());
        map.setView([clickLat, clickLng], map.getZoom());

        const locationName = await reverseGeocode(clickLat, clickLng);
        onLocationChange({ lat: clickLat, lon: clickLng, name: locationName });
      };

      map.on('click', handleClick);
      return () => map.off('click', handleClick);
    }, [map, onLocationChange]);

    return null;
  }

  return (
    <MapContainer
      key={`${lat}-${lon}`}
      center={[lat, lon]}
      zoom={zoom}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors'
        url={`https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${API_KEY}`}
      />
      <MapClick onLocationChange={onLocationChange} />
      <Marker position={markerPos}>
        <Popup>
          Weather location: {markerPos[0].toFixed(4)}, {markerPos[1].toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;