"use client";

import { useState, useRef } from "react";
import { Copy, Zap } from "lucide-react";
import { toast } from "sonner";

// 定义模型类型
type Model = "gpt-4o" | "gpt-4-turbo" | "gpt-3.5-turbo" | "deepseek-v3 0324";

interface ModelConfig {
  id: Model;
  name: string;
  provider: "openai" | "deepseek";
}

const models: ModelConfig[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "openai" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "openai" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "openai" },
  { id: "deepseek-v3 0324", name: "DeepSeek V3 0324 (free)", provider: "deepseek" },
];

export default function GenTextDemo() {
  const [role, setRole] = useState<string>("你是一个有用的AI助手。");
  const [prompt, setPrompt] = useState<string>("你好，请介绍一下你自己。");
  const [model, setModel] = useState<Model>("deepseek-v3 0324");
  const [loading, setLoading] = useState<boolean>(false);
  const [copying, setCopying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setGeneratedText(null);
    setIsDemo(false);

    // 如果有正在进行的请求，取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      if (isStreaming) {
        // 流式生成
        await handleStreamingGeneration(signal);
      } else {
        // 非流式生成
        await handleNonStreamingGeneration();
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("请求被取消");
        return;
      }
      setError(err instanceof Error ? err.message : "未知错误");
    } finally {
      setLoading(false);
    }
  };

  const handleStreamingGeneration = async (signal: AbortSignal) => {
    try {
      const selectedModel = models.find(m => m.id === model);
      const response = await fetch("/api/ai/gen-text-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          prompt,
          model,
          provider: selectedModel?.provider || "openai",
          maxTokens: 1000,
        }),
        signal, // 传递 AbortSignal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "流式文本生成失败");
      }

      // 检查是否支持流式响应
      if (!response.body) {
        throw new Error("浏览器不支持流式响应");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      // 读取流
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // 解码并添加到累积文本
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        setGeneratedText(accumulatedText);
      }
    } catch (err) {
      if (signal.aborted) {
        console.log("流式生成被取消");
      } else {
        throw err;
      }
    }
  };

  const handleNonStreamingGeneration = async () => {
    const selectedModel = models.find(m => m.id === model);
    const response = await fetch("/api/ai/gen-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        prompt,
        model,
        provider: selectedModel?.provider || "openai",
        maxTokens: 1000,
      }),
    });

    const data = await response.json();
    console.log("data", data);

    // 处理演示模式
    if (data.demo) {
      setIsDemo(true);
      if (data.error) setError(data.error);
      if (data.message) setMessage(data.message);
      if (data.text) {
        setGeneratedText(data.text);
      }
      return;
    }

    if (!response.ok) {
      throw new Error(data.error || "文本生成失败");
    }

    if (data.text) {
      setGeneratedText(data.text);
      toast.success("扣除积分3分");
    } else {
      setError("未返回文本");
    }
  };

  const handleCopy = async () => {
    if (!generatedText) return;

    setCopying(true);
    try {
      await navigator.clipboard.writeText(generatedText);
      setMessage("已复制到剪贴板");
      setTimeout(() => setMessage(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "复制失败");
    } finally {
      setCopying(false);
    }
  };

  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">文本生成演示</h1>

      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">API 调用</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm">
          {`### gen text ${isStreaming ? "stream" : ""}
Send Request
POST {baseUrl}/api/ai/${isStreaming ? "gen-text-stream" : "gen-text"}
Content-Type: application/json

{
  "role": "${role}",
  "prompt": "${prompt}",
  "model": "${model}",
  "maxTokens": 1000
}`}
        </pre>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">模型</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as Model)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
              >
                {models.map((modelOption) => (
                  <option key={modelOption.id} value={modelOption.id}>
                    {modelOption.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-4 flex flex-col items-center">
              <label className="block text-sm font-medium mb-2">流式生成</label>
              <button
                type="button"
                onClick={() => setIsStreaming(!isStreaming)}
                className={`p-2 rounded-md ${
                  isStreaming
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <Zap className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              角色设定
            </label>
            <textarea
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md"
              rows={2}
              placeholder="定义AI的角色和行为方式..."
            />
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

        <div className="flex mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "生成中..." : "生成文本"}
          </button>

          {loading && (
            <button
              type="button"
              onClick={cancelGeneration}
              className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              取消
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>{message}</p>
        </div>
      )}

      {isDemo && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">演示模式</p>
          <p>当前显示的是演示文本，请配置相应的 API 密钥以生成真实文本。</p>
          <p className="mt-2 text-sm">
            1. 创建{" "}
            <code className="bg-blue-50 px-1 py-0.5 rounded">.env.local</code>{" "}
            文件在项目根目录
            <br />
            2. 添加对应的 API 密钥：
            <br />
            <strong>OpenAI 模型：</strong>
            <br />
            <code className="bg-blue-50 px-1 py-0.5 rounded">
              OPENAI_API_KEY=sk-your-api-key
            </code>
            <br />
            <code className="bg-blue-50 px-1 py-0.5 rounded">
              OPENAI_BASE_URL=https://your-custom-url.com/v1 # 可选
            </code>
            <br />
            <strong>DeepSeek 模型：</strong>
            <br />
            <code className="bg-blue-50 px-1 py-0.5 rounded">
              DEEPSEEK_API_KEY=sk-your-deepseek-key
            </code>
            <br />
            3. 重启开发服务器
          </p>
        </div>
      )}

      {generatedText && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">生成结果</h3>
            <button
              onClick={handleCopy}
              disabled={copying}
              className={`flex items-center px-4 py-2 rounded-md ${
                copying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copying ? "复制中..." : "复制文本"}
            </button>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <div className="whitespace-pre-wrap">{generatedText}</div>
          </div>
        </div>
      )}
    </div>
  );
}
