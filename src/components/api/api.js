export const fetchWeatherData = async ({ lat, lon }) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/dwd-icon?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto`
  );
  if (!response.ok) throw new Error("Failed to fetch weather data");;
  
  const res= await response.json();
  console.log(res);
  return res;
  
};