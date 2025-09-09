import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  //   devIndicators: false,
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  // 配置页面扩展名以支持 MDX
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // 配置 webpack 来处理 Node.js 模块
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 为客户端构建提供 Node.js 模块的 polyfill
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      };
    }
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  // 添加 markdown 插件
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withNextIntl(withMDX(nextConfig));
