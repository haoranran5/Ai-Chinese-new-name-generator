import { useEffect, useRef, useState, ReactNode } from "react";

interface ResponsiveComponentPreviewProps {
  component: ReactNode;
  className?: string;
}

/**
 * 响应式组件预览容器
 * 使用 ResizeObserver 监听容器尺寸变化，并在尺寸变化时更新组件
 */
export default function ResponsiveComponentPreview({
  component,
  className = "",
}: ResponsiveComponentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [key, setKey] = useState(0); // 用于强制重新渲染组件

  useEffect(() => {
    if (!containerRef.current) return;

    // 创建 ResizeObserver 实例
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        // 只有当宽度实际变化时才更新维度和重新渲染
        setDimensions((prevDimensions) => {
          if (prevDimensions.width !== width) {
            // 宽度变化时增加 key，强制组件重新渲染
            setKey((prev) => prev + 1);
            return { width, height };
          }
          return prevDimensions;
        });
      }
    });

    // 开始观察容器
    resizeObserver.observe(containerRef.current);

    // 初始化尺寸
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }

    // 清理函数
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 日志尺寸变化，方便调试
  useEffect(() => {
    console.log(
      `Container dimensions: ${dimensions.width}x${dimensions.height}`
    );
  }, [dimensions]);

  // 渲染带有关键帧的组件，确保在尺寸变化时重新渲染
  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden transition-all duration-300 ${className}`}
      style={{ minHeight: "200px" }} // 确保容器始终有最小高度
    >
      <div key={key} style={{ width: "100%" }}>
        {component}
      </div>
    </div>
  );
}
