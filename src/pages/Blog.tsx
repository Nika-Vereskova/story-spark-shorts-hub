
import React from 'react';
import { Calendar, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "My First Book is Here! ☀️",
      date: "Summer 2024",
      excerpt: "My summer has been productive so far… I wrote and published my first book!",
      content: `My summer has been productive so far… I wrote and published my first book!

Plumberella isn't your typical fairytale. It's a witty, heartfelt steampunk story about a brave, inventive girl who creates truth instead of waiting for magic.

This story blends:
• Clever heroines and critical thinking
• The magic of invention and courage
• Empowerment for young readers and dreamers of all ages

I wrote Plumberella for those who believe kindness and cleverness can change the world.`,
      links: [
        { title: "English", url: "https://amzn.eu/d/3IRmXaF" },
        { title: "Swedish", url: "https://amzn.eu/d/8CAuCN4" },
        { title: "Russian", url: "https://lnkd.in/dX6EdEAs" }
      ]
    }
  ];

  const handleLinkClick = (url: string, title: string) => {
    console.log(`User clicked to open: ${title}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-parchment/95 backdrop-blur-md z-50 border-b border-brass/30 shadow-brass-drop">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-oxidized-teal font-playfair drop-shadow-text-drop">Nika Vereskova Stories</h1>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Home</Link>
            <Link to="/books" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Books</Link>
            <Link to="/videos" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Videos</Link>
            <Link to="/about" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">About</Link>
            <Link to="/blog" className="text-brass font-semibold font-inter">Blog</Link>
            <Link to="/contact" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Clockwork Chronicles Blog</h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              Follow my writing journey, creative process, and the magical world of steampunk storytelling.
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 shadow-brass-drop animate-fade-in relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-brass mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium font-inter">{post.date}</span>
                  </div>
                  <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">{post.title}</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter">Latest Updates</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-oxidized-teal/80 font-inter whitespace-pre-line leading-relaxed">
                    {post.content}
                  </div>
                  
                  {/* Book Links */}
                  <div className="space-y-4">
                    <h3 className="text-oxidized-teal font-semibold font-playfair flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Read Plumberella now:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {post.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          variant="outline"
                          className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                          onClick={() => handleLinkClick(link.url, link.title)}
                        >
                          {link.title}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Social Media Follow */}
                  <div className="pt-4 border-t border-brass/30">
                    <p className="text-oxidized-teal/80 mb-4 font-inter">
                      📌 Follow me for updates, art, and behind-the-scenes magic:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium"
                        onClick={() => handleLinkClick('https://www.facebook.com/profile.php?id=61577838015246', 'Facebook')}
                      >
                        Facebook
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium"
                        onClick={() => handleLinkClick('https://www.instagram.com/vereskovanika', 'Instagram')}
                      >
                        Instagram
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 italic text-oxidized-teal/70 font-inter">
                    "Let's inspire the next generation of thinkers and builders – one story at a time."
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
