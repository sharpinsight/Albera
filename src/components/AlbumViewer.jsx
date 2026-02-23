import React, { useState, useMemo } from 'react';

const AlbumViewer = ({ album }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('full');
  
  // Estados para controlar el input
  const [tempInput, setTempInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Lista Maestra de Imágenes
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

  const allStickersImages = useMemo(() => {
    if (!album) return [];
    const items = [];
    
    if (album.stickers && album.stickers.length > 0) {
      album.stickers.forEach(s => {
        items.push({ label: `Sticker ${s.number}`, image: s.image });
      });
    }
    return items;
  }, [album]);

  const hasImages = allAlbumImages.length > 0;
  const maxPages = album.pages ? album.pages.length : 0;

  let offset = 0;
  if (album.assets?.cover) offset++;
  if (album.assets?.insideCover) offset++;

  if (!hasImages) {
    return (
      <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 text-center text-slate-500 mb-12">
        <p>Aún no hay páginas ni portadas escaneadas para este álbum.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {/* CABECERA: Título | Controles ViewMode | Paginación */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 border-b pb-4 gap-4">
        
        {/* Título */}
        <div className="flex-1 text-left w-full lg:w-auto">
          <h2 className="text-2xl font-bold text-slate-800">Inside the Album</h2>
        </div>
        
        {/* Selector de Vista */}
        <div className="flex-1 flex justify-center w-full lg:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            {[
              { id: 'album', label: 'Álbum Vacío' },
              { id: 'stickers', label: 'Solo Stickers' },
              { id: 'full', label: 'Álbum Lleno' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`py-1.5 px-4 text-sm font-bold rounded-md transition-all ${
                  viewMode === mode.id 
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mini Nav Paginación */}
        <div className="flex-1 flex justify-end w-full lg:w-auto">
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-slate-300 shadow-sm">
            <button 
              onClick={() => setSelectedPageIndex(0)}
              className={`text-sm font-bold transition-colors px-2 ${
                selectedPageIndex === 0 ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Portada
            </button>
            <div className="w-px h-5 bg-slate-300"></div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setSelectedPageIndex(prev => Math.max(0, prev - 1))}
                disabled={selectedPageIndex === 0}
                className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
              >
                &larr;
              </button>
              <span className="text-sm font-medium text-slate-500 ml-1">Pág.</span>
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
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setTempInput(val);
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
              <button 
                onClick={() => setSelectedPageIndex(prev => Math.min(allAlbumImages.length - 1, prev + 1))}
                disabled={selectedPageIndex === allAlbumImages.length - 1}
                className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENEDOR: Carrusel y Visor */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row h-auto md:h-[700px]">
        
        {/* Carrusel Lateral */}
        <div className="w-full md:w-48 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto custom-scrollbar">
          {allAlbumImages.map((item, index) => {
            const isSelected = index === selectedPageIndex;
            return (
              <button 
                key={index}
                onClick={() => setSelectedPageIndex(index)}
                className={`flex-shrink-0 w-24 md:w-full aspect-[3/4] rounded-md overflow-hidden border-2 transition-all duration-200 group relative
                  ${isSelected ? 'border-blue-600 shadow-md ring-2 ring-blue-200' : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300'}`}
              >
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] py-1 px-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visor Central Gigante */}
        <div className="flex-1 relative bg-slate-100 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          <button 
            onClick={() => setSelectedPageIndex(prev => Math.max(0, prev - 1))}
            disabled={selectedPageIndex === 0}
            className="absolute left-4 z-10 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-md hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            &larr;
          </button>

          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img 
              src={allAlbumImages[selectedPageIndex].image} 
              alt={allAlbumImages[selectedPageIndex].label} 
              className={`max-w-full max-h-full object-contain drop-shadow-2xl transition-opacity duration-300 ${
                viewMode === 'stickers' ? 'opacity-10' : 'opacity-100'
              }`} 
            />
            {(viewMode === 'full' || viewMode === 'stickers') && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {viewMode === 'stickers' && (
                   <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                     Modo Stickers Activo (Próximamente estampas aquí)
                   </span>
                )}
              </div>
            )}
          </div>
          
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
    </div>
  );
};

export default AlbumViewer;