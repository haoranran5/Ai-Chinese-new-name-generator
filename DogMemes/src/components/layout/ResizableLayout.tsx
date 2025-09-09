import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import html2canvas from "html2canvas";

export interface ResizableLayoutImperativeHandle {
  resetLayout: () => void;
}

interface ResizableLayoutProps {
  mainPanelContent: React.ReactNode;
  initialMainPanelSize?: number; // 0-100
  showResizeHandle?: boolean;
  direction?: "horizontal" | "vertical";
  targetMainPanelWidthPx?: number | null; // 新添加的属性，用于设置面板宽度的像素值
  className?: string; // 添加 className 属性
}

const ResizableLayout = forwardRef<
  ResizableLayoutImperativeHandle | undefined,
  ResizableLayoutProps
>(
  (
    {
      mainPanelContent,
      initialMainPanelSize = 98,
      showResizeHandle = true,
      direction = "horizontal",
      targetMainPanelWidthPx = null,
      className,
    },
    ref
  ) => {
    const panelGroupRef = useRef<any>(null); // 使用 any 类型来避免类型错误
    const panelGroupDomRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [initialLayoutApplied, setInitialLayoutApplied] = useState(false);

    // 节流函数
    const throttle = (fn: Function, delay: number) => {
      let lastCall = 0;
      return (...args: any[]) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return fn(...args);
      };
    };

    useImperativeHandle(ref, () => ({
      resetLayout: () => {
        if (panelGroupRef.current) {
          panelGroupRef.current.setLayout([
            initialMainPanelSize,
            100 - initialMainPanelSize,
          ]);
        }
      },
    }));

    // 只在初始化和目标宽度变化时更新布局
    useEffect(() => {
      if (
        panelGroupRef.current &&
        panelGroupDomRef.current &&
        direction === "horizontal"
      ) {
        const totalWidth = panelGroupDomRef.current.offsetWidth;
        if (totalWidth > 0) {
          if (targetMainPanelWidthPx !== null) {
            let mainPanelPercentage =
              (targetMainPanelWidthPx / totalWidth) * 100;
            mainPanelPercentage = Math.max(
              10,
              Math.min(mainPanelPercentage, 99.9)
            );
            const secondPanelPercentage = 100 - mainPanelPercentage;
            panelGroupRef.current.setLayout([
              mainPanelPercentage,
              secondPanelPercentage,
            ]);
            setInitialLayoutApplied(true);
          } else {
            panelGroupRef.current.setLayout([
              initialMainPanelSize,
              100 - initialMainPanelSize,
            ]);
            setInitialLayoutApplied(true);
          }
        }
      }
    }, [targetMainPanelWidthPx, direction, initialMainPanelSize]);

    // 处理内容加载完成后的布局调整
    useEffect(() => {
      // 监听主内容区域变化
      if (contentRef.current && !contentLoaded) {
        const observer = new ResizeObserver(() => {
          setContentLoaded(true);
          // 当内容加载完成后，重新应用一次布局
          if (initialLayoutApplied && panelGroupRef.current) {
            // 延迟执行以确保所有内容已渲染完成
            setTimeout(() => {
              if (panelGroupRef.current) {
                const currentLayout = panelGroupRef.current.getLayout();
                panelGroupRef.current.setLayout([
                  currentLayout[0],
                  currentLayout[1],
                ]);
              }
            }, 300);
          }
        });

        observer.observe(contentRef.current);
        return () => {
          observer.disconnect();
        };
      }
    }, [contentLoaded, initialLayoutApplied]);

    // 监听窗口大小变化，调整布局
    useEffect(() => {
      const handleResize = throttle(() => {
        if (
          initialLayoutApplied &&
          panelGroupRef.current &&
          panelGroupDomRef.current
        ) {
          const totalWidth = panelGroupDomRef.current.offsetWidth;
          const currentLayout = panelGroupRef.current.getLayout();

          if (targetMainPanelWidthPx !== null && totalWidth > 0) {
            let mainPanelPercentage =
              (targetMainPanelWidthPx / totalWidth) * 100;
            mainPanelPercentage = Math.max(
              10,
              Math.min(mainPanelPercentage, 99.9)
            );
            const secondPanelPercentage = 100 - mainPanelPercentage;
            panelGroupRef.current.setLayout([
              mainPanelPercentage,
              secondPanelPercentage,
            ]);
          }
        }
      }, 200);

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [initialLayoutApplied, targetMainPanelWidthPx]);

    // 创建内容快照 - 优化快照创建
    const takeSnapshot = useCallback(async () => {
      if (contentRef.current) {
        try {
          setIsResizing(true); // 立即设置拖动状态，提高响应性

          // 减少渲染负担的快照配置
          const canvas = await html2canvas(contentRef.current, {
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            scale: 0.75, // 降低比例以提高性能
            ignoreElements: (element) =>
              element.tagName === "IFRAME" ||
              element.classList.contains("ignore-snapshot"),
          });
          const dataUrl = canvas.toDataURL("image/png", 0.8); // 压缩图片质量
          setSnapshotUrl(dataUrl);
        } catch (error) {
          console.error("Failed to create snapshot:", error);
          // 即使快照失败也继续设置拖动状态
          setIsResizing(true);
        }
      }
    }, []);

    // 处理拖动开始事件 - 优化为只触发一次
    const handleResizeStart = useCallback(() => {
      // 使用 requestAnimationFrame 确保在下一帧执行，减少当前帧的负担
      requestAnimationFrame(() => takeSnapshot());
    }, [takeSnapshot]);

    // 处理拖动结束事件 - 添加延迟以平滑过渡
    const handleResizeEnd = useCallback(() => {
      // 使用 setTimeout 延迟结束状态，让过渡更平滑
      setTimeout(() => {
        setIsResizing(false);
        // 清理快照资源
        setTimeout(() => {
          if (snapshotUrl) {
            setSnapshotUrl(null);
          }
        }, 300);
      }, 50);
    }, [snapshotUrl]);

    // 使用 useMemo 缓存主面板内容
    const memoizedContent = useMemo(() => mainPanelContent, [mainPanelContent]);

    return (
      <div
        ref={panelGroupDomRef}
        className={`w-full h-full relative ${className || ""}`}
      >
        <PanelGroup
          ref={panelGroupRef}
          direction={direction}
          className="w-full h-full"
          onLayout={(sizes) => {
            // 记录最新布局，避免重复计算
          }}
        >
          <Panel
            defaultSize={initialMainPanelSize}
            minSize={
              panelGroupDomRef.current &&
              panelGroupDomRef.current.offsetWidth > 0
                ? (390 / panelGroupDomRef.current.offsetWidth) * 100
                : 10
            }
            order={1}
            collapsible={false}
            onResize={() => {
              if (!isResizing) {
                setIsResizing(true);
                setTimeout(() => {
                  setIsResizing(false);
                }, 300);
              }
            }}
          >
            <div
              className={`h-full w-full relative ${
                isResizing ? "will-change-size" : ""
              }`}
              style={isResizing ? { willChange: "width, height" } : undefined}
            >
              <div ref={contentRef} className={isResizing ? "hidden" : "block"}>
                {memoizedContent}
              </div>
              {isResizing && (
                <div className="absolute inset-0 z-10">
                  {snapshotUrl ? (
                    <img
                      src={snapshotUrl}
                      alt="Content snapshot"
                      className="w-full h-full object-contain"
                      style={{ opacity: 0.7 }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <div className="text-gray-500">调整大小中...</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Panel>
          {showResizeHandle && (
            <PanelResizeHandle
              className={`group flex items-center justify-center focus:outline-none ${
                direction === "horizontal"
                  ? "w-6 cursor-col-resize relative hover:bg-gray-100/50"
                  : "h-2.5 cursor-row-resize"
              }`}
              onDragStart={handleResizeStart}
              onDragEnd={handleResizeEnd}
              style={{ touchAction: "none" }}
            >
              <div
                className="absolute inset-y-0 -left-[12px] w-12 flex items-center justify-center z-10"
                title="拖动调整面板宽度"
              >
                <div className="h-16 flex items-center justify-center group">
                  <div className="w-[3px] h-12 bg-gray-300 group-hover:bg-gray-400 transition-colors duration-200 rounded-full" />
                </div>
              </div>
            </PanelResizeHandle>
          )}
          <Panel
            defaultSize={100 - initialMainPanelSize}
            minSize={8}
            collapsible={true}
            collapsedSize={0}
            order={2}
          >
            {/* 此面板不需要内容 */}
          </Panel>
        </PanelGroup>
      </div>
    );
  }
);

ResizableLayout.displayName = "ResizableLayout";
export default ResizableLayout;
