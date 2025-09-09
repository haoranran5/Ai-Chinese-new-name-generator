"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Copy, Zap, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

// Markdown到HTML转换函数
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return "";

  let html = markdown;

  // 1. 先处理代码块（避免被其他规则影响）
  html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // 2. 处理标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 3. 处理粗体和斜体
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // 4. 处理链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

  // 5. 处理列表项
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 检查是否是列表项
    const unorderedMatch = line.match(/^[-*+] (.+)$/);
    const orderedMatch = line.match(/^\d+\. (.+)$/);

    if (unorderedMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      processedLines.push(`<li>${unorderedMatch[1]}</li>`);
    } else if (orderedMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      processedLines.push(`<li>${orderedMatch[1]}</li>`);
    } else {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
        listType = '';
      }

      // 处理普通段落
      if (line && !line.startsWith('<h') && !line.startsWith('<pre') && !line.startsWith('<code')) {
        processedLines.push(`<p>${line}</p>`);
      } else if (line) {
        processedLines.push(line);
      }
    }
  }

  // 关闭未关闭的列表
  if (inList) {
    processedLines.push(`</${listType}>`);
  }

  return processedLines.join('\n')
    .replace(/<p><\/p>/gim, '') // 清理空段落
    .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/gim, '$1') // 清理标题外的p标签
    .replace(/<p>(<pre>.*<\/pre>)<\/p>/gim, '$1') // 清理代码块外的p标签
    .trim();
};

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

// AI生成表单验证模式
const aiFormSchema = z.object({
  topic: z.string().min(2, {
    message: "主题至少需要2个字符",
  }),
  keywords: z.string().optional(),
  style: z.enum(["professional", "casual", "technical", "marketing"]),
  length: z.enum(["short", "medium", "long"]),
  model: z.enum(["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo", "deepseek-v3 0324"]),
  locale: z.enum(["en", "zh"]),
});

// 文章表单验证模式
const postFormSchema = z.object({
  title: z.string().min(2, {
    message: "标题至少需要2个字符",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug至少需要2个字符",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug只能包含小写字母、数字和连字符",
    }),
  description: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published"]),
  locale: z.enum(["en", "zh"]),
});

