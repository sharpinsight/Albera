import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="relative bg-white border-b border-slate-200 h-20 shadow-sm z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* LEFT: Mobile Trigger / Search Icon (Visible on Desktop for balance or utility) */}
        <div className="flex items-center gap-4">
           {/* Mobile Menu Button (Visible only on small screens) */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Optional: Mini Search Icon for Quick Access */}
          <button className="hidden md:flex p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* CENTER: The Brand (Absolutely Centered) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className="group flex flex-col items-center">
            {/* Placeholder for Logo - Replace with <img> later */}
            <div className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-slate-700 transition-colors">
              ALBERA<span className="text-blue-600">.</span>
            </div>
            {/* Tagline (Optional, visible only on large screens) */}
            <span className="hidden lg:block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium mt-1">
              The Sticker Wiki
            </span>
          </Link>
        </div>

        {/* RIGHT: Navigation Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-colors uppercase tracking-wide">
            News
          </Link>
          <Link to="/archive" className="hover:text-blue-600 transition-colors uppercase tracking-wide">
            Archive
          </Link>
          <Link to="/market" className="hover:text-blue-600 transition-colors uppercase tracking-wide">
            Marketplace
          </Link>
          {/* CTA Button */}
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
            Login
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
          <Link to="/" className="text-slate-600 font-medium py-2">News</Link>
          <Link to="/archive" className="text-slate-600 font-medium py-2">Archive</Link>
          <Link to="/market" className="text-slate-600 font-medium py-2">Marketplace</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;