import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section: Breaking News */}
      <section className="bg-slate-900 text-white py-20 px-4 text-center">
        <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">New Release</span>
        <h1 className="text-5xl font-black mt-4 mb-6">World Cup 2026 Preview Leaked?</h1>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-8">
          Rumors suggest Panini might change the sticker size for the upcoming tournament. Here is what we know so far.
        </p>
        <Link to="/archive" className="bg-white text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors">
          Browse Archive
        </Link>
      </section>

      {/* Latest Updates Grid */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-blue-600 pl-4">Latest News</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <article key={item} className="group cursor-pointer">
              <div className="aspect-video bg-slate-200 rounded-xl mb-4 overflow-hidden">
                {/* Placeholder for news image */}
                <div className="w-full h-full bg-slate-300 group-hover:scale-105 transition-transform"></div>
              </div>
              <span className="text-blue-600 text-sm font-semibold">Market Watch</span>
              <h3 className="text-xl font-bold text-slate-900 leading-tight mt-1 group-hover:text-blue-600 transition-colors">
                Top 5 rarest stickers found in attic auctions this week.
              </h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;