
import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Videos = () => {
  const videos = [
    {
      id: 1,
      title: "Steampunk Story Time",
      description: "A quick steampunk tale from Nika's workshop",
      youtubeUrl: "https://youtube.com/shorts/5H1QWVRqPBU?si=zUufNsODmSQceVdZ",
      embedId: "5H1QWVRqPBU",
      type: "Short"
    }
  ];

  const handleWatchVideo = (youtubeUrl: string, title: string) => {
    console.log(`User clicked to watch: ${title}`);
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
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
            <Link to="/videos" className="text-brass font-semibold font-inter">Videos</Link>
            <Link to="/about" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">About</Link>
            <a href="/blog" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Blog</a>
            <Link to="/contact" className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Clockwork Chronicles on Screen</h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              Watch my YouTube adventures featuring quick steampunk tales and behind-the-scenes workshop magic! 
              Discover the stories that inspire my books and get a glimpse into my creative process.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card 
                key={video.id} 
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop animate-fade-in relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>
                
                <div className="relative overflow-hidden">
                  {/* YouTube Thumbnail */}
                  <div className="w-full h-48 bg-gradient-to-br from-brass/20 to-oxidized-teal/20 flex items-center justify-center relative">
                    <img 
                      src={`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        // Fallback to default thumbnail if maxresdefault doesn't exist
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-16 h-16 text-parchment opacity-80" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter">
                      {video.type}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop">{video.title}</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter">YouTube Video</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-oxidized-teal/80 mb-6 text-sm leading-relaxed font-inter">
                    {video.description}
                  </p>
                  <Button 
                    className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                    onClick={() => handleWatchVideo(video.youtubeUrl, video.title)}
                  >
                    Watch on YouTube
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
            
            <h2 className="text-3xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Subscribe for More Adventures!</h2>
            <p className="text-oxidized-teal/80 text-lg mb-6 font-inter">
              Don't miss out on new steampunk stories and workshop videos. Subscribe to my YouTube channel for regular clockwork chronicles!
            </p>
            <Button 
              size="lg" 
              className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
              onClick={() => window.open('https://www.youtube.com/@NikaVereskova', '_blank', 'noopener,noreferrer')}
            >
              Subscribe on YouTube
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
