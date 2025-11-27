import { useState } from 'react';

function LocationSearch({ onSelectLocation }) {
  const [locationInput, setLocationInput] = useState('');

  const handleSearch = async () => {
    const query = locationInput.trim();
    if (!query) {
      alert('Please enter a location name.');
      return;
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        const locationName = display_name.split(',')[0];

        onSelectLocation({ lat: latNum, lon: lonNum, name: locationName });
        console.log('Selected location:', { lat: latNum, lon: lonNum, name: locationName });
        setLocationInput('');
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      alert('Error searching location. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full sm:w-auto gap-2">
      <input
        type="text"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search location..."
        className="flex-1 sm:flex-none px-3 py-2 text-sm sm:text-base rounded-l bg-input text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-2 rounded-r bg-primary text-primary-foreground hover:bg-primary/90 transition flex items-center justify-center"
      >
        <i className="fas fa-search text-sm sm:text-base"></i>
      </button>
    </div>
  );
}

export default LocationSearch;