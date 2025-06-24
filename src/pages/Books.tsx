
import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
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
      blurb: "When Princess Ella trades her tiara for a toolbox, she discovers that fixing pipes can be just as magical as any fairy tale!",
      ageRange: "Ages 4-8",
      amazonUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "The Dancing Paintbrush",
      slug: "dancing-paintbrush",
      coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center",
      blurb: "A young artist discovers that her paintbrush has a mind of its own, creating colorful adventures wherever it goes.",
      ageRange: "Ages 3-7",
      amazonUrl: "#"
    },
    {
      id: 3,
      title: "Captain Cookie's Space Kitchen",
      slug: "captain-cookies-space-kitchen",
      coverUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop&crop=center",
      blurb: "Join Captain Cookie as she bakes her way through the galaxy, creating treats that bring alien friends together.",
      ageRange: "Ages 5-9",
      amazonUrl: "#"
    },
    {
      id: 4,
      title: "The Giggling Garden",
      slug: "giggling-garden",
      coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center",
      blurb: "Emma discovers that vegetables have feelings too, and her garden is full of silly, laughing friends waiting to be heard.",
      ageRange: "Ages 4-8",
      amazonUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-yellow-50 to-sky-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-rose-200/30 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-600 font-baloo">Nika Vereskova Stories</h1>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Home</a>
            <a href="/books" className="text-rose-500 font-semibold">Books</a>
            <a href="/videos" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Videos</a>
            <a href="/about" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">About</a>
            <a href="/blog" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Blog</a>
            <a href="/contact" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Contact</a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-rose-700 mb-4 font-baloo">My Magical Books</h1>
            <p className="text-xl text-rose-600 max-w-2xl mx-auto">
              Discover enchanting stories that celebrate courage, kindness, and the magic in everyday moments.
              Each book is crafted to inspire young hearts and spark imagination.
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <Card 
                key={book.id} 
                className={`bg-white/80 border-rose-200 hover:border-rose-300 transition-all duration-300 hover:scale-105 rounded-3xl shadow-lg animate-fade-in ${
                  book.featured ? 'ring-2 ring-yellow-300 ring-opacity-50' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {book.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-rose-700 text-xl font-baloo">{book.title}</CardTitle>
                  <CardDescription className="text-rose-500 font-medium">{book.ageRange}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-rose-600 mb-6 text-sm leading-relaxed">
                    {book.blurb}
                  </p>
                  <Button 
                    className="w-full bg-sky-400 hover:bg-sky-500 text-white rounded-full transition-colors"
                    onClick={() => window.open(book.amazonUrl, '_blank')}
                  >
                    Buy on Amazon KDP
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-rose-100 to-sky-100 rounded-3xl">
            <h2 className="text-3xl font-bold text-rose-700 mb-4 font-baloo">Can't Find What You're Looking For?</h2>
            <p className="text-rose-600 text-lg mb-6">
              I'm always working on new stories! Sign up for my newsletter to be the first to know about upcoming releases.
            </p>
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full">
              Join the Story Circle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
