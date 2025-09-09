import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">API 演示</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/demo/gen-image"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">图片生成</h2>
          <p className="text-gray-600 dark:text-gray-300">
            使用 OpenAI DALL-E 3 模型生成图片
          </p>
          <div className="mt-4 text-blue-600 dark:text-blue-400">
            查看演示 &rarr;
          </div>
        </Link>

        {/* 可以在这里添加更多演示卡片 */}
      </div>
    </div>
  );
}
