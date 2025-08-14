import React from 'react';
import { BookOpen, Calendar, User, Tag, ArrowRight, Star, Heart } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const BlogPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Chinese Name Blog - Cultural Insights & Naming Traditions';
    trackPageView('Blog Page', '/blog');
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Chinese Naming: How Chinese Names Actually Work",
      excerpt: "Learn about Chinese naming traditions, from how names are put together to what each character really means.",
      author: "Dr. Li Wei",
      date: "2024-01-15",
      tags: ["Chinese Names", "Culture"],
      readTime: "8 min read",
      featured: true
    },
    {
      id: 2,
      title: "Chinese Zodiac Compatibility: The Real Deal Behind Love Matches",
      excerpt: "Find out how Chinese zodiac compatibility actually works and how the twelve animal signs affect your relationships.",
      author: "Master Chen",
      date: "2024-01-10",
      tags: ["Zodiac", "Compatibility"],
      readTime: "6 min read",
      featured: false
    }
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
                <span className="text-sm text-white/60">{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
