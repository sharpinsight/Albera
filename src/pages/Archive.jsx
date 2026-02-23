import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import albumsData from '../data/index.js';

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(albumsData);

  // Search logic remains the same...
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filtered = albumsData.filter(album => 
        album.metadata.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        {results.map((album) => (
          <Link 
            to={`/album/${album.id}`} 
            key={album.id} 
            className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="w-full aspect-[3/4] bg-slate-100 relative">
              <img 
                src={album.assets.cover} 
                alt={album.metadata.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {album.metadata.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {album.metadata.publisher} {(album.metadata.country) ? `(${album.metadata.country})` : ""} - {album.metadata.year}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Archive;