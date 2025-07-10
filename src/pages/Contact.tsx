
import React, { useState } from 'react';
import { Mail, ExternalLink, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@NikaVereskova',
      icon: Youtube,
      description: 'Watch story time videos and behind-the-scenes content'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vereskovanika',
      icon: Instagram,
      description: 'Follow my daily adventures and book updates'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61577838015246',
      icon: Facebook,
      description: 'Join the community discussions and events'
    }
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Thank you for subscribing!",
      description: "We'll notify you about new stories and clockwork adventures.",
    });
    setEmail('');
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
            <a href="/blog" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Blog</a>
            <Link to="/contact" className="text-brass font-semibold font-inter">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Get in Touch</h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              I'd love to hear from you! Whether you have questions about my books, want to invite me for a reading, or just want to chat about steampunk adventures.
            </p>
          </div>

          {/* Email Contact */}
          <div className="mb-12">
            <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop relative">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
              
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop flex items-center">
                  <Mail className="mr-2 h-6 w-6" />
                  Email Me Directly
                </CardTitle>
                <CardDescription className="text-oxidized-teal/80 font-inter">
                  For book inquiries, reading invitations, or just to say hello
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com'}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  nika.vereskova@gmail.com
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-oxidized-teal mb-8 text-center font-playfair drop-shadow-text-drop">Connect on Social Media</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Card key={index} className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
                    {/* Ornate brass corners */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
                    
                    <CardHeader>
                      <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                        <IconComponent className="mr-2 h-6 w-6" />
                        {social.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-oxidized-teal/80 mb-4 font-inter text-sm">
                        {social.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-brass text-brass hover:bg-brass hover:text-parchment transition-all duration-300 font-inter font-medium"
                        onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                      >
                        Visit {social.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center p-8 bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass/30 shadow-brass-drop relative">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
            
            <h2 className="text-3xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Join the Inventor's Guild</h2>
            <p className="text-oxidized-teal/80 text-lg mb-6 font-inter">
              Get notified about new steampunk tales, workshop videos, and special clockwork events. 
              Plus, receive a free downloadable gear-building activity sheet!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow font-inter"
              />
              <Button 
                type="submit"
                className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
