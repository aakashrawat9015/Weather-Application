import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

const Map = ({ lat, lon, onLocationChange }) => {
  const [markerPos, setMarkerPos] = useState([lat, lon]);
  const [zoom, setZoom] = useState(5); // Initial zoom level

  function MapClick({onLocationChange}) {
    const map = useMap();

    useEffect(() => {
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPos([lat, lng]); // Update marker position
        setZoom(map.getZoom());   // Save current zoom level
        map.setView([lat, lng], map.getZoom()); // Preserve zoom
        onLocationChange({ lat, lon: lng }); 
      });

      return () => {
        map.off('click'); // Clean up listener on unmount
      };
    }, [map, onLocationChange]);

    return null;
  }

  return (
    <MapContainer center={markerPos} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClick  onLocationChange={onLocationChange}/>
      <Marker position={markerPos}>
        <Popup>
          Weather location: {markerPos[0].toFixed(4)}, {markerPos[1].toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;