import React from 'react';
import { useLocation } from 'react-router-dom';
import SEOHead from './SEOHead';
import StructuredData from './StructuredData';
import { useCanonicalUrl, useDuplicateContentPrevention } from '../hooks/useCanonicalUrl';
import { SEO_PAGES, FAQ_STRUCTURED_DATA, SITE_CONFIG } from '../config/seoConfig';
import { getPageKeyFromPath } from './seoManagerUtils';

export interface SEOManagerProps {
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

export default SEOManager;
