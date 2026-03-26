/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  Layout as LayoutIcon, 
  ArrowLeft, 
  Globe, 
  Menu, 
  X,
  Maximize2,
  Minimize2,
  Image as ImageIcon
} from 'lucide-react';
import { ALL_STORYBOOKS, SPANISH_STORYBOOKS, ENGLISH_STORYBOOKS, Storybook } from './constants';

// --- Helpers ---

const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;
  // If path starts with /, remove it to avoid double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-paper/80 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
            <BookOpen className="text-paper w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-serif leading-none tracking-tight">Factory Biodiversity</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted mt-1">Storybooks Library</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/es" className={`text-sm uppercase tracking-widest hover:text-accent transition-colors ${location.pathname === '/es' ? 'text-accent font-semibold' : 'text-muted'}`}>Biblioteca ES</Link>
          <Link to="/en" className={`text-sm uppercase tracking-widest hover:text-accent transition-colors ${location.pathname === '/en' ? 'text-accent font-semibold' : 'text-muted'}`}>Library EN</Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-paper border-b border-ink/5 px-6 py-8 flex flex-col gap-6 shadow-xl"
          >
            <Link to="/es" onClick={() => setIsOpen(false)} className="text-xl font-serif">Biblioteca Español</Link>
            <Link to="/en" onClick={() => setIsOpen(false)} className="text-xl font-serif">Library English</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-6 block">Premium Digital Collection</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">
            Biodiversity in the <br />
            <span className="italic">Industrial Landscape</span>
          </h2>
          <p className="text-lg text-muted mb-12 max-w-xl mx-auto leading-relaxed">
            Explore our curated library of technical storybooks detailing the coexistence of industry and nature. 
            Available in Spanish and English.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/es" 
              className="px-10 py-4 bg-accent text-paper rounded-sm hover:bg-accent/90 transition-all flex items-center justify-center gap-3 group"
            >
              Biblioteca Español
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/en" 
              className="px-10 py-4 border border-accent text-accent rounded-sm hover:bg-accent/5 transition-all flex items-center justify-center gap-3 group"
            >
              Library English
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 border-t border-ink/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest text-muted">
          <p>© 2026 Factory Biodiversity Storybooks Library</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Technical Standards</a>
            <a href="#" className="hover:text-accent transition-colors">Sustainability</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SafeImage = ({ 
  src, 
  alt, 
  className, 
  fallback,
  aspectRatio = "aspect-[2/3]"
}: { 
  src: string; 
  alt: string; 
  className?: string;
  fallback?: string;
  aspectRatio?: string;
}) => {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(getAssetUrl(src));
    setError(false);
  }, [src]);

  if (error && !fallback) {
    return (
      <div className={`${aspectRatio} bg-ink/5 flex flex-col items-center justify-center p-6 text-center border border-ink/10 ${className}`}>
        <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
        <p className="text-[10px] uppercase tracking-tighter opacity-30 leading-tight">
          {alt}<br/>Not found
        </p>
      </div>
    );
  }

  return (
    <img 
      src={imgSrc} 
      alt={alt}
      className={`${className} ${error ? 'hidden' : ''}`}
      referrerPolicy="no-referrer"
      onError={() => {
        if (fallback && imgSrc !== getAssetUrl(fallback)) {
          setImgSrc(getAssetUrl(fallback));
        } else {
          setError(true);
        }
      }}
    />
  );
};

