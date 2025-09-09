import React from 'react';
import { BookOpen } from 'lucide-react';
import { trackPageView } from '../../utils/analytics';

const WuXingNamingGuide: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Five Elements (Wu Xing) Naming Guide';
    trackPageView('Blog: Wu Xing Naming', '/blog-wuxing');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <article className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">Five Elements (Wu Xing) Naming Guide</h1>
        </div>
        <p className="text-white/80 mb-4">Wood, Fire, Earth, Metal, Water—how to use elemental balance for names that feel harmonious and grounded.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Core Ideas</h2>
        <ul className="list-disc list-inside text-white/80 space-y-1">
          <li>Balance over stacking: prefer complementarity instead of repeating the same element.</li>
          <li>Context matters: child birth season, family naming style, personal taste.</li>
          <li>Sound + meaning together: elements shouldn’t override phonetic beauty.</li>
        </ul>
        <h2 className="text-white font-semibold mt-4 mb-2">Practical Steps</h2>
        <ol className="list-decimal list-inside text-white/80 space-y-1">
          <li>Identify element tendencies you want to strengthen or soften.</li>
          <li>Pick characters with matching radicals/associations, then check meaning nuance.</li>
          <li>Read aloud for tone flow; avoid awkward repeats or harsh clusters.</li>
        </ol>
        <h2 className="text-white font-semibold mt-4 mb-2">Examples</h2>
        <p className="text-white/80">Show pairs that balance Fire with Water or Metal with Wood, and explain why they sound natural.</p>
      </article>
    </div>
  );
};

export default WuXingNamingGuide;
