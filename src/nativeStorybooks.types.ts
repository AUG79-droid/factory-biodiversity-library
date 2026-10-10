export type ChapterIllustration =
  | { kind: 'pdf'; slug: string; chapter: number }
  | { kind: 'image'; path: string };

export type NativeStorybookChapter = {
  number: number;
  title: string;
  paragraphs: string[];
  layout: 'image-left' | 'image-right' | 'text-only';
  illustration?: ChapterIllustration;
};
export type NativeStorybook = { title: string; author: string; chapters: NativeStorybookChapter[] };
