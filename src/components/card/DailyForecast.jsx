import React from 'react';
import Card from './Card';
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWeatherData } from '../api/api.js';

const DailyForecast = ({ coords, title = "Daily Forecast" }) => {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return `${dayName}, ${dayDate}`;
  };

  return (
    <Card data={data} title={title}>
      <div className="flex flex-col divide-y divide-border">
        {data?.daily?.time?.map((date, index) => (
          <div
            key={date}
            className="flex flex-row justify-between items-center p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground"
          >
            {/* Date on the left */}
            <div className="flex-1 text-xs sm:text-sm md:text-base text-card-foreground">
              {formatDate(date)}
            </div>

            {/* Max/Min on the right */}
            <div className="flex flex-col text-right">
              <p className="text-xs sm:text-sm text-muted-foreground">Max / Min</p>
              <p className="text-sm sm:text-base md:text-lg font-semibold">
                {data.daily.temperature_2m_max[index]}°C / {data.daily.temperature_2m_min[index]}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;