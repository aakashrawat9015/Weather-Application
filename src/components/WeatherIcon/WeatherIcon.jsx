import 'weather-icons/css/weather-icons.css';
// import 'weather-icons/css/weather-icons-wind.css';

const getWeatherIconClass = (code, isDay) => {
  const map = {
    0: isDay ? 'wi-day-sunny' : 'wi-night-clear',
    1: isDay ? 'wi-day-sunny' : 'wi-night-clear',
    2: isDay ? 'wi-day-cloudy' : 'wi-night-alt-cloudy',
    3: 'wi-cloudy',
    45: 'wi-fog',
    51: 'wi-sprinkle',
    61: 'wi-rain',
    71: 'wi-snow',
    95: 'wi-thunderstorm',
  };
  return map[code] || 'wi-na';
};

const WeatherIcon = ({ code, isDay = true, size = '3xl', color = 'text-blue-300' }) => {
  const iconClass = getWeatherIconClass(code, isDay);

  return (
    <i className={`wi ${iconClass} text-${size} ${color}`}></i>
  );
};

export default WeatherIcon;