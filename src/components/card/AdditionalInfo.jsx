// AdditionalInfo.jsx
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAQIData } from "../api/AqiData.js";
import { fetchWeatherData } from "../api/api.js";
import InfoCard from "../card/InfoCard.jsx";
import AqiInfo from "../AqiInfo/AqiInfo.jsx";
import Card from "../card/Card.jsx";

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

  console.log("AQI Data:", aqiData.hourly.pm2_5);
  console.log("Times:", aqiData.hourly.time);
  return (
    <Card>
      <div className="flex flex-row gap-4 mt-4">
        {/* AQI */}
        <AqiInfo aqiData={aqiData} />


        {/* Humidity */}
        <InfoCard label="Humidity" value={weatherData?.current?.relative_humidity_2m} unit="%" />

        {/* Wind */}
        <InfoCard label="Wind"
          value={weatherData?.current?.wind_speed_10m} unit="km/h"
        />
      </div>
    </Card>
  );
};

export default AdditionalInfo;