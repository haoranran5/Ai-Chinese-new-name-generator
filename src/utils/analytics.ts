// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackPageView = (pageTitle: string, pagePath?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-CGT2YJF60T', {
      page_title: pageTitle,
      page_path: pagePath || window.location.pathname,
    });
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackNameGeneration = (gender: string, style: string) => {
  trackEvent('name_generated', 'name_generator', `${gender}_${style}`);
};

export const trackCompatibilityCheck = (sign1: string, sign2: string) => {
  trackEvent('compatibility_checked', 'zodiac_compatibility', `${sign1}_${sign2}`);
};

export const trackFamousPersonSearch = (searchTerm: string) => {
  trackEvent('famous_person_searched', 'famous_people', searchTerm);
};
