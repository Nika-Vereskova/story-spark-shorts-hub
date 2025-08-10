import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCurrentLocale, locales } from '@/lib/i18n';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://steamlogic.studio';
const DEFAULT_IMAGE = '/lovable-uploads/e3cfb4ba-d1c1-45ec-9d05-cbdd7e1bcacc.png';
const LOGO_URL = '/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.png';

const SEO: React.FC<SEOProps> = ({ title, description, image, noindex }) => {
  const locale = getCurrentLocale();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const pathWithoutLocale = pathname.replace(/^\/(en|sv|ru)/, '') || '/';
  const canonical = `${BASE_URL}/${locale}${pathWithoutLocale}`.replace(/\/+/, '/');

  const alternates = locales.map((l) => ({
    hrefLang: l,
    href: `${BASE_URL}/${l}${pathWithoutLocale}`,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'STEaM LOGIC Studio AB',
    url: BASE_URL,
    logo: `${BASE_URL}${LOGO_URL}`,
    sameAs: [
      'https://www.youtube.com/@NikaVereskova',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'STEaM LOGIC Studio AB',
    url: BASE_URL,
  };

  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet prioritizeSeoTags>
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {alternates.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${pathWithoutLocale}`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
    </Helmet>
  );
};

export default SEO;
