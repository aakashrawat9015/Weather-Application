import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../api/api.js";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import { useTheme } from "../../contexts/ThemeContext";

const HourlyTempChart = ({ coords }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  const times = data.hourly.time;
  const temps = data.hourly.temperature_2m;
  const sliceTimes = times.slice(0, 24);

  const chartData = sliceTimes
    .map((date, i) => {
      const raw = date.slice(11, 16); // HH:mm
      const formatted = raw.endsWith(":00") ? raw.slice(0, 2) : raw; // remove :00
      return {
        time: formatted,
        temp: temps[i],
      };
    })
    .filter((_, i) => i % 2 === 0); // 2-hour interval

  const textColor = isDark ? "#ffffff" : "#4b5563";

  // Responsive font sizes and tick density
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const tickFontSize = isMobile ? 8 : 12;
  const labelFontSize = isMobile ? 9 : 12;
  const xAxisInterval = isMobile ? 2 : 0; // skip ticks on mobile

  return (
    <div className="w-full h-64 sm:h-80 min-w-0 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }} // give space for Y-axis label
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
          <XAxis
            dataKey="time"
            stroke={textColor}
            tick={{ fill: textColor, fontSize: tickFontSize }}
            interval={xAxisInterval}
          >
            <Label
              value="Time (hours)"
              position="bottom"
              fill={textColor}
              style={{ fontSize: labelFontSize }}
            />
          </XAxis>
          <YAxis
            unit="°C"
            stroke={textColor}
            tick={{ fill: textColor, fontSize: tickFontSize }}
          >
            <Label
              value="Temperature (°C)"
              angle={-90}
              position="left"   // use "left" instead of "insideLeft"
              fill={textColor}
              style={{ fontSize: labelFontSize }}
            />
          </YAxis>
          <Tooltip
            // larger text for tooltip values and remove the time label
            contentStyle={{
              background: isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)",
              color: textColor,
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "8px 10px",
            }}
            itemStyle={{ color: textColor, fontSize: 16, fontWeight: 700 }}
            labelStyle={{ display: "none" }}
            // return empty name so series label doesn't show, and hide the time label
            formatter={(value) => [`${value}°C`]}
            labelFormatter={() => ""}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            fill="#bfdbfe"
            name="Temperature"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyTempChart;