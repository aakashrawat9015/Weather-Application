import React from 'react'
import Card from '../card/Card'
import { Skeleton } from '../ui/skeleton';

const CurrentSkeleton = () => {
  return (
    <Card>
      {/* Title row with title and location */}
      <div className="flex items-center gap-10 mb-4">
        <Skeleton className="w-36 h-7" /> {/* "Current Weather" title */}
        <Skeleton className="w-32 h-5" /> {/* Location name */}
      </div>

      {/* Main content centered */}
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Weather Icon - large circular skeleton */}
        <Skeleton className="w-20 h-20 sm:w-15 sm:h-15 rounded-full" />
        
        {/* Temperature - large text */}
        <Skeleton className="w-32 h-20 sm:w-30 sm:h-15 rounded-lg" />
        
        {/* Time/Date */}
        <Skeleton className="w-45 h-5 rounded" />
      </div>
    </Card>
  )
}

export default CurrentSkeleton