import { KlingProvider } from './kling-provider';

/**
 * Kling AI provider instance
 */
export const kling = new KlingProvider({
  baseURL: 'https://api-beijing.klingai.com',// https://api.klingai.com
  apiVersion: 'v1',
});

export type { KlingProvider } from './kling-provider';
export type { KlingImageModel } from './kling-image-model';
export type { KlingImageSettings } from './kling-image-settings';
