import React from 'react';
import Card from './Card';
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWeatherData } from '../api/api.js';
// import { fetchAQIData } from '../api/AqiData.js';

const DailyForecast = ({ coords, title = "Daily Forecast", scrollDirection = "horizontal" }) => {

  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  // const { data: aqiData } = useSuspenseQuery({
  //   queryKey: ['aqi', coords.lat, coords.lon],
  //   queryFn: () => fetchAQIData({ lat: coords.lat, lon: coords.lon }),
  // });
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., Mon
    const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., 18 Nov
    return `${dayName}, ${dayDate}`;
  };

  return (
    <Card data={data} title={title} scrollDirection={scrollDirection}>
      <div className='flex flex-col gap-3 sm:gap-4 text-card-foreground'>
        {data?.daily?.time?.map((date, index) => (
          <div key={date} className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 rounded-lg p-3 sm:p-4 shadow-lg border border-border hover:bg-accent hover:text-accent-foreground'>
            <div className='text-xs sm:text-sm text-card-foreground'>
              {formatDate(date)}
            </div>
            <div className='text-left sm:text-right'>
              <p className='text-xs sm:text-sm text-muted-foreground'>Max / Min</p>
              <p className='text-sm sm:text-base font-semibold'>{data.daily.temperature_2m_max[index]}°C / {data.daily.temperature_2m_min[index]}°C</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;