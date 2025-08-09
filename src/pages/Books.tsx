
import React from 'react';
import { ExternalLink, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';

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
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <Navigation currentPage="books" />

      <div className="pt-24 pb-16 px-6">
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
                
                <div className="relative overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {book.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter flex items-center">
                        <Cog className="w-3 h-3 mr-1" />
                        {t('common.featured')}
                      </span>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop">{book.title}</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter">{book.ageRange}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-oxidized-teal/80 mb-6 text-sm leading-relaxed font-inter">
                    {book.blurb}
                  </p>
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                      onClick={() => handleBuyBook(book.amazonUrl, book.title)}
                    >
                      {t('books.swedishVersion')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    {book.englishUrl && (
                      <Button 
                        variant="outline"
                        className="w-full border-2 border-brass text-brass hover:bg-brass hover:text-parchment transition-all duration-300 font-inter font-medium"
                        onClick={() => handleBuyBook(book.englishUrl!, `${book.title} (English)`)}
                      >
                        {t('books.englishVersion')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default Books;
