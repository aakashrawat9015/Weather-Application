export const fetchAQIData = async ({ lat, lon }) => {
  const API_KEY = import.meta.env.VITE_WAQI_API_KEY;
  if (!API_KEY) throw new Error("Missing WAQI API key");

  const response = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`
  );

  if (!response.ok) throw new Error("Failed to fetch air quality data");

  const res = await response.json();

  if (res.status === "error") {
    throw new Error(`API Error: ${res.data}`);
  }

  console.log("WAQI Output:", JSON.stringify(res, null, 2));
  return res;
};