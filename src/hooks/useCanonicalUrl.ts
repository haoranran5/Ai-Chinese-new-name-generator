import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CanonicalUrlOptions {
  baseUrl?: string;
  forceHttps?: boolean;
  removeTrailingSlash?: boolean;
  removeQueryParams?: boolean;
  customCanonical?: string;
}

export const useCanonicalUrl = (options: CanonicalUrlOptions = {}) => {
  const location = useLocation();
  
  const {
    baseUrl = 'https://chinesecharactername.top',
    forceHttps = true,
    removeTrailingSlash = true,
    removeQueryParams = false,
    customCanonical
  } = options;

  useEffect(() => {
    let canonicalUrl: string;

    if (customCanonical) {
      canonicalUrl = customCanonical;
    } else {
      // Build canonical URL from current location
      let pathname = location.pathname;
      
      // Remove trailing slash if needed
      if (removeTrailingSlash && pathname.length > 1 && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
      }
      
      // Add query params if not removing them
      let search = '';
      if (!removeQueryParams && location.search) {
        search = location.search;
      }
      
      canonicalUrl = `${baseUrl}${pathname}${search}`;
    }

    // Force HTTPS if needed
    if (forceHttps && canonicalUrl.startsWith('http://')) {
      canonicalUrl = canonicalUrl.replace('http://', 'https://');
    }

    // Update or create canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = canonicalUrl;

    // Cleanup function
    return () => {
      // Don't remove the canonical link on cleanup as it should persist
      // until the next page sets a new one
    };
  }, [location, baseUrl, forceHttps, removeTrailingSlash, removeQueryParams, customCanonical]);

  return null;
};

// Utility function to generate canonical URL
export const generateCanonicalUrl = (
  pathname: string,
  options: CanonicalUrlOptions = {}
): string => {
  const {
    baseUrl = 'https://chinesecharactername.top',
    forceHttps = true,
    removeTrailingSlash = true
  } = options;

  let cleanPathname = pathname;
  
  // Remove trailing slash if needed
  if (removeTrailingSlash && cleanPathname.length > 1 && cleanPathname.endsWith('/')) {
    cleanPathname = cleanPathname.slice(0, -1);
  }
  
  let canonicalUrl = `${baseUrl}${cleanPathname}`;
  
  // Force HTTPS if needed
  if (forceHttps && canonicalUrl.startsWith('http://')) {
    canonicalUrl = canonicalUrl.replace('http://', 'https://');
  }
  
  return canonicalUrl;
};

// Hook for handling duplicate content prevention
export const useDuplicateContentPrevention = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle common duplicate content issues
    
    // 1. Redirect www to non-www (or vice versa) - this would typically be handled at server level
    // 2. Handle trailing slashes
    // 3. Handle case sensitivity
    // 4. Handle query parameter order
    
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;
    
    // Check for trailing slash issues (redirect if needed)
    if (currentPathname.length > 1 && currentPathname.endsWith('/')) {
      const newUrl = currentUrl.replace(/\/$/, '');
      if (newUrl !== currentUrl) {
        // In a real app, you might want to use router.replace() instead
        console.log(`Canonical URL should be: ${newUrl}`);
      }
    }
    
    // Add noindex meta tag for certain conditions
    const shouldNoIndex = checkIfShouldNoIndex(location.pathname, location.search);
    
    let robotsMetaTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMetaTag) {
      robotsMetaTag = document.createElement('meta');
      robotsMetaTag.name = 'robots';
      document.head.appendChild(robotsMetaTag);
    }
    
    if (shouldNoIndex) {
      robotsMetaTag.content = 'noindex, nofollow';
    } else {
      robotsMetaTag.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    }
    
  }, [location]);
};

// Function to determine if a page should be noindexed
const checkIfShouldNoIndex = (pathname: string, search: string): boolean => {
  // Add logic to determine when to noindex
  // Examples:
  
  // 1. Pages with certain query parameters
  const searchParams = new URLSearchParams(search);
  if (searchParams.has('debug') || searchParams.has('test')) {
    return true;
  }
  
  // 2. Certain paths that shouldn't be indexed
  const noIndexPaths = [
    '/admin',
    '/private',
    '/test',
    '/debug'
  ];
  
  if (noIndexPaths.some(path => pathname.startsWith(path))) {
    return true;
  }
  
  // 3. Pages with multiple query parameters that might create duplicate content
  if (searchParams.toString().split('&').length > 3) {
    return true;
  }
  
  return false;
};

// Utility function to normalize URLs for canonical purposes
export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    
    // Remove trailing slash
    if (urlObj.pathname.length > 1 && urlObj.pathname.endsWith('/')) {
      urlObj.pathname = urlObj.pathname.slice(0, -1);
    }
    
    // Sort query parameters for consistency
    const sortedParams = new URLSearchParams();
    Array.from(urlObj.searchParams.keys())
      .sort()
      .forEach(key => {
        sortedParams.set(key, urlObj.searchParams.get(key) || '');
      });
    
    urlObj.search = sortedParams.toString();
    
    return urlObj.toString();
  } catch {
    return url;
  }
};

// Hook for managing alternate language versions (hreflang)
export const useHreflang = (alternateVersions: Array<{ lang: string; url: string }> = []) => {
  useEffect(() => {
    // Remove existing hreflang links
    const existingHreflangLinks = document.querySelectorAll('link[hreflang]');
    existingHreflangLinks.forEach(link => link.remove());
    
    // Add new hreflang links
    alternateVersions.forEach(version => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = version.lang;
      link.href = version.url;
      document.head.appendChild(link);
    });
    
    // Cleanup function
    return () => {
      const hreflangLinks = document.querySelectorAll('link[hreflang]');
      hreflangLinks.forEach(link => link.remove());
    };
  }, [alternateVersions]);
};
