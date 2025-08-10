
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
      <SEO title="Blog – Stories, Notes & Updates" description="Thoughts on storytelling, education, and applied AI." />
      <Navigation currentPage="blog" />

      <div className="pt-24 pb-16 px-6">
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
                  {post.links && post.links.length > 0 && (
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
                  )}

                  {/* Excerpt Toggle - only for posts with book excerpts */}
                  {post.bookExcerpt && (
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
                  )}
                  
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
