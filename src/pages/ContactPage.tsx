import React from 'react';
import { Mail, Send } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const ContactPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Contact Us | Chinese Names';
    trackPageView('Contact', '/contact');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
        </div>
        <p className="text-white/80 mb-6">Have questions, feedback, or partnership ideas? Drop us a line.</p>
        <div className="space-y-3 text-white/80">
          <p><strong>Email:</strong> contact@chinesecharactername.top</p>
          <p><strong>Response time:</strong> We usually reply within 2 business days.</p>
        </div>
        <a
          href="mailto:contact@chinesecharactername.top"
          className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
        >
          <Send className="w-4 h-4" /> Send Email
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
