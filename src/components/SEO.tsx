import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCurrentLocale, locales } from '@/lib/i18n';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const BASE_URL = 'https://nika-vereskova.lovable.app';
const DEFAULT_IMAGE = '/lovable-uploads/e3cfb4ba-d1c1-45ec-9d05-cbdd7e1bcacc.png';
const LOGO_URL = '/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.png';

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  noindex, 
  keywords = "STEaM LOGIC Studio AB, Renata Khakimova CEO, AI consulting, custom GPT development, AI strategy consultant, Nika Vereskova books, steampunk children's books, Europe capitals trainer, Learn AI beginners, artificial intelligence consultant Sweden, process automation, ChatGPT development, AI workshops",
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'STEaM LOGIC Studio AB'
}) => {
  const locale = getCurrentLocale();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const pathWithoutLocale = pathname.replace(/^\/(en|sv|ru)/, '') || '/';
  const canonical = `${BASE_URL}/${locale}${pathWithoutLocale}`.replace(/\/+/, '/');

  const alternates = locales.map((l) => ({
    hrefLang: l,
    href: `${BASE_URL}/${l}${pathWithoutLocale}`,
  }));

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "STEaM LOGIC Studio AB",
    "url": BASE_URL,
    "logo": `${BASE_URL}${LOGO_URL}`,
    "description": "Expert AI consulting services by STEaM LOGIC Studio AB. CEO Renata Khakimova combines inventive storytelling with intelligent technology. Custom GPT development, AI workshops, and automation solutions.",
    "founder": {
      "@type": "Person",
      "name": "Renata Khakimova",
      "alternateName": "Nika Vereskova",
      "jobTitle": "CEO & AI Consultant",
      "expertise": ["AI Strategy", "Custom GPT Development", "AI Workshops", "Process Automation"],
      "url": "https://github.com/Nika-Vereskova"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@steamlogic.studio",
      "contactType": "customer service"
    },
    "serviceType": [
      "AI Strategy & Implementation",
      "Custom GPT Development", 
      "AI Training & Workshops",
      "Process Automation Solutions"
    ],
    "areaServed": "Worldwide",
    "sameAs": [
      "https://www.youtube.com/@NikaVereskova",
      "https://github.com/Nika-Vereskova",
      "https://www.instagram.com/nika.vereskova"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "STEaM LOGIC Studio AB",
    "alternateName": ["STEaM LOGIC Studio", "Steam Logic", "STEaM LOGIC"],
    "url": BASE_URL,
    "description": description,
    "inLanguage": ["en", "sv", "ru"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "STEaM LOGIC Studio AB",
      "logo": `${BASE_URL}${LOGO_URL}`
    }
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Renata Khakimova",
    "alternateName": "Nika Vereskova",
    "jobTitle": "CEO & AI Consultant at STEaM LOGIC Studio AB",
    "description": "CEO of STEaM LOGIC Studio AB and expert in AI strategy, custom GPT development, and creative storytelling. Published author under pseudonym Nika Vereskova.",
    "url": BASE_URL,
    "knowsAbout": [
      "Artificial Intelligence",
      "Custom GPT Development",
      "AI Strategy", 
      "Process Automation",
      "Machine Learning",
      "AI Workshops",
      "Creative Storytelling",
      "Europe Geography Training",
      "Educational Technology"
    ],
    "sameAs": [
      "https://www.youtube.com/@NikaVereskova",
      "https://github.com/Nika-Vereskova", 
      "https://www.instagram.com/nika.vereskova"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "STEaM LOGIC Studio AB"
    },
    "email": "hello@steamlogic.studio"
  };

  // Enhanced Service structured data with more detail
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "AI Consulting Services",
    "serviceType": "Technology Consulting",
    "provider": {
      "@type": "Organization", 
      "name": "STEaM LOGIC Studio AB",
      "url": BASE_URL
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Strategy & Implementation",
            "description": "Comprehensive AI planning and implementation strategies tailored to business needs",
            "serviceType": "Consulting"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Custom GPT Development",
            "description": "Bespoke AI assistants and chatbots designed for specific use cases and workflows",
            "serviceType": "Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "AI Workshops & Training",
            "description": "Hands-on learning experiences for AI skills development and team empowerment",
            "serviceType": "Training"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Process Automation Solutions", 
            "description": "Intelligent automation solutions that streamline operations and reduce manual work",
            "serviceType": "Automation"
          }
        }
      ]
    }
  };

  // Enhanced FAQ structured data with more questions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage", 
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What AI consulting services does STEaM LOGIC Studio AB offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "STEaM LOGIC Studio AB offers comprehensive AI consulting services including AI strategy & implementation, custom GPT development, AI workshops and training, and process automation solutions. Led by CEO Renata Khakimova, we specialize in artificial intelligence consulting, ChatGPT development, and AI assistant development."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Renata Khakimova and what are her qualifications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Renata Khakimova is the CEO of STEaM LOGIC Studio AB, an expert AI consultant and creative storyteller with extensive experience in custom GPT development, AI workshops, and innovative technology solutions. She also publishes award-winning children's books under the pseudonym Nika Vereskova."
        }
      },
      {
        "@type": "Question",
        "name": "What educational tools does STEaM LOGIC Studio AB offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer Learn AI for beginners - friendly 10-minute lessons for practical AI learning, and Europe Capitals Trainer - an interactive geography learning tool with flashcards, quizzes, and pronunciation features for mastering European geography."
        }
      },
      {
        "@type": "Question",
        "name": "How can custom GPT development benefit my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Custom GPT development creates bespoke AI assistants tailored to your specific workflows and use cases. This can automate customer service, content creation, data analysis, and other business processes, improving efficiency and reducing manual work."
        }
      },
      {
        "@type": "Question",
        "name": "What makes STEaM LOGIC Studio AB different from other AI consultants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "STEaM LOGIC Studio AB combines technical AI expertise with creative storytelling, offering a unique approach that merges inventive storytelling with intelligent technology. CEO Renata Khakimova's diverse background includes both AI consulting and award-winning children's book authorship under pseudonym Nika Vereskova."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact STEaM LOGIC Studio AB for AI consulting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Contact us at hello@steamlogic.studio for AI consulting project discussions, custom GPT development inquiries, and educational tool access. We serve clients worldwide with our comprehensive AI services and educational platforms."
        }
      }
    ]
  };

  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet prioritizeSeoTags>
      {/* Enhanced Meta Tags for AI Consulting */}
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="language" content={locale} />
      <meta name="geo.region" content="SE" />
      <meta name="geo.country" content="Sweden" />
      <meta name="subject" content="AI Consulting Services" />
      <meta name="classification" content="Technology Consulting" />
      <meta name="category" content="Artificial Intelligence" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Canonical and Alternates */}
      <link rel="canonical" href={canonical} />
      {alternates.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${pathWithoutLocale}`} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${BASE_URL}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="STEaM LOGIC Studio AB" />
      <meta property="og:locale" content={locale} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}${ogImage}`} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@NikaVereskova" />
      <meta name="twitter:site" content="@NikaVereskova" />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="STEaM LOGIC" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>

      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://srzxvvbxmcrxsplwutxv.supabase.co" />
      
      {/* Resource hints for key assets */}
      <link rel="preload" href="/lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f.png" as="image" />
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//app.posthog.com" />
    </Helmet>
  );
};

export default SEO;
