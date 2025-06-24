
import React from 'react';
import { Award, Mail, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-yellow-50 to-sky-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-rose-200/30 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-600 font-baloo">Nika Vereskova Stories</h1>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Home</a>
            <a href="/books" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Books</a>
            <a href="/videos" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Videos</a>
            <a href="/about" className="text-rose-500 font-semibold">About</a>
            <a href="/blog" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Blog</a>
            <a href="/contact" className="text-rose-700 hover:text-rose-500 transition-colors font-medium">Contact</a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-rose-700 mb-4 font-baloo">Meet Nika</h1>
            <p className="text-xl text-rose-600">
              Author, Dreamer, and Chief Magic-Maker
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="w-full max-w-sm mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  alt="Nika Vereskova"
                  className="w-full h-80 object-cover rounded-3xl shadow-lg border-4 border-white"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 border-rose-200 rounded-3xl shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-rose-700 mb-6 font-baloo">My Story</h2>
                  <div className="space-y-4 text-rose-600 leading-relaxed">
                    <p>
                      Hello, wonderful readers! I'm Nika Vereskova, and I believe that every child deserves to see themselves as the hero of their own magical adventure. My journey as a children's author began when I realized that the most extraordinary stories often come from the most ordinary moments.
                    </p>
                    <p>
                      With a background in early childhood education and a heart full of whimsy, I craft stories that celebrate the courage, creativity, and kindness that already exist within every child. Whether it's a princess who chooses plumbing over ball gowns or a garden that giggles with vegetables, my books aim to show children that magic isn't something you find—it's something you create.
                    </p>
                    <p>
                      When I'm not writing, you'll find me reading to local kindergarten classes, creating story time videos for my YouTube channel, or plotting my next tale while sipping tea in my garden (which, sadly, doesn't giggle back... yet!).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Awards Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-rose-700 mb-8 text-center font-baloo">Recognition & Awards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <Card key={index} className="bg-yellow-50/80 border-yellow-200 rounded-2xl shadow-sm">
                  <CardContent className="p-6 flex items-center">
                    <Award className="text-yellow-600 mr-4 h-6 w-6 flex-shrink-0" />
                    <span className="text-yellow-700 font-medium">{award}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Links */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-rose-700 mb-8 font-baloo">Let's Connect!</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
              <Button size="lg" variant="outline" className="border-sky-300 text-sky-600 hover:bg-sky-50 px-8 py-3 rounded-full">
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
