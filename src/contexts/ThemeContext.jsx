import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
})

export const ThemeProvider = ({ children, defaultTheme = 'dark' }) => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const root = document.documentElement
    
    // Get stored theme or default
    const storedTheme = localStorage.getItem('theme') || defaultTheme
    
    // Remove both classes first
    root.classList.remove('light', 'dark')
    
    // Add the current theme class
    root.classList.add(storedTheme)
    setTheme(storedTheme)
  }, [])

  const updateTheme = (newTheme) => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

