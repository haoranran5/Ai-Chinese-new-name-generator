// 结构化数据工具函数
export const createWebsiteStructuredData = (siteConfig: {
  name: string;
  url: string;
  description: string;
  author: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "description": siteConfig.description,
  "author": {
    "@type": "Organization",
    "name": siteConfig.author,
    "url": siteConfig.url
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteConfig.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

export const createApplicationStructuredData = (appConfig: {
  name: string;
  url: string;
  description: string;
  category: string;
  author: string;
  price?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": appConfig.name,
  "applicationCategory": appConfig.category,
  "description": appConfig.description,
  "url": appConfig.url,
  "author": {
    "@type": "Organization",
    "name": appConfig.author,
    "url": appConfig.url
  },
  "offers": {
    "@type": "Offer",
    "price": appConfig.price || "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
});

export const createArticleStructuredData = (articleConfig: {
  headline: string;
  description: string;
  author: string;
  publisher: string;
  publisherLogo: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": articleConfig.headline,
  "description": articleConfig.description,
  "url": articleConfig.url,
  "datePublished": articleConfig.datePublished || new Date().toISOString(),
  "dateModified": articleConfig.dateModified || new Date().toISOString(),
  "author": {
    "@type": "Organization",
    "name": articleConfig.author
  },
  "publisher": {
    "@type": "Organization",
    "name": articleConfig.publisher,
    "logo": {
      "@type": "ImageObject",
      "url": articleConfig.publisherLogo
    }
  },
  "image": articleConfig.image,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": articleConfig.url
  }
});

export const createFAQStructuredData = (faqs: Array<{
  question: string;
  answer: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createBreadcrumbStructuredData = (breadcrumbs: Array<{
  name: string;
  url: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const createOrganizationStructuredData = (orgConfig: {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": orgConfig.name,
  "url": orgConfig.url,
  "logo": orgConfig.logo,
  "description": orgConfig.description,
  "sameAs": orgConfig.sameAs || []
});