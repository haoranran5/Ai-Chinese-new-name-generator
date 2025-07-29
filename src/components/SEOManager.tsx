import React from 'react';
import { useLocation } from 'react-router-dom';
import SEOHead from './SEOHead';
import StructuredData from './StructuredData';
import { useCanonicalUrl, useDuplicateContentPrevention } from '../hooks/useCanonicalUrl';
import { SEO_PAGES, FAQ_STRUCTURED_DATA, SITE_CONFIG } from '../config/seoConfig';

interface SEOManagerProps {
  pageKey?: keyof typeof SEO_PAGES;
  customSEO?: {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
    structuredData?: object;
    noIndex?: boolean;
  };
  children?: React.ReactNode;
}

const SEOManager: React.FC<SEOManagerProps> = ({ 
  pageKey, 
  customSEO, 
  children 
}) => {
  const location = useLocation();
  
  // Determine page key from location if not provided
  const currentPageKey = pageKey || getPageKeyFromPath(location.pathname);
  
  // Get SEO configuration for current page
  const seoConfig = customSEO || SEO_PAGES[currentPageKey] || SEO_PAGES.home;
  
  // Use canonical URL hook
  useCanonicalUrl({
    baseUrl: SITE_CONFIG.siteUrl,
    customCanonical: seoConfig.canonicalUrl,
    forceHttps: true,
    removeTrailingSlash: true
  });
  
  // Use duplicate content prevention
  useDuplicateContentPrevention();
  
  // Prepare structured data
  const structuredDataArray = [];
  
  // Add page-specific structured data
  if (seoConfig.structuredData) {
    structuredDataArray.push(seoConfig.structuredData);
  }
  
  // Add FAQ structured data for relevant pages
  if (['home', 'nameGenerator', 'compatibility'].includes(currentPageKey)) {
    structuredDataArray.push(FAQ_STRUCTURED_DATA);
  }
  
  return (
    <>
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogTitle={seoConfig.title}
        ogDescription={seoConfig.description}
        ogImage={SITE_CONFIG.defaultImage}
        twitterTitle={seoConfig.title}
        twitterDescription={seoConfig.description}
        twitterImage={SITE_CONFIG.defaultImage}
        noIndex={customSEO?.noIndex}
      />
      
      {structuredDataArray.map((data, index) => (
        <StructuredData 
          key={index}
          data={data}
          id={`structured-data-${index}`}
        />
      ))}
      
      {children}
    </>
  );
};

// Helper function to determine page key from pathname
const getPageKeyFromPath = (pathname: string): keyof typeof SEO_PAGES => {
  // Remove leading slash and hash fragments
  const cleanPath = pathname.replace(/^\//, '').split('#')[0];
  
  // Map paths to page keys
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

export default SEOManager;

// Higher-order component for easy page wrapping
export const withSEO = (
  WrappedComponent: React.ComponentType<any>,
  seoConfig?: {
    pageKey?: keyof typeof SEO_PAGES;
    customSEO?: SEOManagerProps['customSEO'];
  }
) => {
  const WithSEOComponent: React.FC<any> = (props) => {
    return (
      <SEOManager 
        pageKey={seoConfig?.pageKey}
        customSEO={seoConfig?.customSEO}
      >
        <WrappedComponent {...props} />
      </SEOManager>
    );
  };
  
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
    // Update document title
    if (seoData.title) {
      document.title = seoData.title;
    }
    
    // Update meta description
    if (seoData.description) {
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = seoData.description;
    }
    
    // Update meta keywords
    if (seoData.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = seoData.keywords;
    }
    
    // Update canonical URL
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
  const [seoData, setSeoData] = React.useState<any>(null);
  
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const collectSEOData = () => {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
        const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
        
        setSeoData({
          title,
          description,
          keywords,
          canonical,
          ogTitle,
          ogDescription,
          titleLength: title.length,
          descriptionLength: description.length
        });
      };
      
      collectSEOData();
      
      // Update on DOM changes
      const observer = new MutationObserver(collectSEOData);
      observer.observe(document.head, { childList: true, subtree: true, attributes: true });
      
      return () => observer.disconnect();
    }
  }, []);
  
  if (process.env.NODE_ENV !== 'development' || !seoData) {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      backgroundColor: '#000',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <button 
        onClick={() => setIsVisible(!isVisible)}
        style={{ 
          backgroundColor: '#333', 
          color: '#fff', 
          border: 'none', 
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        SEO Debug {isVisible ? '▼' : '▶'}
      </button>
      
      {isVisible && (
        <div style={{ marginTop: '10px' }}>
          <div><strong>Title:</strong> {seoData.title} ({seoData.titleLength} chars)</div>
          <div><strong>Description:</strong> {seoData.description.substring(0, 50)}... ({seoData.descriptionLength} chars)</div>
          <div><strong>Keywords:</strong> {seoData.keywords.substring(0, 30)}...</div>
          <div><strong>Canonical:</strong> {seoData.canonical}</div>
        </div>
      )}
    </div>
  );
};
