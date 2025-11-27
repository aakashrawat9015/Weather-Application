import React from "react";
import Card from "../card/Card.jsx";

function convertPM2_5ToAQI(pm2_5) {
  const breakpoints = [
    { cLow: 0, cHigh: 30, iLow: 0, iHigh: 50 },
    { cLow: 31, cHigh: 60, iLow: 51, iHigh: 100 },
    { cLow: 61, cHigh: 90, iLow: 101, iHigh: 200 },
    { cLow: 91, cHigh: 120, iLow: 201, iHigh: 300 },
    { cLow: 121, cHigh: 250, iLow: 301, iHigh: 400 },
    { cLow: 251, cHigh: 500, iLow: 401, iHigh: 500 },
  ];
  for (const bp of breakpoints) {
    if (pm2_5 >= bp.cLow && pm2_5 <= bp.cHigh) {
      return Math.round(
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm2_5 - bp.cLow) + bp.iLow
      );
    }
  }
  return null;
}

// Get AQI warning and color based on AQI value 
function getAQIInfo(aqi) {
  if (aqi === null || aqi === undefined) {
    return {
      level: "Unknown",
      color: "text-gray-400",
      bgColor: "bg-gray-500/20",
      borderColor: "border-gray-400/30",
      warning: "⚠️ AQI data unavailable",
      description: "Unable to determine air quality",
    };
  }
  
  if (aqi <= 50) {
    return {
      level: "Good",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-400/30",
      warning: null,
      description: "Air quality is satisfactory",
    };
  } else if (aqi <= 100) {
    return {
      level: "Moderate",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-400/30",
      warning: "⚠️ Sensitive groups may experience minor issues",
      description: "Acceptable for most people",
    };
  } else if (aqi <= 150) {
    return {
      level: "Unhealthy for Sensitive Groups",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-400/30",
      warning: "⚠️ Sensitive groups should reduce outdoor activity",
      description: "Children, elderly, and people with heart/lung conditions may be affected",
    };
  } else if (aqi <= 200) {
    return {
      level: "Unhealthy",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-400/30",
      warning: "⚠️ Everyone may begin to experience health effects",
      description: "Sensitive groups should avoid prolonged outdoor activity",
    };
  } else if (aqi <= 300) {
    return {
      level: "Very Unhealthy",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-400/30",
      warning: "⚠️ Health alert: Everyone may experience more serious effects",
      description: "Avoid outdoor activities, especially if you have respiratory issues",
    };
  } else {
    return {
      level: "Hazardous",
      color: "text-red-600",
      bgColor: "bg-red-700/30",
      borderColor: "border-red-600/30",
      warning: "⚠️ HEALTH WARNING: Everyone should avoid all outdoor activity",
      description: "Emergency conditions. The entire population is likely to be affected",
    };
  }
}

const AqiInfo = ({ aqiData }) => {
  let currentAQI = null; // ✅ declare outside so JSX can always access it

  // First, try to use the direct US AQI from current data (most accurate)
  if (aqiData?.current?.us_aqi !== undefined && aqiData?.current?.us_aqi !== null) {
    currentAQI = aqiData.current.us_aqi;
  } 
  // Fallback to calculating from hourly PM2.5 data if current.us_aqi is not available
  else if (aqiData?.hourly?.time && aqiData?.hourly?.pm2_5) {
    const now = new Date();

    // Round current time down to nearest UTC hour
    const currentHour = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours()
      )
    );

    const currentHourStr = currentHour.toISOString().slice(0, 13) + ":00";

    const index = aqiData.hourly.time.findIndex((t) => t === currentHourStr);

    if (index !== -1) {
      const currentPM2_5 = aqiData.hourly.pm2_5[index];
      currentAQI = convertPM2_5ToAQI(currentPM2_5);
    }
  }

  // If we still don't have AQI, show unavailable message
  if (currentAQI === null) {
    const aqiInfo = getAQIInfo(null);
    return (
      <Card className={`${aqiInfo.bgColor}`}>
        <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Air Quality Index</p>
            <div className={`text-6xl sm:text-7xl md:text-8xl font-bold ${aqiInfo.color}`}>
              —
            </div>
            <p className={`text-base sm:text-lg font-semibold ${aqiInfo.color} text-center px-2`}>
              {aqiInfo.level}
            </p>
          </div>
          {aqiInfo.warning && (
            <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full max-w-md">
              <p className="text-xs sm:text-sm font-semibold text-yellow-400 text-center">
                {aqiInfo.warning}
              </p>
            </div>
          )}
          <p className="mt-2 sm:mt-3 text-xs text-muted-foreground text-center max-w-md px-2">
            {aqiInfo.description}
          </p>
        </div>
      </Card>
    );
  }

  const aqiInfo = getAQIInfo(currentAQI);

  return (
      <Card className={`${aqiInfo.bgColor} border-2 ${aqiInfo.borderColor}`}>
      <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">Air Quality Index</p>
          <div className={`text-6xl sm:text-7xl md:text-8xl font-bold ${aqiInfo.color}`}>
            {currentAQI !== null ? currentAQI : "—"}
          </div>
          <p className={`text-base sm:text-lg font-semibold ${aqiInfo.color} text-center px-2`}>
            {aqiInfo.level}
          </p>
        </div>

        {/* Warning */}
        {aqiInfo.warning && (
          <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full max-w-md">
            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-yellow-400 text-center">
              {aqiInfo.warning}
            </p>
          </div>
        )}

        {/* Description */}
          <p className="mt-2 sm:mt-3 text-xs text-muted-foreground text-center max-w-md px-2">
          {aqiInfo.description}
        </p>
      </div>
    </Card>
  );
};

export default AqiInfo;