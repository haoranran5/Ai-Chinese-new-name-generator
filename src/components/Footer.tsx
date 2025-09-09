import React, { useState } from 'react';
import { Home, Info, HelpCircle, BookOpen, Github, Mail, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faq';

const MiniFAQItem: React.FC<{ q: string; a: string }>
  = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left text-white/80 hover:text-white"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="mt-2 text-white/60 text-sm">{a}</p>
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  const miniFaq = FAQ_ITEMS.slice(0, 3);
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">名</span>
              </div>
              <span className="text-white/90 font-semibold">Chinese Names</span>
            </div>
            <p className="text-white/60 text-sm leading-6">
              Generate authentic Chinese names with cultural depth. Explore zodiac, feng shui, and historical inspirations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Links</h4>
            <div className="space-y-2 text-white/70 text-sm">
              <a href="#home" className="flex items-center gap-2 hover:text-white">
                <Home className="w-4 h-4" /> Home
              </a>
              <a href="#blog" className="flex items-center gap-2 hover:text-white">
                <BookOpen className="w-4 h-4" /> Blog
              </a>
              <a href="#faq" className="flex items-center gap-2 hover:text-white">
                <HelpCircle className="w-4 h-4" /> FAQ
              </a>
              <a href="#about" className="flex items-center gap-2 hover:text-white">
                <Info className="w-4 h-4" /> About
              </a>
              <a href="#privacy" className="flex items-center gap-2 hover:text-white">
                <Info className="w-4 h-4" /> Privacy Policy
              </a>
              <a href="#terms" className="flex items-center gap-2 hover:text-white">
                <Info className="w-4 h-4" /> Terms of Use
              </a>
              <a href="#contact" className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4" /> Contact
              </a>
            </div>
          </div>

          {/* Mini FAQ */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick FAQ</h4>
            <div className="text-sm">
              {miniFaq.map((item, idx) => (
                <MiniFAQItem key={idx} q={item.question} a={item.answer} />
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-white/70 text-sm">
              <a href="mailto:contact@chinesecharactername.top" className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4" /> contact@chinesecharactername.top
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} Chinese Names. All rights reserved.</p>
          <p>Canonical: https://www.chinesecharactername.top/</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
