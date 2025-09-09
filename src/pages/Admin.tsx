import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Users, Send, LogIn, Plus, Edit, Trash2, Eye, Bot, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterContent, setNewsletterContent] = useState('');
  const [sending, setSending] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [extractingNews, setExtractingNews] = useState(false);
  const [newsPrompt, setNewsPrompt] = useState('');
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    content: '',
    summary: '',
    meta_description: '',
    status: 'draft'
  });

  const { toast } = useToast();

  // Check authentication and admin status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setUser(session.user);

        // Check if user has admin role
        const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'admin'
        });

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(hasAdminRole || false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        checkAuth();
      } else {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load subscriber count and news when user becomes admin
  useEffect(() => {
    if (isAdmin) {
      loadSubscriberCount();
      loadNewsArticles();
    }
  }, [isAdmin]);

  const loadSubscriberCount = async () => {
    setLoadingSubscribers(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('id', { count: 'exact' })
        .eq('is_active', true)
        .eq('is_confirmed', true);

      if (error) {
        console.error('Error loading subscriber count:', error);
        toast({
          title: "Error",
          description: "Failed to load subscriber count",
          variant: "destructive",
        });
      } else {
        setSubscriberCount(data?.length || 0);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  const loadNewsArticles = async () => {
    setLoadingNews(true);
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading news articles:', error);
        toast({
          title: "Error",
          description: "Failed to load news articles",
          variant: "destructive",
        });
      } else {
        setNewsArticles(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const extractAINews = async () => {
    setExtractingNews(true);
    try {
      const { data, error } = await supabase.functions.invoke('extract-ai-news', {
        body: {
          prompt: newsPrompt || undefined,
          autoPublish: false,
          maxArticles: 3
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${data.articles?.length || 0} news articles extracted and saved as drafts`,
      });

      // Reload articles
      loadNewsArticles();
      setNewsPrompt('');
    } catch (error) {
      console.error('Error extracting news:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to extract news",
        variant: "destructive",
      });
    } finally {
      setExtractingNews(false);
    }
  };

  const processNewsContent = async (articleId: string, action: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('process-news-content', {
        body: {
          articleId,
          action
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Article ${action}ed successfully`,
      });

      // Reload articles
      loadNewsArticles();
    } catch (error) {
      console.error('Error processing article:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${action} article`,
        variant: "destructive",
      });
    }
  };

  const saveArticle = async () => {
    try {
      const articleData = {
        ...articleForm,
        slug: articleForm.slug || articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('news_posts')
          .update(articleData)
          .eq('id', editingArticle.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('news_posts')
          .insert([articleData]);
        
        if (error) throw error;
        
        toast({
          title: "Success", 
          description: "Article created successfully",
        });
      }

      setEditingArticle(null);
      setArticleForm({
        title: '',
        slug: '',
        content: '',
        summary: '',
        meta_description: '',
        status: 'draft'
      });
      loadNewsArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
        variant: "destructive",
      });
    }
  };

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const { error } = await supabase
        .from('news_posts')
        .delete()
        .eq('id', articleId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
      
      loadNewsArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterSubject.trim() || !newsletterContent.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both subject and content for the newsletter.',
        variant: 'destructive'
      });
      return;
    }

    setSending(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to send newsletters.',
          variant: 'destructive'
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject: newsletterSubject.trim(),
          content: newsletterContent.trim(),
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: 'Newsletter Sent!',
        description: `Successfully sent to ${data.sent_count} subscribers.`,
        duration: 8000,
      });

      // Clear form
      setNewsletterSubject('');
      setNewsletterContent('');

    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      console.error('Error sending newsletter:', err);
      toast({
        title: 'Failed to Send',
        description: err.message || 'An error occurred while sending the newsletter.',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
    }
  };

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: prompt('Enter your email:') || '',
        password: prompt('Enter your password:') || ''
      });

      if (error) {
        toast({
          title: 'Sign In Failed',
          description: error.message,
          variant: 'destructive'
        });
      }
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      toast({
        title: 'Sign In Error',
        description: err.message || 'An error occurred during sign in.',
        variant: 'destructive'
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5" />
              Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Please sign in to access the admin panel
            </p>
            <Button onClick={handleSignIn}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              You don't have permission to access the admin panel.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Panel Content
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingSubscribers ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  subscriberCount.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Active confirmed subscribers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">News Articles</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingNews ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  newsArticles.length
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Total articles in database
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {newsArticles.filter(article => article.status === 'published').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Live on website
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="newsletter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="news">AI News Management</TabsTrigger>
          </TabsList>

          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Send Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject Line
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Enter newsletter subject..."
                    value={newsletterSubject}
                    onChange={(e) => setNewsletterSubject(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-2">
                    Newsletter Content
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Write your newsletter content here..."
                    value={newsletterContent}
                    onChange={(e) => setNewsletterContent(e.target.value)}
                    className="w-full min-h-[200px]"
                  />
                </div>

                <Button 
                  onClick={handleSendNewsletter}
                  disabled={sending || !newsletterSubject.trim() || !newsletterContent.trim()}
                  className="w-full sm:w-auto"
                >
                  {sending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Newsletter...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Newsletter
                    </>
                  )}
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  This will send to all {subscriberCount} active subscribers
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <div className="space-y-6">
              {/* AI News Extraction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI News Extraction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="news-prompt" className="block text-sm font-medium mb-2">
                      Custom Search Prompt (optional)
                    </label>
                    <Textarea
                      id="news-prompt"
                      placeholder="Leave empty for default AI news search, or specify custom topics like 'OpenAI developments', 'AI regulation updates', etc."
                      value={newsPrompt}
                      onChange={(e) => setNewsPrompt(e.target.value)}
                      className="w-full min-h-[100px]"
                    />
                  </div>
                  
                  <Button 
                    onClick={extractAINews}
                    disabled={extractingNews}
                    className="w-full sm:w-auto"
                  >
                    {extractingNews ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Extracting AI News...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Extract Latest AI News
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    This will use Perplexity AI to find and extract the latest AI news, saving them as drafts for review.
                  </p>
                </CardContent>
              </Card>

              {/* Manual Article Creation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Create/Edit Article
                    </span>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          New Article
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingArticle ? 'Edit Article' : 'Create New Article'}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <Input
                              value={articleForm.title}
                              onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                              placeholder="Article title..."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                            <Input
                              value={articleForm.slug}
                              onChange={(e) => setArticleForm({...articleForm, slug: e.target.value})}
                              placeholder="article-url-slug (auto-generated if empty)"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Summary</label>
                            <Textarea
                              value={articleForm.summary}
                              onChange={(e) => setArticleForm({...articleForm, summary: e.target.value})}
                              placeholder="Brief summary..."
                              className="min-h-[80px]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Content</label>
                            <Textarea
                              value={articleForm.content}
                              onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                              placeholder="Full article content..."
                              className="min-h-[200px]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Meta Description</label>
                            <Input
                              value={articleForm.meta_description}
                              onChange={(e) => setArticleForm({...articleForm, meta_description: e.target.value})}
                              placeholder="SEO meta description..."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <Select 
                              value={articleForm.status} 
                              onValueChange={(value) => setArticleForm({...articleForm, status: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Button onClick={saveArticle} className="w-full">
                            {editingArticle ? 'Update Article' : 'Create Article'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Articles List */}
              <Card>
                <CardHeader>
                  <CardTitle>News Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingNews ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : newsArticles.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No articles found. Extract some AI news to get started!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {newsArticles.map((article) => (
                        <div key={article.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{article.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {article.summary || 'No summary available'}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={article.status === 'published' ? 'default' : article.status === 'draft' ? 'secondary' : 'outline'}>
                                  {article.status}
                                </Badge>
                                <Badge variant="outline">{article.source}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(article.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setEditingArticle(article);
                                  setArticleForm({
                                    title: article.title,
                                    slug: article.slug,
                                    content: article.content || '',
                                    summary: article.summary || '',
                                    meta_description: article.meta_description || '',
                                    status: article.status
                                  });
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              {article.status === 'draft' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => processNewsContent(article.id, 'publish')}
                                >
                                  Publish
                                </Button>
                              )}
                              
                              {article.status === 'published' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => processNewsContent(article.id, 'archive')}
                                >
                                  Archive
                                </Button>
                              )}
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => processNewsContent(article.id, 'enhance')}
                              >
                                <Sparkles className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteArticle(article.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;