export interface ImageAsset {
  type: 'image';
  src: string;
  figmaNode?: string;
  alt?: string;
}

export interface IconAsset {
  type: 'icon';
  src: string;
  figmaNode?: string;
  alt?: string;
}

export type ContentAsset = ImageAsset | IconAsset;

const imageModules = import.meta.glob('/src/content/cases/*/images/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

const iconModules = import.meta.glob('/src/content/cases/*/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function isImageAsset(value: unknown): value is ImageAsset {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as ImageAsset).type === 'image' &&
    typeof (value as ImageAsset).src === 'string'
  );
}

export function isIconAsset(value: unknown): value is IconAsset {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as IconAsset).type === 'icon' &&
    typeof (value as IconAsset).src === 'string'
  );
}

export function isAssetRef(value: unknown): value is { type: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { type?: unknown }).type === 'string' &&
    typeof (value as { src?: unknown }).src === 'string'
  );
}

export function resolveImageSrc(src: string, slug: string): string | undefined {
  const url = imageModules[`/src/content/cases/${slug}/${src}`];
  return typeof url === 'string' ? url : undefined;
}

export function resolveIconSrc(src: string, slug: string): string | undefined {
  const url = iconModules[`/src/content/cases/${slug}/${src}`];
  return typeof url === 'string' ? url : undefined;
}