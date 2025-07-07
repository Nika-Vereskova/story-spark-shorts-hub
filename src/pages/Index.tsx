
import React from 'react';
import { Cog, Key, Glasses, Play, User, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-parchment/95 backdrop-blur-md z-50 border-b border-brass/30 shadow-brass-drop">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-oxidized-teal font-playfair drop-shadow-text-drop">
            Nika Vereskova Stories
          </h1>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Home</Link>
            <Link to="/books" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Books</Link>
            <Link to="/videos" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Videos</Link>
            <Link to="/about" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">About</Link>
            <Link to="/blog" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Blog</Link>
            <Link to="/contact" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Clockwork Animation */}
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        {/* Animated Clockwork Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
            <Cog className="w-full h-full text-brass animate-spin" style={{ animationDuration: '12s' }} />
          </div>
          <div className="absolute top-40 right-20 w-24 h-24 opacity-15">
            <Cog className="w-full h-full text-oxidized-teal animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
          </div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 opacity-10">
            <Cog className="w-full h-full text-brass animate-spin" style={{ animationDuration: '12s' }} />
          </div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 opacity-15">
            <Cog className="w-full h-full text-oxidized-teal animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-oxidized-teal mb-6 leading-tight font-playfair drop-shadow-text-drop">
                Where Magic Meets
                <span className="bg-gradient-to-r from-brass to-oxidized-teal bg-clip-text text-transparent"> Clockwork Adventures</span>
              </h1>
              <p className="text-xl text-oxidized-teal/80 mb-8 max-w-2xl font-inter">
                Welcome to a world where plumber princesses tinker with enchanted pipes and every tale whirs with wonder. 
                Discover steampunk fairy tale books that celebrate courage, invention, and the magic in mechanical marvels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 text-lg border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                >
                  <Key className="mr-2 h-5 w-5" />
                  Read an Excerpt
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-3 text-lg shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium hover:sepia"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Story Time
                </Button>
              </div>
            </div>
            
            {/* Featured Book - Plumberella */}
            <div className="animate-scale-in">
              <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative overflow-hidden">
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
                
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
                    alt="Plumberella - Latest Children's Book"
                    className="w-full h-80 object-cover transition-all duration-300 hover:scale-110 hover:sepia"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter flex items-center">
                      <Cog className="w-3 h-3 mr-1" />
                      Latest Release
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">Plumberella</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter">Ages 4-8 • Steampunk Fairy Tale</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-oxidized-teal/80 mb-6 font-inter">
                    When Princess Ella trades her tiara for a toolbox, she discovers that fixing enchanted pipes can be just as magical as any fairy tale!
                  </p>
                  <Button className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium">
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
      <section className="py-16 px-6 bg-gear-etch/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-oxidized-teal mb-12 text-center font-playfair drop-shadow-text-drop">Explore My Clockwork Realm</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
              
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                  <Key className="mr-2 h-6 w-6" />
                  My Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-4 font-inter">
                  Discover all my published steampunk fairy tales, from whimsical adventures to heartwarming clockwork stories.
                </p>
                <Link to="/books">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  >
                    Browse Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
              
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                  <Cog className="mr-2 h-6 w-6" />
                  Story Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-4 font-inter">
                  Watch my YouTube adventures featuring quick steampunk tales and behind-the-scenes workshop magic!
                </p>
                <Link to="/videos">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium hover:sepia"
                  >
                    Watch Videos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
              
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                  <Glasses className="mr-2 h-6 w-6" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-4 font-inter">
                  Learn about my journey as a steampunk storyteller and the clockwork inspiration behind my tales.
                </p>
                <Link to="/about">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  >
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
      <section className="py-16 px-6 bg-gradient-to-r from-brass/20 to-oxidized-teal/20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">Join the Inventor's Guild</h2>
          <p className="text-oxidized-teal/80 text-lg mb-8 font-inter">
            Get notified about new steampunk tales, workshop videos, and special clockwork events. 
            Plus, receive a free downloadable gear-building activity sheet!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow font-inter"
            />
            <Button className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-parchment/50 border-t-2 border-brass/50">
        <div className="container mx-auto text-center">
          <p className="text-oxidized-teal/80 font-medium font-inter">© 2024 Nika Vereskova Stories. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-brass hover:text-brass-dark transition-colors font-inter hover:sepia">YouTube</a>
            <a href="#" className="text-brass hover:text-brass-dark transition-colors font-inter">Instagram</a>
            <a href="#" className="text-brass hover:text-brass-dark transition-colors font-inter">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
