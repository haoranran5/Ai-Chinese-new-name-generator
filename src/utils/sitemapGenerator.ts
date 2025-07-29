export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  urls: SitemapUrl[];
}

export const generateSitemap = (config: SitemapConfig): string => {
  const { baseUrl, urls } = config;
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
  const urlsetClose = '</urlset>';

  const urlElements = urls.map(url => {
    const loc = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    let urlXml = `  <url>\n    <loc>${loc}</loc>`;
    
    if (url.lastmod) {
      urlXml += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      urlXml += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      urlXml += `\n    <priority>${url.priority.toFixed(1)}</priority>`;
    }
    
    urlXml += '\n  </url>';
    return urlXml;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n\n${urlElements}\n\n${urlsetClose}`;
};

// Default sitemap configuration for the Chinese Name Generator site
export const getDefaultSitemapConfig = (): SitemapConfig => {
  const baseUrl = 'https://chinesecharactername.top';
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  return {
    baseUrl,
    urls: [
      {
        loc: '/',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: '/nameGenerator',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.9
      },
      {
        loc: '/compatibility',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.9
      },
      {
        loc: '/fengShuiTips',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: '/astrology',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: '/about',
        lastmod: currentDate,
        changefreq: 'yearly',
        priority: 0.5
      }
    ]
  };
};

// Function to generate and save sitemap (for build process)
export const generateAndSaveSitemap = async (outputPath: string = 'public/sitemap.xml'): Promise<void> => {
  const config = getDefaultSitemapConfig();
  const sitemapXml = generateSitemap(config);
  
  // In a Node.js environment, you would use fs to write the file
  // For browser environment, this would need to be handled differently
  if (typeof window === 'undefined') {
    // Node.js environment
    const fs = await import('fs');
    const path = await import('path');
    
    const fullPath = path.resolve(outputPath);
    fs.writeFileSync(fullPath, sitemapXml, 'utf8');
    console.log(`Sitemap generated at: ${fullPath}`);
  } else {
    // Browser environment - log the XML for manual saving
    console.log('Generated sitemap XML:');
    console.log(sitemapXml);
  }
};

// Function to add dynamic URLs to sitemap (for future use)
export const addDynamicUrls = (baseConfig: SitemapConfig, dynamicUrls: SitemapUrl[]): SitemapConfig => {
  return {
    ...baseConfig,
    urls: [...baseConfig.urls, ...dynamicUrls]
  };
};

// Function to validate sitemap URLs
export const validateSitemapUrls = (urls: SitemapUrl[]): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  urls.forEach((url, index) => {
    // Check if URL is valid
    try {
      new URL(url.loc.startsWith('http') ? url.loc : `https://example.com${url.loc}`);
    } catch {
      errors.push(`Invalid URL at index ${index}: ${url.loc}`);
    }
    
    // Check priority range
    if (url.priority !== undefined && (url.priority < 0 || url.priority > 1)) {
      errors.push(`Invalid priority at index ${index}: ${url.priority}. Must be between 0 and 1.`);
    }
    
    // Check lastmod format
    if (url.lastmod && !/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/.test(url.lastmod)) {
      errors.push(`Invalid lastmod format at index ${index}: ${url.lastmod}. Use ISO 8601 format.`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Function to get sitemap index (for multiple sitemaps)
export const generateSitemapIndex = (sitemaps: Array<{ loc: string; lastmod?: string }>): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapIndexOpen = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const sitemapIndexClose = '</sitemapindex>';
  
  const sitemapElements = sitemaps.map(sitemap => {
    let sitemapXml = `  <sitemap>\n    <loc>${sitemap.loc}</loc>`;
    
    if (sitemap.lastmod) {
      sitemapXml += `\n    <lastmod>${sitemap.lastmod}</lastmod>`;
    }
    
    sitemapXml += '\n  </sitemap>';
    return sitemapXml;
  }).join('\n');
  
  return `${xmlHeader}\n${sitemapIndexOpen}\n${sitemapElements}\n${sitemapIndexClose}`;
};
