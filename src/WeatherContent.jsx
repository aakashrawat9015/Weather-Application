import { useSuspenseQuery } from "@tanstack/react-query";
import CurrentTemp from "./components/card/CurrentTemp.jsx";
import HourlyForecast from "./components/card/HourlyForecast.jsx";
import DailyForecast from "./components/card/DailyForecast.jsx";
import { fetchWeatherData } from "./components/api/api.js";
import { fetchAQIData } from "./components/api/AqiData.js";
import { Suspense } from "react";
import DailySkeleton from "./components/skeleton/DailySkeleton.jsx";
import CurrentSkeleton from "./components/skeleton/CurrentSkeleton.jsx";
import HourlySkeleton from "./components/skeleton/HourlySkeleton.jsx";


function WeatherContent({ coords }) {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  const { data: aqiData } = useSuspenseQuery({
    queryKey: ['aqi', coords.lat, coords.lon],
    queryFn: () => fetchAQIData({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <>
      {isFetching && (
        <div className="text-white text-center mt-2 animate-pulse">Updating weather...</div>
      )}
      <Suspense fallback={<CurrentSkeleton />}>
        <CurrentTemp data={data} />
      </Suspense >
      <Suspense fallback={<HourlySkeleton />}>
        <HourlyForecast data={data} />
      </Suspense>
      <Suspense fallback={<DailySkeleton />}>
        <DailyForecast data={data} />
      </Suspense >

    </>
  );
}
export default WeatherContent;