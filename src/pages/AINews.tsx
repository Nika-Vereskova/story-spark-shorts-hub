import React, { useEffect, useState } from 'react';
import { Clock, ExternalLink, Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { t } from '@/lib/i18n';
import SEO from '@/components/SEO';
import { useNavigate } from 'react-router-dom';
import { getCurrentLocale } from '@/lib/i18n';
import formatCitations from '@/lib/formatCitations';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';
import OptimizedImage from '@/components/ui/optimized-image';

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
  const navigate = useNavigate();
  const locale = getCurrentLocale();

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
              <p className="mt-4 text-oxidized-teal font-inter">{t('aiNews.loading')}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern relative">
      {/* Clockwork Gear Decorations */}
      <Settings className="absolute top-32 left-12 w-10 h-10 text-brass/15 animate-gear-rotation" style={{animationDelay: '1.5s'}} />
      <Settings className="absolute top-1/2 right-8 w-14 h-14 text-brass/10 animate-gear-rotation" style={{animationDelay: '3.5s'}} />
      <Settings className="absolute bottom-36 left-1/3 w-12 h-12 text-brass/20 animate-gear-rotation" style={{animationDelay: '0.5s'}} />
      <SEO title="AI News & Insights | STEaM LOGIC Studio AB" description="Latest AI trends, curated insights, and analysis from STEaM LOGIC Studio AB. Thought leadership in AI strategy and practical applications." />
      <Navigation currentPage="ai-news" />
      
      <main className="pt-24 pb-12">
        <AdSenseBanner position="top" />
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">
              {t('aiNews.pageTitle')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 max-w-3xl mx-auto font-inter">
              {t('aiNews.pageSubtitle')}
            </p>
          </div>

          <AdSenseSquare size="medium" />

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop group overflow-hidden"
              >
                {post.cover_url && (
                  <OptimizedImage
                    src={post.cover_url}
                    alt={`${post.title} cover image`}
                    className="w-full h-48 object-cover"
                    height={192}
                    lazy={true}
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop">
                    {post.title}
                  </CardTitle>
                  {post.summary && (
                    <CardDescription className="text-oxidized-teal/70 text-sm font-inter">
                      <span>{formatCitations(post.summary)}</span>
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center text-sm text-oxidized-teal/80 font-inter">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(post.published_at)}
                  </div>
                  <Button
                    variant="outline"
                    className="border border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 font-inter font-medium"
                    onClick={() =>
                      post.article_url
                        ? window.open(post.article_url, '_blank')
                        : navigate(`/ai-news/${post.slug}`)
                    }
                  >
                    {t('aiNews.readMore')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {newsPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-oxidized-teal/60 text-lg font-inter">
                {t('aiNews.noPosts')}
              </p>
            </div>
          )}
          
          <AdSenseBanner position="bottom" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AINews;
