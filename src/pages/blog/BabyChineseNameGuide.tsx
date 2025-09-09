import React from 'react';
import { BookOpen } from 'lucide-react';
import { trackPageView } from '../../utils/analytics';

const BabyChineseNameGuide: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Baby Chinese Name Guide';
    trackPageView('Blog: Baby Name Guide', '/blog-baby-name');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <article className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">Baby Chinese Name Guide</h1>
        </div>
        <p className="text-white/80 mb-4">A parent-friendly playbook to pick a name that sounds good, has solid meaning, and ages well.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Checklist</h2>
        <ul className="list-disc list-inside text-white/80 space-y-1">
          <li>Meaning first, then vibe; avoid trendy but thin meanings.</li>
          <li>Read it out loud with surname; check tones and rhythm.</li>
          <li>Scan for unintended meanings or awkward homophones.</li>
        </ul>
        <h2 className="text-white font-semibold mt-4 mb-2">Samples</h2>
        <p className="text-white/80">Provide several name sets with notes on symbolism and everyday feel—classic vs modern.</p>
      </article>
    </div>
  );
};

export default BabyChineseNameGuide;
