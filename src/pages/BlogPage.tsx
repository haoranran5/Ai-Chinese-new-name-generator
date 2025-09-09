import React from 'react';
import { BookOpen, User } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const BlogPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Chinese Name Blog - Cultural Insights & Naming Traditions';
    trackPageView('Blog Page', '/blog');
  }, []);

  const blogPosts = [
    { id: 1,  title: "The Art of Chinese Naming: How Chinese Names Actually Work", excerpt: "Learn about Chinese naming traditions, from how names are put together to what each character really means.", author: "Dr. Li Wei", date: "2024-01-15", tags: ["Chinese Names", "Culture"], readTime: "8 min read", featured: true,  href: "#blog" },
    { id: 2,  title: "Chinese Zodiac Compatibility: The Real Deal Behind Love Matches", excerpt: "Find out how Chinese zodiac compatibility actually works and how the twelve animal signs affect your relationships.", author: "Master Chen", date: "2024-01-10", tags: ["Zodiac", "Compatibility"], readTime: "6 min read", featured: false, href: "#blog" },
    { id: 3,  title: "Pinyin, Tones, and Meaning: A Simple Guide to Chinese Name Sound", excerpt: "Why pronunciation matters: tones, syllable flow, and how names stay pleasant and balanced.", author: "Anna Zhang", date: "2024-02-02", tags: ["Phonetics", "Beginner"], readTime: "7 min read", featured: false, href: "#blog" },
    { id: 4,  title: "Five Elements (Wu Xing) in Naming: Make Your Name Feel Balanced", excerpt: "Wood, Fire, Earth, Metal, Water—how these elements influence name vibes and personal balance.", author: "Master Chen", date: "2024-02-10", tags: ["Wu Xing", "Feng Shui"], readTime: "9 min read", featured: false, href: "#blog-wuxing" },
    { id: 5,  title: "Baby Name Guide: Pick a Chinese Name You’ll Love for Years", excerpt: "A parent-friendly checklist: meaning, sound, characters, and cultural fit—explained simply.", author: "Dr. Li Wei", date: "2024-03-01", tags: ["Baby Names", "Guide"], readTime: "10 min read", featured: false, href: "#blog-baby-name" },
    { id: 6,  title: "Brand & Product Naming with Chinese Culture: Do It Right", excerpt: "Catchy, meaningful, and culturally respectful names for businesses and products—practical tips.", author: "Marketing Lab", date: "2024-03-12", tags: ["Branding", "Culture"], readTime: "9 min read", featured: false, href: "#blog" },
    { id: 7,  title: "From English to Chinese: Turn Your Name into Something You Like", excerpt: "Smart ways to adapt or reinterpret English names into Chinese without losing your vibe.", author: "Anna Zhang", date: "2024-04-05", tags: ["Translation", "Practical"], readTime: "8 min read", featured: false, href: "#blog-en-to-zh" },
    { id: 8,  title: "Famous Figures as Inspiration: What Their Names Teach Us", excerpt: "What we can learn from historical names—structure, tone, and the stories behind them.", author: "History Studio", date: "2024-04-20", tags: ["History", "Inspiration"], readTime: "7 min read", featured: false, href: "#blog" },
    { id: 9,  title: "Character Selection 101: Pick Characters with Good Meaning", excerpt: "How to read dictionary entries, avoid odd meanings, and find characters that feel right.", author: "Dr. Li Wei", date: "2024-05-03", tags: ["Characters", "Meaning"], readTime: "8 min read", featured: false, href: "#blog" },
    { id: 10, title: "Surname First: How Family Names Shape Your Options", excerpt: "Some surnames pair better with certain tones and characters—here’s a friendly guide.", author: "Master Chen", date: "2024-05-18", tags: ["Surname", "Structure"], readTime: "6 min read", featured: false, href: "#blog" },
    { id: 11, title: "Modern vs. Traditional Styles: Find a Name That Fits You", excerpt: "Classic elegance or modern minimalism? Compare styles with real-world examples.", author: "Anna Zhang", date: "2024-06-02", tags: ["Style", "Examples"], readTime: "8 min read", featured: false, href: "#blog" },
    { id: 12, title: "Common Mistakes to Avoid When Choosing a Chinese Name", excerpt: "From awkward tone patterns to risky meanings—simple checks before you lock it in.", author: "Editorial Team", date: "2024-06-20", tags: ["Checklist", "Beginner"], readTime: "7 min read", featured: false, href: "#blog" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4">
            Chinese Name & Culture Blog
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Learn about Chinese naming traditions, cultural insights, and zodiac wisdom in a way that makes sense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-3">
                {post.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white/60">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{post.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white/60">{post.readTime}</span>
                  <a href={post.href} className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">Read more →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
