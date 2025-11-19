import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

const Map = ({ lat, lon, onLocationChange }) => {
  const [markerPos, setMarkerPos] = useState([lat, lon]);
  const [zoom, setZoom] = useState(5);

  // Update marker when props change
  useEffect(() => {
    setMarkerPos([lat, lon]);
  }, [lat, lon]);

  function MapClick({ onLocationChange }) {
    const map = useMap();

    useEffect(() => {
      const handleClick = (e) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        setMarkerPos([clickLat, clickLng]);
        setZoom(map.getZoom());
        map.setView([clickLat, clickLng], map.getZoom());
        onLocationChange({ lat: clickLat, lon: clickLng });
        console.log('Clicked:', { lat: clickLat, lon: clickLng });
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
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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