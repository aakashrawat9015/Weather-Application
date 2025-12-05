// AdditionalInfo.jsx
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAQIData } from "../api/AqiData.js";
import { fetchWeatherData } from "../api/api.js";
import AqiInfo from "../AqiInfo/AqiInfo.jsx";
import Card from "./Card.jsx";
import InfoCard from "./InfoCard.jsx";

const AdditionalInfo = ({ coords }) => {
  // Fetch AQI
  const { data: aqiData } = useSuspenseQuery({
    queryKey: ["aqi", coords.lat, coords.lon],
    queryFn: () => fetchAQIData({ lat: coords.lat, lon: coords.lon }),
  });

  // Fetch Weather
  const { data: weatherData } = useSuspenseQuery({
    queryKey: ["weather", coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  // Format time helper
  const formatTime = (timeString, timezone) => {
    if (!timeString) return "N/A";
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone || 'UTC'
      });
    } catch (e) {
      return "N/A";
    }
  };

  // Get today's sunrise and sunset (first item in daily arrays)
  const sunrise = weatherData?.daily?.sunrise?.[0];
  const sunset = weatherData?.daily?.sunset?.[0];
  const timezone = weatherData?.timezone;

  return (
    <>
      {/* Additional Info in one Card */}
      <Card>
        <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
          {/* Wind Speed */}
          <InfoCard
            label="Wind Speed"
            value={weatherData?.current?.wind_speed_10m !== null && weatherData?.current?.wind_speed_10m !== undefined
              ? Math.round(weatherData.current.wind_speed_10m)
              : null}
            unit=" km/h"
          />

          {/* Humidity */}
          <InfoCard
            label="Humidity"
            value={weatherData?.current?.relative_humidity_2m !== null && weatherData?.current?.relative_humidity_2m !== undefined
              ? weatherData.current.relative_humidity_2m
              : null}
            unit="%"
          />

          {/* Sunrise */}
          <InfoCard
            label="Sunrise"
            value={formatTime(sunrise, timezone)}
            color="text-yellow-400"
          />

          {/* Sunset */}
          <InfoCard
            label="Sunset"
            value={formatTime(sunset, timezone)}
            color="text-orange-400"
          />
        </div>
      </Card>


      {/* AQI */}
      <AqiInfo aqiData={aqiData} />

    </>
  );
};

export default AdditionalInfo;
