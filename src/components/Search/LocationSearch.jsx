import { useState } from 'react';

function LocationSearch({ onSelectLocation }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const results = await response.json();
    console.log(results);
    
    if (results.length > 0) {
      const { lat, lon } = results[0];
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      onSelectLocation({ lat: latNum, lon: lonNum });
      console.log('Selected location:', { lat: latNum, lon: lonNum });
      
    } else {
      alert('Location not found');
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location..."
        className="px-4 py-2 rounded-l bg-gray-800 text-white border border-gray-600"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 rounded-r bg-blue-600 text-white hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}

export default LocationSearch;