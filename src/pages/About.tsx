
import React from 'react';
import { Award, Mail, ExternalLink, Cog, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const awards = [
    "Children's Choice Book Award Finalist 2023",
    "Mom's Choice Award - Gold Recipient",
    "Independent Publisher Book Award - Silver Medal",
    "Readers' Favorite 5-Star Rating"
  ];

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-parchment/95 backdrop-blur-md z-50 border-b border-brass/30 shadow-brass-drop">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-oxidized-teal font-playfair drop-shadow-text-drop">Nika Vereskova Stories</h1>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Home</a>
            <a href="/books" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Books</a>
            <a href="/videos" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Videos</a>
            <a href="/about" className="text-brass font-semibold font-inter">About</a>
            <a href="/blog" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Blog</a>
            <a href="/contact" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Contact</a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Meet Nika</h1>
            <p className="text-xl text-brass font-inter">
              Author, Inventor, and Chief Clockwork-Keeper
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="w-full max-w-sm mx-auto relative">
                {/* Ornate brass frame */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-brass"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-brass"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-brass"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-brass"></div>
                
                <img 
                  src="/lovable-uploads/8b2801e0-86c4-4ebc-9c8d-e51acaef11d8.png" 
                  alt="Nika Vereskova"
                  className="w-full h-80 object-cover border-4 border-brass shadow-brass-drop"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop relative">
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
                
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop flex items-center">
                    <Wrench className="mr-2 h-6 w-6" />
                    My Story
                  </h2>
                  <div className="space-y-4 text-oxidized-teal/80 leading-relaxed font-inter">
                    <p>
                      Hello, wonderful readers! I'm Nika Vereskova, and I believe that every child deserves to see themselves as the inventor of their own magical adventure. My journey as a steampunk storyteller began when I realized that the most extraordinary tales often spring from the gears and gadgets of imagination.
                    </p>
                    <p>
                      With a background in early childhood education and a heart full of clockwork wonder, I craft stories that celebrate the courage, creativity, and ingenuity that already tick within every child. Whether it's a princess who chooses plumbing over ball gowns or a garden that hums with mechanical marvels, my books aim to show children that magic isn't something you find—it's something you build.
                    </p>
                    <p>
                      When I'm not writing, you'll find me reading to local kindergarten classes, creating story time videos for my YouTube workshop, or plotting my next tale while sipping tea in my garden (which, sadly, hasn't achieved full automation... yet!).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Awards Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-oxidized-teal mb-8 text-center font-playfair drop-shadow-text-drop flex justify-center items-center">
              <Cog className="mr-2 h-8 w-8" />
              Recognition & Awards
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <Card key={index} className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 shadow-brass-drop relative">
                  {/* Small brass corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-brass"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-brass"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-brass"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-brass"></div>
                  
                  <CardContent className="p-6 flex items-center">
                    <Award className="text-brass mr-4 h-6 w-6 flex-shrink-0" />
                    <span className="text-oxidized-teal font-medium font-inter">{award}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Links */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-oxidized-teal mb-8 font-playfair drop-shadow-text-drop">Let's Connect!</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com'}
              >
                <Mail className="mr-2 h-5 w-5" />
                nika.vereskova@gmail.com
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-3 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Follow on Social
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
