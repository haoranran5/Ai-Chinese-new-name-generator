/**
 * Kling image generation settings
 */
export interface KlingImageSettings {
  /**
   * Image aspect ratio
   * @default "1:1"
   */
  aspect_ratio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3';

  /**
   * Image style
   */
  style?: 'general' | 'anime' | 'photography' | 'art';

  /**
   * Negative prompt to avoid certain elements
   */
  negative_prompt?: string;

  /**
   * Number of inference steps
   * @default 25
   */
  steps?: number;

  /**
   * Guidance scale
   * @default 7.5
   */
  guidance_scale?: number;

  /**
   * Random seed for reproducible results
   */
  seed?: number;

  /**
   * Image quality
   * @default "standard"
   */
  quality?: 'standard' | 'high';
}
