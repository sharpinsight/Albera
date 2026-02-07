import React from 'react';
import { useParams, Link } from 'react-router-dom';
import albumsData from '../data';

const AlbumDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la URL (ej: qatar-2022)
  const album = albumsData.find((a) => a.id === id); // Busca el álbum en el JSON

  if (!album) {
    return <div className="text-center py-20">Album not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Botón de Regresar */}
      <Link to="/archive" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Archive
      </Link>

      {/* Encabezado del Álbum */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Portada Grande */}
        <div className="w-full md:w-1/3">
          <img 
            src={album.image} 
            alt={album.title} 
            className="w-full rounded-lg shadow-2xl" 
          />
        </div>

        {/* Info del Álbum */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{album.title}</h1>
          <p className="text-xl text-slate-600 mb-4">
            {album.publisher} • {album.year} • {album.country}
          </p>
          <div className="bg-slate-100 p-6 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Collection Stats</h3>
            <p>Total Stickers: {album.totalStickers}</p>
            {/* Aquí podrías poner una barra de progreso en el futuro */}
          </div>
        </div>
      </div>

      {/* Sección de Páginas y Stickers */}
      {/* NOTA: Esto funcionará cuando agregues arrays de "pages" en tu JSON. 
          Por ahora mostrará el título aunque esté vacío. */}
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Inside the Album</h2>
        
        {/* Ejemplo de Grid para las páginas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Aquí mapearíamos album.pages si existiera en el JSON */}
           <div className="aspect-[3/4] bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
              Page 1 (Ejemplo)
           </div>
           <div className="aspect-[3/4] bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
              Page 2 (Ejemplo)
           </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;