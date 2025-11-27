export const fetchAQIData = async ({ lat, lon }) => {
  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,us_aqi&current=us_aqi&timezone=auto`
  );
  if (!response.ok) throw new Error("Failed to fetch air quality data");
  const res = await response.json();

  // Pretty log the full JSON output
  console.log(JSON.stringify(res, null, 2));

  return res;
};