import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const blockId = searchParams.get("blockId") || "hero";

  // 选择要渲染的区块组件的名称
  let componentName;
  switch (blockId) {
    case "features":
      componentName = "FeaturesSection";
      break;
    case "cta":
      componentName = "CTASection";
      break;
    case "hero":
    default:
      componentName = "HeroSection";
      break;
  }

  // 创建一个完整的 HTML 文档
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${blockId} 预览</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          @media (prefers-color-scheme: dark) {
            body {
              color-scheme: dark;
              background-color: #1a1a1a;
              color: white;
            }
          }
        </style>
      </head>
      <body>
        <div id="root">
          <!-- 这里不再使用服务端渲染的组件 -->
          <div id="component-placeholder" data-component="${componentName}"></div>
        </div>
        <script>
          // 客户端渲染脚本
          document.addEventListener('DOMContentLoaded', function() {
            const placeholder = document.getElementById('component-placeholder');
            const componentName = placeholder.getAttribute('data-component');
            
            // 这里可以添加一些提示信息
            placeholder.innerHTML = \`
              <div style="padding: 2rem; text-align: center;">
                <h2>预览组件: \${componentName}</h2>
                <p>在 Next.js App Router 中，API 路由不能直接渲染 React 组件。</p>
                <p>请在客户端页面中查看此组件。</p>
              </div>
            \`;
          });
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
