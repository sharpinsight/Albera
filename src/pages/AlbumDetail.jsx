import React from 'react';
import { useParams, Link } from 'react-router-dom';
import albumsData from '../data';
import AlbumViewer from '../components/AlbumViewer';

const AlbumDetail = () => {
  const { id } = useParams();
  const album = albumsData.find((a) => a.id === id);

  if (!album) {
    return <div className="text-center py-20 font-bold text-xl">Album not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Botón de Regresar */}
      <Link to="/archive" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
        &larr; Back to Archive
      </Link>

      {/* Encabezado del Álbum */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3">
          <img 
            src={album.assets?.cover} 
            alt={album.metadata?.title} 
            className="w-full rounded-lg shadow-2xl" 
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{album.metadata?.title}</h1>
          <p className="text-xl text-slate-600 mb-4">
            {album.metadata?.publisher} • {album.metadata?.year} • {album.metadata?.country}
          </p>
          <div className="bg-slate-100 p-6 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Collection Stats</h3>
            <p className="text-slate-600">Total Stickers: <span className="font-bold text-slate-900">{album.metadata?.totalStickers}</span></p>
          </div>
        </div>
      </div>

      {/* COMPONENTE SEPARADO: El Visor Interactivo */}
      <AlbumViewer album={album} />
      
    </div>
  );
};

export default AlbumDetail;