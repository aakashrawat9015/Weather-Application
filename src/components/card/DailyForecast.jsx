import React from 'react'
import Card from './Card'

const DailyForecast = ({ data, title = "Daily Forecast", scrollDirection = "vertical" }) => {
  return (
    <Card data={data} title={title} scrollDirection={scrollDirection}>
      <div className='flex flex-col gap-4 text-white'>
        {data?.daily?.time?.map((date, index) => (
          <div key={date} className='flex justify-between min-w-[100px] rounded-lg p-2 shadow-lg border border-gray-700/70'>
            <p>{date}</p>
            <p>Max: {data.daily.temperature_2m_max[index]}°C</p>
            <p>Min: {data.daily.temperature_2m_min[index]}°C</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default DailyForecast