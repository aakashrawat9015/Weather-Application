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

      if (!Array.isArray(results) || results.length === 0) {
        alert('Location not found. Try a more specific name.');
        return;
      }

      const { lat, lon, display_name } = results[0];
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);

      onSelectLocation({ lat: latNum, lon: lonNum, name: display_name });
      console.log('Selected location:', { lat: latNum, lon: lonNum, name: display_name });

    } catch (error) {
      console.error('Search failed:', error);
      alert('Something went wrong while searching. Please try again.');
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center mt-4 fixed">
      <input
        type="text"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search location..."
        className="px-4 py-2 rounded-l bg-gray-800 text-white border border-gray-600"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 rounded-r bg-blue-600 text-white hover:bg-blue-700"
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default LocationSearch;