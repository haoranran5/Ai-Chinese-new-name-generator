import React from 'react';
import { Shield } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const PrivacyPolicyPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy | Chinese Names';
    trackPageView('Privacy Policy', '/privacy');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
        <p className="text-white/80 mb-4">We respect your privacy. This policy explains what we collect and how we use it.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside text-white/80 space-y-1">
          <li>Anonymous analytics via Google Analytics (page views, events)</li>
          <li>Locally stored favorites in your browser (no server upload)</li>
          <li>No personal identity information is required to use the site</li>
        </ul>
        <h2 className="text-white font-semibold mt-4 mb-2">Cookies & Local Storage</h2>
        <p className="text-white/80">We use cookies/local storage for analytics and to remember your favorites settings. You can clear them anytime in your browser.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Advertising</h2>
        <p className="text-white/80">We follow Google AdSense policies. Ads, if displayed, do not access personal data from your device beyond standard ad cookies.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Contact</h2>
        <p className="text-white/80">Questions? Email us at contact@chinesecharactername.top</p>
        <p className="text-white/50 text-sm mt-6">Effective date: {new Date().toISOString().slice(0,10)}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
