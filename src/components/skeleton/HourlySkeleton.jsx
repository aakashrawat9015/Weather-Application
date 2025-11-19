import React from 'react';
import Card from '../card/Card';
import { Skeleton } from '../ui/skeleton';

const HourlySkeleton = ({ title = "Hourly Forecast" }) => {
  // Simulate 8 hourly blocks
  const placeholderHours = Array.from({ length: 8 });

  return (
    <Card title={title}>
      <div className="text-white overflow-x-auto minimal-scrollbar">
        <div className="flex gap-4 px-2 py-2 min-w-max">
          {placeholderHours.map((_, index) => (
            <div
              key={index}
              className="min-w-[120px] rounded-lg p-2 text-center shadow-lg border border-gray-700/60 bg-gray-800/30"
            >
              <Skeleton className="w-16 h-4 mx-auto mb-2 rounded" /> {/* Time */}
              <Skeleton className="w-20 h-6 mx-auto mb-1 rounded" /> {/* Temp */}
              <Skeleton className="w-24 h-3 mx-auto mb-1 rounded" /> {/* Humidity */}
              <Skeleton className="w-24 h-3 mx-auto rounded" /> {/* Wind */}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HourlySkeleton;