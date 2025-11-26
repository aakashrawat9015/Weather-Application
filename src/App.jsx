import { Suspense, useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Map from './components/Map/Map.jsx';
import WeatherContent from './WeatherContent.jsx';

function App() {
  const [coords, setCoords, name] = useState(
    {
      lat: 28.644800,
      lon: 77.216721,
      name: 'New Delhi, India'
    });

  const handleLocationChange = ({ lat, lon, name }) => {
    setCoords({ lat, lon, name });
  };



  return (
    <>
      <Navbar onSelectLocation={handleLocationChange} />
  

      <div className='pt-20'>
        <div className="rounded-xl shadow-lg overflow-hidden flex justify-center mt-4 mx-auto z-0" style={{ maxWidth: '769px' }}>
          <Map lat={coords.lat} lon={coords.lon} onLocationChange={handleLocationChange} />
        </div>

        <WeatherContent key={`${coords.lat}-${coords.lon}`} coords={coords} />
      </div>

    </>
  );
}
export default App;