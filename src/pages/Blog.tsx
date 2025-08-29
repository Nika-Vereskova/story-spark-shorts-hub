
import React, { useState } from 'react';
import { Calendar, ExternalLink, Heart, BookOpen, Plus, Send, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/i18n';
import SEO from '@/components/SEO';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';

const Blog = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Load posts from localStorage or default
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('blog-posts');
    return savedPosts ? JSON.parse(savedPosts) : [
    {
      id: 2,
      title: t('blog.post2.title'),
      date: t('blog.post2.date'),
      excerpt: t('blog.post2.excerpt'),
      content: t('blog.post2.content'),
      bookExcerpt: t('blog.post2.bookExcerpt'),
      links: []
    },
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
  ]});
  
  const handleCreatePost = async () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can create blog posts.",
        variant: "destructive",
      });
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: t('common.emailRequired'),
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const post = {
      id: Date.now(),
      title: newPost.title,
      date: new Date().toLocaleDateString(),
      excerpt: newPost.content.substring(0, 100) + "...",
      content: newPost.content,
      links: []
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    
    // Trigger Zapier webhook if provided
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            title: newPost.title,
            content: newPost.content,
            timestamp: new Date().toISOString(),
            source: 'blog_post_created'
          }),
        });
        
        toast({
          title: t('common.zapTriggered'),
          description: t('common.zapTriggeredDesc'),
        });
      } catch (error) {
        console.error("Error triggering webhook:", error);
      }
    }
    
    setNewPost({ title: '', content: '' });
    setShowCreateForm(false);
    setIsLoading(false);
    
    toast({
      title: t('common.postCreated'),
      description: t('common.postCreatedDesc'),
    });
  };

  const [expandedExcerpt, setExpandedExcerpt] = React.useState(false);

  const handleLinkClick = (url: string, title: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`User clicked to open: ${title}`);
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <SEO title="Blog - Stories, AI Insights & Updates | STEaM LOGIC Studio AB" description="Thoughts on storytelling, education, applied AI and business intelligence from STEaM LOGIC Studio AB. Expert insights on AI consulting and creative technology solutions." />
      <Navigation currentPage="blog" />

      <div className="pt-24 pb-16 px-6">
        <AdSenseBanner position="top" />
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">{t('blog.title')}</h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              {t('blog.subtitle')}
            </p>
            
            {/* Create Post Button - Only for Admins */}
            {user && isAdmin && (
              <div className="mt-8">
                <Button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="bg-brass hover:bg-brass-dark text-parchment px-6 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t('common.createPost')}
                </Button>
              </div>
            )}
          </div>

          <AdSenseSquare size="medium" />

          {/* Admin Access Notice */}
          {user && !isAdmin && !roleLoading && (
            <div className="mt-8 p-4 bg-brass/10 border border-brass/30 rounded-lg">
              <div className="flex items-center text-brass">
                <Shield className="mr-2 h-4 w-4" />
                <span className="font-inter text-sm">Blog post creation is restricted to administrators.</span>
              </div>
            </div>
          )}

          {/* Create Post Form - Only for Admins */}
          {showCreateForm && isAdmin && (
            <Card className="mb-8 bg-parchment/90 border-2 border-brass shadow-brass-drop">
              <CardHeader>
                <CardTitle className="text-oxidized-teal font-playfair">{t('common.createPost')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="post-title" className="text-oxidized-teal font-inter font-medium">
                    {t('common.postTitle')}
                  </Label>
                  <Input
                    id="post-title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="mt-1 border-brass/30 focus:border-brass"
                    placeholder={t('common.postTitle')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="post-content" className="text-oxidized-teal font-inter font-medium">
                    {t('common.postContent')}
                  </Label>
                  <Textarea
                    id="post-content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="mt-1 border-brass/30 focus:border-brass min-h-[120px]"
                    placeholder={t('common.postContent')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="webhook-url" className="text-oxidized-teal font-inter font-medium">
                    {t('common.zapierWebhook')} (Optional)
                  </Label>
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="mt-1 border-brass/30 focus:border-brass"
                    placeholder={t('common.webhookPlaceholder')}
                    type="url"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleCreatePost}
                    disabled={isLoading}
                    className="bg-brass hover:bg-brass-dark text-parchment px-4 py-2 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-inter font-medium"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isLoading ? 'Publishing...' : t('common.publishPost')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Blog Posts */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 shadow-brass-drop animate-fade-in relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* ... keep existing code (post content) */}
              </Card>
            ))}
          </div>
          
          <AdSenseBanner position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default Blog;
