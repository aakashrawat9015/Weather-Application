import React, { useEffect, useState } from 'react'
import Card from './Card'
import InfoCard from './InfoCard.jsx';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWeatherData } from '../api/api.js';
import { fetchAQIData } from '../api/AqiData.js';

const CurrentTemp = ({ coords, locationName }) => {
  const title = "Current Weather";
  const [time, setTime] = useState("");

  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  const { data: aqiData } = useSuspenseQuery({
    queryKey: ['aqi', coords.lat, coords.lon],
    queryFn: () => fetchAQIData({ lat: coords.lat, lon: coords.lon }),
  });

  // fetch AQI value form aqiData
  function convertPM2_5ToAQI(pm2_5) {
    const breakpoints = [
      { cLow: 0, cHigh: 30, iLow: 0, iHigh: 50 },
      { cLow: 31, cHigh: 60, iLow: 51, iHigh: 100 },
      { cLow: 61, cHigh: 90, iLow: 101, iHigh: 200 },
      { cLow: 91, cHigh: 120, iLow: 201, iHigh: 300 },
      { cLow: 121, cHigh: 250, iLow: 301, iHigh: 400 },
      { cLow: 251, cHigh: 500, iLow: 401, iHigh: 500 },
    ];

    for (const bp of breakpoints) {
      if (pm2_5 >= bp.cLow && pm2_5 <= bp.cHigh) {
        return Math.round(
          ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm2_5 - bp.cLow) + bp.iLow
        );
      }
    }

    return null;
  }

  function getAQICategory(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Satisfactory';
    if (aqi <= 200) return 'Moderate';
    if (aqi <= 300) return 'Poor';
    if (aqi <= 400) return 'Very Poor';
    return 'Severe';
  }


  const getCurrentPM2_5 = (aqiData) => {
    if (!aqiData?.hourly?.time || !aqiData?.hourly?.pm2_5) return null;

    const now = new Date();
    const currentHour = now.toISOString().slice(0, 13); // e.g., "2025-11-20T13"
    const index = aqiData.hourly.time.findIndex(t => t.startsWith(currentHour));

    if (index === -1) return null;

    return aqiData.hourly.pm2_5[index];
  };

  const currentPM2_5 = getCurrentPM2_5(aqiData);
  const currentAQI = currentPM2_5 !== null ? convertPM2_5ToAQI(currentPM2_5) : null;
  const aqiCategory = currentAQI !== null ? getAQICategory(currentAQI) : null;

  console.log(currentAQI);



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
          {locationName || coords.name || 'Unknown Location'}
        </p>
      </div>


      {/* Main content split into two sides */}
      <div className="flex flex-row justify-between items-start gap-6">
        {/* Left side: Weather icon + Temperature + Time */}
        <div className="flex flex-col items-center">
          <WeatherIcon
            code={data?.current?.weather_code}
            isDay={data?.current?.is_day}
            size="6xl"
          />
          <p className="text-6xl text-blue-200 font-bold">
            {typeof data?.current?.temperature_2m === 'number'
              ? Math.round(data.current.temperature_2m)
              : 'N/A'}°C
          </p>
          {/* Time directly below temperature */}
          <p className="text-sm text-gray-300 mt-2">{time}</p>
        </div>

        {/* Right side: Info cards */}
        <div className="grid grid-cols-2 gap-3">
          {currentAQI !== null ? (
            <InfoCard label="AQI" value={currentAQI} />
          ) : (
            <InfoCard label="AQI" value={null} />
          )}
          <InfoCard label="Humidity" value={data?.current?.relative_humidity_2m} unit="%" />
          <InfoCard label="Wind" value={data?.current?.wind_speed_10m} unit=" km/h" />
          {/* You can add more InfoCards here if needed */}
        </div>
      </div>
    </Card>
  )
}

export default CurrentTemp