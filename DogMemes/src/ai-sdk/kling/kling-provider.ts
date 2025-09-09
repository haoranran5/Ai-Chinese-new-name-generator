import { KlingImageModel } from './kling-image-model';

export interface KlingProviderSettings {
  baseURL?: string;
  apiVersion?: string;
  accessKey?: string;
  secretKey?: string;
}

/**
 * Kling AI provider
 */
export class KlingProvider {
  readonly baseURL: string;
  readonly apiVersion: string;
  readonly accessKey?: string;
  readonly secretKey?: string;

  constructor(options: KlingProviderSettings = {}) {
    this.baseURL = options.baseURL ?? 'https://api-singapore.klingai.com';
    this.apiVersion = options.apiVersion ?? 'v1';
    this.accessKey = options.accessKey ?? process.env.KLING_ACCESS_KEY;
    this.secretKey = options.secretKey ?? process.env.KLING_SECRET_KEY;
  }

  /**
   * Create an image model
   */
  image(modelId: string, settings?: { accessKey?: string; secretKey?: string }): KlingImageModel {
    return new KlingImageModel(modelId, {
      provider: 'kling',
      baseURL: this.baseURL,
      apiVersion: this.apiVersion,
      accessKey: settings?.accessKey ?? this.accessKey,
      secretKey: settings?.secretKey ?? this.secretKey,
    });
  }
}
