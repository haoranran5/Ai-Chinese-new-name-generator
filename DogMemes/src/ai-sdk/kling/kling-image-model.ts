import type { ImageModelV1, ImageModelV1CallOptions, ImageModelV1CallWarning } from '@ai-sdk/provider';

export interface KlingImageModelSettings {
  provider: string;
  baseURL: string;
  apiVersion: string;
  accessKey?: string;
  secretKey?: string;
}

/**
 * Kling image model implementation that conforms to ImageModelV1 interface
 */
export class KlingImageModel implements ImageModelV1 {
  readonly specificationVersion = 'v1' as const;
  readonly provider: string;
  readonly modelId: string;
  readonly maxImagesPerCall: number | undefined = 4;
  readonly baseURL: string;
  readonly apiVersion: string;
  readonly accessKey?: string;
  readonly secretKey?: string;
  private cachedToken?: string;
  private tokenExpiry?: number;

  constructor(modelId: string, settings: KlingImageModelSettings) {
    this.provider = settings.provider;
    this.modelId = modelId;
    this.baseURL = settings.baseURL;
    this.apiVersion = settings.apiVersion;
    this.accessKey = settings.accessKey;
    this.secretKey = settings.secretKey;
  }

  /**
   * Generate JWT token for Kling AI authentication (with caching)
   */
  private async generateJWTToken(): Promise<string> {
    if (!this.accessKey || !this.secretKey) {
      throw new Error('Kling API access key and secret key are required');
    }

    const now = Math.floor(Date.now() / 1000);

    // 检查缓存的 token 是否仍然有效（提前 5 分钟过期）
    if (this.cachedToken && this.tokenExpiry && now < (this.tokenExpiry - 300)) {
      console.log('🔄 使用缓存的 JWT Token');
      return this.cachedToken;
    }

    console.log('🔑 生成新的 JWT Token');

    // JWT Header
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const expiry = now + 1800; // 有效时间：当前时间 + 30分钟

    // JWT Payload
    const payload = {
      iss: this.accessKey,
      exp: expiry,
      nbf: now - 5     // 开始生效时间：当前时间 - 5秒
    };

    // Base64URL 编码函数（Edge Runtime 兼容）
    const base64UrlEncode = (obj: any) => {
      const jsonString = JSON.stringify(obj);
      const encoder = new TextEncoder();
      const data = encoder.encode(jsonString);
      const base64 = btoa(String.fromCharCode(...data));
      return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };

    const headerEncoded = base64UrlEncode(header);
    const payloadEncoded = base64UrlEncode(payload);

    // 使用 Web Crypto API 创建签名
    const encoder = new TextEncoder();
    const keyData = encoder.encode(this.secretKey);
    const messageData = encoder.encode(`${headerEncoded}.${payloadEncoded}`);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const signatureArray = new Uint8Array(signatureBuffer);
    const signatureBase64 = btoa(String.fromCharCode(...signatureArray));
    const signature = signatureBase64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    const token = `${headerEncoded}.${payloadEncoded}.${signature}`;

    // 缓存 token 和过期时间
    this.cachedToken = token;
    this.tokenExpiry = expiry;

    // 调试：打印 JWT token 信息
    console.log('完整 Token:', token);
    console.log('Header:', JSON.stringify(header));
    console.log('Payload:', JSON.stringify(payload));
    console.log('当前时间戳:', now);
    console.log('AccessKey:', this.accessKey);
    console.log('SecretKey:', this.secretKey?.substring(0, 8) + '...');

    return token;
  }

  /**
   * Generate authentication headers
   */
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.generateJWTToken();

