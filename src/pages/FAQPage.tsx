import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

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

  const faqs = [
    {
      question: "How good is your Chinese name picker?",
      answer: "Our name picker uses real Chinese naming traditions, BaZi analysis, and cultural smarts to give you names that actually mean something. While we give you culturally accurate suggestions, you should always pick what feels right for you and your family."
    },
    {
      question: "What's Chinese zodiac compatibility all about?",
      answer: "Chinese zodiac compatibility checks if you and someone else are a good match based on ancient Chinese astrology. It looks at how the 12 animal signs (like Rat, Dragon, etc.) and the five elements (Wood, Fire, Earth, Metal, Water) work together to see if you vibe well."
    },
    {
      question: "Can non-Chinese people use the names you generate?",
      answer: "Absolutely! Our name picker creates names that are culturally authentic and anyone can use them. We give you pronunciation guides and explain what each name means so you understand the cultural significance behind it."
    },
    {
      question: "How does Feng Shui connect to Chinese names?",
      answer: "Feng Shui principles can help you pick names by looking at the balance of elements and energy flow. Names can be chosen to match or balance your natural element, which helps bring harmony and good vibes into your life."
    },
    {
      question: "Can I use these names for my business?",
      answer: "Definitely! Our name picker can create business names that include Chinese cultural elements and meanings. These names can make your brand feel more authentic and culturally significant, especially if you're trying to reach markets with Chinese cultural influence."
    },
    {
      question: "What's the difference between Chinese and Western zodiac?",
      answer: "Chinese zodiac works on a 12-year cycle with animal signs (Rat, Ox, Tiger, etc.), while Western zodiac uses a 12-month cycle with constellations. Chinese astrology also includes five elements and looks at your birth year instead of birth month."
    },
    {
      question: "How often should I check zodiac compatibility?",
      answer: "You can check zodiac compatibility whenever you want to understand your relationships better. It's especially helpful when you're starting new relationships, making big decisions, or going through major life changes."
    },
    {
      question: "Are your cultural insights legit?",
      answer: "Yes, all our cultural insights and explanations come from real Chinese traditions, historical practices, and cultural wisdom. We work with cultural experts and reference traditional Chinese texts to make sure everything is accurate."
    }
  ];

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
