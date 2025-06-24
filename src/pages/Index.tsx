
import React from 'react';
import { Book, Play, User, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const books = [
    {
      id: 1,
      title: "The Whispering Woods",
      description: "A mystical journey through enchanted forests where every tree holds a secret.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center",
      genre: "Fantasy",
      status: "Published"
    },
    {
      id: 2,
      title: "Digital Dreams",
      description: "A sci-fi thriller exploring the boundaries between reality and virtual worlds.",
      image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop&crop=center",
      genre: "Sci-Fi",
      status: "Coming Soon"
    },
    {
      id: 3,
      title: "Midnight Chronicles",
      description: "Dark tales that unfold when the world sleeps and shadows come alive.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center",
      genre: "Mystery",
      status: "Published"
    }
  ];

  const youtubeShorts = [
    {
      id: 1,
      title: "The Last Library",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      duration: "0:45",
      views: "12K"
    },
    {
      id: 2,
      title: "Time Capsule Stories",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
      duration: "0:52",
      views: "8.3K"
    },
    {
      id: 3,
      title: "Digital Echoes",
      thumbnail: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=300&fit=crop&crop=center",
      duration: "0:38",
      views: "15K"
    },
    {
      id: 4,
      title: "Shadow Tales",
      thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop&crop=center",
      duration: "0:41",
      views: "9.7K"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Author Portfolio</h1>
          <div className="hidden md:flex space-x-6">
            <a href="#books" className="text-purple-200 hover:text-white transition-colors">Books</a>
            <a href="#videos" className="text-purple-200 hover:text-white transition-colors">Videos</a>
            <a href="#about" className="text-purple-200 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-purple-200 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Stories That 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Captivate</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Immerse yourself in worlds of wonder through my books and discover bite-sized adventures in my YouTube short stories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                <Book className="mr-2 h-5 w-5" />
                Explore Books
              </Button>
              <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Books</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <Card key={book.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      book.status === 'Published' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      {book.status}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white text-xl">{book.title}</CardTitle>
                  <CardDescription className="text-purple-300">{book.genre}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 mb-4">{book.description}</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Shorts Section */}
      <section id="videos" className="py-16 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">YouTube Short Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {youtubeShorts.map((video, index) => (
              <div key={video.id} className="group cursor-pointer animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1">{video.title}</h3>
                  <p className="text-purple-300 text-sm">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white">
              View All Videos
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">About the Author</h2>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-400">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                alt="Author"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-8 border border-purple-500/20">
            <p className="text-purple-200 text-lg leading-relaxed mb-6">
              Welcome to my literary universe! I'm passionate about crafting stories that transport readers to new worlds 
              and exploring the intersection of traditional storytelling with modern digital media. Through my books and 
              YouTube short stories, I aim to create immersive experiences that stay with you long after the last page 
              or final frame.
            </p>
            <p className="text-purple-200 text-lg leading-relaxed">
              When I'm not writing, you'll find me experimenting with visual storytelling, creating short-form content 
              that brings my fictional worlds to life. Each YouTube short is a window into the larger narratives I'm 
              building, offering bite-sized adventures for our fast-paced digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-purple-200 text-lg mb-8">
            Ready to embark on a literary journey? Have questions about my work or interested in collaborations?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white">
              <User className="mr-2 h-5 w-5" />
              Follow My Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20">
        <div className="container mx-auto text-center">
          <p className="text-purple-300">© 2024 Author Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