    console.log('Authorization Header:', `Bearer ${token}`);

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Generate image using Kling API - implements ImageModelV1.doGenerate
   */
  async doGenerate(options: ImageModelV1CallOptions): Promise<{
    images: Array<string> | Array<Uint8Array>;
    warnings: Array<ImageModelV1CallWarning>;
    response: {
      timestamp: Date;
      modelId: string;
      headers: Record<string, string> | undefined;
    };
  }> {
    const { prompt, n, size } = options;
    const timestamp = new Date();

    // 从 size 参数推导 aspect_ratio
    let aspect_ratio = '1:1';
    if (size) {
      const [width, height] = size.split('x').map(Number);
      if (width && height) {
        const ratio = width / height;
        if (Math.abs(ratio - 16/9) < 0.1) aspect_ratio = '16:9';
        else if (Math.abs(ratio - 9/16) < 0.1) aspect_ratio = '9:16';
        else if (Math.abs(ratio - 4/3) < 0.1) aspect_ratio = '4:3';
        else if (Math.abs(ratio - 3/4) < 0.1) aspect_ratio = '3:4';
        else if (Math.abs(ratio - 3/2) < 0.1) aspect_ratio = '3:2';
        else if (Math.abs(ratio - 2/3) < 0.1) aspect_ratio = '2:3';
      }
    }

    const requestBody = {
      model_name: this.modelId,
      prompt,
      aspect_ratio,
      n: n || 1
    };

    try {
      console.log('📤 第一步：提交图像生成任务');
      console.log('请求URL:', `${this.baseURL}/v1/images/generations`);
      console.log('请求体:', JSON.stringify(requestBody, null, 2));
      const authHeaders = await this.getAuthHeaders();
      console.log('请求头:', JSON.stringify(authHeaders, null, 2));

      // 第一步：提交图像生成任务
      const submitResponse = await fetch(`${this.baseURL}/v1/images/generations`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(requestBody),
      });

      console.log('📥 提交响应状态:', submitResponse.status, submitResponse.statusText);

      const responseHeaders: Record<string, string> = {};
      submitResponse.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('响应头:', JSON.stringify(responseHeaders, null, 2));

      if (!submitResponse.ok) {
        const errorData = await submitResponse.json().catch(() => ({}));
        console.error('❌ 提交失败，错误数据:', JSON.stringify(errorData, null, 2));
        throw new Error(`Kling API error: ${submitResponse.status} ${submitResponse.statusText} - ${JSON.stringify(errorData)}`);
      }

      const submitData = await submitResponse.json();
      console.log('✅ 提交成功，响应数据:', JSON.stringify(submitData, null, 2));

      if (!submitData.data?.task_id) {
        throw new Error('No task_id returned from Kling API');
      }

      const taskId = submitData.data.task_id;
      console.log('🔄 第二步：开始轮询任务状态');
      console.log('任务ID:', taskId);

      // 第二步：轮询任务状态直到完成
      const maxAttempts = 30; // 最多轮询30次
      const pollInterval = 2000; // 每2秒轮询一次

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        console.log(`⏳ 等待 ${pollInterval/1000} 秒后进行第 ${attempt + 1} 次轮询...`);
        await new Promise(resolve => setTimeout(resolve, pollInterval));

        console.log(`📡 第 ${attempt + 1} 次轮询任务状态`);
        const pollAuthHeaders = await this.getAuthHeaders();
        const pollResponse = await fetch(`${this.baseURL}/${this.apiVersion}/images/generations/${taskId}`, {
          method: 'GET',
          headers: pollAuthHeaders,
        });

        console.log('轮询响应状态:', pollResponse.status, pollResponse.statusText);

        if (!pollResponse.ok) {
          console.warn(`❌ 第 ${attempt + 1} 次轮询失败:`, pollResponse.status);
          continue;
        }

        const pollData = await pollResponse.json();
        console.log('轮询响应数据:', JSON.stringify(pollData, null, 2));

        console.log('任务状态:', pollData.task_status);

        if (pollData.task_status === 'succeed' && pollData.task_result?.images) {
          console.log('✅ 任务成功完成！开始处理图像...');
          // 任务成功完成
          const images: string[] = [];
          const warnings: ImageModelV1CallWarning[] = [];

          console.log('图像数量:', pollData.task_result.images.length);

          for (const item of pollData.task_result.images) {
            console.log('处理图像:', item.url);
            if (item.url) {
              try {
                // 下载图像并转换为 base64
                console.log('📥 下载图像中...');
                const imageResponse = await fetch(item.url);
                console.log('图像下载响应状态:', imageResponse.status);

                const arrayBuffer = await imageResponse.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString('base64');
                console.log('✅ 图像转换为 base64 成功，长度:', base64.length);
                images.push(base64);
              } catch (error) {
                console.warn('❌ 下载图像失败:', item.url, error);
                warnings.push({
                  type: 'other',
                  message: `Failed to download image from URL: ${item.url}`,
                });
              }
            }
          }

          // 检查是否有不支持的设置
          if (size && !['512x512', '1024x1024', '1024x768', '768x1024'].includes(size)) {
            warnings.push({
              type: 'unsupported-setting',
              setting: 'size',
              details: `Size ${size} may not be supported, using aspect ratio instead`,
            });
          }

          console.log('🎉 图像生成完成！返回结果...');
          return {
            images,
            warnings,
            response: {
              timestamp,
              modelId: this.modelId,
              headers: Object.keys(responseHeaders).length > 0 ? responseHeaders : undefined,
            },
          };
        } else if (pollData.task_status === 'failed') {
          console.error('❌ 任务失败:', pollData.task_status_msg || 'Unknown error');
          throw new Error(`Kling image generation failed: ${pollData.task_status_msg || 'Unknown error'}`);
        }

        // 任务仍在进行中，继续轮询
        console.log('⏳ 任务仍在进行中，继续轮询...');
      }

      console.error('⏰ 轮询超时，任务未完成');
      throw new Error('Kling image generation timed out after maximum polling attempts');
    } catch (error) {
      console.error('Kling API request failed:', error);
      throw error;
    }
  }
}
