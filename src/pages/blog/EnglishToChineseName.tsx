import React from 'react';
import { BookOpen } from 'lucide-react';
import { trackPageView } from '../../utils/analytics';

const EnglishToChineseName: React.FC = () => {
  React.useEffect(() => {
    document.title = 'From English to Chinese: Name Conversion Methods';
    trackPageView('Blog: English to Chinese', '/blog-en-to-zh');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <article className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">From English to Chinese: Name Conversion Methods</h1>
        </div>
        <p className="text-white/80 mb-4">Phonetic mapping vs. semantic reinterpretation—two main paths to get a Chinese name that still feels like you.</p>
        <h2 className="text-white font-semibold mt-4 mb-2">Approaches</h2>
        <ul className="list-disc list-inside text-white/80 space-y-1">
          <li>Sound-first: pick characters that echo your original name’s syllables/tones.</li>
          <li>Meaning-first: translate the vibe or literal meaning into elegant characters.</li>
          <li>Hybrid: keep core sounds while choosing characters with aligned meanings.</li>
        </ul>
        <h2 className="text-white font-semibold mt-4 mb-2">Pitfalls</h2>
        <p className="text-white/80">Watch for slang, awkward tone collisions, or characters with niche/dated usage.</p>
      </article>
    </div>
  );
};

export default EnglishToChineseName;
