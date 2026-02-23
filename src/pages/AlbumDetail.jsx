import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import albumsData from '../data';

const AlbumDetail = () => {
  const { id } = useParams();
  const album = albumsData.find((a) => a.id === id);
  
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  
  // NUEVOS ESTADOS: Para controlar el input sin que se trabe al borrar
  const [tempInput, setTempInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Lista Maestra (Portadas + Páginas)
  const allAlbumImages = useMemo(() => {
    if (!album) return [];
    const items = [];
    
    if (album.assets?.cover) items.push({ label: 'Portada', image: album.assets.cover });
    if (album.assets?.insideCover) items.push({ label: 'Retiración Frente', image: album.assets.insideCover });
    
    if (album.pages && album.pages.length > 0) {
      album.pages.forEach(p => {
        items.push({ label: `Página ${p.number}`, image: p.image });
      });
    }
    
    if (album.assets?.insideBackCover) items.push({ label: 'Retiración Dorso', image: album.assets.insideBackCover });
    if (album.assets?.backCover) items.push({ label: 'Contraportada', image: album.assets.backCover });
    
    return items;
  }, [album]);

  if (!album) {
    return <div className="text-center py-20 font-bold text-xl">Album not found</div>;
  }

  const hasImages = allAlbumImages.length > 0;
  const maxPages = album.pages ? album.pages.length : 0;

  // Calculamos cuántas portadas hay al inicio para el desfase matemático
  let offset = 0;
  if (album.assets?.cover) offset++;
  if (album.assets?.insideCover) offset++;

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

      {/* SECCIÓN INTERACTIVA: Carrusel y Visor */}
      <div className="mb-12">
        
        {/* CABECERA Y MINI NAV MEJORADO */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4 gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Inside the Album</h2>
          
          {hasImages && (
            <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-slate-300 shadow-sm">
              
              {/* Botón Fijo: Portada */}
              <button 
                onClick={() => setSelectedPageIndex(0)}
                className={`text-sm font-bold transition-colors px-2 ${
                  selectedPageIndex === 0 ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Portada
              </button>
              
              <div className="w-px h-5 bg-slate-300"></div>
              
              {/* Controles del Input con Flechas Propias */}
              <div className="flex items-center gap-1">
                
                {/* Flecha Anterior del Mini Nav */}
                <button 
                  onClick={() => setSelectedPageIndex(prev => Math.max(0, prev - 1))}
                  disabled={selectedPageIndex === 0}
                  className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                >
                  &larr;
                </button>

                <span className="text-sm font-medium text-slate-500 ml-1">Pág.</span>
                
                {/* Input Text (Libre de flechas nativas) */}
                <input 
                  type="text" 
                  placeholder="1"
                  value={
                    isInputFocused 
                      ? tempInput 
                      : (allAlbumImages[selectedPageIndex]?.label.startsWith('Página') 
                          ? allAlbumImages[selectedPageIndex].label.replace('Página ', '') 
                          : '')
                  }
                  onFocus={() => {
                    setIsInputFocused(true);
                    setTempInput(
                      allAlbumImages[selectedPageIndex]?.label.startsWith('Página') 
                        ? allAlbumImages[selectedPageIndex].label.replace('Página ', '') 
                        : ''
                    );
                  }}
                  onBlur={() => setIsInputFocused(false)}
                  onChange={(e) => {
                    // Usamos Regex para bloquear cualquier letra o símbolo
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setTempInput(val);
                    
                    // Si lo borras todo, te lleva en silencio a la Página 1
                    if (val === '') {
                        setSelectedPageIndex(offset); 
                        return;
                    }

                    let num = parseInt(val);
                    if (num > maxPages) num = maxPages;
                    if (num < 1) num = 1;

                    setSelectedPageIndex(offset + num - 1);
                  }}
                  className="w-10 p-1 text-center border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-bold text-slate-700 bg-slate-50"
                />
                
                <span className="text-sm text-slate-500 mr-1">de {maxPages}</span>

                {/* Flecha Siguiente del Mini Nav */}
                <button 
                  onClick={() => setSelectedPageIndex(prev => Math.min(allAlbumImages.length - 1, prev + 1))}
                  disabled={selectedPageIndex === allAlbumImages.length - 1}
                  className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                >
                  &rarr;
                </button>

              </div>
            </div>
          )}
        </div>

        {/* CONTENEDOR PRINCIPAL: Carrusel y Visor */}
        {hasImages ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row h-auto md:h-[700px]">
            
            {/* Carrusel Lateral */}
            <div className="w-full md:w-48 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
              {allAlbumImages.map((item, index) => {
                const isSelected = index === selectedPageIndex;
                return (
                  <button 
                    key={index}
                    onClick={() => setSelectedPageIndex(index)}
                    className={`flex-shrink-0 w-24 md:w-full aspect-[3/4] rounded-md overflow-hidden border-2 transition-all duration-200 group relative
                      ${isSelected 
                        ? 'border-blue-600 shadow-md ring-2 ring-blue-200' 
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300'
                      }`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.label} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] py-1 px-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visor Central Gigante */}
            <div className="flex-1 relative bg-slate-100 flex items-center justify-center p-4 sm:p-8">
              
              <button 
                onClick={() => setSelectedPageIndex(prev => Math.max(0, prev - 1))}
                disabled={selectedPageIndex === 0}
                className="absolute left-4 z-10 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-md hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                &larr;
              </button>

              <img 
                src={allAlbumImages[selectedPageIndex].image} 
                alt={allAlbumImages[selectedPageIndex].label} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl" 
              />
              
              <div className="absolute top-4 right-4 bg-black/70 text-white font-medium text-sm px-3 py-1.5 rounded-md backdrop-blur-sm shadow-lg">
                {allAlbumImages[selectedPageIndex].label}
              </div>

              <button 
                onClick={() => setSelectedPageIndex(prev => Math.min(allAlbumImages.length - 1, prev + 1))}
                disabled={selectedPageIndex === allAlbumImages.length - 1}
                className="absolute right-4 z-10 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-md hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                &rarr;
              </button>
              
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 text-center text-slate-500">
            <p>Aún no hay páginas ni portadas escaneadas para este álbum.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;