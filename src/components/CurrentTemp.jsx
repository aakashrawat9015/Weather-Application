import React, { useEffect, useState } from 'react'
import Card from './card/Card'
import WeatherIcon from './WeatherIcon/WeatherIcon';



const CurrentTemp = ({ data }) => {
  const title = "Current Weather";
  const [currentTemp, setCurrentTemp] = useState(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const updateTemp = () => {

      const timeZone = data?.timezone;
      const now = new Date().toLocaleString("en-CA", {
        timeZone: timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
      });

      const formatted = now.replace(", ", "T").slice(0, 13); // "YYYY-MM-DDTHH"
      const idx = data?.hourly?.time?.findIndex(t => t.startsWith(formatted));
      const temp = index !== -1 ? data?.hourly?.temperature_2m[idx] : "N/A";
      setCurrentTemp(temp);
      setIndex(idx);
      // console.log("abhi ka time :" + now);
      // console.log(formatted, index, temp);

    }

    updateTemp();  // Initial call to set temperature

    const interval = setInterval(updateTemp, 60 * 60 * 1000); // Update every hour
    return () => clearInterval(interval); // Cleanup 
  }, [data, index]);

  //  .............for current time display every minute.................................
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleDateString("en-CA", {
        timeZone: data?.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setLocalTime(now);
    };

    updateTime(); // initial
    const interval = setInterval(updateTime, 60 * 1000); // every minute
    return () => clearInterval(interval);
  }, [data?.timezone]);


  if (currentTemp === null) {
    return <div className="flex justify-center w-full text-white">Loading current temperature...</div>;
  }
  return (
    <Card title={title} maxWidth='max-w-xs' cardAlignment='ml-93'>
      <WeatherIcon code={data?.current?.weather_code} isDay={data?.current?.is_day} size='6xl' />
      <div className="flex flex-col items-center w-full text-white" >
        {/* <p className="text-6xl font-bold">{(currentTemp)}°C</p> */}
        <p className="text-6xl font-bold">{Math.round(data?.current?.temperature_2m)}°C</p>
        <p>{localTime}</p>
        <p>{data.current.relative_humidity_2m}% Humidity</p>
        <p>{data.current.wind_speed_10m}km/h wind</p>
      </div >
    </Card>
  )
}

export default CurrentTemp