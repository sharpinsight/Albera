// src/data/index.js

// 1. Importas cada álbum individualmente
import digimon2000NavarreteMx from "./albums/digimon-2000-navarrete-mx-album.json";
import naruto2025PaniniMX from "./albums/naruto-2025-panini-mx.json";

// 2. Los metes todos en un arreglo
const albumsData = [
  digimon2000NavarreteMx,
  naruto2025PaniniMX,
  
];

// 3. Exportas la lista completa para que la use la App
export default albumsData;