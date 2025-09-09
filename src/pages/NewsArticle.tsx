import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, ExternalLink, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  published_at: string;
  article_url: string | null;
  source: string;
  meta_description: string | null;
  cover_url: string | null;
}

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setNotFound(true);
        } else {
          console.error('Error fetching article:', error);
        }
        return;
      }

      setArticle(data);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareArticle = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to copying URL to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard",
      });
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/ai-news">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.meta_description || article.summary}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/ai-news">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to AI News
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{article.source}</Badge>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(article.published_at)}
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {estimateReadingTime(article.content)} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>

            {article.summary && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {article.summary}
              </p>
            )}

            {/* Cover Image */}
            {article.cover_url && (
              <div className="mb-8">
                <img
                  src={article.cover_url}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-y py-4 mb-8">
              <div className="flex items-center gap-4">
                <Button onClick={shareArticle} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                {article.article_url && (
                  <a href={article.article_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Source
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <main className="prose prose-lg max-w-none prose-gray dark:prose-invert">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              
              // Check if paragraph starts with #, ##, etc. for headings
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={index} className="text-3xl font-bold mt-8 mb-4">
                    {paragraph.replace('# ', '')}
                  </h2>
                );
              }
              
              if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={index} className="text-2xl font-semibold mt-6 mb-3">
                    {paragraph.replace('## ', '')}
                  </h3>
                );
              }

              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={index} className="text-xl font-semibold mt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              }

              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </main>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Published on {formatDate(article.published_at)}
              </div>
              
              <div className="flex items-center gap-4">
                <Button onClick={shareArticle} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
                
                <Link to="/ai-news">
                  <Button variant="outline" size="sm">
                    More AI News
                  </Button>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}