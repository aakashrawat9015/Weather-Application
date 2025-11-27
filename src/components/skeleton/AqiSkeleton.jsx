import React from 'react';
import Card from '../card/Card';
import { Skeleton } from '../ui/skeleton';

const AqiSkeleton = () => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl ">
        <div className="flex flex-col items-center gap-2">
          {/* "Air Quality Index" label */}
          <Skeleton className="w-36 h-4" />
          
          {/* Large AQI number (text-7xl sm:text-8xl) */}
          <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg" />
          
          {/* Level text (text-lg) */}
          <Skeleton className="w-48 h-6 rounded-lg" />
        </div>
        
        {/* Warning box */}
        <div className="mt-4 w-full max-w-md">
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
        
        {/* Description */}
        <Skeleton className="mt-3 w-72 h-3 rounded" />
      </div>
    </Card>
  );
};

export default AqiSkeleton;

