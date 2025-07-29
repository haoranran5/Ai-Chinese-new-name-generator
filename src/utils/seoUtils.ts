// SEO utility functions for the Chinese Name Generator app

export interface SEOAnalysis {
  title: {
    length: number;
    isOptimal: boolean;
    issues: string[];
  };
  description: {
    length: number;
    isOptimal: boolean;
    issues: string[];
  };
  keywords: {
    count: number;
    isOptimal: boolean;
    issues: string[];
  };
  headings: {
    h1Count: number;
    structure: string[];
    issues: string[];
  };
  images: {
    total: number;
    withAlt: number;
    issues: string[];
  };
  links: {
    internal: number;
    external: number;
    issues: string[];
  };
  performance: {
    score: number;
    issues: string[];
  };
}

// Analyze page SEO
export const analyzePage = (): SEOAnalysis => {
  const analysis: SEOAnalysis = {
    title: analyzeTitle(),
    description: analyzeDescription(),
    keywords: analyzeKeywords(),
    headings: analyzeHeadings(),
    images: analyzeImages(),
    links: analyzeLinks(),
    performance: analyzePerformance()
  };

  return analysis;
};

// Title analysis
const analyzeTitle = () => {
  const title = document.title;
  const length = title.length;
  const issues: string[] = [];
  
  if (length < 30) {
    issues.push('Title is too short (recommended: 30-60 characters)');
  } else if (length > 60) {
    issues.push('Title is too long (recommended: 30-60 characters)');
  }
  
  if (!title.includes('Chinese')) {
    issues.push('Title should include main keyword "Chinese"');
  }
  
  return {
    length,
    isOptimal: length >= 30 && length <= 60 && issues.length === 0,
    issues
  };
};

// Description analysis
const analyzeDescription = () => {
  const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  const description = metaDesc?.content || '';
  const length = description.length;
  const issues: string[] = [];
  
  if (!metaDesc) {
    issues.push('Meta description is missing');
  } else {
    if (length < 120) {
      issues.push('Description is too short (recommended: 120-160 characters)');
    } else if (length > 160) {
      issues.push('Description is too long (recommended: 120-160 characters)');
    }
    
    if (!description.toLowerCase().includes('chinese')) {
      issues.push('Description should include main keyword "Chinese"');
    }
  }
  
  return {
    length,
    isOptimal: length >= 120 && length <= 160 && issues.length === 0,
    issues
  };
};

// Keywords analysis
const analyzeKeywords = () => {
  const metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
  const keywords = metaKeywords?.content || '';
  const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
  const issues: string[] = [];
  
  if (!metaKeywords) {
    issues.push('Meta keywords tag is missing');
  } else {
    if (keywordArray.length < 5) {
      issues.push('Too few keywords (recommended: 5-10 relevant keywords)');
    } else if (keywordArray.length > 15) {
      issues.push('Too many keywords (recommended: 5-10 relevant keywords)');
    }
  }
  
  return {
    count: keywordArray.length,
    isOptimal: keywordArray.length >= 5 && keywordArray.length <= 10,
    issues
  };
};

// Headings analysis
const analyzeHeadings = () => {
  const h1Elements = document.querySelectorAll('h1');
  const h2Elements = document.querySelectorAll('h2');
  const h3Elements = document.querySelectorAll('h3');
  const h4Elements = document.querySelectorAll('h4');
  const h5Elements = document.querySelectorAll('h5');
  const h6Elements = document.querySelectorAll('h6');
  
  const issues: string[] = [];
  const structure: string[] = [];
  
  // Check H1
  if (h1Elements.length === 0) {
    issues.push('Missing H1 tag');
  } else if (h1Elements.length > 1) {
    issues.push('Multiple H1 tags found (should have only one)');
  }
  
  // Build structure
  [h1Elements, h2Elements, h3Elements, h4Elements, h5Elements, h6Elements].forEach((elements, index) => {
    const tagName = `H${index + 1}`;
    if (elements.length > 0) {
      structure.push(`${tagName}: ${elements.length}`);
    }
  });
  
  return {
    h1Count: h1Elements.length,
    structure,
    issues
  };
};

// Images analysis
const analyzeImages = () => {
  const images = document.querySelectorAll('img');
  const withAlt = Array.from(images).filter(img => img.alt && img.alt.trim().length > 0);
  const issues: string[] = [];
  
  if (images.length > withAlt.length) {
    issues.push(`${images.length - withAlt.length} images missing alt text`);
  }
  
  return {
    total: images.length,
    withAlt: withAlt.length,
    issues
  };
};

