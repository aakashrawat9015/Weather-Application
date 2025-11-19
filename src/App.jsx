import { Suspense, useState } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import Map from './components/Map/Map.jsx';
import WeatherContent from './WeatherContent.jsx';
import CurrentSkeleton from './components/skeleton/CurrentSkeleton.jsx';
function App() {
  const [coords, setCoords] = useState({ lat: 28.644800, lon: 77.216721 });

  return (
    <>
      <Navbar onSelectLocation={setCoords} />

      <div className="rounded-xl shadow-lg overflow-hidden border border-gray-700 flex justify-center mt-4 mx-auto" style={{ maxWidth: '800px' }}>
        <Map lat={coords.lat} lon={coords.lon} onLocationChange={setCoords} />
      </div>

      <WeatherContent key={`${coords.lat}-${coords.lon}`} coords={coords} />

    </>
  );
}
export default App;