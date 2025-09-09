import type { MDXComponents } from "mdx/types";
import { Metadata } from "next";

// 定义 MDX 组件的样式
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 为 MDX 页面提供默认的布局包装器
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    ),
    // 标题样式
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 scroll-m-20 tracking-tight"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-2xl font-semibold mb-4 mt-8 text-gray-800 dark:text-gray-200 scroll-m-20 border-b pb-2 tracking-tight first:mt-0"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-xl font-medium mb-3 mt-6 text-gray-800 dark:text-gray-200 scroll-m-20 tracking-tight"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-lg font-medium mb-2 mt-4 text-gray-800 dark:text-gray-200 scroll-m-20 tracking-tight"
        {...props}
      >
        {children}
      </h4>
    ),

    // 段落和文本样式
    p: ({ children, ...props }) => (
      <p
        className="text-gray-600 dark:text-gray-300 mb-4 leading-7 [&:not(:first-child)]:mt-6"
        {...props}
      >
        {children}
      </p>
    ),

    // 列表样式
    ul: ({ children, ...props }) => (
      <ul
        className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2 my-6 ml-6 [&>li]:mt-2"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="list-decimal pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2 my-6 ml-6 [&>li]:mt-2"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-2" {...props}>
        {children}
      </li>
    ),

    // 强调和链接样式
    strong: ({ children, ...props }) => (
      <strong
        className="font-semibold text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-gray-600 dark:text-gray-300" {...props}>
        {children}
      </em>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 font-medium"
        {...props}
      >
        {children}
      </a>
    ),

    // 代码样式
    code: ({ children, ...props }) => (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400 relative rounded-md"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 mt-6"
        {...props}
      >
        {children}
      </pre>
    ),

    // 引用样式
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-300 my-6 border-l-2 pl-6"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // 分隔线
    hr: ({ ...props }) => (
      <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
    ),

    // 表格样式
    table: ({ children, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table
          className="w-full border-collapse border border-gray-200 dark:border-gray-700"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-bold bg-gray-50 dark:bg-gray-800"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border border-gray-200 dark:border-gray-700 px-4 py-2"
        {...props}
      >
        {children}
      </td>
    ),

    // 自定义组件可以在这里添加
    ...components,
  };
}

// 为 MDX 页面提供默认的布局包装器
export function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}

// 根据文件夹名自动生成标题的映射
const folderTitleMap: Record<string, { title: string; description: string }> = {
  privacy: {
    title: "Privacy Policy",
    description: "Privacy Policy",
  },
  terms: {
    title: "Terms of Service",
    description: "Terms of Service",
  },
  "terms-of-service": {
    title: "Terms of Service",
    description: "Terms of Service",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "Privacy Policy",
  },
  about: {
    title: "About Us",
    description: "About Us",
  },
  contact: {
    title: "Contact Us",
    description: "Contact Us",
  },
};

// 根据文件夹名自动生成 metadata
export function generateMetadataFromFolder(folderName: string): Metadata {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Raven SaaS";

  const pageInfo = folderTitleMap[folderName] || {
    title: folderName.charAt(0).toUpperCase() + folderName.slice(1).replace(/-/g, ' '),
    description: `${folderName.charAt(0).toUpperCase() + folderName.slice(1).replace(/-/g, ' ')} information`,
  };

  return {
    title: `${pageInfo.title} - ${brandName}`,
    description: `${pageInfo.description} for ${brandName} platform`,
  };
}

// 导出默认的元数据生成函数
export function generateMetadata(title: string, description: string, canonicalUrl: string): Metadata {
  return {
    title: `${title} - ${process.env.NEXT_PUBLIC_BRAND_NAME || ""}`,
    description: `${description} for ${process.env.NEXT_PUBLIC_BRAND_NAME || ""
      } platform`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
