import React from "react";
import InfoCard from "../card/InfoCard.jsx";

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

const AqiInfo = ({ aqiData }) => {
  let warning = null;
  let currentAQI = null; // ✅ declare outside so JSX can always access it

  if (!aqiData?.hourly?.time || !aqiData?.hourly?.pm2_5) {
    warning = "⚠️ AQI data unavailable.";
    return <InfoCard label="AQI" value={null} color="text-yellow-400" />;
  }

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

  if (index === -1) {
    warning = `⚠️ No AQI data for current hour (${currentHourStr}).`;
  } else {
    const currentPM2_5 = aqiData.hourly.pm2_5[index];
    currentAQI = convertPM2_5ToAQI(currentPM2_5);

    if (currentAQI >= 200) {
      warning = "⚠️ Hazardous.";
    } else if (currentAQI >= 100) {
      warning = "⚠️ Moderate.";
    }
  }

  return (
    <div className="flex flex-col items-center">
      <InfoCard label="AQI" value={currentAQI}>
        {warning && (
          <p className="mt-1 text-xs text-yellow-400 font-semibold">{warning}</p>
        )}
      </InfoCard>
    </div>
  );
};

export default AqiInfo;