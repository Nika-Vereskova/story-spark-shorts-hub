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

const BASE_URL = 'https://steamlogic.studio';
const DEFAULT_IMAGE = '/lovable-uploads/e3cfb4ba-d1c1-45ec-9d05-cbdd7e1bcacc.png';
const LOGO_URL = '/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.png';

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  noindex, 
  keywords = "AI consulting, storytelling, custom GPTs, AI workshops, creative technology, Nika Vereskova, steampunk, children's books",
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Nika Vereskova'
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
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'STEaM LOGIC Studio AB',
    url: BASE_URL,
    logo: `${BASE_URL}${LOGO_URL}`,
    description: 'AI consulting and creative storytelling studio specializing in custom GPTs, workshops, and innovative technology solutions.',
    founder: {
      '@type': 'Person',
      name: 'Nika Vereskova',
      url: 'https://github.com/Nika-Vereskova'
    },
    sameAs: [
      'https://www.youtube.com/@NikaVereskova',
      'https://github.com/Nika-Vereskova',
      'https://www.instagram.com/nika.vereskova'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@steamlogic.studio'
    }
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'STEaM LOGIC Studio AB',
    url: BASE_URL,
    description: description,
    inLanguage: ['en', 'sv', 'ru'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nika Vereskova',
    jobTitle: 'AI Consultant & Creative Storyteller',
    description: 'Expert in AI strategy, custom GPT development, and creative storytelling with a passion for innovative technology solutions.',
    url: BASE_URL,
    sameAs: [
      'https://www.youtube.com/@NikaVereskova',
      'https://github.com/Nika-Vereskova',
      'https://www.instagram.com/nika.vereskova'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'STEaM LOGIC Studio AB'
    }
  };

  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet prioritizeSeoTags>
      {/* Basic Meta Tags */}
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="language" content={locale} />
      <meta name="geo.region" content="SE" />
      <meta name="geo.country" content="Sweden" />
      
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
    </Helmet>
  );
};

export default SEO;
