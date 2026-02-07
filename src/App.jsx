import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the new component
import Home from './pages/Home';
import Archive from './pages/Archive';
import AlbumDetail from './pages/AlbumDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;