import { Suspense, useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Map from './components/Map/Map.jsx';
import WeatherContent from './WeatherContent.jsx';

function App() {
  const [coords, setCoords] = useState(
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
  

      <div className='pt-24 md:pt-20 px-4'>
        <div className="rounded-xl shadow-lg overflow-hidden flex justify-center mt-4 mx-auto z-0 max-w-full sm:max-w-2xl lg:max-w-3xl">
          <Map lat={coords.lat} lon={coords.lon} onLocationChange={handleLocationChange} />
        </div>

        <WeatherContent key={`${coords.lat}-${coords.lon}`} coords={coords} />
      </div>

    </>
  );
}
export default App;