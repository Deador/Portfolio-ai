import React from 'react';
import styles from './AssetResolver.module.scss';
import { ContentAsset } from './assetTypes';
import { resolveImageSrc, resolveIconSrc } from './assetTypes';

interface AssetResolverProps {
  asset: ContentAsset;
  slug: string;
}

export const AssetResolver: React.FC<AssetResolverProps> = ({ asset, slug }) => {
  const isIcon = asset.type === 'icon';
  const src = isIcon ? resolveIconSrc(asset.src, slug) : resolveImageSrc(asset.src, slug);

  if (!src) {
    if (import.meta.env.DEV) {
      console.warn(
        `[AssetResolver] ${isIcon ? 'Icon' : 'Image'} not found: ${asset.src} (case "${slug}")`,
      );
    }
    return <div className={styles.placeholder}>{asset.src}</div>;
  }

  const alt = isIcon ? (asset.alt ?? '') : (asset.alt ?? asset.src);
  return <img className={isIcon ? styles.icon : styles.image} src={src} alt={alt} />;
};