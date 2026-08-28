import type { NativeStorybook } from './nativeStorybooks.types';
import { STORYBOOK_CHUNK_01 } from './storybooks/chunk-01';
import { STORYBOOK_CHUNK_02 } from './storybooks/chunk-02';
import { STORYBOOK_CHUNK_03 } from './storybooks/chunk-03';
import { STORYBOOK_CHUNK_04 } from './storybooks/chunk-04';
import { STORYBOOK_CHUNK_05 } from './storybooks/chunk-05';
import { STORYBOOK_CHUNK_06 } from './storybooks/chunk-06';
import { STORYBOOK_CHUNK_07 } from './storybooks/chunk-07';
import { STORYBOOK_CHUNK_08 } from './storybooks/chunk-08';

export const NATIVE_STORYBOOKS: Record<string, NativeStorybook> = {
  ...STORYBOOK_CHUNK_01,
  ...STORYBOOK_CHUNK_02,
  ...STORYBOOK_CHUNK_03,
  ...STORYBOOK_CHUNK_04,
  ...STORYBOOK_CHUNK_05,
  ...STORYBOOK_CHUNK_06,
  ...STORYBOOK_CHUNK_07,
  ...STORYBOOK_CHUNK_08,
};

export const getNativeStorybook = (slug: string) => NATIVE_STORYBOOKS[slug];
