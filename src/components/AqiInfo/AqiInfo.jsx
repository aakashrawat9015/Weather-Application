import React from "react";
import Card from "../card/Card.jsx";

const EPA_BREAKPOINTS = [
  {
    iLow: 0,
    iHigh: 50,
    category: "Good",
    color: "bg-green-500/30 backdrop-blur-md",
    message: "Air quality is satisfactory and poses little or no risk.",
    emoji: "🌱"
  },

  {
    iLow: 51,
    iHigh: 100,
    category: "Moderate",
    color: "bg-yellow-400/30 backdrop-blur-md",
    message: "Air quality is acceptable; some pollutants may be a concern for sensitive groups.",
    emoji: "🙂"
  },
  {
    iLow: 101,
    iHigh: 150,
    category: "Unhealthy for Sensitive Groups",
    color: "bg-orange-400/30 backdrop-blur-md",
    message: "Sensitive groups may experience health effects.",
    emoji: "😷"
  },
  {
    iLow: 151,
    iHigh: 200,
    category: "Unhealthy",
    color: "bg-red-500/30 backdrop-blur-md",
    message: "Everyone may begin to experience health effects; sensitive groups may experience more serious effects.",
    emoji: "⚠️"
  },
  {
    iLow: 201,
    iHigh: 300,
    category: "Very Unhealthy",
    color: "bg-purple-600/30 backdrop-blur-md",
    message: "Health alert: everyone may experience more serious health effects.",
    emoji: "☠️"
  },
  {
    iLow: 301,
    iHigh: 500,
    category: "Hazardous",
    color: "bg-pink-700/30 backdrop-blur-md",
    message: "Emergency conditions: entire population is likely to be affected.",
    emoji: "🚨"
  },
];

function getCategory(aqi) {
  if (aqi == null) return {
    category: "No Data",
    color: "bg-gray-400/30 backdrop-blur-md",
    message: "No AQI data available.",
    emoji: "❔"
  };

  for (let bp of EPA_BREAKPOINTS) {
    if (aqi >= bp.iLow && aqi <= bp.iHigh) return bp;
  }
  return {
    category: "Out of Range",
    color: "bg-gray-600/30 backdrop-blur-md",
    message: "AQI value is outside standard range.",
    emoji: "❔"
  };
}

const AqiInfo = ({ aqiData }) => {
  const aqi = aqiData?.data?.aqi ?? null;
  const cityName = aqiData?.data?.city?.name ?? "Unknown Location";
  const pollutants = aqiData?.data?.iaqi ?? {};
  const { category, color, message, emoji } = getCategory(aqi);

  return (
    // <div className="w-full flex justify-center">
    <Card
      className={`w-full min-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-2xl p-6 text-white flex flex-col items-center justify-center text-center ${color} rounded-4xl`}
    >
      {/* AQI Number */}
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide flex items-center justify-center gap-2">
        {aqi ?? "—"} <span className="text-2xl sm:text-3xl">{emoji}</span>
      </div>
      <div className="text-base sm:text-lg lg:text-xl font-semibold mt-1">{category}</div>

      {/* Health Advisory */}
      <div className="text-xs sm:text-sm lg:text-base mt-2 italic opacity-90 max-w-md mx-auto">
        {message}
      </div>

      {/* Location */}
      <div className="text-xs sm:text-sm mt-3 opacity-90 mx-auto">
        Monitoring Location: 📍 {cityName}
      </div>

      {/* Divider */}
      <div className="w-full my-4" aria-hidden="true">
        <hr className="border-t border-white/20" />
      </div>

      {/* Pollutant Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm w-full max-w-md mx-auto">
        <div className="flex justify-between"><span>PM2.5</span><span>{pollutants.pm25?.v ?? "—"} µg/m³</span></div>
        <div className="flex justify-between"><span>PM10</span><span>{pollutants.pm10?.v ?? "—"} µg/m³</span></div>
        <div className="flex justify-between"><span>NO₂</span><span>{pollutants.no2?.v ?? "—"} µg/m³</span></div>
        <div className="flex justify-between"><span>O₃</span><span>{pollutants.o3?.v ?? "—"} µg/m³</span></div>
        <div className="flex justify-between"><span>SO₂</span><span>{pollutants.so2?.v ?? "—"} µg/m³</span></div>
        <div className="flex justify-between"><span>CO</span><span>{pollutants.co?.v ?? "—"} µg/m³</span></div>
      </div>
      {/* Disclaimer */}
      <p className="mt-3 text-[10px] sm:text-xs text-gray-400 text-center">
        All air quality data is provided by WAQI (World Air Quality Index).
      </p>

    </Card>
    // </div>
  );
};

export default AqiInfo;