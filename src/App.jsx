import { useQuery } from "@tanstack/react-query"
import { fetchWeatherData } from "./components/api.js"
import Card from "./components/card/Card.jsx"
import DailyForecast from "./components/card/DailyForecast.jsx"
import HourlyForecast from "./components/card/HourlyForecast.jsx"
import CurrentTemp from "./components/CurrentTemp.jsx"
import Navbar from "./components/Navbar/Navbar.jsx"
import Map from "./components/Map/Map.jsx"
import { useState } from "react"


function App() {
  const [coords, setCoords] = useState({ lat: 28.644800, lon: 77.216721 }); // Default to Delhi, India
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
    keepPreviousData: true, // ✅ Keeps old data during refetch
  });

  if (isLoading) return <div className="text-white text-center mt-10">Loading weather data...</div>
  if (isError) return <div className="text-red-500 text-center mt-10">Error: {error?.message}</div>
  if (!data) return <div className="text-white text-center mt-10">No data available</div>
  return (
    <>
      <Navbar onSelectLocation={setCoords}/>

      <div className="rounded-xl shadow-lg overflow-hidden border border-gray-700 flex justify-center mt-4 mx-auto" style={{ maxWidth: '800px' }}>
        <Map lat={coords.lat} lon={coords.lon} onLocationChange={setCoords} />
      </div>

      {isError && (
        <div className="text-red-500 text-center mt-10">Error: {error?.message}</div>
      )}

      {data ? (
        <>
          {isFetching && (
            <div className="text-white text-center mt-2 animate-pulse">Updating weather...</div>
          )}
          <CurrentTemp data={data} />
          <HourlyForecast data={data} />
          <DailyForecast data={data} />
          {/* <Card data={data} /> */}
        </>
      ) : (
        <div className="text-white text-center mt-10">No data available</div>
      )}
    </>
  );
}

export default App
