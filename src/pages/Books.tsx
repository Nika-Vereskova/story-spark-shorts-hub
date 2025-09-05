
import React from 'react';
import { ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';

interface Book {
  id: number;
  title: string;
  slug: string;
  coverUrl: string;
  blurb: string;
  ageRange: string;
  amazonUrl: string;
  englishUrl?: string;
  featured?: boolean;
}

const Books = () => {
  const books: Book[] = [
    {
      id: 1,
      title: "Plumberella",
      slug: "plumberella",
      coverUrl: "/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png",
      blurb: "Plumberella is a witty, heartwarming steampunk fairytale about a girl, a vanishing bathroom, and the invention of truth.",
      ageRange: t('common.ageRange'),
      amazonUrl: "https://amzn.eu/d/hmK81Zj",
      englishUrl: "https://amzn.eu/d/21fxD3o",
      featured: true
    }
  ];

  const handleBuyBook = (amazonUrl: string, title: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`User clicked to buy: ${title}`);
    }
    window.open(amazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern relative">
      {/* Clockwork Gear Decorations */}
      <Settings className="absolute top-32 left-8 w-14 h-14 text-brass/15 animate-gear-rotation" style={{animationDelay: '1s'}} />
      <Settings className="absolute top-1/3 right-8 w-10 h-10 text-brass/20 animate-gear-rotation" style={{animationDelay: '3s'}} />
      <Settings className="absolute bottom-40 left-1/4 w-12 h-12 text-brass/10 animate-gear-rotation" style={{animationDelay: '5s'}} />
      <SEO 
        title="Steampunk Books by Nika Vereskova | STEaM LOGIC Studio AB" 
        description="Award-winning steampunk children's books by author Nika Vereskova. Discover Plumberella and other magical adventures. Published by STEaM LOGIC Studio AB."
        keywords="Nika Vereskova books, steampunk children's books, Plumberella, Swedish children's literature, fantasy books for kids, STEaM LOGIC Studio AB"
        author="Nika Vereskova"
      />
      {/* Book Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Book",
        "name": books[0].title,
        "bookFormat": "https://schema.org/EBook",
        "image": `${books[0].coverUrl}`,
        "author": {
          "@type": "Person",
          "name": "Nika Vereskova"
        },
        "publisher": {
          "@type": "Organization",
          "name": "STEaM LOGIC Studio AB"
        },
        "url": typeof window !== 'undefined' ? window.location.href : `${books[0].englishUrl || books[0].amazonUrl}`,
        "offers": {
          "@type": "Offer",
          "url": books[0].amazonUrl,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "workExample": [
          books[0].englishUrl ? {
            "@type": "Book",
            "bookFormat": "https://schema.org/EBook",
            "inLanguage": "en"
          } : undefined
        ].filter(Boolean)
      }) }} />
      <Navigation currentPage="books" />

      <div className="pt-24 pb-16 px-6">
        <AdSenseBanner position="top" />
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
              {t('books.title')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              {t('books.subtitle')}
            </p>
          </div>

          <AdSenseSquare size="medium" />

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <Card 
                key={book.id} 
                className={`bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop animate-fade-in relative ${
                  book.featured ? 'ring-2 ring-brass/50' : ''
                }`}
              style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>

                {/* Book Cover */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-64 object-cover md:h-72 transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <CardHeader className="text-center">
                  <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-oxidized-teal/80 font-inter mt-2">
                    {book.blurb}
                    <span className="block text-brass font-medium mt-2">{book.ageRange}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    className="w-full bg-brass hover:bg-brass-dark text-parchment border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                    onClick={() => handleBuyBook(book.amazonUrl, book.title)}
                  >
                    {t('books.swedishVersion')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  {book.englishUrl && (
                    <Button
                      className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                      onClick={() => handleBuyBook(book.englishUrl!, book.title)}
                    >
                      {t('books.englishVersion')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <AdSenseBanner position="middle" />

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass/30 shadow-brass-drop relative">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
            
            <h2 className="text-3xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
              {t('books.cantFind')}
            </h2>
            <p className="text-oxidized-teal/80 text-lg mb-6 font-inter">
              {t('books.cantFindDesc')}
            </p>
            <Button 
              size="lg" 
              className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
            >
              {t('books.joinGuild')}
            </Button>
          </div>
          
          <AdSenseBanner position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default Books;
