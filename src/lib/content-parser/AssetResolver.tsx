import React from 'react';
import styles from './AssetResolver.module.scss';
import { ImageAsset } from './assetTypes';
import { resolveImageSrc } from './assetTypes';

interface AssetResolverProps {
  asset: ImageAsset;
  slug: string;
}

export const AssetResolver: React.FC<AssetResolverProps> = ({ asset, slug }) => {
  const src = resolveImageSrc(asset.src, slug);

  if (!src) {
    if (import.meta.env.DEV) {
      console.warn(`[AssetResolver] Image not found: ${asset.src} (case "${slug}")`);
    }
    return <div className={styles.placeholder}>{asset.src}</div>;
  }

  return <img className={styles.image} src={src} alt={asset.alt ?? asset.src} />;
};
