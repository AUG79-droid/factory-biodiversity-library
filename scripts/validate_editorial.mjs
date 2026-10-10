import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { NATIVE_STORYBOOKS, getNativeStorybook } = await server.ssrLoadModule('/src/nativeStorybooks.ts');
  const generic = /^(Sección|Section)\s+\d+$/;
  let chapterCount = 0;

  for (const slug of Object.keys(NATIVE_STORYBOOKS)) {
    const book = getNativeStorybook(slug);
    if (!book) throw new Error(`Missing resolved storybook: ${slug}`);
    chapterCount += book.chapters.length;
    const titles = new Set();

    for (const chapter of book.chapters) {
      if (generic.test(chapter.title)) throw new Error(`Generic title remains: ${slug} ${chapter.number}`);
      if (titles.has(chapter.title)) throw new Error(`Duplicate chapter title remains: ${slug} ${chapter.title}`);
      titles.add(chapter.title);

      if (chapter.illustration?.kind === 'pdf') {
        const source = NATIVE_STORYBOOKS[chapter.illustration.slug];
        if (!source?.chapters.some(item => item.number === chapter.illustration.chapter)) {
          throw new Error(`Invalid PDF illustration source: ${slug} ${chapter.number}`);
        }
      }
      if (chapter.illustration?.kind === 'image' && !existsSync(resolve('public', chapter.illustration.path))) {
        throw new Error(`Missing illustration asset: ${chapter.illustration.path}`);
      }
    }
  }

  const blankPages = [
    ['biodiversity-monitoring', 8], ['biodiversity-monitoring', 9], ['fauna-urbana', 8],
    ['gestion-hidrica-humedales', 5], ['gestion-residuos-verdes', 6], ['green-waste-management', 6],
    ['operational-ecosystem', 8], ['operational-noise', 4], ['operational-noise', 8],
    ['operational-noise', 9], ['ruido-operativo', 5], ['soil-de-sealing', 3],
    ['soil-de-sealing', 8], ['soil-de-sealing', 9],
  ];

  for (const [slug, number] of blankPages) {
    const chapter = getNativeStorybook(slug)?.chapters.find(item => item.number === number);
    if (!chapter?.illustration) throw new Error(`Blank page has no illustration fallback: ${slug} ${number}`);
  }

  const spanishSuds = getNativeStorybook('sbn-drenaje-sostenible');
  if (!spanishSuds?.chapters.every(chapter => chapter.illustration?.kind === 'pdf' && chapter.illustration.slug === 'nbs-suds')) {
    throw new Error('Spanish SuDS volume is not fully normalized to the illustrated editorial source.');
  }

  console.log(`Validated 24 books and ${chapterCount} resolved chapters: no generic or duplicate titles; all visual fallbacks exist.`);
} finally {
  await server.close();
}
