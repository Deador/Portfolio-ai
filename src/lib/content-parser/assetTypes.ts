export interface ImageAsset {
  type: 'image';
  src: string;
  figmaNode?: string;
  alt?: string;
}

const imageModules = import.meta.glob('/src/content/cases/*/images/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export function isImageAsset(value: unknown): value is ImageAsset {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as ImageAsset).type === 'image' &&
    typeof (value as ImageAsset).src === 'string'
  );
}

export function resolveImageSrc(src: string, slug: string): string | undefined {
  return imageModules[`/src/content/cases/${slug}/${src}`];
}
