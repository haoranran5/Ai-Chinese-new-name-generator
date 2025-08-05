import React from 'react';
import { useState } from 'react';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navigation from './components/Navigation';
import FengShuiElements from './components/FengShuiElements';
import HomePage from './pages/HomePage';
import NameGeneratorPage from './pages/NameGeneratorPage';
import FengShuiTipsPage from './pages/FengShuiTipsPage';
import AstrologyPage from './pages/AstrologyPage';
import CompatibilityPage from './pages/CompatibilityPage';
import AboutPage from './pages/AboutPage';
import FamousPeoplePage from './pages/FamousPeoplePage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // 监听 hash 变化来切换页面
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ['nameGenerator', 'compatibility', 'fengShuiTips', 'astrology', 'about', 'famousPeople'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // 初始检查
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'nameGenerator':
        return <NameGeneratorPage />;
      case 'fengShuiTips':
        return <FengShuiTipsPage />;
      case 'astrology':
        return <AstrologyPage />;
      case 'compatibility':
        return <CompatibilityPage />;
      case 'about':
        return <AboutPage />;
      case 'famousPeople':
        return <FamousPeoplePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden" dir="ltr">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-red-400/10 to-pink-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-yellow-400/10 to-red-500/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-orange-400/10 to-yellow-500/10 rounded-full animate-float"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      {/* Feng Shui Elements */}
      <FengShuiElements />
      
      <FavoritesProvider>
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        {renderPage()}
      </FavoritesProvider>
    </div>
  );
}

export default App;