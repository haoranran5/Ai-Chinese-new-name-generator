import React from 'react';
import HomePage from './pages/HomePage';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-full animate-float"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <FavoritesProvider>
        <HomePage />
      </FavoritesProvider>
    </div>
  );
}

export default App;