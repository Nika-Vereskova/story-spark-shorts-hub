
import React from 'react';
import { Book, Play, User, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-yellow-50 to-sky-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-rose-200/30 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-600 font-baloo">Nika Vereskova Stories</h1>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Home</Link>
            <Link to="/books" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Books</Link>
            <Link to="/videos" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Videos</Link>
            <Link to="/about" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">About</Link>
            <Link to="/blog" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Blog</Link>
            <Link to="/contact" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-rose-700 mb-6 leading-tight font-baloo">
                Where Magic Meets
                <span className="bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent"> Everyday Adventures</span>
              </h1>
              <p className="text-xl text-rose-600 mb-8 max-w-2xl">
                Welcome to a world where plumbers can be princesses and every story sparkles with wonder. 
                Discover enchanting children's books that celebrate courage, kindness, and the magic in ordinary moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 text-lg rounded-full">
                  <Book className="mr-2 h-5 w-5" />
                  Read an Excerpt
                </Button>
                <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 text-lg rounded-full">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Story Time
                </Button>
              </div>
            </div>
            
            {/* Featured Book - Plumberella */}
            <div className="animate-scale-in">
              <Card className="bg-white/80 border-rose-200 hover:border-rose-300 transition-all duration-300 hover:scale-105 rounded-3xl shadow-lg">
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
                    alt="Plumberella - Latest Children's Book"
                    className="w-full h-80 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                      ✨ Latest Release
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-rose-700 text-2xl font-baloo">Plumberella</CardTitle>
                  <CardDescription className="text-rose-500 font-medium">Ages 4-8 • Picture Book</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-600 mb-6">
                    When Princess Ella trades her tiara for a toolbox, she discovers that fixing pipes can be just as magical as any fairy tale!
                  </p>
                  <Button className="w-full bg-sky-400 hover:bg-sky-500 text-white rounded-full">
                    Buy on Amazon KDP
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-rose-700 mb-12 text-center font-baloo">Explore My World</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-rose-50/80 border-rose-200 hover:border-rose-300 transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-rose-700 text-xl font-baloo flex items-center">
                  <Book className="mr-2 h-6 w-6" />
                  My Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-rose-600 mb-4">
                  Discover all my published children's books, from whimsical adventures to heartwarming tales.
                </p>
                <Link to="/books">
                  <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full">
                    Browse Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50/80 border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-yellow-700 text-xl font-baloo flex items-center">
                  <Play className="mr-2 h-6 w-6" />
                  Story Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-600 mb-4">
                  Watch my YouTube Shorts featuring quick story adventures and behind-the-scenes fun!
                </p>
                <Link to="/videos">
                  <Button variant="outline" className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 rounded-full">
                    Watch Videos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-sky-50/80 border-sky-200 hover:border-sky-300 transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sky-700 text-xl font-baloo flex items-center">
                  <User className="mr-2 h-6 w-6" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-600 mb-4">
                  Learn about my journey as a children's author and the inspiration behind my stories.
                </p>
                <Link to="/about">
                  <Button variant="outline" className="border-sky-300 text-sky-600 hover:bg-sky-50 rounded-full">
                    Meet Nika
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-100 to-sky-100">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-rose-700 mb-6 font-baloo">Join the Story Circle</h2>
          <p className="text-rose-600 text-lg mb-8">
            Get notified about new book releases, story time videos, and special events. 
            Plus, receive a free downloadable activity sheet!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full border border-rose-200 focus:border-rose-400 focus:outline-none"
            />
            <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-rose-200">
        <div className="container mx-auto text-center">
          <p className="text-rose-500 font-medium">© 2024 Nika Vereskova Stories. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-rose-400 hover:text-rose-600 transition-colors">YouTube</a>
            <a href="#" className="text-rose-400 hover:text-rose-600 transition-colors">Instagram</a>
            <a href="#" className="text-rose-400 hover:text-rose-600 transition-colors">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