const Library = ({ lang }: { lang: 'es' | 'en' }) => {
  const books = lang === 'es' ? SPANISH_STORYBOOKS : ENGLISH_STORYBOOKS;
  
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            {lang === 'es' ? 'Biblioteca Digital' : 'Digital Library'}
          </h2>
          <p className="text-muted uppercase tracking-widest text-sm">
            {lang === 'es' ? '12 Títulos sobre Biodiversidad Industrial' : '12 Titles on Industrial Biodiversity'}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {books.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/book/${book.id}`} className="group block">
                <div className="aspect-[2/3] overflow-hidden bg-ink/5 mb-6 relative shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <SafeImage 
                    src={`storybooks/${book.slug}/assets/cover.jpg`}
                    fallback={`storybooks/${book.slug}/assets/page-1.jpg`}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-serif leading-tight mb-2 group-hover:text-accent transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-muted">
                  {lang === 'es' ? 'Ver Storybook' : 'View Storybook'}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StorybookViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single');
  const [showThumbnails, setShowThumbnails] = useState(false);

  const book = useMemo(() => ALL_STORYBOOKS.find(b => b.id === id), [id]);
  const bilingualPair = useMemo(() => 
    book?.bilingualPairId ? ALL_STORYBOOKS.find(b => b.id === book.bilingualPairId) : null
  , [book]);

  if (!book) return <div className="pt-40 text-center font-serif text-2xl">Book not found</div>;

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, book.pages.length - 1));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-[#111] text-paper pt-20 flex flex-col">
      {/* Viewer Header */}
      <div className="h-16 px-6 border-b border-paper/10 flex items-center justify-between bg-black/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(book.language === 'es' ? '/es' : '/en')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{book.language === 'es' ? 'Biblioteca' : 'Library'}</span>
          </button>
          <div className="w-px h-4 bg-paper/20 hidden sm:block" />
          <h2 className="text-sm font-serif truncate max-w-[120px] md:max-w-md">
            {book.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          {bilingualPair && (
            <Link 
              to={`/book/${bilingualPair.id}`}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest bg-accent/20 text-accent border border-accent/30 px-3 py-1.5 rounded-sm hover:bg-accent/30 transition-colors"
            >
              <Globe className="w-3 h-3" />
              {bilingualPair.language === 'es' ? 'Versión Español' : 'English Version'}
            </Link>
          )}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setViewMode('single')}
              className={`p-2 rounded-sm transition-colors ${viewMode === 'single' ? 'bg-accent text-paper' : 'hover:bg-paper/10'}`}
              title="Single Page"
            >
              <LayoutIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('continuous')}
              className={`p-2 rounded-sm transition-colors ${viewMode === 'continuous' ? 'bg-accent text-paper' : 'hover:bg-paper/10'}`}
              title="Continuous View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Thumbnails Sidebar */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div 
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              className="w-60 bg-black/60 border-r border-paper/10 overflow-y-auto scrollbar-hide p-4 flex flex-col gap-4 z-20"
            >
              {book.pages.map((page, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx);
                    if (viewMode === 'single') setShowThumbnails(false);
                  }}
                  className={`relative aspect-[2/3] border-2 transition-all ${currentPage === idx ? 'border-accent' : 'border-transparent hover:border-paper/30'}`}
                >
                  <SafeImage src={page} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/60 text-[10px] px-1 rounded">{idx + 1}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Viewer Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-black">
          <button 
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="absolute top-4 left-4 z-30 p-2 bg-black/60 hover:bg-black/80 rounded-sm transition-colors"
          >
            {showThumbnails ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {viewMode === 'single' ? (
            <div className="h-full flex items-center justify-center p-4 md:p-12">
              <div className="relative h-full max-w-full aspect-[2/3] shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full w-full"
                  >
                    <SafeImage 
                      src={book.pages[currentPage]} 
                      alt={`Page ${currentPage + 1}`} 
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Overlays */}
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="absolute left-0 top-0 w-1/4 h-full cursor-w-resize group flex items-center justify-start pl-4"
                >
                  <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden">
                    <ChevronLeft className="w-6 h-6" />
                  </div>
                </button>
                <button 
                  onClick={nextPage}
                  disabled={currentPage === book.pages.length - 1}
                  className="absolute right-0 top-0 w-1/4 h-full cursor-e-resize group flex items-center justify-end pr-4"
                >
                  <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto p-6 md:p-12 flex flex-col gap-12">
              {book.pages.map((page, idx) => (
                <div key={idx} className="shadow-2xl">
                  <SafeImage src={page} alt={`Page ${idx + 1}`} className="w-full h-auto" aspectRatio="aspect-auto" />
                  <p className="text-center mt-4 text-xs text-muted uppercase tracking-widest">Page {idx + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Viewer Footer */}
      {viewMode === 'single' && (
        <div className="h-16 px-6 border-t border-paper/10 flex items-center justify-center gap-8 bg-black/40 backdrop-blur-sm">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-2 hover:bg-paper/10 rounded-full transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-xs uppercase tracking-[0.3em] font-medium">
            {currentPage + 1} / {book.pages.length}
          </span>
          <button 
            onClick={nextPage}
            disabled={currentPage === book.pages.length - 1}
            className="p-2 hover:bg-paper/10 rounded-full transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/es" element={<Library lang="es" />} />
        <Route path="/en" element={<Library lang="en" />} />
        <Route path="/book/:id" element={<StorybookViewer />} />
      </Routes>
    </HashRouter>
  );
}
