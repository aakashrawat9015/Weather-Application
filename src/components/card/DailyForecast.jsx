import React from 'react';
import Card from './Card';

const DailyForecast = ({ data, title = "Daily Forecast", scrollDirection = "vertical" }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., Mon
    const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., 18 Nov
    return `${dayName}, ${dayDate}`;
  };

  return (
    <Card data={data} title={title} scrollDirection={scrollDirection}>
      <div className='flex flex-col gap-4 text-white'>
        {data?.daily?.time?.map((date, index) => (
          <div key={date} className='flex justify-between items-center min-w-[100px] rounded-lg p-2 shadow-lg border border-gray-700/70'>
            <div className='text-sm text-gray-100'>
              {formatDate(date)}
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-100'>Max / Min</p>
              <p>{data.daily.temperature_2m_max[index]}°C / {data.daily.temperature_2m_min[index]}°C</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;