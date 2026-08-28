import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HashRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Download, Grid2X2, Languages, Maximize2, Minimize2, X } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { ALL_STORYBOOKS, ENGLISH_STORYBOOKS, SPANISH_STORYBOOKS, type Storybook } from './constants';
import { getNativeStorybook } from './nativeStorybooks';
import './index.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const assetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};

type PdfDoc = Awaited<ReturnType<typeof pdfjs.getDocument>['promise']>;

type UiLabels = {
  back: string;
  index: string;
  fullscreen: string;
  download: string;
  start: string;
  section: string;
  sections: string;
  interactive: string;
  collection: string;
  library: string;
  libraryIntro: string;
  homeKicker: string;
  homeTitle: string;
  homeEm: string;
  homeCopy: string;
};

const ui: Record<'es' | 'en', UiLabels> = {
  es: {
    back: 'Volver a biblioteca', index: 'Índice', fullscreen: 'Pantalla completa', download: 'Descargar PDF',
    start: 'Comenzar lectura', section: 'Sección', sections: 'secciones', interactive: 'LIBRO DIGITAL INTERACTIVO',
    collection: 'COLECCIÓN EN ESPAÑOL', library: 'Biblioteca digital', libraryIntro: 'Explora 12 storybooks ilustrados en formato digital interactivo.',
    homeKicker: 'COLECCIÓN DE STORYBOOKS DIGITALES', homeTitle: 'Historias para un paisaje industrial', homeEm: 'más consciente.',
    homeCopy: 'Una biblioteca visual y bilingüe para aprender sostenibilidad desde situaciones industriales reales.',
  },
  en: {
    back: 'Back to library', index: 'Contents', fullscreen: 'Fullscreen', download: 'Download PDF',
    start: 'Start reading', section: 'Section', sections: 'sections', interactive: 'INTERACTIVE DIGITAL BOOK',
    collection: 'ENGLISH COLLECTION', library: 'Digital library', libraryIntro: 'Explore 12 illustrated storybooks as native interactive digital publications.',
    homeKicker: 'DIGITAL STORYBOOK COLLECTION', homeTitle: 'Stories for a more thoughtful', homeEm: 'industrial landscape.',
    homeCopy: 'A bilingual visual library for learning sustainability through real industrial situations.',
  },
};

function PdfCrop({ pdf, page, side, className = '' }: { pdf: PdfDoc | null; page: number; side: 'left' | 'right'; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    let task: any;
    (async () => {
      if (!pdf || !canvasRef.current) return;
      const sourcePage = await pdf.getPage(page);
      const scale = Math.max(1.15, Math.min(2, window.devicePixelRatio || 1));
      const viewport = sourcePage.getViewport({ scale });
      const source = document.createElement('canvas');
      source.width = Math.ceil(viewport.width);
      source.height = Math.ceil(viewport.height);
      const sourceCtx = source.getContext('2d');
      if (!sourceCtx) return;
      task = sourcePage.render({ canvasContext: sourceCtx, viewport });
      await task.promise;
      if (cancelled || !canvasRef.current) return;
      const cropX = side === 'right' ? Math.floor(source.width / 2) : 0;
      const cropW = Math.ceil(source.width / 2);
      const target = canvasRef.current;
      target.width = cropW;
      target.height = source.height;
      target.getContext('2d')?.drawImage(source, cropX, 0, cropW, source.height, 0, 0, cropW, source.height);
    })().catch((err) => { if (err?.name !== 'RenderingCancelledException') console.error(err); });
    return () => { cancelled = true; task?.cancel?.(); };
  }, [pdf, page, side]);
  return <canvas ref={canvasRef} className={className} />;
}

function LazyPdfCover({ book }: { book: Storybook }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pdf, setPdf] = useState<PdfDoc | null>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '320px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const task = pdfjs.getDocument(assetUrl(book.pdfPath));
    task.promise.then(setPdf).catch(console.error);
    return () => { task.destroy(); };
  }, [book.pdfPath, visible]);
  return <div ref={hostRef} className="book-art">{pdf ? <PdfCrop pdf={pdf} page={1} side="right" className="cover-crop"/> : <div className="cover-loading"><BookOpen/></div>}</div>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="site-shell"><header className="site-header"><Link to="/" className="brand"><BookOpen /><span>Sustainable Aviation<small>Learning Library</small></span></Link><nav><Link to="/es">ES</Link><Link to="/en">EN</Link></nav></header>{children}</div>;
}

