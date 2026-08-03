import { createElement } from 'react';
import { AssetResolver } from './AssetResolver';
import { isImageAsset } from './assetTypes';

export function resolveContentAssets(value: unknown, slug: string): unknown {
  if (isImageAsset(value)) {
    return createElement(AssetResolver, { asset: value, slug });
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveContentAssets(item, slug));
  }

  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      result[key] = resolveContentAssets(item, slug);
    }
    return result;
  }

  return value;
}
