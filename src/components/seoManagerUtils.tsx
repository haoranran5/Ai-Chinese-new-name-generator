// SEO工具函数和HOC
import React from 'react';
import { SEO_PAGES } from '../config/seoConfig';
import SEOManager from './SEOManager';

// Helper function to determine page key from pathname
export const getPageKeyFromPath = (pathname: string): keyof typeof SEO_PAGES => {
  const cleanPath = pathname.replace(/^\//, '').split('#')[0];
  const pathMap: Record<string, keyof typeof SEO_PAGES> = {
    '': 'home',
    'nameGenerator': 'nameGenerator',
    'compatibility': 'compatibility',
    'fengShuiTips': 'fengShuiTips',
    'astrology': 'astrology',
    'about': 'about'
  };
  return pathMap[cleanPath] || 'home';
};

// Higher-order component for easy page wrapping
export const withSEO = (
  WrappedComponent: React.ComponentType<Record<string, unknown>>,
  seoConfig?: {
    pageKey?: keyof typeof SEO_PAGES;
    customSEO?: {
      title?: string;
      description?: string;
      keywords?: string;
      canonicalUrl?: string;
      structuredData?: object;
      noIndex?: boolean;
    };
  }
) => {
  const WithSEOComponent: React.FC<Record<string, unknown>> = (props) => (
    <SEOManager 
      pageKey={seoConfig?.pageKey}
      customSEO={seoConfig?.customSEO}
    >
      <WrappedComponent {...props} />
    </SEOManager>
  );
  WithSEOComponent.displayName = `withSEO(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithSEOComponent;
};

// Hook for dynamic SEO updates
export const useDynamicSEO = () => {
  const updateSEO = React.useCallback((seoData: {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
  }) => {
    if (seoData.title) document.title = seoData.title;
    if (seoData.description) {
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = seoData.description;
    }
    if (seoData.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = seoData.keywords;
    }
    if (seoData.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = seoData.canonicalUrl;
    }
  }, []);
  return { updateSEO };
};

// Component for SEO debugging (development only)
export const SEODebugger: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [seoData, setSeoData] = React.useState<Record<string, unknown> | null>(null);
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const collectSEOData = () => {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
        const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
        setSeoData({ title, description, keywords, canonical, ogTitle, ogDescription, titleLength: title.length, descriptionLength: description.length });
      };
      collectSEOData();
      const observer = new MutationObserver(collectSEOData);
      observer.observe(document.head, { childList: true, subtree: true, attributes: true });
      return () => observer.disconnect();
    }
  }, []);
  if (process.env.NODE_ENV !== 'development' || !seoData) return null;
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '5px', fontSize: '12px', maxWidth: '300px' }}>
      <button onClick={() => setIsVisible(!isVisible)} style={{ backgroundColor: '#333', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>
        SEO Debug {isVisible ? '\u25bc' : '\u25b6'}
      </button>
      {isVisible && (
        <div style={{ marginTop: '10px' }}>
          <div><strong>Title:</strong> {seoData.title} ({seoData.titleLength} chars)</div>
          <div><strong>Description:</strong> {String(seoData.description).substring(0, 50)}... ({seoData.descriptionLength} chars)</div>
          <div><strong>Keywords:</strong> {String(seoData.keywords).substring(0, 30)}...</div>
          <div><strong>Canonical:</strong> {seoData.canonical}</div>
        </div>
      )}
    </div>
  );
};