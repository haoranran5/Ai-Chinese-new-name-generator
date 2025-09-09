import React from 'react';
import { FileText } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const TermsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Terms of Use | Chinese Names';
    trackPageView('Terms of Use', '/terms');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">Terms of Use</h1>
        </div>
        <p className="text-white/80 mb-4">By using this site, you agree to the following terms.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Acceptable Use</h2>
        <p className="text-white/80">Use the site for lawful purposes. Do not abuse, scrape excessively, or attempt to disrupt services.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Content</h2>
        <p className="text-white/80">Generated names and content are provided for information and creative purposes. For legal naming, check local regulations.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">No Warranty</h2>
        <p className="text-white/80">The service is provided “as is” without warranties. We strive for accuracy but cannot guarantee outcomes.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Contact</h2>
        <p className="text-white/80">Questions about these terms? Email contact@chinesecharactername.top</p>
      </div>
    </div>
  );
};

export default TermsPage;
