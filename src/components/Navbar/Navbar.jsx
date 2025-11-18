import React from 'react'

import LocationSearch from '../Search/LocationSearch'

const Navbar = ({ onSelectLocation }) => {
  return (
    <div className='h-20 bg-zinc-950 border border-gray-800 flex items-center justify-center px-4 shadow-md'>
      <LocationSearch onSelectLocation={onSelectLocation} />
    </div>
  )
}

export default Navbar