// Links analysis
const analyzeLinks = () => {
  const links = document.querySelectorAll('a[href]');
  const internal: HTMLAnchorElement[] = [];
  const external: HTMLAnchorElement[] = [];
  const issues: string[] = [];
  
  Array.from(links).forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      external.push(link as HTMLAnchorElement);
    } else if (href.startsWith('/') || href.startsWith('#') || href.includes(window.location.hostname)) {
      internal.push(link as HTMLAnchorElement);
    }
  });
  
  // Check for external links without rel="noopener"
  external.forEach(link => {
    if (link.target === '_blank' && !link.rel.includes('noopener')) {
      issues.push('External links with target="_blank" should include rel="noopener"');
    }
  });
  
  return {
    internal: internal.length,
    external: external.length,
    issues
  };
};

// Performance analysis (basic)
const analyzePerformance = () => {
  const issues: string[] = [];
  let score = 100;
  
  // Check for common performance issues
  const scripts = document.querySelectorAll('script');
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  const images = document.querySelectorAll('img');
  
  if (scripts.length > 10) {
    issues.push('Too many script tags (consider bundling)');
    score -= 10;
  }
  
  if (stylesheets.length > 5) {
    issues.push('Too many stylesheet links (consider bundling)');
    score -= 10;
  }
  
  // Check for images without loading="lazy"
  const lazyImages = Array.from(images).filter(img => img.loading === 'lazy');
  if (images.length > 3 && lazyImages.length < images.length * 0.5) {
    issues.push('Consider adding loading="lazy" to images below the fold');
    score -= 5;
  }
  
  return {
    score: Math.max(0, score),
    issues
  };
};

// Generate SEO report
export const generateSEOReport = (): string => {
  const analysis = analyzePage();
  
  let report = '# SEO Analysis Report\n\n';
  
  // Title
  report += `## Title Analysis\n`;
  report += `- Length: ${analysis.title.length} characters\n`;
  report += `- Status: ${analysis.title.isOptimal ? '✅ Optimal' : '❌ Needs improvement'}\n`;
  if (analysis.title.issues.length > 0) {
    report += `- Issues:\n${analysis.title.issues.map(issue => `  - ${issue}`).join('\n')}\n`;
  }
  report += '\n';
  
  // Description
  report += `## Description Analysis\n`;
  report += `- Length: ${analysis.description.length} characters\n`;
  report += `- Status: ${analysis.description.isOptimal ? '✅ Optimal' : '❌ Needs improvement'}\n`;
  if (analysis.description.issues.length > 0) {
    report += `- Issues:\n${analysis.description.issues.map(issue => `  - ${issue}`).join('\n')}\n`;
  }
  report += '\n';
  
  // Keywords
  report += `## Keywords Analysis\n`;
  report += `- Count: ${analysis.keywords.count}\n`;
  report += `- Status: ${analysis.keywords.isOptimal ? '✅ Optimal' : '❌ Needs improvement'}\n`;
  if (analysis.keywords.issues.length > 0) {
    report += `- Issues:\n${analysis.keywords.issues.map(issue => `  - ${issue}`).join('\n')}\n`;
  }
  report += '\n';
  
  // Headings
  report += `## Headings Structure\n`;
  report += `- H1 Count: ${analysis.headings.h1Count}\n`;
  report += `- Structure: ${analysis.headings.structure.join(', ')}\n`;
  if (analysis.headings.issues.length > 0) {
    report += `- Issues:\n${analysis.headings.issues.map(issue => `  - ${issue}`).join('\n')}\n`;
  }
  report += '\n';
  
  // Images
  report += `## Images Analysis\n`;
  report += `- Total: ${analysis.images.total}\n`;
  report += `- With Alt Text: ${analysis.images.withAlt}\n`;
  if (analysis.images.issues.length > 0) {
    report += `- Issues:\n${analysis.images.issues.map(issue => `  - ${issue}`).join('\n')}\n`;
  }
  report += '\n';
  
  // Links
  report += `## Links Analysis\n`;
  report += `- Internal: ${analysis.links.internal}\n`;
  report += `- External: ${analysis.links.external}\n`;
  if (analysis.links.issues.length > 0) {
    report += `- Issues:\n${analysis.links.issues.map(issue => `  - ${issue}`).join('\n')}\n`;
  }
  report += '\n';
  
  // Performance
  report += `## Performance Score\n`;
  report += `- Score: ${analysis.performance.score}/100\n`;
  if (analysis.performance.issues.length > 0) {
    report += `- Issues:\n${analysis.performance.issues.map(issue => `  - ${issue}`).join('\n')}\n`;
  }
  
  return report;
};

// Utility function to check if page is mobile-friendly
export const checkMobileFriendly = (): boolean => {
  const viewport = document.querySelector('meta[name="viewport"]');
  return !!viewport && viewport.getAttribute('content')?.includes('width=device-width');
};

// Utility function to check page load speed (basic)
export const checkPageSpeed = (): Promise<number> => {
  return new Promise((resolve) => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      resolve(loadTime);
    } else {
      resolve(0);
    }
  });
};
