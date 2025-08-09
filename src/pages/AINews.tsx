import React, { useEffect, useState } from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { supabase } from '@/integrations/supabase/client';
import { t } from '@/lib/i18n';

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  cover_url: string | null;
  summary: string | null;
  published_at: string;
  article_url: string | null;
}

const AINews = () => {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsPosts();
  }, []);

  const fetchNewsPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNewsPosts(data || []);
    } catch (error) {
      console.error('Error fetching news posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment bg-gear-pattern">
        <Navigation currentPage="ai-news" />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-brass border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-oxidized-teal">{t('aiNews.loading')}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <Navigation currentPage="ai-news" />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-6 drop-shadow-text-drop">
              {t('aiNews.pageTitle')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 max-w-3xl mx-auto">
              {t('aiNews.pageSubtitle')}
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPosts.map((post) => (
              <Card 
                key={post.id}
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop group overflow-hidden"
              >
                {post.cover_url && (
                  <AspectRatio ratio={4 / 3} className="relative overflow-hidden">
                    <img
                      src={post.cover_url}
                      alt={post.title}
                      className="w-full h-full object-cover sepia transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                      srcSet={`${post.cover_url}?width=480 480w, ${post.cover_url}?width=768 768w`}
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </AspectRatio>
                )}
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-brass mb-2">
                    <Clock className="w-4 h-4" />
                    {formatDate(post.published_at)}
                  </div>
                  <CardTitle className="font-bold text-oxidized-teal text-xl drop-shadow-text-drop group-hover:text-brass transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {post.summary && (
                    <CardDescription className="text-oxidized-teal/80 mb-4">
                      {post.summary}
                    </CardDescription>
                  )}
                  
                  {post.article_url && (
                    <Button 
                      variant="outline"
                      className="w-full border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 group-hover:animate-steam-puff"
                      onClick={() => window.open(post.article_url!, '_blank')}
                    >
                      {t('aiNews.readMore')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {newsPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-oxidized-teal/60 text-lg">
                {t('aiNews.noPosts')}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AINews;