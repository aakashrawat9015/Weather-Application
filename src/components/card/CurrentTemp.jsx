import React, { useEffect, useState } from 'react'
import Card from './Card'
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const CurrentTemp = ({ data }) => {
  const title = "Current Weather";
  const [time, setTime] = useState("");

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
        setTime(timeStr);
      } catch (e) {
        console.log(e);
        setTime("");
      }
    };

    updateTime(); // Call immediately on mount
    const interval = setInterval(updateTime, 1000 * 60); // Update every 1 minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [data?.timezone]);

  return (
    <Card title={title}>
      <WeatherIcon code={data?.current?.weather_code} isDay={data?.current?.is_day} size='6xl' />
      <div className="flex flex-col items-center w-full text-white" >
        <p className="text-6xl text-[#00FFFF] font-bold">{typeof data?.current?.temperature_2m === 'number' ? Math.round(data.current.temperature_2m) : 'N/A'}°C</p>
        <p>{time}</p>
        <p>{data?.current?.relative_humidity_2m ?? 'N/A'}% Humidity</p>
        <p>{data?.current?.wind_speed_10m ?? 'N/A'} km/h wind</p>
      </div >
    </Card>
  )
}

export default CurrentTemp