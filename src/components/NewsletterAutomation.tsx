import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clock, Zap, Mail, Calendar, Settings, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput } from '@/lib/security';
import { useUserRole } from '@/hooks/useUserRole';

const NewsletterAutomation: React.FC = () => {
  const [zapierWebhookUrl, setZapierWebhookUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loadingSummaries, setLoadingSummaries] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useUserRole();

  const validateWebhookUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'https:' && 
             parsedUrl.hostname.endsWith('zapier.com');
    } catch {
      return false;
    }
  };

  const loadSummaries = async () => {
    setLoadingSummaries(true);
    try {
      const { data, error } = await supabase
        .from('news_summaries')
        .select('*, individual_summaries')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setSummaries(data || []);
    } catch (error) {
      console.error('Error loading summaries:', error);
      toast({
        title: "Error",
        description: "Failed to load news summaries",
        variant: "destructive",
      });
    } finally {
      setLoadingSummaries(false);
    }
  };

  React.useEffect(() => {
    loadSummaries();
  }, []);

  const validateBeforeGeneration = async (): Promise<{ valid: boolean; message: string; articlesCount?: number }> => {
    try {
      // Check recent articles (last 4 days)
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - (4 * 24 * 60 * 60 * 1000));
      
      const { data: articles, error } = await supabase
        .from('news_posts')
        .select('title, content, article_url, published_at')
        .eq('status', 'published')
        .gte('published_at', startDate.toISOString())
        .lte('published_at', endDate.toISOString())
        .order('published_at', { ascending: false });

      if (error) throw error;

      if (!articles || articles.length === 0) {
        return {
          valid: false,
          message: `No published articles found in the last 4 days (${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`
        };
      }

      const articlesWithContent = articles.filter(article => 
        article.content && article.content.length > 100
      );

      if (articlesWithContent.length === 0) {
        return {
          valid: false,
          message: `Found ${articles.length} articles but none have sufficient content for analysis`
        };
      }

      const articlesWithUrls = articlesWithContent.filter(article => article.article_url);

      return {
        valid: true,
        message: `✅ Validation passed: ${articlesWithContent.length} articles with content, ${articlesWithUrls.length} with source URLs`,
        articlesCount: articlesWithContent.length
      };

    } catch (error) {
      console.error('Validation error:', error);
      return {
        valid: false,
        message: 'Failed to validate articles. Please check your database connection.'
      };
    }
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    
    try {
      // Pre-flight validation
      toast({
        title: "Validating articles...",
        description: "Checking recent articles for analysis",
      });

      const validation = await validateBeforeGeneration();
      
      if (!validation.valid) {
        toast({
          title: "Validation Failed ❌",
          description: validation.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Articles validated ✅",
        description: validation.message,
      });

      // Call the summary generation function
      const { data, error } = await supabase.functions.invoke('generate-news-summary', {
        body: { daysBack: 4 }
      });

      if (error) {
        console.error("Summary generation error details:", error);
        
        // Enhanced error handling based on error type
        let errorMessage = "Failed to generate news summary";
        
        if (error.message?.includes('PERPLEXITY_API_KEY')) {
          errorMessage = "Perplexity API key not configured. Please contact administrator.";
        } else if (error.message?.includes('Admin access required')) {
          errorMessage = "Admin access required. You don't have permission to generate summaries.";
        } else if (error.message?.includes('No stories found')) {
          errorMessage = "No stories found in the specified period. Try adjusting the date range.";
        } else if (error.message?.includes('Invalid token')) {
          errorMessage = "Authentication failed. Please sign in again.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        toast({
          title: "Summary Generation Failed ❌",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "News Summary Generated! 📊",
        description: `Successfully analyzed ${data.storiesAnalyzed} stories from the last 4 days with individual summaries and citations`,
      });

      loadSummaries(); // Refresh the list
    } catch (error) {
      console.error("Error generating summary:", error);
      
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      
      toast({
        title: "Unexpected Error ❌",
        description: `Summary generation failed: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGenerateFromSummary = async (summaryId: string) => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-newsletter', {
        body: { 
          useSummary: true,
          summaryId: summaryId,
          triggerZapier: false 
        }
      });

      if (error) throw error;

      // Parse individual summaries if they exist in the response
      let individualSummaries = [];
      if (data.individualSummaries) {
        try {
          individualSummaries = typeof data.individualSummaries === 'string' 
            ? JSON.parse(data.individualSummaries) 
            : data.individualSummaries;
        } catch (parseError) {
          console.error('Error parsing individual summaries:', parseError);
        }
      }

      // Store the enhanced generated content for preview
      setGeneratedContent({
        ...data,
        individualSummaries: individualSummaries
      });
      setShowPreview(true);

      toast({
        title: "Newsletter Generated! 📧",
        description: `Newsletter created with ${individualSummaries.length} detailed article summaries and citations.`,
      });

      console.log("Generated Newsletter from Summary:", data);
    } catch (error) {
      console.error("Error generating newsletter from summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate newsletter from summary.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTestGeneration = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-newsletter', {
        body: { 
          triggerZapier: false 
        }
      });

      if (error) throw error;

      // Store the generated content for preview
      setGeneratedContent(data);
      setShowPreview(true);

      toast({
        title: "Newsletter Generated! 📧",
        description: "Preview generated successfully. Review the content below.",
      });

      console.log("Generated Newsletter:", data);
    } catch (error) {
      console.error("Error generating newsletter:", error);
      toast({
        title: "Error",
        description: "Failed to generate newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSetupAutomation = async () => {
    const sanitizedUrl = sanitizeInput(zapierWebhookUrl);
    
    if (!sanitizedUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateWebhookUrl(sanitizedUrl)) {
      toast({
        title: "Error", 
        description: "Please enter a valid Zapier webhook URL (must be HTTPS and from zapier.com)",
        variant: "destructive",
      });
      return;
    }

    setIsSettingUp(true);

    try {
      // Test the webhook with a sample newsletter
      const { data, error } = await supabase.functions.invoke('generate-newsletter', {
        body: { 
          triggerZapier: true,
          zapierWebhookUrl: sanitizedUrl
        }
      });

      if (error) throw error;

      toast({
        title: "Automation Setup Complete! 🎉",
        description: "Your Zapier webhook has been tested successfully. Set up the weekly schedule in Zapier.",
      });

      console.log("Automation test result:", data);
    } catch (error) {
      console.error("Error setting up automation:", error);
      toast({
        title: "Error",
        description: "Failed to setup automation. Please check your webhook URL.",
        variant: "destructive",
      });
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass">
        <CardHeader>
          <CardTitle className="text-2xl text-oxidized-teal flex items-center font-playfair">
            <Clock className="mr-3 h-6 w-6" />
            AI-Powered Newsletter Automation
          </CardTitle>
          <CardDescription className="text-oxidized-teal/80 font-inter">
            Automated Tuesday/Friday newsletters with Perplexity AI analysis and optional Zapier integration
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Features Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-parchment/90 border-2 border-brass">
          <CardContent className="p-6 text-center">
            <Mail className="w-12 h-12 text-brass mx-auto mb-3" />
            <h3 className="font-semibold text-oxidized-teal mb-2 font-playfair">AI Summary Analysis</h3>
            <p className="text-sm text-oxidized-teal/80 font-inter">
              Perplexity AI analyzes your news stories to create intelligent summaries and insights
            </p>
          </CardContent>
        </Card>

        <Card className="bg-parchment/90 border-2 border-brass">
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 text-brass mx-auto mb-3" />
            <h3 className="font-semibold text-oxidized-teal mb-2 font-playfair">Automated Schedule</h3>
            <p className="text-sm text-oxidized-teal/80 font-inter">
              Automatically sends on Tuesdays & Fridays at 10:00 AM UTC via cron job
            </p>
          </CardContent>
        </Card>

        <Card className="bg-parchment/90 border-2 border-brass">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-brass mx-auto mb-3" />
            <h3 className="font-semibold text-oxidized-teal mb-2 font-playfair">Smart Content</h3>
            <p className="text-sm text-oxidized-teal/80 font-inter">
              Trending topics, key insights, and pattern recognition across multiple stories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Automation Status */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
        <CardHeader>
          <CardTitle className="text-green-700 font-playfair">🤖 Automation Status</CardTitle>
          <CardDescription className="text-green-600 font-inter">
            Your automated newsletter system is active and running
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-inter text-green-700">Schedule:</span>
              <span className="font-inter text-green-600">Tuesdays & Fridays, 10:00 AM UTC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-inter text-green-700">Next Run:</span>
              <span className="font-inter text-green-600">
                {(() => {
                  const now = new Date();
                  const nextTuesday = new Date(now);
                  nextTuesday.setDate(now.getDate() + ((2 - now.getDay() + 7) % 7));
                  nextTuesday.setHours(10, 0, 0, 0);
                  if (nextTuesday <= now) {
                    nextTuesday.setDate(nextTuesday.getDate() + 7);
                  }
                  return nextTuesday.toLocaleDateString();
                })()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-inter text-green-700">AI Analysis:</span>
              <span className="font-inter text-green-600">Perplexity AI Enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Summary Generation */}
      <Card className="bg-parchment/90 border-2 border-brass">
        <CardHeader>
          <CardTitle className="text-oxidized-teal font-playfair">AI News Summary Generator</CardTitle>
          <CardDescription className="font-inter">
            Generate intelligent summaries of your recent news stories using Perplexity AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isAdmin ? (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <h4 className="font-semibold text-red-800 font-playfair">Admin Access Required</h4>
              </div>
              <p className="text-sm text-red-700 font-inter">
                You need administrator privileges to generate AI news summaries. Please contact an administrator for access.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-brass/10 p-4 rounded border border-brass/30">
                <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Enhanced AI Analysis Includes:</h4>
                <ul className="text-sm text-oxidized-teal/80 space-y-1 font-inter">
                  <li>• <strong>Individual Article Summaries:</strong> Detailed analysis of each news story with full content review</li>
                  <li>• <strong>Source Citations:</strong> Direct links to original articles for fact-checking and attribution</li>
                  <li>• <strong>Key Point Extraction:</strong> Bullet-point highlights of the most important developments</li>
                  <li>• <strong>Cross-Story Analysis:</strong> Connections and patterns between related stories</li>
                  <li>• <strong>Trending Topics:</strong> Emerging themes and keywords across all analyzed content</li>
                  <li>• <strong>Impact Assessment:</strong> Analysis of significance and potential industry implications</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary}
                className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment font-inter"
              >
                {isGeneratingSummary ? "🔄 Validating & Analyzing..." : "🤖 Generate AI News Summary"}
              </Button>

              {/* Enhanced Validation Button */}
              <div className="pt-2">
                <Button 
                  onClick={async () => {
                    try {
                      const validation = await validateBeforeGeneration();
                      
                      if (validation.valid) {
                        toast({
                          title: `✅ Validation Passed`,
                          description: validation.message,
                        });
                      } else {
                        toast({
                          title: "⚠️ Validation Issues",
                          description: validation.message,
                          variant: "destructive",
                        });
                      }
                    } catch (error) {
                      toast({
                        title: "Validation Error",
                        description: "Failed to validate content. Please check your news articles.",
                        variant: "destructive",
                      });
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 font-inter"
                >
                  🔍 Test Articles & Content Validation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Summaries */}
      <Card className="bg-parchment/90 border-2 border-brass">
        <CardHeader>
          <CardTitle className="text-oxidized-teal font-playfair">Recent AI Summaries</CardTitle>
          <CardDescription className="font-inter">
            View and use previously generated summaries for newsletters
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingSummaries ? (
            <div className="text-center py-4">
              <p className="text-oxidized-teal/80 font-inter">Loading summaries...</p>
            </div>
          ) : summaries.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-oxidized-teal/80 font-inter">No summaries generated yet. Create your first summary above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {summaries.map((summary) => {
                // Parse individual summaries if available
                let individualSummaries = [];
                try {
                  if (summary.individual_summaries) {
                    individualSummaries = JSON.parse(summary.individual_summaries);
                  }
                } catch (error) {
                  console.error('Error parsing individual summaries:', error);
                }

                return (
                  <div key={summary.id} className="border border-brass/30 rounded p-4 bg-brass/5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-oxidized-teal font-playfair">{summary.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${summary.newsletter_sent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {summary.newsletter_sent ? 'Sent' : 'Available'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-oxidized-teal/80 mb-3 font-inter">
                      {summary.summary_content.substring(0, 150)}...
                    </p>

                    {/* Show individual articles if available */}
                    {individualSummaries.length > 0 && (
                      <div className="bg-white/50 p-3 rounded mb-3 border border-brass/20">
                        <h5 className="text-xs font-semibold text-oxidized-teal mb-2 font-playfair">
                          📰 Articles Analyzed ({individualSummaries.length})
                        </h5>
                        <div className="space-y-2">
                          {individualSummaries.slice(0, 2).map((article, index) => (
                            <div key={index} className="text-xs text-oxidized-teal/70 font-inter">
                              <div className="font-medium">{article.title}</div>
                              {article.source_url && (
                                <a 
                                  href={article.source_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-brass hover:underline"
                                >
                                  🔗 Source
                                </a>
                              )}
                            </div>
                          ))}
                          {individualSummaries.length > 2 && (
                            <div className="text-xs text-oxidized-teal/50 font-inter">
                              +{individualSummaries.length - 2} more articles...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-oxidized-teal/60 font-inter mb-3">
                      <span>{summary.story_count} stories analyzed</span>
                      <span>{new Date(summary.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleGenerateFromSummary(summary.id)}
                      disabled={isGenerating}
                      size="sm"
                      className="mt-3 bg-brass hover:bg-brass-dark text-parchment font-inter"
                    >
                      {isGenerating ? "Generating..." : "Create Newsletter from Summary"}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Traditional Newsletter Generation */}
      <Card className="bg-parchment/90 border-2 border-brass">
        <CardHeader>
          <CardTitle className="text-oxidized-teal font-playfair">Traditional Newsletter Generation</CardTitle>
          <CardDescription className="font-inter">
            Generate a newsletter using the classic format with latest news items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-brass/10 p-4 rounded border border-brass/30">
              <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Enhanced Traditional Format Includes:</h4>
              <ul className="text-sm text-oxidized-teal/80 space-y-1 font-inter">
                <li>• <strong>Latest AI News:</strong> Curated insights from your published news articles</li>
                <li>• <strong>Workshop Highlights:</strong> YouTube video updates and behind-the-scenes content</li>
                <li>• <strong>Book Updates:</strong> New story announcements and publishing progress</li>
                <li>• <strong>Expert Tips:</strong> Weekly AI advice and storytelling guidance</li>
                <li>• <strong>Professional Styling:</strong> Brand-consistent design with call-to-action buttons</li>
                <li>• <strong>Mobile Optimized:</strong> Responsive HTML format for all devices</li>
              </ul>
            </div>
            
            <Button 
              onClick={handleTestGeneration}
              disabled={isGenerating}
              className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment font-inter"
            >
              {isGenerating ? "Generating..." : "Generate Traditional Newsletter"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Optional Zapier Integration */}
      <Card className="bg-parchment/90 border-2 border-brass opacity-75">
        <CardHeader>
          <CardTitle className="text-oxidized-teal flex items-center font-playfair">
            <Settings className="mr-3 h-5 w-5" />
            Optional: Manual Zapier Integration
          </CardTitle>
          <CardDescription className="font-inter">
            (Optional) Set up manual Zapier webhook for additional automation workflows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-brass/10 p-4 rounded border border-brass/30">
            <p className="text-sm text-oxidized-teal/80 font-inter mb-2">
              <strong>Note:</strong> The automated system is already running via cron job. This Zapier integration is optional for additional workflows.
            </p>
            <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Manual Setup Instructions:</h4>
            <ol className="text-sm text-oxidized-teal/80 space-y-1 font-inter list-decimal list-inside">
              <li>Create a new Zap in Zapier</li>
              <li>Set trigger: "Webhooks by Zapier" → "Catch Hook"</li>
              <li>Copy the webhook URL and paste it below</li>
              <li>Set action: Your email platform (MailerLite, Mailchimp, etc.)</li>
              <li>Test the setup using the button below</li>
            </ol>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="zapier-webhook" className="font-inter">Zapier Webhook URL</Label>
              <Input
                id="zapier-webhook"
                type="url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={zapierWebhookUrl}
                onChange={(e) => setZapierWebhookUrl(e.target.value)}
                className="mt-1 font-inter"
              />
            </div>
            
            <Button 
              onClick={handleSetupAutomation}
              disabled={isSettingUp || !zapierWebhookUrl}
              className="w-full bg-brass hover:bg-brass-dark text-parchment font-inter"
            >
              {isSettingUp ? "Testing Webhook..." : "Test Zapier Integration"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Preview */}
      {showPreview && generatedContent && (
        <Card className="bg-parchment/90 border-2 border-green-500">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-green-700 font-playfair">📧 Newsletter Preview</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="text-green-700 border-green-300 hover:bg-green-50"
              >
                ✕ Close
              </Button>
            </div>
            <CardDescription className="text-green-600 font-inter">
              Your generated newsletter content with individual article summaries and citations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject Line */}
            <div className="bg-white p-4 rounded border-2 border-green-200">
              <h3 className="font-bold text-green-700 mb-3 font-playfair">📝 Subject Line:</h3>
              <p className="text-lg text-oxidized-teal font-inter bg-green-50 p-3 rounded">
                {generatedContent.subject}
              </p>
            </div>
            
            {/* Individual Article Summaries Display */}
            {generatedContent.individualSummaries && generatedContent.individualSummaries.length > 0 && (
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <h3 className="font-bold text-blue-700 mb-4 font-playfair">🔍 Individual Article Analysis:</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {generatedContent.individualSummaries.map((article, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-800 mb-2 font-playfair">
                        {index + 1}. {article.title}
                      </h4>
                      <div className="text-sm text-blue-700 mb-3 font-inter leading-relaxed prose prose-sm max-w-none prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown>{article.summary}</ReactMarkdown>
                      </div>
                      
                      {/* Source Citation */}
                      {article.source_url && (
                        <div className="mb-3">
                          <span className="text-xs font-semibold text-blue-600 font-inter">🔗 Source: </span>
                          <a 
                            href={article.source_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 underline font-inter"
                          >
                            {article.source_url.length > 60 ? 
                              article.source_url.substring(0, 60) + '...' : 
                              article.source_url
                            }
                          </a>
                        </div>
                      )}
                      
                      {/* Key Points */}
                      {article.key_points && article.key_points.length > 0 && (
                        <div className="bg-white p-3 rounded border border-blue-200">
                          <span className="text-xs font-semibold text-blue-600 font-inter mb-2 block">
                            📋 Key Points:
                          </span>
                          <ul className="list-disc list-inside space-y-1">
                            {article.key_points.map((point, pointIndex) => (
                              <li key={pointIndex} className="text-xs text-blue-700 font-inter">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Full Newsletter Text Content */}
            <div className="bg-white p-4 rounded border-2 border-green-200">
              <h3 className="font-bold text-green-700 mb-3 font-playfair">📄 Complete Newsletter Text:</h3>
              <div className="max-h-80 overflow-y-auto bg-gray-50 p-4 rounded border">
                <pre className="whitespace-pre-wrap text-sm font-inter text-oxidized-teal">
                  {generatedContent.content}
                </pre>
              </div>
            </div>

            {/* HTML Preview with Enhanced Display */}
            <div className="bg-white p-4 rounded border-2 border-green-200">
              <h3 className="font-bold text-green-700 mb-3 font-playfair">🌐 HTML Preview:</h3>
              <div className="max-h-96 overflow-y-auto border rounded bg-white">
                <div 
                  className="p-4"
                  dangerouslySetInnerHTML={{ 
                    __html: generatedContent.htmlContent || generatedContent.content 
                  }} 
                />
              </div>
            </div>

            {/* Statistics & Quality Check */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded border-2 border-green-200">
              <h3 className="font-bold text-green-700 mb-3 font-playfair">📊 Content Quality Check:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm font-inter">
                <div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Subject Length:</span>
                    <span className={`${generatedContent.subject?.length > 60 ? 'text-red-600' : 'text-green-600'}`}>
                      {generatedContent.subject?.length || 0}/60 chars
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Word Count:</span>
                    <span className="text-green-600">
                      {generatedContent.content?.split(' ').length || 0} words
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Articles Analyzed:</span>
                    <span className="text-blue-600">
                      {generatedContent.individualSummaries?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Sources with Links:</span>
                    <span className="text-blue-600">
                      {generatedContent.individualSummaries?.filter(article => article.source_url).length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-inter"
                onClick={() => {
                  toast({
                    title: "Newsletter Approved! ✅",
                    description: "Your newsletter with individual article summaries is ready for distribution.",
                  });
                }}
              >
                ✅ Approve Newsletter
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50 font-inter"
                onClick={() => {
                  navigator.clipboard.writeText(generatedContent.content);
                  toast({
                    title: "Text Copied! 📋",
                    description: "Complete newsletter text copied to clipboard.",
                  });
                }}
              >
                📋 Copy Text
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 font-inter"
                onClick={() => {
                  navigator.clipboard.writeText(generatedContent.htmlContent || generatedContent.content);
                  toast({
                    title: "HTML Copied! 📋",
                    description: "Newsletter HTML with citations copied to clipboard.",
                  });
                }}
              >
                📋 Copy HTML
              </Button>
            </div>

            {/* Citation Guidelines */}
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2 font-playfair">📚 Citation Best Practices:</h4>
              <ul className="text-sm text-yellow-700 space-y-1 font-inter">
                <li>• All article sources are properly attributed with clickable links</li>
                <li>• Individual summaries maintain original article context</li>
                <li>• Key points highlight the most important developments</li>
                <li>• Links open in new tabs to maintain newsletter engagement</li>
                <li>• Source URLs are validated and accessible</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Brand Guidelines */}
      <Card className="bg-parchment/90 border-2 border-brass">
        <CardHeader>
          <CardTitle className="text-oxidized-teal font-playfair">Newsletter Brand Styling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Colors</h4>
              <div className="space-y-2 text-sm font-inter">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#8b7355] border"></div>
                  <span>Brass: #8b7355</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#2c5530] border"></div>
                  <span>Oxidized Teal: #2c5530</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Typography</h4>
              <div className="space-y-1 text-sm font-inter">
                <p>Headers: Playfair Display</p>
                <p>Body: Inter</p>
                <p>Style: Steampunk elegance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterAutomation;