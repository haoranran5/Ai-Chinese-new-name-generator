"use client";

import { useState } from "react";
import { Download } from "lucide-react";

// 定义提供商和模型类型
type Provider = "openai" | "replicate" | "kling";
type Model = "dall-e-3" | "flux-1.1-pro" | "kling-v1";

interface ProviderConfig {
  name: string;
  models: {
    id: Model;
    name: string;
  }[];
}

const providers: Record<Provider, ProviderConfig> = {
  openai: {
    name: "OpenAI",
    models: [{ id: "dall-e-3", name: "DALL-E 3" }],
  },
  replicate: {
    name: "Replicate",
    models: [{ id: "flux-1.1-pro", name: "Flux Pro 1.1" }],
  },
  kling: {
    name: "Kling",
    models: [{ id: "kling-v1", name: "Kling 1.0"}],
  },
};

export default function GenImageDemo() {
  const [prompt, setPrompt] = useState<string>(
    "a beautiful girl running with 2 cats"
  );
  const [provider, setProvider] = useState<Provider>("openai");
  const [model, setModel] = useState<Model>("dall-e-3");
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState<boolean>(false);

  // 当提供商改变时更新模型
  const handleProviderChange = (newProvider: Provider) => {
    setProvider(newProvider);
    setModel(providers[newProvider].models[0].id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setImageUrl(null);
    setIsDemo(false);

    try {
      const response = await fetch("/api/ai/gen-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          provider,
          model,
          ...(provider === "replicate" && {
            providerOptions: {
              replicate: {
                output_quality: 90,
              },
            },
          }),
          ...(provider === "kling" && {
            providerOptions: {
              kling: {
                aspect_ratio: "1:1",
                style: "general",
                quality: "standard",
              },
            },
          }),
        }),
      });

      const data = await response.json();
      console.log("data", data);

      // 处理演示模式
      if (data.demo) {
        setIsDemo(true);
        if (data.error) setError(data.error);
        if (data.message) setMessage(data.message);
        if (data.images && data.images.length > 0) {
          setImageUrl(data.images[0]);
        }
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "图片生成失败");
      }

      if (data.images && data.images.length > 0) {
        setImageUrl(data.images[0]);
      } else {
        setError("未返回图片");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "未知错误");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    setDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // 使用提示词的前20个字符作为文件名
      const fileName = `${prompt.slice(0, 20).trim()}.png`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "下载图片失败");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">图片生成演示</h1>

      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">API 调用</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm">
          {`### gen image
Send Request
POST {baseUrl}/api/ai/gen-image
Content-Type: application/json

{
  "prompt": "${prompt}",
  "provider": "${provider}",
  "model": "${model}"${
            provider === "replicate"
              ? `,
  "providerOptions": {
    "replicate": {
      "output_quality": 90
    }
  }`
              : provider === "kling"
              ? `,
  "providerOptions": {
    "kling": {
      "aspect_ratio": "1:1",
      "style": "general",
      "quality": "standard"
    }
  }`
              : ""
          }
}`}
        </pre>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                AI 提供商
              </label>
              <select
                value={provider}
                onChange={(e) =>
                  handleProviderChange(e.target.value as Provider)
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
              >
                {Object.entries(providers).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">模型</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as Model)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
              >
                {providers[provider].models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              提示词
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md"
              rows={3}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "生成中..." : "生成图片"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>{message}</p>
        </div>
      )}

      {isDemo && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">演示模式</p>
          <p>当前显示的是演示图片，请配置相应的 API 密钥以生成真实图片。</p>
          <p className="mt-2 text-sm">
            1. 创建{" "}
            <code className="bg-blue-50 px-1 py-0.5 rounded">.env.local</code>{" "}
            文件在项目根目录
            <br />
            2. 添加对应的 API 密钥：
            <br />
            <code className="bg-blue-50 px-1 py-0.5 rounded">
              OPENAI_API_KEY=sk-your-api-key
            </code>
            <br />
            <code className="bg-blue-50 px-1 py-0.5 rounded">
              REPLICATE_API_KEY=r8_your-api-key
            </code>
            <br />
            3. 重启开发服务器
          </p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">生成结果</h3>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`flex items-center px-4 py-2 rounded-md ${
                downloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              {downloading ? "下载中..." : "下载图片"}
            </button>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <img src={imageUrl} alt={prompt} className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
