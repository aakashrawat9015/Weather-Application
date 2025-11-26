import React, { useEffect, useState } from 'react'
import Card from './Card'
import InfoCard from './InfoCard.jsx';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWeatherData } from '../api/api.js';
import { fetchAQIData } from '../api/AqiData.js';
import AqiInfo from '../AqiInfo/AqiInfo.jsx';

const CurrentTemp = ({ coords, locationName }) => {
  const title = "Current Weather";
  const [time, setTime] = useState("");

  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  // const { data: aqiData } = useSuspenseQuery({
  //   queryKey: ['aqi', coords.lat, coords.lon],
  //   queryFn: () => fetchAQIData({ lat: coords.lat, lon: coords.lon }),
  // });


  // for updating time every minute according to timezone and for date formatting
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: data?.timezone
        });

        const dateStr = now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: data?.timezone
        });

        setTime(`${dateStr} | ${timeStr}`);
      }
      catch (e) {
        console.log(e);
        setTime("");
      }
    };

    updateTime(); // Call immediately on mount
    const interval = setInterval(updateTime, 1000 * 60); // Update every 1 minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [data?.timezone]);

  return (
    <Card>
      {/* Title row with title, location, and date */}
      <div className="flex items-center gap-10 mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm font-semibold text-gray-300">
          {locationName || coords.name || "Unknown Location"}
        </p>
      </div>

      {/* Main content centered */}
      <div className="flex flex-col items-center justify-center gap-4">
        <WeatherIcon
          code={data?.current?.weather_code}
          isDay={data?.current?.is_day}
          size="6xl"
        />
        <p className="text-6xl text-blue-200 font-bold">
          {typeof data?.current?.temperature_2m === "number"
            ? Math.round(data.current.temperature_2m)
            : "N/A"}
          °C
        </p>
        {/* Time directly below temperature */}
        <p className="text-sm text-gray-300">{time}</p>
      </div>
    </Card>
  );
};

  export default CurrentTemp