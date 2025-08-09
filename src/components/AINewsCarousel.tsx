import React, { useEffect, useState } from 'react';
import { Clock, ExternalLink, Cog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const AINewsCarousel = () => {
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
        .order('published_at', { ascending: false })
        .limit(4);

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-16 px-6 bg-brass/10">
        <div className="container mx-auto">
          <div className="text-center">
            <Cog className="w-8 h-8 text-brass animate-spin mx-auto mb-4" />
            <p className="text-oxidized-teal font-inter">{t('aiNews.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (newsPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 bg-brass/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
            {t('aiNews.latestInsights')}
          </h2>
          <p className="text-oxidized-teal/80 text-lg font-inter">
            {t('aiNews.tagline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 group overflow-hidden relative"
            >
              {/* Brass gear hover effect */}
              <div className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-30 transition-all duration-300">
                <Cog className="w-full h-full text-brass animate-spin" />
              </div>
              
              {post.cover_url && (
                <div className="relative overflow-hidden h-32">
                  <img
                    src={post.cover_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:sepia"
                    loading="lazy"
                    srcSet={`${post.cover_url}?width=320 320w, ${post.cover_url}?width=640 640w`}
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex items-center gap-1 text-xs text-brass mb-1 font-inter">
                  <Clock className="w-3 h-3" />
                  {formatDate(post.published_at)}
                </div>
                <CardTitle className="text-oxidized-teal text-sm font-playfair line-clamp-2 group-hover:text-brass transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                {post.summary && (
                  <CardDescription className="text-oxidized-teal/70 text-xs mb-3 font-inter line-clamp-2">
                    {post.summary}
                  </CardDescription>
                )}
                
                {post.article_url && (
                  <Button 
                    size="sm"
                    variant="outline"
                    className="w-full border border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 group-hover:animate-steam-puff font-inter text-xs"
                    onClick={() => window.open(post.article_url!, '_blank')}
                  >
                    {t('aiNews.readMore')}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline"
            className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-3 font-inter font-medium"
            onClick={() => window.location.href = '/ai-news'}
          >
            {t('aiNews.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AINewsCarousel;