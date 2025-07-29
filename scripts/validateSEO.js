#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO validation configuration
const SEO_CONFIG = {
  indexHtmlPath: path.join(__dirname, '../index.html'),
  sitemapPath: path.join(__dirname, '../public/sitemap.xml'),
  robotsPath: path.join(__dirname, '../public/robots.txt'),
  requiredMetaTags: [
    'description',
    'keywords',
    'robots',
    'author'
  ],
  requiredOgTags: [
    'og:title',
    'og:description',
    'og:type',
    'og:url',
    'og:image'
  ],
  requiredTwitterTags: [
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image'
  ]
};

class SEOValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  // Main validation function
  validate() {
    console.log('🔍 Starting SEO validation...\n');
    
    this.validateIndexHtml();
    this.validateSitemap();
    this.validateRobots();
    
    this.printResults();
    
    return this.errors.length === 0;
  }

  // Validate index.html
  validateIndexHtml() {
    console.log('📄 Validating index.html...');
    
    if (!fs.existsSync(SEO_CONFIG.indexHtmlPath)) {
      this.errors.push('index.html file not found');
      return;
    }
    
    const htmlContent = fs.readFileSync(SEO_CONFIG.indexHtmlPath, 'utf8');
    
    // Check title
    this.validateTitle(htmlContent);
    
    // Check meta tags
    this.validateMetaTags(htmlContent);
    
    // Check Open Graph tags
    this.validateOpenGraphTags(htmlContent);
    
    // Check Twitter tags
    this.validateTwitterTags(htmlContent);
    
    // Check structured data
    this.validateStructuredData(htmlContent);
    
    // Check canonical URL
    this.validateCanonicalUrl(htmlContent);
    
    // Check favicon
    this.validateFavicon(htmlContent);
  }

  validateTitle(htmlContent) {
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
    
    if (!titleMatch) {
      this.errors.push('Title tag is missing');
      return;
    }
    
    const title = titleMatch[1];
    const titleLength = title.length;
    
    if (titleLength < 30) {
      this.warnings.push(`Title is too short (${titleLength} chars, recommended: 30-60)`);
    } else if (titleLength > 60) {
      this.warnings.push(`Title is too long (${titleLength} chars, recommended: 30-60)`);
    } else {
      this.passed.push(`Title length is optimal (${titleLength} chars)`);
    }
    
    if (!title.toLowerCase().includes('chinese')) {
      this.warnings.push('Title should include main keyword "Chinese"');
    }
  }

  validateMetaTags(htmlContent) {
    SEO_CONFIG.requiredMetaTags.forEach(tagName => {
      const regex = new RegExp(`<meta\\s+name=["']${tagName}["']\\s+content=["']([^"']*?)["']`, 'i');
      const match = htmlContent.match(regex);
      
      if (!match) {
        this.errors.push(`Meta tag "${tagName}" is missing`);
      } else {
        const content = match[1];
        if (!content.trim()) {
          this.errors.push(`Meta tag "${tagName}" has empty content`);
        } else {
          this.passed.push(`Meta tag "${tagName}" is present`);
          
          // Specific validations
          if (tagName === 'description') {
            const descLength = content.length;
            if (descLength < 120 || descLength > 160) {
              this.warnings.push(`Meta description length (${descLength}) should be 120-160 chars`);
            }
          }
        }
      }
    });
  }

  validateOpenGraphTags(htmlContent) {
    SEO_CONFIG.requiredOgTags.forEach(property => {
      const regex = new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["']([^"']*?)["']`, 'i');
      const match = htmlContent.match(regex);
      
      if (!match) {
        this.errors.push(`Open Graph tag "${property}" is missing`);
      } else {
        const content = match[1];
        if (!content.trim()) {
          this.errors.push(`Open Graph tag "${property}" has empty content`);
        } else {
          this.passed.push(`Open Graph tag "${property}" is present`);
        }
      }
    });
  }

  validateTwitterTags(htmlContent) {
    SEO_CONFIG.requiredTwitterTags.forEach(name => {
      const regex = new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*?)["']`, 'i');
      const match = htmlContent.match(regex);
      
      if (!match) {
        this.warnings.push(`Twitter tag "${name}" is missing`);
      } else {
        const content = match[1];
        if (!content.trim()) {
          this.warnings.push(`Twitter tag "${name}" has empty content`);
        } else {
          this.passed.push(`Twitter tag "${name}" is present`);
        }
      }
    });
  }

  validateStructuredData(htmlContent) {
    const structuredDataRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis;
    const matches = htmlContent.match(structuredDataRegex);
    
    if (!matches || matches.length === 0) {
      this.errors.push('No structured data (JSON-LD) found');
      return;
    }
    
    matches.forEach((match, index) => {
      try {
        const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        JSON.parse(jsonContent);
        this.passed.push(`Structured data block ${index + 1} is valid JSON`);
      } catch (error) {
        this.errors.push(`Structured data block ${index + 1} contains invalid JSON`);
      }
    });
  }

  validateCanonicalUrl(htmlContent) {
    const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["']([^"']*?)["']/i;
    const match = htmlContent.match(canonicalRegex);

    if (!match) {
      this.errors.push('Canonical URL is missing');
    } else {
      const url = match[1];
      if (!url.startsWith('https://')) {
        this.warnings.push('Canonical URL should use HTTPS');
      } else {
        this.passed.push('Canonical URL is present and uses HTTPS');
      }
    }
  }

  validateFavicon(htmlContent) {
    const faviconRegex = /<link\s+[^>]*rel=["']icon["'][^>]*>/i;
    const match = htmlContent.match(faviconRegex);
    
    if (!match) {
      this.warnings.push('Favicon is missing');
    } else {
      this.passed.push('Favicon is present');
    }
  }

  // Validate sitemap.xml
  validateSitemap() {
    console.log('🗺️  Validating sitemap.xml...');
    
    if (!fs.existsSync(SEO_CONFIG.sitemapPath)) {
      this.errors.push('sitemap.xml file not found');
      return;
    }
    
    const sitemapContent = fs.readFileSync(SEO_CONFIG.sitemapPath, 'utf8');
    
    // Check XML structure
    if (!sitemapContent.includes('<?xml version="1.0"')) {
      this.errors.push('Sitemap missing XML declaration');
    }
    
    if (!sitemapContent.includes('<urlset')) {
      this.errors.push('Sitemap missing urlset element');
    }
    
    // Count URLs
    const urlMatches = sitemapContent.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    
    if (urlCount === 0) {
      this.errors.push('Sitemap contains no URLs');
    } else {
      this.passed.push(`Sitemap contains ${urlCount} URLs`);
    }
    
    // Check for required URLs
    const requiredUrls = ['/', '/nameGenerator', '/compatibility', '/fengShuiTips', '/astrology'];
    requiredUrls.forEach(url => {
      if (!sitemapContent.includes(`<loc>https://chinesecharactername.top${url}</loc>`)) {
        this.warnings.push(`Sitemap missing URL: ${url}`);
      }
    });
  }

  // Validate robots.txt
  validateRobots() {
    console.log('🤖 Validating robots.txt...');
    
    if (!fs.existsSync(SEO_CONFIG.robotsPath)) {
      this.errors.push('robots.txt file not found');
      return;
    }
    
    const robotsContent = fs.readFileSync(SEO_CONFIG.robotsPath, 'utf8');
    
    // Check basic structure
    if (!robotsContent.includes('User-agent:')) {
      this.errors.push('robots.txt missing User-agent directive');
    }
    
    if (!robotsContent.includes('Sitemap:')) {
      this.warnings.push('robots.txt missing Sitemap directive');
    } else {
      this.passed.push('robots.txt contains Sitemap directive');
    }
    
    // Check for common issues
    if (robotsContent.includes('Disallow: /') && !robotsContent.includes('Allow: /')) {
      this.warnings.push('robots.txt disallows all crawling - this might not be intended');
    }
  }

  // Print validation results
  printResults() {
    console.log('\n📊 SEO Validation Results\n');
    console.log('='.repeat(50));
    
    if (this.passed.length > 0) {
      console.log('\n✅ PASSED:');
      this.passed.forEach(item => console.log(`  ✓ ${item}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(item => console.log(`  ⚠ ${item}`));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(item => console.log(`  ✗ ${item}`));
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`Summary: ${this.passed.length} passed, ${this.warnings.length} warnings, ${this.errors.length} errors`);
    
    if (this.errors.length === 0) {
      console.log('🎉 SEO validation completed successfully!');
    } else {
      console.log('💥 SEO validation failed. Please fix the errors above.');
    }
  }
}

// Run validation if this script is executed directly
const validator = new SEOValidator();
const success = validator.validate();
process.exit(success ? 0 : 1);

export default SEOValidator;
