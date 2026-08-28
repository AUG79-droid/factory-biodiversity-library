import { readFileSync } from 'node:fs';

const constants = readFileSync('src/constants.ts', 'utf8');
const index = readFileSync('src/nativeStorybooks.ts', 'utf8');
const chunks = Array.from({ length: 8 }, (_, i) => readFileSync(`src/storybooks/chunk-${String(i + 1).padStart(2, '0')}.ts`, 'utf8')).join('\n');

const slugs = [...constants.matchAll(/slug: '([^']+)'/g)].map(m => m[1]);
if (slugs.length !== 24) throw new Error(`Expected 24 catalogue editions, found ${slugs.length}`);
for (const slug of slugs) {
  if (!chunks.includes(`\"${slug}\"`)) throw new Error(`Missing native storybook data: ${slug}`);
}
if (!index.includes('STORYBOOK_CHUNK_08')) throw new Error('Native storybook index is incomplete');
if (/isa gil/i.test(chunks)) throw new Error('Incorrect author credit detected in native storybook content');
console.log(`Validated ${slugs.length} native storybook editions.`);
