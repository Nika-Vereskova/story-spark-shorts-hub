import React, { useState } from 'react';
import { Brain, Settings, Play, CheckCircle, Shield, BookOpen, Users, Zap, Clock, Star, ChevronDown, ChevronUp, MessageSquare, Sparkles, Bot, FileText } from 'lucide-react';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const LearnAI = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const capabilities = [
    { icon: Brain, title: "Smart Email Writing", description: "Draft professional emails in seconds" },
    { icon: BookOpen, title: "Content Summarization", description: "Turn long articles into key insights" },
    { icon: Settings, title: "Process Automation", description: "Streamline repetitive tasks" },
    { icon: Zap, title: "Creative Brainstorming", description: "Generate ideas and solutions fast" },
    { icon: Users, title: "Meeting Preparation", description: "Create agendas and follow-ups" },
    { icon: Star, title: "Learning Acceleration", description: "Break down complex topics simply" },
    { icon: CheckCircle, title: "Quality Checking", description: "Review and improve your work" },
    { icon: Clock, title: "Time Management", description: "Optimize schedules and priorities" },
    { icon: Shield, title: "Safe AI Practices", description: "Use AI responsibly and securely" }
  ];

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
    // Could add a toast notification here
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
                <a href="#beginner-start-anchor">Start Beginner Track (Free)</a>
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

        {/* Two-Track Switcher */}
        <section className="px-6 py-16" id="tracks">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl font-bold text-center mb-12">Choose Your Path</h2>
            
            <Tabs defaultValue="beginner" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 h-16 rounded-2xl">
                <TabsTrigger value="beginner" className="text-lg font-medium rounded-xl">
                  Beginner 0→1
                </TabsTrigger>
                <TabsTrigger value="intermediate" className="text-lg font-medium rounded-xl">
                  Intermediate 1→1.5
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="beginner">
                <Card className="rounded-2xl shadow-lg">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="font-serif text-3xl">Beginner Track</CardTitle>
                    <CardDescription className="text-lg">Perfect for AI newcomers and busy parents</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">8 Lessons</h4>
                        <p className="text-sm text-muted-foreground">10 minutes each</p>
                      </div>
                      <div>
                        <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">Real Tasks</h4>
                        <p className="text-sm text-muted-foreground">Immediate wins</p>
                      </div>
                      <div>
                        <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">Safe & Ethical</h4>
                        <p className="text-sm text-muted-foreground">Family-friendly</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Email writing & editing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Article summarization</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Goal planning & breakdown</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Privacy & safety basics</span>
                      </div>
                    </div>
                    
                    <Button className="w-full py-6 text-lg rounded-xl" id="beginner-start-anchor">
                      Start Beginner Track (Free)
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="intermediate">
                <Card className="rounded-2xl shadow-lg">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="font-serif text-3xl">Intermediate Track</CardTitle>
                    <CardDescription className="text-lg">For those ready to level up their AI skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">12 Lessons</h4>
                        <p className="text-sm text-muted-foreground">15 minutes each</p>
                      </div>
                      <div>
                        <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">Advanced Prompts</h4>
                        <p className="text-sm text-muted-foreground">Professional workflows</p>
                      </div>
                      <div>
                        <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">Team Projects</h4>
                        <p className="text-sm text-muted-foreground">Collaborative AI</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Multi-step workflows</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Custom prompt templates</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Data analysis & insights</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Team collaboration strategies</span>
                      </div>
                    </div>
                    
                    <Button className="w-full py-6 text-lg rounded-xl" id="intermediate-start-anchor">
                      Explore Intermediate
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* What You'll Be Able To Do */}
        <section className="px-6 py-16 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-serif text-4xl font-bold text-center mb-12">What You'll Be Able To Do</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {capabilities.map((capability, index) => (
                <Card key={index} className="rounded-2xl hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <capability.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{capability.title}</h3>
                    <p className="text-muted-foreground">{capability.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                    <MessageSquare className="w-8 h-8 mx-auto text-green-600" />
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