import React from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Free Chinese Zodiac Compatibility & Name Generator - Chinese Astrology Tools",
  description = "Free Chinese zodiac compatibility calculator, Chinese name generator with BaZi analysis, Feng Shui tips for home and office. Discover your Chinese zodiac sign, love compatibility, and authentic Chinese names with AI-powered cultural intelligence.",
  keywords = "chinese zodiac compatibility, chinese zodiac signs, chinese zodiac calculator, free chinese name generator, chinese astrology, feng shui tips, bazi analysis, chinese zodiac love match, zodiac compatibility calculator, chinese horoscope",
  canonicalUrl = "https://chinesecharactername.top/",
  ogTitle,
  ogDescription,
  ogImage = "https://chinesecharactername.top/android-chrome-512x512.png",
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
  noIndex = false,
  noFollow = false,
  children
}) => {
  React.useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Robots meta tag
    const robotsContent = [];
    if (noIndex) robotsContent.push('noindex');
    else robotsContent.push('index');
    
    if (noFollow) robotsContent.push('nofollow');
    else robotsContent.push('follow');
    
    robotsContent.push('max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1');
    updateMetaTag('robots', robotsContent.join(', '));

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // Open Graph tags
    updateMetaProperty('og:title', ogTitle || title);
    updateMetaProperty('og:description', ogDescription || description);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:type', ogType);
    updateMetaProperty('og:url', canonicalUrl);
    updateMetaProperty('og:site_name', 'Chinese Zodiac & Name Generator');
    updateMetaProperty('og:locale', 'en_US');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', twitterTitle || ogTitle || title);
    updateMetaTag('twitter:description', twitterDescription || ogDescription || description);
    updateMetaTag('twitter:image', twitterImage || ogImage);

    // Structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    // Cleanup function
    return () => {
      // Remove any dynamically added structured data
      const existingScript = document.querySelector('script[data-seo-structured-data]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, ogType, 
      twitterTitle, twitterDescription, twitterImage, structuredData, noIndex, noFollow]);

  return <>{children}</>;
};

// Helper functions
const updateMetaTag = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateMetaProperty = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateLinkTag = (rel: string, href: string) => {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
};

const updateStructuredData = (data: object) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[data-seo-structured-data]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-structured-data', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

export default SEOHead;
