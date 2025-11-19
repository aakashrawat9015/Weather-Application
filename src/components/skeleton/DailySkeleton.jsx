import React from 'react';
import Card from '../card/Card';
import { Skeleton } from '../ui/skeleton';

const DailySkeleton = () => {
  // Simulate 7-day forecast placeholders
  const placeholderDays = Array.from({ length: 7 });

  return (
    <Card title="Daily Forecast">
      <div className="flex flex-col gap-4 text-white">
        {placeholderDays.map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center min-w-[100px] rounded-lg p-2 shadow-lg border border-gray-700/70"
          >
            {/* Left: Date Placeholder */}
            <div className="flex flex-col gap-1">
              <Skeleton className="w-24 h-4 rounded" />
            </div>

            {/* Right: Max/Min Placeholder */}
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="w-20 h-4 rounded" />
              <Skeleton className="w-28 h-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailySkeleton;