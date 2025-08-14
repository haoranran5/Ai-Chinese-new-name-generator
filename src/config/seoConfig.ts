export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  structuredData?: object;
}

export const SITE_CONFIG = {
  siteName: 'Chinese Zodiac & Name Generator',
  siteUrl: 'https://www.chinesecharactername.top',
  defaultImage: 'https://www.chinesecharactername.top/android-chrome-512x512.png',
  author: 'Chinese Zodiac & Feng Shui Digital Tools',
  locale: 'en_US',
  twitterHandle: '@ChineseZodiacGen', // Add if you have Twitter
};

export const SEO_PAGES: Record<string, PageSEOConfig> = {
  home: {
    title: 'Free Chinese Zodiac Compatibility & Name Generator - Chinese Astrology Tools',
    description: 'Free Chinese zodiac compatibility calculator, Chinese name generator with BaZi analysis, Feng Shui tips for home and office. Discover your Chinese zodiac sign, love compatibility, and authentic Chinese names with AI-powered cultural intelligence.',
    keywords: 'chinese zodiac compatibility, chinese zodiac signs, chinese zodiac calculator, free chinese name generator, chinese astrology, feng shui tips, bazi analysis, chinese zodiac love match, zodiac compatibility calculator, chinese horoscope',
    canonicalUrl: `${SITE_CONFIG.siteUrl}/`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["WebSite", "WebApplication"],
      "name": "Chinese Zodiac Compatibility & Name Generator",
      "alternateName": "Free Chinese Zodiac Calculator",
      "description": "Free Chinese zodiac compatibility calculator, Chinese name generator with BaZi analysis, Feng Shui tips, and comprehensive Chinese astrology tools for Western users",
      "url": SITE_CONFIG.siteUrl,
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "author": {
        "@type": "Organization",
        "name": SITE_CONFIG.author,
        "url": SITE_CONFIG.siteUrl
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Free Chinese zodiac compatibility calculator and name generator"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_CONFIG.siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  },

  nameGenerator: {
    title: 'Free Chinese Name Generator with BaZi Analysis - Authentic Chinese Names',
    description: 'Generate authentic Chinese names with AI-powered BaZi analysis. Get meaningful Chinese names with pronunciation, cultural significance, and feng shui compatibility. Free Chinese name generator for babies, businesses, and personal use.',
    keywords: 'chinese name generator, bazi analysis, chinese baby names, authentic chinese names, chinese name meaning, feng shui names, chinese character names, traditional chinese names',
    canonicalUrl: `${SITE_CONFIG.siteUrl}/nameGenerator`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Chinese Name Generator",
      "applicationCategory": "UtilitiesApplication",
      "description": "AI-powered Chinese name generator with BaZi analysis and cultural meanings",
      "url": `${SITE_CONFIG.siteUrl}/nameGenerator`,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },

  compatibility: {
    title: 'Chinese Zodiac Compatibility Calculator - Free Love Match Analysis',
    description: 'Free Chinese zodiac compatibility calculator for love matches and relationships. Discover your zodiac compatibility with detailed analysis of all 12 Chinese zodiac signs. Get accurate compatibility scores and relationship insights.',
    keywords: 'chinese zodiac compatibility, zodiac love match, chinese zodiac signs compatibility, zodiac compatibility calculator, chinese astrology compatibility, love compatibility test',
    canonicalUrl: `${SITE_CONFIG.siteUrl}/compatibility`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Chinese Zodiac Compatibility Calculator",
      "applicationCategory": "LifestyleApplication",
      "description": "Free Chinese zodiac compatibility calculator for love matches and relationship analysis",
      "url": `${SITE_CONFIG.siteUrl}/compatibility`,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },

  fengShuiTips: {
    title: 'Feng Shui Tips for Home & Office - Chinese Feng Shui Guide',
    description: 'Practical Feng Shui tips for home and office spaces. Learn how to improve qi flow, arrange furniture, choose colors, and create harmony using traditional Chinese Feng Shui principles.',
    keywords: 'feng shui tips, feng shui home, feng shui office, qi flow, feng shui colors, feng shui furniture arrangement, chinese feng shui, feng shui guide',
    canonicalUrl: `${SITE_CONFIG.siteUrl}/fengShuiTips`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Feng Shui Tips for Home & Office",
      "description": "Practical Feng Shui tips for home and office spaces",
      "author": {
        "@type": "Organization",
        "name": SITE_CONFIG.author
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_CONFIG.siteName,
        "logo": {
          "@type": "ImageObject",
          "url": SITE_CONFIG.defaultImage
        }
      }
    }
  },

  astrology: {
    title: 'Chinese Astrology Guide - Zodiac Signs, Elements & Compatibility',
    description: 'Complete guide to Chinese astrology including 12 zodiac signs, five elements, and compatibility analysis. Learn about your Chinese zodiac animal, personality traits, and fortune predictions.',
    keywords: 'chinese astrology, chinese zodiac signs, chinese zodiac animals, five elements, chinese horoscope, zodiac personality traits, chinese calendar',
    canonicalUrl: `${SITE_CONFIG.siteUrl}/astrology`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Chinese Astrology Guide",
      "description": "Complete guide to Chinese astrology including 12 zodiac signs, five elements, and compatibility analysis",
      "author": {
        "@type": "Organization",
        "name": SITE_CONFIG.author
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_CONFIG.siteName,
        "logo": {
          "@type": "ImageObject",
          "url": SITE_CONFIG.defaultImage
        }
      }
    }
  },

  about: {
    title: 'About Chinese Zodiac & Name Generator - Our Mission & Team',
    description: 'Learn about our mission to bring authentic Chinese astrology and naming traditions to the world. Discover our AI-powered tools for Chinese zodiac compatibility and name generation.',
    keywords: 'about chinese zodiac generator, chinese astrology tools, ai chinese names, zodiac compatibility mission',
    canonicalUrl: `${SITE_CONFIG.siteUrl}/about`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Chinese Zodiac & Name Generator",
      "description": "Learn about our mission to bring authentic Chinese astrology and naming traditions to the world",
      "url": `${SITE_CONFIG.siteUrl}/about`,
      "mainEntity": {
        "@type": "Organization",
        "name": SITE_CONFIG.siteName,
        "url": SITE_CONFIG.siteUrl,
        "description": "AI-powered Chinese astrology and naming tools"
      }
    }
  }
};

// FAQ Structured Data
export const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Chinese zodiac compatibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chinese zodiac compatibility analyzes the relationship potential between different Chinese zodiac signs based on ancient Chinese astrology principles. It helps determine love matches, business partnerships, and family harmony."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the Chinese zodiac compatibility calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Chinese zodiac compatibility calculator uses traditional Chinese astrology principles combined with AI analysis to provide accurate compatibility scores and relationship insights based on thousands of years of cultural wisdom."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Chinese name generator free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our Chinese name generator is completely free. It uses BaZi analysis and Chinese astrology principles to create authentic Chinese names with cultural meanings and proper pronunciation guides."
      }
    },
    {
      "@type": "Question",
      "name": "What is BaZi analysis in Chinese name generation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BaZi (Eight Characters) analysis is a traditional Chinese method that considers birth date and time to determine the five elements balance. Our name generator uses this to suggest names that complement your personal energy profile."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use Feng Shui tips for my home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Feng Shui tips provide practical guidance for arranging your home to improve qi (energy) flow. This includes furniture placement, color choices, and room organization based on traditional Chinese principles."
      }
    }
  ]
};
