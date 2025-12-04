import React, { useState, useRef, useEffect } from "react";
import LocationSearch from "../Search/LocationSearch";
import { useTheme } from "../../contexts/ThemeContext";
import { Search } from "lucide-react";

const Navbar = ({ onSelectLocation, locationName }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-card border-b border-border shadow-md z-30">
      {/* Flex container spans full width, no mx-auto */}
      <div className="flex items-center justify-between px-4 py-3 sm:h-20">
        {/* Left: Branding pinned to left edge */}
        <div className="flex-shrink-0">
          <p className="text-foreground text-lg sm:text-xl font-semibold tracking-wide whitespace-nowrap">
            Weather<span className="text-blue-500">Check</span>
          </p>
        </div>

        {/* Center: Search bar (≥551px) */}
        <div className="hidden min-[551px]:flex justify-center flex-1">
          <div className="w-80">
            <LocationSearch onSelectLocation={onSelectLocation} />
          </div>
        </div>

        {/* Right: location name + theme toggle + search icon (≤550px) */}
        <div className="flex items-center gap-3 flex-shrink-0" ref={searchRef}>
          <div className="hidden min-[551px]:block text-right">
            <p className="text-sm text-muted-foreground">{locationName ?? ""}</p>
          </div>

          {/* Search icon only on small screens */}
          <div className="block max-[550px]:block min-[551px]:hidden relative">
            {showSearch && (
              <div className="absolute top-12 right-0 w-64">
                <LocationSearch onSelectLocation={onSelectLocation} />
              </div>
            )}
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label="Toggle search"
              className="p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.42-1.42M7.05 6.05 5.64 4.64M18.36 5.64 16.95 7.05M6.34 17.66 7.76 16.24M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;