export default function AIPostForm() {
  const router = useRouter();
  const [step, setStep] = useState<"generate" | "edit">("generate");
  const [loading, setLoading] = useState(false);
  const [copying, setCopying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    description: string;
    content: string;
    slug: string;
  } | null>(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const aiForm = useForm<z.infer<typeof aiFormSchema>>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      topic: "",
      keywords: "",
      style: "professional",
      length: "medium",
      model: "deepseek-v3 0324",
      locale: "zh",
    },
  });

  const postForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      status: "draft",
      locale: "zh",
    },
  });

  // 生成文章内容的提示词模板
  const generatePrompt = (values: z.infer<typeof aiFormSchema>) => {
    const styleMap = {
      professional: "专业严谨",
      casual: "轻松随意",
      technical: "技术深度",
      marketing: "营销推广"
    };

    const lengthMap = {
      short: "800-1200字",
      medium: "1500-2500字", 
      long: "3000-5000字"
    };

    const localeMap = {
      zh: "中文",
      en: "English"
    };

    return `你是一个专业的内容创作者。请根据以下要求创建一篇高质量的文章。

**文章要求：**
- 主题：${values.topic}
${values.keywords ? `- 关键词：${values.keywords}` : ''}
- 写作风格：${styleMap[values.style]}
- 文章长度：${lengthMap[values.length]}
- 语言：${localeMap[values.locale]}

**重要：请严格按照以下JSON格式返回，不要添加任何其他文字说明：**

\`\`\`json
{
  "title": "文章标题",
  "description": "文章简介（100-200字）",
  "content": "文章正文内容（使用Markdown格式）",
  "slug": "url-friendly-slug"
}
\`\`\`

**内容要求：**
1. 标题要吸引人且准确反映内容
2. 简介要概括文章核心价值
3. 正文要结构清晰，有逻辑性
4. 使用标准Markdown格式：
   - 标题：# ## ###
   - 粗体：**文字**
   - 斜体：*文字*
   - 列表：- 或 * 开头
   - 代码：\`代码\` 或 \`\`\`代码块\`\`\`
   - 链接：[文字](URL)
5. slug要符合SEO规范，使用小写字母和连字符
6. 确保内容原创、有价值且符合指定的风格和长度要求
7. content字段中的Markdown内容将被转换为HTML用于富文本编辑器

**注意：只返回JSON格式的内容，不要添加任何解释或说明文字。**`;
  };

  const handleAIGenerate = async (values: z.infer<typeof aiFormSchema>) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    setGeneratedContent(null);

    // 如果有正在进行的请求，取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const selectedModel = models.find(m => m.id === values.model);
      const prompt = generatePrompt(values);
      
      if (isStreaming) {
        await handleStreamingGeneration(prompt, values.model, selectedModel?.provider || "openai", signal);
      } else {
        await handleNonStreamingGeneration(prompt, values.model, selectedModel?.provider || "openai");
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

  const handleStreamingGeneration = async (prompt: string, model: string, provider: string, signal: AbortSignal) => {
    try {
      const response = await fetch("/api/ai/gen-text-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "你是一个专业的内容创作者和编辑。",
          prompt,
          model,
          provider,
          maxTokens: 4000,
        }),
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "AI生成失败");
      }

      if (!response.body) {
        throw new Error("浏览器不支持流式响应");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
      }

      // 尝试解析JSON结果
      parseAndSetGeneratedContent(accumulatedText);
    } catch (err) {
      if (signal.aborted) {
        console.log("流式生成被取消");
      } else {
        throw err;
      }
    }
  };

  const handleNonStreamingGeneration = async (prompt: string, model: string, provider: string) => {
    const response = await fetch("/api/ai/gen-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "你是一个专业的内容创作者和编辑。",
        prompt,
        model,
        provider,
        maxTokens: 4000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI生成失败");
    }

    if (data.text) {
      parseAndSetGeneratedContent(data.text);
    } else {
      setError("未返回内容");
    }
  };

  const parseAndSetGeneratedContent = (text: string) => {
    try {
      console.log("原始生成内容:", text);

      // 多种方式尝试提取JSON
      let parsed = null;

      // 方法1: 尝试提取完整的JSON对象
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.log("JSON解析失败，尝试其他方法");
        }
      }

      // 方法2: 如果JSON解析失败，尝试提取代码块中的JSON
      if (!parsed) {
        const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (codeBlockMatch) {
          try {
            parsed = JSON.parse(codeBlockMatch[1]);
          } catch (e) {
            console.log("代码块JSON解析失败");
          }
        }
      }

      // 方法3: 如果还是失败，尝试手动解析内容
      if (!parsed) {
        console.log("尝试手动解析内容");
        const titleMatch = text.match(/["']?title["']?\s*:\s*["']([^"']+)["']/i);
        const descMatch = text.match(/["']?description["']?\s*:\s*["']([^"']+)["']/i);
        const contentMatch = text.match(/["']?content["']?\s*:\s*["']([\s\S]+?)["'](?:\s*,|\s*\})/i);
        const slugMatch = text.match(/["']?slug["']?\s*:\s*["']([^"']+)["']/i);

        if (titleMatch) {
          parsed = {
            title: titleMatch[1],
            description: descMatch ? descMatch[1] : "",
            content: contentMatch ? contentMatch[1] : text.substring(0, 1000) + "...",
            slug: slugMatch ? slugMatch[1] : generateSlugFromTitle(titleMatch[1])
          };
        }
      }

      // 方法4: 如果所有方法都失败，使用原始文本创建基本结构
      if (!parsed) {
        console.log("所有解析方法失败，使用原始文本");
        const topic = aiForm.getValues("topic");
        parsed = {
          title: topic || "AI生成的文章",
          description: "这是一篇由AI生成的文章",
          content: text,
          slug: generateSlugFromTitle(topic || "ai-generated-article")
        };
      }

      console.log("解析结果:", parsed);

      if (parsed && parsed.title) {
        const markdownContent = parsed.content || text;
        const htmlContent = markdownToHtml(markdownContent);

        setGeneratedContent({
          title: parsed.title,
          description: parsed.description || "",
          content: markdownContent, // 保存原始Markdown用于显示
          slug: parsed.slug || generateSlugFromTitle(parsed.title),
        });

        // 自动填充到文章表单 - 使用HTML格式给RichTextEditor
        postForm.setValue("title", parsed.title);
        postForm.setValue("description", parsed.description || "");
        postForm.setValue("content", htmlContent); // 转换为HTML
        postForm.setValue("slug", parsed.slug || generateSlugFromTitle(parsed.title));
        postForm.setValue("locale", aiForm.getValues("locale"));

        setStep("edit");
        setMessage("AI文章生成成功！请检查并编辑内容。");
      } else {
        throw new Error("无法提取有效的文章内容");
      }
    } catch (err) {
      console.error("解析生成内容失败:", err);
      setError(`生成的内容格式不正确: ${err instanceof Error ? err.message : "未知错误"}。请重试或检查AI模型配置。`);
    }
  };

  const generateSlugFromTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleCopy = async (text: string) => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(text);
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

  const handlePostSubmit = async (values: z.infer<typeof postFormSchema>) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "保存文章失败");
      }

      if (result.success) {
        setMessage("文章保存成功！");
        setTimeout(() => {
          router.push("/admin/posts");
          router.refresh();
        }, 1500);
      } else {
        setError(result.error || "保存失败，请稍后重试");
      }
    } catch (err) {
      console.error("保存文章时出错:", err);
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI 生成文章</h1>
        <Button onClick={() => router.back()}>返回</Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-50 text-green-500 p-4 mb-6 rounded-md">
          {message}
        </div>
      )}

      <div className="space-y-8">
        {step === "generate" && (
          <>


            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI 文章生成配置
                </CardTitle>
                <CardDescription>
                  配置AI生成参数，系统将自动创建高质量的文章内容
                </CardDescription>
              </CardHeader>
            <CardContent>
              <Form {...aiForm}>
                <form onSubmit={aiForm.handleSubmit(handleAIGenerate)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={aiForm.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>文章主题 *</FormLabel>
                          <FormControl>
                            <Input placeholder="例如：如何使用Next.js构建现代Web应用" {...field} />
                          </FormControl>
                          <FormDescription>
                            描述你想要生成的文章主题
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={aiForm.control}
                      name="keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>关键词</FormLabel>
                          <FormControl>
                            <Input placeholder="Next.js, React, Web开发" {...field} />
                          </FormControl>
                          <FormDescription>
                            用逗号分隔多个关键词（可选）
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={aiForm.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>写作风格 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="professional">专业严谨</SelectItem>
                              <SelectItem value="casual">轻松随意</SelectItem>
                              <SelectItem value="technical">技术深度</SelectItem>
                              <SelectItem value="marketing">营销推广</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={aiForm.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>文章长度 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="short">短文 (800-1200字)</SelectItem>
                              <SelectItem value="medium">中等 (1500-2500字)</SelectItem>
                              <SelectItem value="long">长文 (3000-5000字)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={aiForm.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>AI模型 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {models.map((model) => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={aiForm.control}
                      name="locale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>语言 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="zh">中文</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">流式生成</label>
                      <Button
                        type="button"
                        size="sm"
                        variant={isStreaming ? "default" : "outline"}
                        onClick={() => setIsStreaming(!isStreaming)}
                      >
                        <Zap className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading} className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4" />
                      {loading ? "AI生成中..." : "开始生成"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      disabled={loading}
                      onClick={() => {
                        aiForm.setValue("topic", "如何使用React Hooks提升开发效率");
                        aiForm.setValue("keywords", "React, Hooks, useState, useEffect, 前端开发");
                        aiForm.setValue("style", "technical");
                        aiForm.setValue("length", "medium");
                      }}
                    >
                      快速测试
                    </Button>

                    {loading && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={cancelGeneration}
                      >
                        取消
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          </>
        )}

        {step === "edit" && generatedContent && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>生成的文章内容</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setStep("generate")}
                    >
                      重新生成
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(JSON.stringify(generatedContent, null, 2))}
                      disabled={copying}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copying ? "复制中..." : "复制内容"}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">标题</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {generatedContent.title}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">简介</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {generatedContent.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">URL Slug</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded font-mono">
                    {generatedContent.slug}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">内容预览</h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowDebug(!showDebug)}
                      >
                        {showDebug ? "HTML" : "Markdown"}
                      </Button>
                    </div>
                  </div>
                  {showDebug ? (
                    <div className="text-sm bg-gray-50 p-3 rounded max-h-60 overflow-y-auto">
                      <h5 className="font-medium mb-2 text-gray-700">HTML预览：</h5>
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: markdownToHtml(generatedContent.content)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-60 overflow-y-auto">
                      <h5 className="font-medium mb-2 text-gray-700">Markdown原文：</h5>
                      <pre className="whitespace-pre-wrap">{generatedContent.content}</pre>
                    </div>
                  )}
                </div>

                {/* 转换信息 */}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    ✅ 格式转换信息
                  </h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Markdown内容已自动转换为HTML格式，可在富文本编辑器中正常编辑。
                    如需查看原始内容，请点击上方的"Markdown"按钮。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>编辑文章</CardTitle>
                <CardDescription>
                  检查并编辑AI生成的内容，然后保存为文章
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...postForm}>
                  <form onSubmit={postForm.handleSubmit(handlePostSubmit)} className="space-y-6">
                    <FormField
                      control={postForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标题 *</FormLabel>
                          <FormControl>
                            <Input placeholder="文章标题" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={postForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug *</FormLabel>
                          <FormControl>
                            <Input placeholder="url-friendly-slug" {...field} />
                          </FormControl>
                          <FormDescription>
                            文章链接格式: /blog/{field.value || "your-slug"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={postForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>描述</FormLabel>
                          <FormControl>
                            <Textarea placeholder="文章简短描述" rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={postForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>内容</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              content={field.value || ""}
                              onChange={field.onChange}
                              className="min-h-[400px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={postForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>状态 *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择状态" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">草稿</SelectItem>
                                <SelectItem value="published">已发布</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={postForm.control}
                        name="locale"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>语言 *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择语言" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="zh">中文</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading}>
                        {loading ? "保存中..." : "保存文章"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("generate")}
                      >
                        返回生成
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                      >
                        取消
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
          </div>
        )}

                    {/* 使用说明 */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200 text-lg">
                  💡 使用说明
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
                <p>1. <strong>填写文章主题</strong>：描述你想要生成的文章内容</p>
                <p>2. <strong>设置关键词</strong>：用逗号分隔，帮助AI更好地理解内容方向</p>
                <p>3. <strong>选择写作风格</strong>：专业严谨适合技术文档，轻松随意适合博客</p>
                <p>4. <strong>确定文章长度</strong>：根据需要选择短文、中等或长文</p>
                <p>5. <strong>选择AI模型</strong>：DeepSeek V3免费，GPT-4o质量最高</p>
                <p className="text-amber-600 dark:text-amber-400">
                  ⚠️ 如果生成失败，请检查AI模型的API密钥配置，或尝试其他模型
                </p>
              </CardContent>
            </Card>
      </div>
    </>
  );
}
