import React from 'react';
import Card from './Card';

const HourlyForecast = ({ data, title = "Hourly Forecast" }) => {
  if (!data?.hourly?.time) {
    return (
      <Card title={title}>
        <div className="text-white text-center p-4">Loading hourly forecast...</div>
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

  const formatted = now.slice(0, 10);
  // const idx = times.findIndex(t => t.startsWith(formatted));

  console.log(formatted);

  const endIndex = Math.min(startIndex + 24, times.length);
  const sliceTimes = times.slice(startIndex, endIndex);

  return (
    <Card data={data} title={title}>
      <div className="text-white overflow-x-auto minimal-scrollbar">
        <div className="flex gap-4 px-2 py-2 min-w-max">
          {sliceTimes.map((date, i) => {
            const idx = startIndex + i;
            return (
              <div
                key={date}
                className="min-w-[120px] rounded-lg p-2 text-center shadow-lg border border-gray-700/60 hover:bg-gray-700/20"
              >
                <p className="text-sm font-medium">{date.slice(11, 16)}</p>
                <p className="text-lg font-bold">{data.hourly.temperature_2m[idx]}°C</p>
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