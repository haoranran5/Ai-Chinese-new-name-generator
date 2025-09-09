// Google Analytics 配置
export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

// OpenPanel 配置
export const OPENPANEL_CLIENT_ID =
  process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID || "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  // Google Analytics
  if (GA_TRACKING_ID && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }

  // OpenPanel
  if (OPENPANEL_CLIENT_ID && window.op) {
    window.op("track", "page_view", {
      path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  // Google Analytics
  if (GA_TRACKING_ID && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // OpenPanel
  if (OPENPANEL_CLIENT_ID && window.op) {
    window.op("track", action, {
      category: category,
      label: label,
      value: value,
    });
  }
};

// OpenPanel 专用事件追踪函数
export const openpanelEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (OPENPANEL_CLIENT_ID && window.op) {
    window.op("track", eventName, properties);
  }
};

// OpenPanel 用户识别
export const openpanelIdentify = (
  userId: string,
  properties?: Record<string, any>
) => {
  if (OPENPANEL_CLIENT_ID && window.op) {
    window.op("identify", userId, properties);
  }
};

// 声明全局函数
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
    op: (command: string, ...args: any[]) => void;
  }
}
