
import React from 'react';
import { ExternalLink, Star, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Book {
  id: number;
  title: string;
  slug: string;
  coverUrl: string;
  blurb: string;
  ageRange: string;
  amazonUrl: string;
  featured?: boolean;
}

const Books = () => {
  const books: Book[] = [
    {
      id: 1,
      title: "Plumberella",
      slug: "plumberella",
      coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center",
      blurb: "When Princess Ella trades her tiara for a toolbox, she discovers that fixing enchanted pipes can be just as magical as any fairy tale!",
      ageRange: "Ages 4-8",
      amazonUrl: "https://www.amazon.com/dp/B0FDKKLKQ7",
      featured: true
    },
    {
      id: 2,
      title: "The Dancing Paintbrush",
      slug: "dancing-paintbrush",
      coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center",
      blurb: "A young artist discovers that her enchanted paintbrush creates clockwork creatures that dance off the canvas into reality.",
      ageRange: "Ages 3-7",
      amazonUrl: "https://www.amazon.com/dp/B0FDWLRLTK"
    },
    {
      id: 3,
      title: "Captain Cookie's Airship Kitchen",
      slug: "captain-cookies-airship-kitchen",
      coverUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop&crop=center",
      blurb: "Join Captain Cookie as she bakes her way through the clouds in her steam-powered airship, creating treats that bring sky pirates together.",
      ageRange: "Ages 5-9",
      amazonUrl: "https://www.amazon.com/dp/B0FDR1NP2L"
    },
    {
      id: 4,
      title: "The Giggling Greenhouse",
      slug: "giggling-greenhouse",
      coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center",
      blurb: "Emma discovers that her mechanical greenhouse is full of steam-powered plants with feelings, giggling gears, and whirring hearts.",
      ageRange: "Ages 4-8",
      amazonUrl: "https://www.amazon.com/dp/B0FF2CML77"
    },
    {
      id: 5,
      title: "The Clockwork Dragon",
      slug: "clockwork-dragon",
      coverUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center",
      blurb: "When young inventor Lily builds a dragon from brass and steam, she learns that the best friendships are forged in the workshop of the heart.",
      ageRange: "Ages 6-10",
      amazonUrl: "https://www.amazon.com/dp/B0FDXM4L69"
    }
  ];

  const handleBuyBook = (amazonUrl: string, title: string) => {
    console.log(`User clicked to buy: ${title}`);
    window.open(amazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-parchment/95 backdrop-blur-md z-50 border-b border-brass/30 shadow-brass-drop">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-oxidized-teal font-playfair drop-shadow-text-drop">Nika Vereskova Stories</h1>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Home</a>
            <a href="/books" className="text-brass font-semibold font-inter">Books</a>
            <a href="/videos" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Videos</a>
            <a href="/about" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">About</a>
            <a href="/blog" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Blog</a>
            <a href="/contact" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Contact</a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">My Clockwork Chronicles</h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              Discover enchanting steampunk fairy tales that celebrate courage, invention, and the magic in mechanical marvels.
              Each book is forged with wonder to inspire young inventors and spark imagination.
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
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {book.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter flex items-center">
                        <Cog className="w-3 h-3 mr-1" />
                        Featured
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
                  <Button 
                    className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                    onClick={() => handleBuyBook(book.amazonUrl, book.title)}
                  >
                    Buy on Amazon KDP
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
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
            
            <h2 className="text-3xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Can't Find What You're Looking For?</h2>
            <p className="text-oxidized-teal/80 text-lg mb-6 font-inter">
              I'm always tinkering with new stories in my workshop! Join the Inventor's Guild to be the first to know about upcoming clockwork tales.
            </p>
            <Button 
              size="lg" 
              className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
            >
              Join the Inventor's Guild
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
