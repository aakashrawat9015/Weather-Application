
export const fetchAQIData = async ({ lat, lon }) => {
  const API_KEY = import.meta.env.VITE_WAQI_API_KEY;
  const response = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch air quality data");
  const res = await response.json();

  // Pretty log the full JSON output
  console.log(JSON.stringify(res, null, 2));

  return res;
};