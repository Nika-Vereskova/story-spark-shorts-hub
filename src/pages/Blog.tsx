
import React from 'react';
import { Calendar, ExternalLink, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { t } from '@/lib/i18n';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: t('blog.post1.title'),
      date: t('blog.post1.date'),
      excerpt: t('blog.post1.excerpt'),
      content: t('blog.post1.content'),
      bookExcerpt: t('blog.post1.bookExcerpt'),
      links: [
        { title: t('blog.post1.links.english'), url: "https://amzn.eu/d/3IRmXaF" },
        { title: t('blog.post1.links.swedish'), url: "https://amzn.eu/d/8CAuCN4" },
        { title: t('blog.post1.links.russian'), url: "https://lnkd.in/dX6EdEAs" }
      ]
    }
  ];

  const [expandedExcerpt, setExpandedExcerpt] = React.useState(false);

  const handleLinkClick = (url: string, title: string) => {
    console.log(`User clicked to open: ${title}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <Navigation currentPage="blog" />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">{t('blog.title')}</h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 shadow-brass-drop animate-fade-in relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-brass mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium font-inter">{post.date}</span>
                  </div>
                  <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">{post.title}</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter">{t('blog.latestUpdates')}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-oxidized-teal/80 font-inter whitespace-pre-line leading-relaxed">
                    {post.content}
                  </div>
                  
                  {/* Book Links */}
                  <div className="space-y-4">
                    <h3 className="text-oxidized-teal font-semibold font-playfair flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      {t('blog.readPlumberella')}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {post.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          variant="outline"
                          className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                          onClick={() => handleLinkClick(link.url, link.title)}
                        >
                          {link.title}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Excerpt Toggle */}
                  <div className="pt-4 border-t border-brass/30">
                    <Button
                      variant="outline"
                      className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium mb-4"
                      onClick={() => setExpandedExcerpt(!expandedExcerpt)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      {expandedExcerpt ? t('blog.hideExcerpt') : t('blog.readExcerpt')}
                    </Button>
                    
                    {expandedExcerpt && (
                      <div className="bg-brass/5 p-6 rounded-lg border border-brass/20 animate-fade-in">
                        <div className="prose prose-oxidized-teal max-w-none">
                          <div className="text-oxidized-teal/80 font-inter whitespace-pre-line leading-relaxed text-sm">
                            {post.bookExcerpt}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Social Media Follow */}
                  <div className="pt-4 border-t border-brass/30">
                    <p className="text-oxidized-teal/80 mb-4 font-inter">
                      {t('blog.followMe')}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium"
                        onClick={() => handleLinkClick('https://www.facebook.com/profile.php?id=61577838015246', 'Facebook')}
                      >
                        Facebook
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium"
                        onClick={() => handleLinkClick('https://www.instagram.com/vereskovanika', 'Instagram')}
                      >
                        Instagram
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 italic text-oxidized-teal/70 font-inter">
                    {t('blog.inspirationalQuote')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
