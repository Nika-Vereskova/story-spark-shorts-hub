import React, { useState } from 'react';
import { Brain, Settings, Play, CheckCircle, Shield, BookOpen, Users, Zap, Clock, Star, ChevronDown, ChevronUp, MessageSquare, Sparkles, Bot, FileText, Send } from 'lucide-react';
import chatgptLogo from '@/assets/chatgpt-logo.svg';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SteampunkGearCluster from '@/components/SteampunkGearCluster';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

const LearnAI = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const miniWins = [
    {
      id: "email-rewrite",
      title: "Rewrite This Email",
      description: "Transform a messy draft into professional communication",
      prompt: "You are a professional assistant. Rewrite this email to be 130–160 words, warm but firm, with a clear ask and deadline. Keep my voice.\n\n[PASTE YOUR EMAIL DRAFT HERE]"
    },
    {
      id: "meeting-agenda",
      title: "Create Meeting Agenda", 
      description: "Generate a structured agenda for your next meeting",
      prompt: "Create a focused 45-minute meeting agenda for: [TOPIC]. Include: welcome (2 min), main discussion points with time allocations, decision items, and next steps. Format as a clean list."
    },
    {
      id: "task-breakdown",
      title: "Break Down Complex Task",
      description: "Turn overwhelming projects into manageable steps",
      prompt: "Break this goal into 5 actionable steps with time estimates and potential risks. Include a 30-minute first step I can do today.\n\nGoal: [DESCRIBE YOUR GOAL]"
    }
  ];

  const faqItems = [
    {
      question: "Do I need any technical background?",
      answer: "Not at all! Our lessons are designed for complete beginners. We use plain English and focus on practical applications anyone can understand."
    },
    {
      question: "How much time do I need per day?",
      answer: "Just 10 minutes daily for the Beginner track, or 15 minutes for Intermediate. Each lesson is bite-sized and designed to fit into busy schedules."
    },
    {
      question: "Is this suitable for parents and families?",
      answer: "Absolutely! We focus on family-friendly, ethical AI use. Many lessons help with everyday tasks like homework help, family planning, and household organization."
    },
    {
      question: "What AI tools will I learn to use?",
      answer: "We teach universal prompting techniques that work with ChatGPT, Claude, Gemini, and other major AI assistants. You choose your preferred tool."
    },
    {
      question: "How do you ensure safety and accuracy?",
      answer: "Every lesson includes safety guidelines, fact-checking reminders, and privacy best practices. We teach you to verify AI outputs and use placeholders for sensitive data."
    },
    {
      question: "Can I access the content after finishing?",
      answer: "Yes! Once you complete a track, you get lifetime access to all materials, updates, and our community notebook resources."
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  const openVideo = () => {
    window.open('https://youtu.be/FCA37YlJVPE?si=Vok6iI_5Fk0FUV7J', '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: t('learnAI.orderForm.error'),
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: {
          ...formData,
          serviceType: 'Education Service'
        }
      });

      if (error) throw error;
      
      toast({
        title: t('learnAI.orderForm.success'),
        description: "We'll contact you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: t('learnAI.orderForm.error'),
        description: "Please try again or contact hello@steamlogic.se",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SEO 
        title="Learn AI for Beginners (and Busy Parents) | STEaM LOGIC Studio AB"
        description="Friendly, practical AI lessons in 10 minutes a day. Start free and level up to intermediate with real‑life projects."
        keywords="Learn AI for beginners, AI education, family-friendly AI learning, beginner AI course, practical AI lessons, AI for parents"
      />
      {/* Course Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Learn AI for Beginners (and Busy Parents)",
        "description": "Friendly, practical AI lessons in 10 minutes a day. Start free and level up to intermediate with real‑life projects.",
        "provider": {
          "@type": "Organization",
          "name": "STEaM LOGIC Studio AB",
          "sameAs": "https://nika-vereskova.lovable.app/"
        },
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "name": "Beginner 0→1",
            "courseMode": "online",
            "educationalLevel": "Beginner",
            "isAccessibleForFree": true
          },
          {
            "@type": "CourseInstance",
            "name": "Intermediate 1→1.5",
            "courseMode": "online",
            "educationalLevel": "Intermediate",
            "isAccessibleForFree": true
          }
        ],
        "inLanguage": ["en", "sv", "ru"],
        "audience": {
          "@type": "Audience",
          "audienceType": ["Beginners", "Parents", "Professionals"]
        },
        "url": typeof window !== 'undefined' ? window.location.href : 'https://nika-vereskova.lovable.app/en/learn-ai'
      }) }} />
      
      {/* Decorative Elements */}
      <SteampunkGearCluster 
        className="opacity-5" 
        size="lg" 
        position="top-left" 
      />
      <SteampunkGearCluster 
        className="opacity-10" 
        size="md" 
        position="top-right" 
      />
      <Settings className="absolute top-32 right-8 w-12 h-12 text-muted-foreground/10 animate-spin" style={{animationDuration: '20s'}} />
      <Settings className="absolute bottom-32 left-8 w-8 h-8 text-muted-foreground/15 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />

      <Navigation currentPage="learn-ai" />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 py-16 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Brain className="w-16 h-16 text-primary" />
              <Settings className="w-12 h-12 text-muted-foreground animate-spin" style={{animationDuration: '10s'}} />
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
             THE COURSE is UNDER CONSTRUCTION. Learn AI the Calm Way
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
              THE COURSE IS UNDER CONSTRUCTION. 10‑minute lessons. Real‑life tasks. No jargon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="px-8 py-6 text-lg rounded-2xl" asChild>
                <a href="#intermediate-start-anchor">Start Learning AI</a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-2xl" asChild>
                <a href="#demo">Try a 5‑min Demo</a>
              </Button>
            </div>
            
            {/* Badge Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="px-3 py-1">Built by STEaM LOGIC Studio AB</Badge>
              <Badge variant="outline" className="px-3 py-1">10k+ lesson plays</Badge>
              <Badge variant="outline" className="px-3 py-1">Family‑friendly learning</Badge>
            </div>
          </div>
        </section>

        {/* Choose Your Path - Simplified */}
        <section className="px-6 py-16" id="tracks">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl font-bold text-center mb-12">{t('learnAI.choosePath.title')}</h2>
            
            {/* AI Learning Track */}
            <Card className="rounded-2xl shadow-lg mb-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="font-serif text-3xl">{t('learnAI.track.title')}</CardTitle>
                <CardDescription className="text-lg">{t('learnAI.track.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold">{t('learnAI.track.features.lessons')}</h4>
                    <p className="text-sm text-muted-foreground">{t('learnAI.track.features.duration')}</p>
                  </div>
                  <div>
                    <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold">{t('learnAI.track.features.prompts')}</h4>
                    <p className="text-sm text-muted-foreground">{t('learnAI.track.features.workflows')}</p>
                  </div>
                  <div>
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold">{t('learnAI.track.features.projects')}</h4>
                    <p className="text-sm text-muted-foreground">{t('learnAI.track.features.collaborative')}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{t('learnAI.track.benefits.workflows')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{t('learnAI.track.benefits.templates')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{t('learnAI.track.benefits.analysis')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{t('learnAI.track.benefits.collaboration')}</span>
                  </div>
                </div>
                
                <Button className="w-full py-6 text-lg rounded-xl" id="intermediate-start-anchor">
                  {t('learnAI.track.cta')}
                </Button>
              </CardContent>
            </Card>

            {/* Education Service Order Form */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="font-serif text-3xl">{t('learnAI.orderForm.title')}</CardTitle>
                <CardDescription className="text-lg">{t('learnAI.orderForm.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('learnAI.orderForm.fields.name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('learnAI.orderForm.fields.email')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organization">{t('learnAI.orderForm.fields.organization')}</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('learnAI.orderForm.fields.message')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="rounded-xl min-h-[120px]"
                      placeholder={t('learnAI.orderForm.fields.messagePlaceholder')}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Settings className="w-4 h-4 mr-2 animate-spin" />
                        {t('learnAI.orderForm.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('learnAI.orderForm.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* YouTube Video Section */}
        <section className="px-6 py-16 bg-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl font-bold text-center mb-4">{t('learnAI.videoSection.title')}</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">{t('learnAI.videoSection.subtitle')}</p>
            
            <Card className="rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={openVideo}>
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-muted/30">
                {/* YouTube thumbnail placeholder with video ID */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/80 to-muted/60">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Play className="w-12 h-12 text-primary ml-1" />
                      </div>
                      <div className="absolute inset-0 w-24 h-24 bg-primary/10 rounded-full animate-ping mx-auto"></div>
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-2">{t('learnAI.videoSection.videoTitle')}</h3>
                    <p className="text-muted-foreground mb-4">{t('learnAI.videoSection.videoDescription')}</p>
                    <Badge variant="outline" className="px-4 py-2">
                      <Play className="w-4 h-4 mr-2" />
                      {t('learnAI.videoSection.watchVideo')}
                    </Badge>
                  </div>
                </div>
                
                {/* Decorative gears */}
                <Settings className="absolute top-4 right-4 w-8 h-8 text-primary/30 animate-spin" style={{animationDuration: '20s'}} />
                <Settings className="absolute bottom-4 left-4 w-6 h-6 text-primary/20 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
              </div>
            </Card>
          </div>
        </section>

        {/* Learn by Doing: Instant Mini-Wins */}
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-serif text-4xl font-bold text-center mb-4">Learn by Doing: Instant Mini‑Wins</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Try these prompts right now and see immediate results</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {miniWins.map((win) => (
                <Card key={win.id} className="rounded-2xl hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{win.title}</CardTitle>
                    <CardDescription>{win.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full rounded-xl">Try Now</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{win.title}</DialogTitle>
                          <DialogDescription>{win.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-muted/50 p-4 rounded-xl">
                            <p className="text-sm mb-2 font-medium">Copy this prompt:</p>
                            <p className="text-sm font-mono leading-relaxed">{win.prompt}</p>
                          </div>
                          <Button 
                            onClick={() => copyToClipboard(win.prompt)}
                            className="w-full"
                          >
                            Copy to Clipboard
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* NotebookLM Section */}
        <section className="px-6 py-16 bg-muted/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-4xl font-bold mb-6">Deep Dive with NotebookLM</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore Renata's curated knowledge bases for in-depth learning
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" size="lg" className="h-20 rounded-2xl" asChild>
                <a href="{{NOTEBOOK_BASICS_URL}}" target="_blank" rel="noopener noreferrer">
                  <div>
                    <BookOpen className="w-6 h-6 mx-auto mb-1" />
                    <span>AI Basics Notebook</span>
                  </div>
                </a>
              </Button>
              <Button variant="outline" size="lg" className="h-20 rounded-2xl" asChild>
                <a href="{{NOTEBOOK_BEGINNER_COURSE_URL}}" target="_blank" rel="noopener noreferrer">
                  <div>
                    <Brain className="w-6 h-6 mx-auto mb-1" />
                    <span>Beginner Course</span>
                  </div>
                </a>
              </Button>
              <Button variant="outline" size="lg" className="h-20 rounded-2xl" asChild>
                <a href="{{NOTEBOOK_INTERMEDIATE_LAB_URL}}" target="_blank" rel="noopener noreferrer">
                  <div>
                    <Zap className="w-6 h-6 mx-auto mb-1" />
                    <span>Intermediate Lab</span>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Trusted Tools */}
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="font-serif text-4xl font-bold mb-12">Trusted Tools We Teach</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Button variant="outline" size="lg" className="h-20 rounded-2xl hover:bg-primary/5 transition-all duration-300" asChild>
                <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">
                  <div className="space-y-2">
                    <img src={chatgptLogo} alt="ChatGPT" className="w-8 h-8 mx-auto" />
                    <div>
                      <span className="font-semibold block">ChatGPT</span>
                      <span className="text-xs text-muted-foreground">Conversational AI</span>
                    </div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" size="lg" className="h-20 rounded-2xl hover:bg-primary/5 transition-all duration-300" asChild>
                <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                  <div className="space-y-2">
                    <Bot className="w-8 h-8 mx-auto text-orange-500" />
                    <div>
                      <span className="font-semibold block">Claude</span>
                      <span className="text-xs text-muted-foreground">Analytical AI</span>
                    </div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" size="lg" className="h-20 rounded-2xl hover:bg-primary/5 transition-all duration-300" asChild>
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">
                  <div className="space-y-2">
                    <Sparkles className="w-8 h-8 mx-auto text-blue-500" />
                    <div>
                      <span className="font-semibold block">Gemini</span>
                      <span className="text-xs text-muted-foreground">Multi-modal AI</span>
                    </div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" size="lg" className="h-20 rounded-2xl hover:bg-primary/5 transition-all duration-300" asChild>
                <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer">
                  <div className="space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-purple-500" />
                    <div>
                      <span className="font-semibold block">NotebookLM</span>
                      <span className="text-xs text-muted-foreground">Research AI</span>
                    </div>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Safety & Ethics */}
        <section className="px-6 py-16 bg-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl font-bold text-center mb-12">Safety & Ethics First</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-xl mb-4">Our Safety Checklist</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Never share sensitive personal data with AI</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Always verify factual claims with original sources</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Use placeholders for names and confidential info</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Respect copyright and give credit where due</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <Card className="rounded-2xl p-6 text-center">
                  <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Fact-Checking Promise</h3>
                  <p className="text-muted-foreground mb-4">
                    We teach you to verify AI outputs and maintain critical thinking
                  </p>
                  <Button variant="outline" asChild>
                    <a href="{{NOTEBOOK_SAFETY_URL}}" target="_blank" rel="noopener noreferrer">
                      How we fact‑check
                    </a>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-16 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-4xl font-bold mb-6">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands who've transformed their daily workflow with calm, practical AI learning
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg rounded-2xl" asChild>
                <a href="#beginner-start-anchor">Start Free Today</a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-2xl" asChild>
                <a href="#intermediate-start-anchor">Explore Intermediate</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="px-6 py-16 bg-muted/20">
          <div className="container mx-auto max-w-md text-center">
            <h3 className="font-serif text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">Get weekly AI tips and new lesson notifications</p>
            
            <form className="flex gap-2">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="rounded-xl"
              />
              <Button type="submit" className="rounded-xl">Subscribe</Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LearnAI;