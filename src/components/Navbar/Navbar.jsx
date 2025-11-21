import React from 'react'

import LocationSearch from '../Search/LocationSearch'

const Navbar = ({ onSelectLocation }) => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-20 bg-zinc-950 border border-gray-800 flex items-center justify-center px-4 shadow-md z-10'>
        {/* branding */}
        <div className='absolute left-4 hover:cursor-pointer transition-transform duration-200 hover:scale-90 '>
          <p className='text-white text-xl font-semibold tracking-wide'>
            Weather<span className='text-blue-400'>Check</span>
          </p>

          
        </div>
        <LocationSearch onSelectLocation={onSelectLocation} />
      </div>
    </>
  )
}

export default Navbar