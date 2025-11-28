import React from "react";
import Card from "./Card";
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
  LabelList,
} from "recharts";
import { useTheme } from "../../contexts/ThemeContext"; // import your theme context

const HourlyTempChart = ({ coords }) => {
  const { theme } = useTheme(); // get current theme
  const isDark = theme === "dark";

  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords.lat, coords.lon],
    queryFn: () => fetchWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  // if (!data?.hourly?.time) {
  //   return (
  //     <Card title={title}>
  //       <div className="text-card-foreground text-center p-4">
  //         Loading hourly forecast...
  //       </div>
  //     </Card>
  //   );
  // }

  const times = data.hourly.time;
  const temps = data.hourly.temperature_2m;
  const startIndex = 0;
  const endIndex = Math.min(startIndex + 24, times.length);
  const sliceTimes = times.slice(startIndex, endIndex);

  // Build chart data with 2-hour interval
  const chartData = sliceTimes
    .map((date, i) => {
      const idx = startIndex + i;
      return {
        time: date.slice(11, 16), // HH:mm
        temp: temps[idx],
      };
    })
    .filter((_, i) => i % 2 === 0);

  // Dynamic text color based on theme
  const textColor = isDark ? "#ffffff" : "#4b5563"; // white for dark, gray-700 for light

  return (
    <Card data={data}>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis dataKey="time" stroke={textColor} tick={{ fill: textColor, fontSize: 10 }} />
            <YAxis unit="°C" stroke={textColor} tick={{ fill: textColor, fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                background: isDark ? "rgba(30, 30, 30, 0.9)" : "rgba(255, 255, 255, 0.9)",
                color: textColor,
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
              formatter={(value) => [`${value}°C`]}
              labelFormatter={(label) => `${label}`}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              fill="#bfdbfe"
              name="Temperature"
            >
              {/* Show temperature labels above each point */}
              <LabelList
                dataKey="temp"
                position="top"
                formatter={(val) => `${val}°C`}
                fill={textColor}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HourlyTempChart;