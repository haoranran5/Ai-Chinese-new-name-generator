# SEO 优化功能说明

本项目已集成完整的 SEO 优化功能，包括 robots.txt、sitemap.xml 自动生成、Meta 信息管理、结构化数据和 Canonical URLs 处理。

## 🚀 功能特性

### 1. robots.txt 优化
- ✅ 正确的爬虫规则配置
- ✅ 允许重要路径访问
- ✅ 静态资源访问权限
- ✅ Sitemap 位置声明
- ✅ 合理的爬取延迟设置

### 2. SEO Meta 组件
- ✅ 动态 Title 和 Description
- ✅ Open Graph 标签支持
- ✅ Twitter Card 配置
- ✅ 关键词管理
- ✅ Robots meta 标签控制

### 3. 结构化数据管理
- ✅ Schema.org 标准支持
- ✅ 多种数据类型（Website、Application、Article、FAQ）
- ✅ 动态结构化数据注入
- ✅ JSON-LD 格式输出

### 4. sitemap.xml 自动生成
- ✅ 自动生成和更新
- ✅ 支持动态路由
- ✅ 优先级和更新频率配置
- ✅ 构建时自动生成

### 5. Canonical URLs 和重复内容处理
- ✅ 自动 canonical URL 设置
- ✅ 重复内容检测和处理
- ✅ URL 规范化
- ✅ 条件性 noindex 支持

## 📁 文件结构

```
src/
├── components/
│   ├── SEOHead.tsx              # SEO Meta 标签组件
│   ├── StructuredData.tsx       # 结构化数据组件
│   └── SEOManager.tsx           # SEO 管理器（主组件）
├── config/
│   └── seoConfig.ts             # SEO 配置文件
├── hooks/
│   └── useCanonicalUrl.ts       # Canonical URL 钩子
├── utils/
│   ├── seoUtils.ts              # SEO 工具函数
│   └── sitemapGenerator.ts      # Sitemap 生成工具
└── examples/
    └── SEOIntegrationExample.tsx # 使用示例

scripts/
├── generateSitemap.js           # Sitemap 生成脚本
└── validateSEO.js               # SEO 验证脚本

public/
├── robots.txt                   # 爬虫规则文件
└── sitemap.xml                  # 站点地图（自动生成）
```

## 🛠️ 使用方法

### 1. 基本使用

```tsx
import SEOManager from './components/SEOManager';

function HomePage() {
  return (
    <SEOManager pageKey="home">
      <div>
        <h1>中文姓名生成器</h1>
        <p>页面内容...</p>
      </div>
    </SEOManager>
  );
}
```

### 2. 使用 HOC 模式

```tsx
import { withSEO } from './components/SEOManager';

const HomePage = withSEO(
  () => (
    <div>
      <h1>中文姓名生成器</h1>
      <p>页面内容...</p>
    </div>
  ),
  { pageKey: 'home' }
);
```

### 3. 自定义 SEO 配置

```tsx
<SEOManager
  customSEO={{
    title: '自定义页面标题',
    description: '自定义页面描述',
    keywords: '自定义,关键词',
    canonicalUrl: 'https://chinesecharactername.top/custom',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "自定义文章"
    }
  }}
>
  <YourPageContent />
</SEOManager>
```

### 4. 动态 SEO 更新

```tsx
import { useDynamicSEO } from './components/SEOManager';

function DynamicPage() {
  const { updateSEO } = useDynamicSEO();
  
  const handleContentChange = (newContent) => {
    updateSEO({
      title: `${newContent.title} - 中文姓名生成器`,
      description: newContent.description,
      canonicalUrl: `https://chinesecharactername.top/${newContent.slug}`
    });
  };
  
  return <div>动态内容...</div>;
}
```

## 🔧 配置说明

### SEO 页面配置

在 `src/config/seoConfig.ts` 中配置各页面的 SEO 信息：

```typescript
export const SEO_PAGES = {
  home: {
    title: '页面标题',
    description: '页面描述',
    keywords: '关键词',
    canonicalUrl: 'https://chinesecharactername.top/',
    structuredData: { /* 结构化数据 */ }
  },
  // 其他页面配置...
};
```

### 站点配置

```typescript
export const SITE_CONFIG = {
  siteName: '中文生肖姓名生成器',
  siteUrl: 'https://chinesecharactername.top',
  defaultImage: 'https://chinesecharactername.top/android-chrome-512x512.png',
  author: 'Chinese Zodiac & Feng Shui Digital Tools',
  locale: 'en_US'
};
```

## 📋 NPM 脚本

```bash
# 生成 sitemap.xml
npm run generate:sitemap

# 验证 SEO 配置
npm run seo:validate

# 构建（自动生成 sitemap）
npm run build
```

## 🔍 SEO 验证

运行 SEO 验证脚本检查配置：

```bash
npm run seo:validate
```

验证内容包括：
- Title 长度和内容
- Meta description 长度和内容
- 必需的 meta 标签
- Open Graph 标签
- Twitter Card 标签
- 结构化数据格式
- Canonical URL
- Sitemap 格式和内容
- robots.txt 配置

## 🎯 最佳实践

### 1. Title 优化
- 长度控制在 30-60 字符
- 包含主要关键词
- 每个页面使用唯一标题

### 2. Description 优化
- 长度控制在 120-160 字符
- 包含页面主要关键词
- 提供有价值的页面摘要

### 3. 关键词策略
- 每页 5-10 个相关关键词
- 避免关键词堆砌
- 使用长尾关键词

### 4. 结构化数据
- 使用适当的 Schema.org 类型
- 提供完整和准确的信息
- 定期验证 JSON-LD 格式

### 5. URL 规范化
- 使用 HTTPS
- 避免重复内容
- 设置正确的 canonical URL

## 🐛 调试工具

在开发环境中使用 SEO 调试器：

```tsx
import { SEODebugger } from './components/SEOManager';

function App() {
  return (
    <div>
      {/* 你的应用内容 */}
      <SEODebugger />
    </div>
  );
}
```

## 📈 性能监控

使用内置的 SEO 分析工具：

```tsx
import { analyzePage, generateSEOReport } from './utils/seoUtils';

// 分析当前页面 SEO
const analysis = analyzePage();
console.log(analysis);

// 生成 SEO 报告
const report = generateSEOReport();
console.log(report);
```

## 🔄 自动化

### 构建时自动生成
sitemap.xml 会在每次构建时自动更新，确保包含最新的页面信息。

### 持续集成
建议在 CI/CD 流程中添加 SEO 验证：

```yaml
# .github/workflows/ci.yml
- name: Validate SEO
  run: npm run seo:validate
```

## 📞 支持

如有问题或建议，请查看：
- 示例文件：`src/examples/SEOIntegrationExample.tsx`
- 配置文件：`src/config/seoConfig.ts`
- 工具函数：`src/utils/seoUtils.ts`
