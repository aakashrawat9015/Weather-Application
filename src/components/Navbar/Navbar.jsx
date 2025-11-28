import React from 'react'
import LocationSearch from '../Search/LocationSearch'
import { useTheme } from '../../contexts/ThemeContext'

const Navbar = ({ onSelectLocation, locationName }) => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <div className='fixed top-0 left-0 w-full bg-card border-b border-border shadow-md z-30'>
      {/* Branding positioned at the leftmost corner */}
      <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-40'>
        <div className='hover:cursor-pointer transition-transform duration-200 hover:scale-90'>
          <p className='text-foreground text-lg sm:text-xl font-semibold tracking-wide whitespace-nowrap'>
            Weather<span className='text-blue-500'>Check</span>
          </p>
        </div>
      </div>

      <div className='max-w-5xl mx-auto relative flex items-center px-4 py-3 sm:h-20'>
        {/* Center: Search */}
        <div className='w-full sm:w-auto sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex justify-center'>
          <div className='w-full sm:w-80'>
            <LocationSearch onSelectLocation={onSelectLocation} />
          </div>
        </div>

        {/* Right: location name + theme toggle */}
        <div className='ml-auto flex items-center gap-3'>
          <div className='hidden sm:block text-right'>
            <p className='text-sm text-muted-foreground'>{locationName ?? ''}</p>
          </div>

          <button
            onClick={toggleTheme}
            aria-label='Toggle theme'
            className='p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground'
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.42-1.42M7.05 6.05 5.64 4.64M18.36 5.64 16.95 7.05M6.34 17.66 7.76 16.24M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar