import React from 'react';
import Card from './Card';
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWeatherData } from '../api/api.js';
import HourlyTempChart from './HourlyTempChart.jsx';
// import { fetchAQIData } from '../api/AqiData.js';

const HourlyForecast = ({ coords, title = "Hourly Forecast" }) => {

  const { data } = useSuspenseQuery({
      queryKey: ['weather', coords.lat, coords.lon],
      queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
    });

    // const { data: aqiData } = useSuspenseQuery({
    //   queryKey: ['aqi', coords.lat, coords.lon],
    //   queryFn: () => fetchAQIData({ lat: coords.lat, lon: coords.lon }),
    // });
  if (!data?.hourly?.time) {
    return (
      <Card title={title}>
        <div className="text-card-foreground text-center p-4">Loading hourly forecast...</div>
      </Card>
    );
  }

  const times = data.hourly.time;
  const timezone = data.timezone;

  let startIndex = 0;
  const now = new Date().toLocaleString('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  });

  // const formatted = now.slice(0, 10);
  // const idx = times.findIndex(t => t.startsWith(formatted));

  // console.log(formatted);

  const endIndex = Math.min(startIndex + 24, times.length);
  const sliceTimes = times.slice(startIndex, endIndex);

  return (
    <Card data={data} title={title}>
      <HourlyTempChart coords={coords} title={title} />
      
      <div className="text-card-foreground overflow-x-auto minimal-scrollbar">
        <div className="flex gap-4 px-2 py-2 min-w-max">
          {sliceTimes.map((date, i) => {
            const idx = startIndex + i;
            return (
              <div
                key={date}
                className="min-w-[100px] sm:min-w-[120px] rounded-lg p-2 sm:p-3 text-center shadow-lg border border-border hover:bg-accent hover:text-accent-foreground"
              >
                <p className="text-xs sm:text-sm font-medium"><span>{date.slice(11, 16)}</span></p>
                <p className="text-base sm:text-lg font-bold"><span className='text-card-foreground'>{data.hourly.temperature_2m[idx]}°C</span></p>
                <p className="text-xs">{data.hourly.relative_humidity_2m[idx]}% Humidity</p>
                <p className="text-xs">{data.hourly.wind_speed_10m[idx]} km/h Wind</p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default HourlyForecast;
