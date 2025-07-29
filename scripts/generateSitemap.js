#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sitemap configuration
const SITE_CONFIG = {
  baseUrl: 'https://chinesecharactername.top',
  outputPath: path.join(__dirname, '../public/sitemap.xml')
};

// URL configuration
const URLS = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: '/nameGenerator',
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    loc: '/compatibility',
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    loc: '/fengShuiTips',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: '/astrology',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: '/about',
    changefreq: 'yearly',
    priority: 0.5
  }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
  const urlsetClose = '</urlset>';

  const urlElements = URLS.map(url => {
    const fullUrl = `${SITE_CONFIG.baseUrl}${url.loc}`;
    let urlXml = `  <url>\n    <loc>${fullUrl}</loc>`;
    
    urlXml += `\n    <lastmod>${currentDate}</lastmod>`;
    
    if (url.changefreq) {
      urlXml += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      urlXml += `\n    <priority>${url.priority.toFixed(1)}</priority>`;
    }
    
    urlXml += '\n  </url>';
    return urlXml;
  }).join('\n');

  const sitemapXml = `${xmlHeader}\n${urlsetOpen}\n\n${urlElements}\n\n${urlsetClose}\n`;
  
  // Ensure the public directory exists
  const publicDir = path.dirname(SITE_CONFIG.outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write the sitemap file
  fs.writeFileSync(SITE_CONFIG.outputPath, sitemapXml, 'utf8');
  
  console.log(`✅ Sitemap generated successfully at: ${SITE_CONFIG.outputPath}`);
  console.log(`📊 Generated ${URLS.length} URLs`);
  console.log(`🔗 Sitemap URL: ${SITE_CONFIG.baseUrl}/sitemap.xml`);
}

// Run the generator
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}

export { generateSitemap, SITE_CONFIG, URLS };
