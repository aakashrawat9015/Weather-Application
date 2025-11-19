import React from 'react'
import Card from '../card/Card'
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { Skeleton } from '../ui/skeleton';

const CurrentSkeleton = ( ) => {
  return (
    <Card title="Current Weather">
      <Skeleton className="w-22 h-22 rounded-full mb-4" />
      <div className="flex flex-col items-center w-full text-white" >
        <Skeleton className="text-6xl text-[#95acac]" />
        <Skeleton className="w-24 h-12 mb-2" />
        <Skeleton className="w-32 h-6 mb-2" />
        <Skeleton className="w-32 h-6" />
      </div >
    </Card>
  )
}

export default CurrentSkeleton