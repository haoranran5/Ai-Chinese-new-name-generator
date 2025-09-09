export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How are names generated?',
    answer: 'We blend phonetics, meaning, and cultural references, then refine by style and gender to create natural, culturally-aligned Chinese names.'
  },
  {
    question: 'Are names unique?',
    answer: 'They are generated combinations. You can generate multiple times and pick what feels right for you.'
  },
  {
    question: 'Can I use a celebrity as inspiration?',
    answer: 'Yes. Choose a Chinese famous person to influence style, tone, and vibe of the generated names.'
  },
  {
    question: 'Do you store my generated names?',
    answer: 'We do not store personal inputs. You can favorite names locally in your browser.'
  },
  {
    question: 'Is this suitable for legal documents?',
    answer: 'We recommend consulting local regulations. Our names are for personal use, branding, and creative purposes.'
  },
  {
    question: 'Can I generate names for brands or products?',
    answer: 'Absolutely. Try different styles (elegant, modern, traditional) and refine until it matches your brand tone.'
  },
  {
    question: 'Does this support pronunciation help?',
    answer: 'Yes, we provide pinyin along with each name to help pronunciation.'
  },
  {
    question: 'Can I use this for baby names?',
    answer: 'Yes. Many users do. Consider meaning, tone, and personal preference when making a final choice.'
  }
];