function Home() {
  const t = ui.es;
  return <Shell><main className="home"><p className="kicker">{t.homeKicker}</p><h1>{t.homeTitle}<br/><em>{t.homeEm}</em></h1><p>{t.homeCopy}</p><div><Link className="button primary" to="/es">Biblioteca ES <ChevronRight/></Link><Link className="button ghost" to="/en">Library EN</Link></div></main></Shell>;
}

function LibraryCard({ book }: { book: Storybook }) {
  const t = ui[book.language];
  return <Link to={`/book/${book.id}`} className="book-card featured">
    <LazyPdfCover book={book}/>
    <div className="book-meta"><p>{t.interactive}</p><h2>{book.title}</h2><strong>Almudena Urbieta</strong></div>
  </Link>;
}

function Library({ lang }: { lang: 'es' | 'en' }) {
  const books = lang === 'es' ? SPANISH_STORYBOOKS : ENGLISH_STORYBOOKS;
  const t = ui[lang];
  return <Shell><main className="library"><header><p className="kicker">{t.collection}</p><h1>{t.library}</h1><p>{t.libraryIntro}</p></header><section className="book-grid">{books.map(book => <LibraryCard book={book} key={book.id}/>)}</section></main></Shell>;
}

function NativeReader({ book }: { book: Storybook }) {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{x:number;y:number}|null>(null);
  const hideTimer = useRef<number|null>(null);
  const reduced = useReducedMotion();
  const native = getNativeStorybook(book.slug);
  const t = ui[book.language];
  const [pdf, setPdf] = useState<PdfDoc | null>(null);
  const [opened, setOpened] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [overview, setOverview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controls, setControls] = useState(true);
  const [direction, setDirection] = useState(1);
  const chapters = native.chapters;
  const pair = useMemo(() => ALL_STORYBOOKS.find(x => x.id === book.bilingualPairId), [book.bilingualPairId]);

  useEffect(() => {
    const task = pdfjs.getDocument(assetUrl(book.pdfPath));
    task.promise.then(setPdf).catch(console.error);
    return () => { task.destroy(); };
  }, [book.pdfPath]);

  useEffect(() => {
    const f = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', f);
    return () => document.removeEventListener('fullscreenchange', f);
  }, []);

  const reveal = useCallback(() => {
    setControls(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    if (opened && !overview) hideTimer.current = window.setTimeout(() => setControls(false), 2800);
  }, [opened, overview]);

  useEffect(() => { reveal(); return () => { if (hideTimer.current) window.clearTimeout(hideTimer.current); }; }, [reveal]);

  const go = useCallback((n:number) => {
    const target = Math.max(0, Math.min(chapters.length - 1, n));
    setDirection(target >= chapter ? 1 : -1);
    setChapter(target);
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }, [chapter, chapters.length, reduced]);
  const next = useCallback(() => go(chapter + 1), [chapter, go]);
  const prev = useCallback(() => go(chapter - 1), [chapter, go]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!opened) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'Escape') setOverview(false);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [next, opened, prev]);

  const toggleFullscreen = async () => {
    if (!rootRef.current) return;
    document.fullscreenElement ? await document.exitFullscreen() : await rootRef.current.requestFullscreen();
  };

  const current = chapters[chapter];
  const transition = reduced ? {duration:0} : {duration:.45,ease:[.22,1,.36,1] as [number,number,number,number]};
  const dense = current.paragraphs.join(' ').length > 780;

  return <div ref={rootRef} className={`premium-reader ${opened?'reading':'opening'} ${controls?'show-controls':'hide-controls'}`} onPointerMove={reveal} onPointerDown={reveal}>
    {!opened ? <main className="opening-stage">
      <motion.div className="opening-cover" initial={reduced?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={transition}><PdfCrop pdf={pdf} page={1} side="right" className="cover-crop"/></motion.div>
      <motion.div className="opening-copy" initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{...transition,delay:reduced?0:.1}}><p className="author">{native.author}</p><h1>{native.title}</h1><button className="button primary" onClick={()=>setOpened(true)}>{t.start} <ChevronRight/></button><a href={assetUrl(book.pdfPath)} download>{t.download}</a></motion.div>
    </main> : <>
      <header className="floating-tools"><button onClick={()=>navigate(`/${book.language}`)} aria-label={t.back}><ArrowLeft/></button><div>{pair&&<Link to={`/book/${pair.id}`} aria-label={pair.language==='en'?'English edition':'Edición en español'}><Languages/><span>{pair.language.toUpperCase()}</span></Link>}<button onClick={()=>setOverview(true)} aria-label={t.index}><Grid2X2/></button><button onClick={toggleFullscreen} aria-label={t.fullscreen}>{fullscreen?<Minimize2/>:<Maximize2/>}</button><a href={assetUrl(book.pdfPath)} download aria-label={t.download}><Download/></a></div></header>
      <main className="reading-stage" onTouchStart={e=>{touch.current={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)(dx<0?next:prev)();touch.current=null;}}>
        <AnimatePresence mode="wait" initial={false}><motion.article key={`${book.slug}-${current.number}`} className={`chapter ${current.layout}`} initial={reduced?{opacity:1}:{opacity:0,x:direction>0?24:-24,y:4}} animate={{opacity:1,x:0,y:0}} exit={reduced?{opacity:1}:{opacity:0,x:direction>0?-18:18,y:-2}} transition={transition}><figure><PdfCrop pdf={pdf} page={current.number+1} side="left" className="chapter-crop"/></figure><div className={`chapter-copy ${dense?'dense':''}`}><p className="chapter-number">{t.section} {String(current.number).padStart(2,'0')} · {chapters.length}</p><h1>{current.title}</h1>{current.paragraphs.map((p,i)=><p key={`${current.number}-${i}`}>{p}</p>)}</div></motion.article></AnimatePresence>
        <button className="nav-zone prev" onClick={prev} disabled={chapter===0} aria-label="Previous"><ChevronLeft/></button><button className="nav-zone next" onClick={next} disabled={chapter===chapters.length-1} aria-label="Next"><ChevronRight/></button>
      </main><footer className="progress"><span>{chapter+1} / {chapters.length}</span><div><i style={{width:`${((chapter+1)/chapters.length)*100}%`}}/></div></footer></>}
    <AnimatePresence>{overview&&<motion.div className="overview-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="overview-dismiss" onClick={()=>setOverview(false)} aria-label="Close"/><motion.section className="overview" initial={reduced?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} transition={transition}><header><div><p className="kicker">{t.index.toUpperCase()}</p><h2>{chapters.length} {t.sections}</h2></div><button onClick={()=>setOverview(false)}><X/></button></header><div className="overview-grid">{chapters.map((c,i)=><button key={c.number} className={i===chapter?'selected':''} onClick={()=>{go(i);setOverview(false);setOpened(true);}}><PdfCrop pdf={pdf} page={c.number+1} side="left" className="thumb-crop"/><span><small>{String(c.number).padStart(2,'0')}</small>{c.title}</span></button>)}</div></motion.section></motion.div>}</AnimatePresence>
  </div>;
}

function ReaderRoute() {
  const { id } = useParams();
  const book = ALL_STORYBOOKS.find(b => b.id === id);
  if (!book) return <Shell><main className="fallback"><h1>Libro no encontrado</h1></main></Shell>;
  const native = getNativeStorybook(book.slug);
  if (!native) return <Shell><main className="fallback"><h1>{book.title}</h1><a className="button primary" href={assetUrl(book.pdfPath)} target="_blank" rel="noreferrer">PDF</a></main></Shell>;
  return <NativeReader book={book}/>;
}

export default function App() {
  return <HashRouter><Routes><Route path="/" element={<Home/>}/><Route path="/es" element={<Library lang="es"/>}/><Route path="/en" element={<Library lang="en"/>}/><Route path="/book/:id" element={<ReaderRoute/>}/></Routes></HashRouter>;
}
