import React, { useState } from 'react';
import albumsData from '../data/albums.json';

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(albumsData);

  // Search logic remains the same...
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filtered = albumsData.filter(album => 
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">The Album Archive</h2>
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text"
            placeholder="Search albums..."
            className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            onKeyDown={handleSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map(album => (
          <div key={album.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <img src={album.image} alt={album.title} className="w-full h-48 object-cover rounded-md mb-4 bg-slate-200" />
            <h3 className="font-bold text-slate-900">{album.title}</h3>
            <p className="text-sm text-slate-500">{album.publisher} • {album.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;