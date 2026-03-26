import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Loader2,
  FileWarning
} from 'lucide-react';
import { ALL_STORYBOOKS, SPANISH_STORYBOOKS, ENGLISH_STORYBOOKS } from './constants';

import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const PDFPage = ({
  pdf,
  pageNumber,
  scale = 1.5,
  className = '',
  onLoad,
}: {
  pdf: any | null;
  pageNumber: number;
  scale?: number;
  className?: string;
  onLoad?: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;

      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: scale * window.devicePixelRatio });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.width = `${viewport.width / window.devicePixelRatio}px`;
        canvas.style.height = `${viewport.height / window.devicePixelRatio}px`;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
        if (onLoad) onLoad();
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
      }
    };

    renderPage();

    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdf, pageNumber, scale, onLoad]);

  return <canvas ref={canvasRef} className={`max-w-full h-auto shadow-lg bg-white ${className}`} />;
};

const PDFCover = ({ pdfPath, title }: { pdfPath: string; title: string }) => {
  const [pdf, setPdf] = useState<any | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(getAssetUrl(pdfPath));
        const doc = await loadingTask.promise;
        setPdf(doc);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF for cover:', err);
        setError(true);
        setLoading(false);
      }
    };
    loadPdf();
  }, [pdfPath]);

  if (error) {
    return (
      <div className="aspect-[2/3] bg-accent/10 flex flex-col items-center justify-center p-6 text-center border border-accent/20">
        <FileWarning className="w-8 h-8 mb-2 text-accent/40" />
        <p className="text-[10px] uppercase tracking-tighter text-accent/60 leading-tight">{title}</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[2/3] bg-ink/5 overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-accent/20" />
        </div>
      ) : (
        <PDFPage pdf={pdf} pageNumber={1} scale={0.5} className="w-full h-full object-cover" />
      )}
    </div>
  );
};

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

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/es"
            className={`text-sm uppercase tracking-widest hover:text-accent transition-colors ${location.pathname === '/es' ? 'text-accent font-semibold' : 'text-muted'}`}
          >
            Biblioteca ES
          </Link>
          <Link
            to="/en"
            className={`text-sm uppercase tracking-widest hover:text-accent transition-colors ${location.pathname === '/en' ? 'text-accent font-semibold' : 'text-muted'}`}
          >
            Library EN
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-paper border-b border-ink/5 px-6 py-8 flex flex-col gap-6 shadow-xl"
          >
            <Link to="/es" onClick={() => setIsOpen(false)} className="text-xl font-serif">
              Biblioteca Español
            </Link>
            <Link to="/en" onClick={() => setIsOpen(false)} className="text-xl font-serif">
              Library English
            </Link>
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
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-6 block">
            Premium Digital Collection
          </span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">
            Biodiversity in the <br />
            <span className="italic">Industrial Landscape</span>
          </h2>
          <p className="text-lg text-muted mb-12 max-w-xl mx-auto leading-relaxed">
            Explore our curated library of technical storybooks detailing the coexistence of industry and
            nature. Available in Spanish and English.
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
            <a href="#" className="hover:text-accent transition-colors">
              Technical Standards
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Sustainability
            </a>
          </div>
        </div>
      </footer>
    </div>
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
                  <PDFCover pdfPath={book.pdfPath} title={book.title} />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-serif leading-tight mb-2 group-hover:text-accent transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-muted">
                  {lang === 'es' ? 'Leer PDF' : 'Read PDF'}
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
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single');
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [pdf, setPdf] = useState<any | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const book = useMemo(() => ALL_STORYBOOKS.find((b) => b.id === id), [id]);
  const bilingualPair = useMemo(
    () => (book?.bilingualPairId ? ALL_STORYBOOKS.find((b) => b.id === book.bilingualPairId) : null),
    [book]
  );

  useEffect(() => {
    const loadPdf = async () => {
      if (!book) return;
      setLoading(true);
      setError(null);
      setCurrentPage(1);

      try {
        const loadingTask = pdfjs.getDocument(getAssetUrl(book.pdfPath));
        const doc = await loadingTask.promise;
        setPdf(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('No se pudo cargar el archivo PDF. Asegúrate de que existe en public/pdfs/');
        setLoading(false);
      }
    };

    loadPdf();

    return () => {
      if (pdf) pdf.destroy();
    };
  }, [id, book]);

  if (!book) return <div className="pt-40 text-center font-serif text-2xl">Book not found</div>;

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#111] text-paper pt-20 flex flex-col">
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
          <h2 className="text-sm font-serif truncate max-w-[120px] md:max-w-md">{book.title}</h2>
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

      <div className="flex-1 relative overflow-hidden flex">
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              className="w-60 bg-black/60 border-r border-paper/10 overflow-y-auto scrollbar-hide p-4 flex flex-col gap-4 z-20"
            >
              {Array.from({ length: numPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx + 1);
                    if (viewMode === 'single') setShowThumbnails(false);
                  }}
                  className={`relative aspect-[2/3] border-2 transition-all ${currentPage === idx + 1 ? 'border-accent' : 'border-transparent hover:border-paper/30'}`}
                >
                  <PDFPage pdf={pdf} pageNumber={idx + 1} scale={0.3} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/60 text-[10px] px-1 rounded">{idx + 1}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-black flex flex-col items-center">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="absolute top-4 left-4 z-30 p-2 bg-black/60 hover:bg-black/80 rounded-sm transition-colors"
          >
            {showThumbnails ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-accent" />
              <p className="text-xs uppercase tracking-widest opacity-50">Cargando Storybook...</p>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center gap-6">
              <FileWarning className="w-16 h-16 text-red-500/50" />
              <div className="max-w-md">
                <h3 className="text-xl font-serif mb-2">Error de Lectura</h3>
                <p className="text-sm opacity-60 leading-relaxed">{error}</p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-paper/20 rounded-sm hover:bg-paper/10 transition-colors text-xs uppercase tracking-widest"
              >
                Volver
              </button>
            </div>
          ) : viewMode === 'single' ? (
            <div className="flex-1 w-full flex items-center justify-center p-4 md:p-12 relative">
              <div className="relative max-h-full max-w-full shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex justify-center"
                  >
                    <PDFPage pdf={pdf} pageNumber={currentPage} scale={1.5} />
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="absolute left-0 top-0 w-1/4 h-full cursor-w-resize group flex items-center justify-start pl-4"
                >
                  <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden">
                    <ChevronLeft className="w-6 h-6" />
                  </div>
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === numPages}
                  className="absolute right-0 top-0 w-1/4 h-full cursor-e-resize group flex items-center justify-end pr-4"
                >
                  <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl w-full p-6 md:p-12 flex flex-col gap-12">
              {Array.from({ length: numPages }).map((_, idx) => (
                <div key={idx} className="shadow-2xl flex flex-col items-center">
                  <PDFPage pdf={pdf} pageNumber={idx + 1} scale={1.5} />
                  <p className="text-center mt-4 text-[10px] text-muted uppercase tracking-widest">Página {idx + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!loading && !error && viewMode === 'single' && (
        <div className="h-16 px-6 border-t border-paper/10 flex items-center justify-center gap-8 bg-black/40 backdrop-blur-sm">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-2 hover:bg-paper/10 rounded-full transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-xs uppercase tracking-[0.3em] font-medium">
            {currentPage} / {numPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === numPages}
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
