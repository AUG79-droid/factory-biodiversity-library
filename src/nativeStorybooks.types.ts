export type NativeStorybookChapter = { number: number; title: string; paragraphs: string[]; layout: 'image-left' | 'image-right' | 'text-only' };
export type NativeStorybook = { title: string; author: string; chapters: NativeStorybookChapter[] };
