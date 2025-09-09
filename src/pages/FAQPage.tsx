import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { trackPageView } from '../utils/analytics';
import { FAQ_ITEMS } from '../data/faq';

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  React.useEffect(() => {
    document.title = 'FAQ - Chinese Name Generator & Zodiac Compatibility | Frequently Asked Questions';
    trackPageView('FAQ Page', '/faq');
  }, []);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = FAQ_ITEMS;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4">
            Got Questions? We've Got Answers!
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find answers to all the questions you have about Chinese names, zodiac compatibility, and cultural stuff.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl border border-yellow-400/20 p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Still Wondering About Something?
          </h3>
          <p className="text-white/80 mb-6">
            If you didn't find what you're looking for, check out our blog for more detailed articles about Chinese culture and naming traditions.
          </p>
          <button 
            onClick={() => window.location.hash = '#blog'}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
          >
            Visit Our Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
