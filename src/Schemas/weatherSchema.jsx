import React from 'react';

// Assuming the JSON data you provided is passed as a prop called 'weatherData'
const WeatherDataDisplay = ({ weatherData }) => {
  // Check if data is available before rendering
  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const {
    timezone,
    elevation,
    hourly,
    daily,
    hourly_units,
    daily_units,
  } = weatherData;

  // --- Functions to extract key data points ---

  // Get today's max/min temps and sunrise/sunset
  const getDailySummary = () => {
    const todayIndex = 0;
    return {
      maxTemp: daily.temperature_2m_max[todayIndex],
      minTemp: daily.temperature_2m_min[todayIndex],
      sunrise: daily.sunrise[todayIndex].split('T')[1], // Just the time part
      sunset: daily.sunset[todayIndex].split('T')[1], // Just the time part
    };
  };

  // Get the current (first hourly entry) data
  const getCurrentConditions = () => {
    return {
      time: hourly.time[0].split('T')[1],
      temp: hourly.temperature_2m[0],
      humidity: hourly.relative_humidity_2m[0],
      wind: hourly.wind_speed_10m[0],
    };
  };

  const current = getCurrentConditions();
  const dailySummary = getDailySummary();

  // --- JSX Rendering ---

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <p className="location-info">
        Timezone: **{timezone}** (Elevation: **{elevation}m**)
      </p>

      {/* --- Current Conditions Section --- */}
      <div className="current-conditions">
        <h2>🌞 Current Conditions (as of {current.time})</h2>
        <div className="data-grid">
          <p>
            **Temperature:** {current.temp} {hourly_units.temperature_2m}
          </p>
          <p>
            **Humidity:** {current.humidity} {hourly_units.relative_humidity_2m}
          </p>
          <p>
            **Wind Speed:** {current.wind} {hourly_units.wind_speed_10m}
          </p>
        </div>
      </div>

      <hr />

      {/* --- Daily Summary Section --- */}
      <div className="daily-summary">
        <h2>🗓️ Today's Summary</h2>
        <div className="data-grid">
          <p>
            **High:** {dailySummary.maxTemp} {daily_units.temperature_2m_max}
          </p>
          <p>
            **Low:** {dailySummary.minTemp} {daily_units.temperature_2m_min}
          </p>
          <p>
            **Sunrise:** {dailySummary.sunrise}
          </p>
          <p>
            **Sunset:** {dailySummary.sunset}
          </p>
        </div>
      </div>

      <hr />

      {/* --- 7-Day Forecast (Max Temps) --- */}
      <div className="forecast-list">
        <h2>7-Day High Temperature Forecast</h2>
        <ul>
          {daily.time.map((dateString, index) => (
            <li key={dateString}>
              **{new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}**:
              {' '}
              {daily.temperature_2m_max[index]} {daily_units.temperature_2m_max}
            </li>
          ))}
        </ul>
      </div>

      {/* NOTE: You would typically render a more detailed view of the 
          'hourly' data in a chart or a dedicated table, but this is 
          a simplified view. */}
    </div>
  );
};

export default WeatherDataDisplay;

// // --- Example usage in another component ---
// // import weatherJson from './weatherData.json'; // Assume the data is imported
// // <WeatherDataDisplay weatherData={weatherJson} />