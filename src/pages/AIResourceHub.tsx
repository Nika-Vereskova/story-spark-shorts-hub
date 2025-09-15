import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { FileText, Bot, HelpCircle, Download, ExternalLink, Mail, Sparkles } from 'lucide-react';
import { t } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/i18n';
import AdSenseUnit from '@/components/AdSenseUnit';

const AIResourceHub = () => {
  const locale = getCurrentLocale();

  const templates = [
    {
      title: "AI Policy Template for Businesses",
      description: "Comprehensive AI governance policy template covering data usage, ethics, and compliance requirements for modern businesses.",
      category: "Policy",
      downloadUrl: "#",
      keywords: "AI policy template, business AI governance, AI ethics policy"
    },
    {
      title: "AI Implementation Checklist",
      description: "Step-by-step checklist for safely implementing AI tools in your organization with best practices and risk assessment.",
      category: "Checklist",
      downloadUrl: "#",
      keywords: "AI implementation guide, AI deployment checklist"
    },
    {
      title: "AI Risk Assessment Framework",
      description: "Complete framework for evaluating AI risks, including bias detection, privacy concerns, and mitigation strategies.",
      category: "Framework",
      downloadUrl: "#",
      keywords: "AI risk assessment, AI bias detection, AI safety framework"
    },
    {
      title: "Educational AI Guidelines",
      description: "Guidelines for teachers and schools on responsible AI use in education, including student privacy and academic integrity.",
      category: "Education",
      downloadUrl: "#",
      keywords: "AI in education, teaching with AI, school AI policy"
    },
    {
      title: "Parental AI Safety Guide",
      description: "Essential guide for parents to help children safely interact with AI tools and understand AI technology.",
      category: "Parental",
      downloadUrl: "#",
      keywords: "AI safety for children, parental AI guide, kids AI education"
    },
    {
      title: "AI Content Creation Best Practices",
      description: "Professional guidelines for creators using AI tools, covering disclosure, authenticity, and quality standards.",
      category: "Creative",
      downloadUrl: "#",
      keywords: "AI content creation, AI for creators, responsible AI use"
    }
  ];

  const customGPTs = [
    {
      title: "AI Policy Writer GPT",
      description: "Custom GPT specialized in drafting comprehensive AI policies for businesses of all sizes.",
      url: "https://chat.openai.com/g/g-example1",
      category: "Policy"
    },
    {
      title: "AI Ethics Advisor GPT",
      description: "Expert guidance on AI ethics, bias detection, and responsible AI implementation strategies.",
      url: "https://chat.openai.com/g/g-example2",
      category: "Ethics"
    },
    {
      title: "Educational AI Assistant GPT",
      description: "Specialized GPT for educators to integrate AI tools safely and effectively in learning environments.",
      url: "https://chat.openai.com/g/g-example3",
      category: "Education"
    },
    {
      title: "AI Risk Assessment GPT",
      description: "Comprehensive risk evaluation tool for AI implementations, covering security, privacy, and compliance.",
      url: "https://chat.openai.com/g/g-example4",
      category: "Risk Management"
    }
  ];

  const faqs = [
    {
      question: "What is an AI policy and why do businesses need one?",
      answer: "An AI policy is a comprehensive document that outlines how your organization will use artificial intelligence tools responsibly. It covers data handling, privacy protection, bias prevention, and compliance requirements. Businesses need AI policies to manage risks, ensure ethical use, protect customer data, and comply with emerging AI regulations."
    },
    {
      question: "How do I use Custom GPTs for my business?",
      answer: "Custom GPTs are specialized AI assistants trained for specific tasks or industries. To use them effectively: 1) Identify your specific needs (policy writing, risk assessment, etc.), 2) Choose relevant Custom GPTs from our curated list, 3) Provide clear, detailed prompts, 4) Always review and validate the output, 5) Ensure compliance with your organization's AI policy."
    },
    {
      question: "Are these AI resources really free?",
      answer: "Yes! Our AI templates, checklists, and frameworks are completely free to download and use. We provide these resources to help organizations implement AI responsibly. While the templates are free, we also offer consulting services for organizations that need customized AI policies or implementation support."
    },
    {
      question: "How often should I update my AI policy?",
      answer: "AI policies should be reviewed and updated regularly - we recommend every 6-12 months or whenever you adopt new AI tools. The AI landscape evolves rapidly, and regulations are constantly changing. Regular updates ensure your policy remains current with best practices and legal requirements."
    },
    {
      question: "What AI tools are safe for children and schools?",
      answer: "Safe AI tools for children include age-appropriate educational assistants with privacy protection, supervised creative tools, and platforms with strong content moderation. Our educational guidelines provide specific recommendations for different age groups and use cases in school environments."
    },
    {
      question: "How can parents monitor their children's AI usage?",
      answer: "Parents can monitor AI usage by: 1) Using parental controls and monitoring software, 2) Having open discussions about AI tools, 3) Setting clear guidelines for AI use, 4) Reviewing AI interactions regularly, 5) Educating children about AI capabilities and limitations. Our parental guide provides detailed strategies and tools."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free AI Templates, Custom GPT Tools & FAQs | AI Resource Hub"
        description="Explore our AI Resource Hub for free AI policy templates, custom GPT tools, and answers to common AI questions. Perfect for businesses, educators, and creators."
        keywords="AI templates, AI policy template, Custom GPTs, AI FAQs, AI resource hub, AI governance, AI ethics, AI implementation guide"
      />
      
      <Navigation />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-playfair text-foreground font-bold mb-6">
            AI Resource Hub <Sparkles className="inline w-12 h-12 text-primary ml-2" />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your comprehensive collection of free AI templates, Custom GPT tools, and expert guidance 
            for businesses, educators, parents, and creators navigating the AI landscape responsibly.
          </p>
        </div>

        {/* Free AI Templates Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-playfair text-foreground font-bold mb-4">
              Free AI Templates & Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download professionally crafted AI policy templates, implementation guides, and best-practice checklists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <Card key={index} className="steampunk-card hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {template.category}
                    </Badge>
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-playfair">
                    {template.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-muted-foreground leading-relaxed">
                    {template.description}
                  </CardDescription>
                  <Button 
                    asChild
                    variant="steam" 
                    size="lg" 
                    className="w-full"
                  >
                    <a href={template.downloadUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download Free Template
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <AdSenseUnit adSlot="1234567890" />

        {/* Custom GPT Tools Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-playfair text-foreground font-bold mb-4">
              Custom GPT Tools & Assistants
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated collection of specialized Custom GPTs for AI policy creation, risk assessment, and implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customGPTs.map((gpt, index) => (
              <Card key={index} className="steampunk-card hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                      {gpt.category}
                    </Badge>
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-playfair">
                    {gpt.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-muted-foreground leading-relaxed">
                    {gpt.description}
                  </CardDescription>
                  <Button 
                    asChild
                    variant="outline" 
                    size="lg" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <a href={gpt.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Try Custom GPT
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI FAQs Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-playfair text-foreground font-bold mb-4">
              AI Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get expert answers to common questions about AI policies, implementation, and best practices
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="steampunk-card px-6"
                >
                  <AccordionTrigger className="text-left font-playfair text-lg hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-16 steampunk-card">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-playfair text-foreground font-bold mb-6">
            Need More Help with AI Implementation?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Our AI experts can help you create custom policies, assess risks, and implement AI tools safely in your organization.
          </p>
          <Button 
            asChild
            variant="steam" 
            size="lg" 
            className="text-lg px-8 py-4"
          >
            <Link to="/contact">
              Contact Us Today
            </Link>
          </Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIResourceHub;