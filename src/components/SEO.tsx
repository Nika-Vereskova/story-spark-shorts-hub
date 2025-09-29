import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCurrentLocale, locales } from '@/lib/i18n';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  keywords?: string;
  type?: 'website' | 'article' | 'profile' | 'video';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  // Article-specific properties
  articleSection?: string;
  tags?: string[];
  // Video-specific properties
  videoUrl?: string;
  videoDuration?: string;
  videoUploadDate?: string;
  // LocalBusiness properties
  isLocalBusiness?: boolean;
}

const BASE_URL = 'https://steamlogic.se';
const DEFAULT_IMAGE = '/lovable-uploads/STEaM LOGIC Emblem with Quill.png';
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
  author = 'STEaM LOGIC Studio AB',
  articleSection,
  tags,
  videoUrl,
  videoDuration,
  videoUploadDate,
  isLocalBusiness = false
}) => {
  const locale = getCurrentLocale();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const pathWithoutLocale = pathname.replace(/^\/(en|sv|ru)/, '') || '/';
  // Improved canonical URL construction with better handling of edge cases
  const buildCanonicalUrl = (locale: string, path: string) => {
    // Normalize the path - remove leading/trailing slashes, handle empty paths
    const normalizedPath = path.replace(/^\/+|\/+$/g, '') || '';
    // Build URL - ensure single slashes, handle root case properly
    const url = `${BASE_URL}/${locale}${normalizedPath ? `/${normalizedPath}` : ''}`;
    return url.replace(/([^:]\/)\/+/g, '$1'); // Remove double slashes except after protocol
  };

  const canonical = buildCanonicalUrl(locale, pathWithoutLocale);
  
  const alternates = locales.map((l) => ({
    hrefLang: l,
    href: buildCanonicalUrl(l, pathWithoutLocale),
  }));

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "STEaM LOGIC Studio AB",
    "url": BASE_URL,
    "logo": `${BASE_URL}${LOGO_URL}`,
    "description": "Expert AI consulting services by STEaM LOGIC Studio AB. CEO Renata Khakimova combines inventive storytelling with intelligent technology. Custom GPT development, AI workshops, and automation solutions.",
    "founder": {
      "@type": "Person",
      "name": "Renata Khakimova",
      "jobTitle": "CEO & AI Consultant",
      "expertise": ["AI Strategy", "Custom GPT Development", "AI Workshops", "Process Automation"],
      "url": "https://github.com/Nika-Vereskova"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Renata Khakimova",
        "jobTitle": "Chief Executive Officer"
      },
      {
        "@type": "Person",
        "name": "Nika Vereskova",
        "alternateName": "Nika Vereskova",
        "jobTitle": "Author and Creator"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@steamlogic.se",
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
      "https://www.instagram.com/vereskovanika"
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

  // Enhanced breadcrumb schema with better URL construction
  const breadcrumbJsonLd = (() => {
    const segments = pathWithoutLocale.split('/').filter(Boolean);
    const items = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": buildCanonicalUrl(locale, '/')
      }
    ];

    // Add intermediate breadcrumb items
    segments.forEach((seg, index) => {
      const segmentPath = segments.slice(0, index + 1).join('/');
      const segmentName = seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      
      items.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segmentName,
        "item": buildCanonicalUrl(locale, segmentPath)
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };
  })();

  // Article schema for blog posts and news articles
  const articleJsonLd = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author,
      "url": `${BASE_URL}/en/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "STEaM LOGIC Studio AB",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}${LOGO_URL}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    "datePublished": publishedTime || new Date().toISOString(),
    "dateModified": modifiedTime || publishedTime || new Date().toISOString(),
    "image": {
      "@type": "ImageObject",
      "url": `${BASE_URL}${image || DEFAULT_IMAGE}`,
      "width": 1200,
      "height": 630
    },
    ...(articleSection && { "articleSection": articleSection }),
    ...(tags && { "keywords": tags.join(', ') }),
    "inLanguage": locale,
    "url": canonical
  } : null;

  // VideoObject schema for video pages
  const videoJsonLd = type === 'video' && videoUrl ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "contentUrl": videoUrl,
    "embedUrl": videoUrl,
    "uploadDate": videoUploadDate || publishedTime || new Date().toISOString(),
    ...(videoDuration && { "duration": videoDuration }),
    "thumbnailUrl": `${BASE_URL}${image || DEFAULT_IMAGE}`,
    "author": {
      "@type": "Person",
      "name": author,
      "url": `${BASE_URL}/en/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "STEaM LOGIC Studio AB",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}${LOGO_URL}`
      }
    },
    "inLanguage": locale,
    "url": canonical
  } : null;

  // LocalBusiness schema for business-specific pages
  const localBusinessJsonLd = isLocalBusiness ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "STEaM LOGIC Studio AB",
    "description": "Expert AI consulting services combining inventive storytelling with intelligent technology. Custom GPT development, AI strategy, and automation solutions.",
    "url": BASE_URL,
    "telephone": "+46-XXX-XXX-XXX", // Add actual phone if available
    "email": "hello@steamlogic.se",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SE",
      "addressRegion": "Sweden"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "59.3293", // Stockholm coordinates as default
      "longitude": "18.0686"
    },
    "openingHours": "Mo-Fr 09:00-17:00",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "10"
    },
    "serviceArea": {
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
            "name": "AI Strategy & Implementation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom GPT Development"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.youtube.com/@NikaVereskova",
      "https://github.com/Nika-Vereskova",
      "https://www.instagram.com/vereskovanika"
    ]
  } : null;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Renata Khakimova",
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
      "https://www.instagram.com/vereskovanika"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "STEaM LOGIC Studio AB"
    },
    "email": "hello@steamlogic.se"
  };

  // Separate Person schema for author pseudonym
  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nika Vereskova",
    "alternateName": ["Nika Vereskova"],
    "jobTitle": "Author",
    "description": "Author of steampunk children's books including Plumberella.",
    "url": `${BASE_URL}/en/books`,
    "sameAs": [
      "https://www.instagram.com/vereskovanika"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "STEaM LOGIC Studio AB"
    }
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
          "text": "Contact us for AI consulting project discussions, custom GPT development inquiries, and educational tool access. We serve clients worldwide with our comprehensive AI services and educational platforms."
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
      <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

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
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(authorJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      {articleJsonLd && <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>}
      {videoJsonLd && <script type="application/ld+json">{JSON.stringify(videoJsonLd)}</script>}
      {localBusinessJsonLd && <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>}

      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://srzxvvbxmcrxsplwutxv.supabase.co" />
      
      {/* Resource hints for key assets */}
      <link rel="preload" as="image" href="/lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f-640.webp" imageSrcSet="/lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f-320.webp 320w, /lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f-640.webp 640w, /lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f.webp 1024w" imageSizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 320px" />
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//app.posthog.com" />
    </Helmet>
  );
};

export default SEO;
