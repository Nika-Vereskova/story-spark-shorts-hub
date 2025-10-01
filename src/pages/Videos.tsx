
import React from 'react';
import { Play, ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import AdSenseUnit from '@/components/AdSenseUnit';

const Videos = () => {
  const videos = [
    {
      id: 1,
      title: "Steampunk Story Time",
      description: "A quick steampunk tale from Nika's workshop",
      youtubeUrl: "https://www.youtube.com/@NikaVereskova/videos",
      embedId: "dQw4w9WgXcQ",
      type: t('common.short')
    },
    {
      id: 2,
      title: "Introduction to Large Language Models (LLMs)",
      description: "Educational video explaining prompt fundamentals for Large Language Models, their applications, and how they work to achieve the best result",
      youtubeUrl: "https://youtu.be/wkWuKx3aaPE",
      embedId: "wkWuKx3aaPE",
      type: "Educational"
    }
  ];

  const handleWatchVideo = (youtubeUrl: string, title: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`User clicked to watch: ${title}`);
    }
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern relative">
      {/* Clockwork Gear Decorations */}
      <Settings className="absolute top-28 right-12 w-12 h-12 text-brass/15 animate-gear-rotation" style={{animationDelay: '0.5s'}} />
      <Settings className="absolute top-2/3 left-8 w-16 h-16 text-brass/10 animate-gear-rotation" style={{animationDelay: '2.5s'}} />
      <Settings className="absolute bottom-32 right-1/3 w-8 h-8 text-brass/20 animate-gear-rotation" style={{animationDelay: '4.5s'}} />
      <SEO title="AI Demonstrations & Story Time Videos | STEaM LOGIC Studio AB" description="Watch practical AI demonstrations and steampunk story time videos by Nika Vereskova from STEaM LOGIC Studio AB. Educational content on AI technology and creative storytelling." />
      <Navigation currentPage="videos" />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
              {t('videos.title')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              {t('videos.subtitle')}
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
                {/* Ornate brass corners - highest z-index */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-40 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-40 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-40 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-40 pointer-events-none"></div>
                
                <div className="relative overflow-hidden">
                  {/* YouTube Thumbnail Container */}
                  <div className="w-full h-48 bg-gradient-to-br from-brass/20 to-oxidized-teal/20 relative z-0">
                    <img
                      src={`https://i.ytimg.com/vi/${video.embedId}/maxresdefault.jpg`}
                      alt={`${video.title} - YouTube Video Thumbnail`}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110 z-10"
                      onLoad={() => {
                        console.log(`✅ Thumbnail loaded: ${video.title} (${video.embedId})`);
                      }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        console.error(`❌ Thumbnail failed: ${video.title} (${video.embedId}) - ${target.src}`);
                        
                        // Try fallback thumbnail sizes
                        if (target.src.includes('maxresdefault')) {
                          console.log('Trying hqdefault...');
                          target.src = `https://i.ytimg.com/vi/${video.embedId}/hqdefault.jpg`;
                        } else if (target.src.includes('hqdefault')) {
                          console.log('Trying mqdefault...');
                          target.src = `https://i.ytimg.com/vi/${video.embedId}/mqdefault.jpg`;
                        } else if (target.src.includes('mqdefault')) {
                          console.log('Trying default.jpg...');
                          target.src = `https://i.ytimg.com/vi/${video.embedId}/default.jpg`;
                        } else {
                          console.error('All thumbnails failed - using placeholder');
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.thumbnail-error')) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'thumbnail-error absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brass/10 to-oxidized-teal/10 z-10';
                            errorDiv.innerHTML = `
                              <div class="text-center p-4">
                                <div class="text-brass text-4xl mb-2">📹</div>
                                <p class="text-muted-foreground text-sm">Thumbnail unavailable</p>
                              </div>
                            `;
                            parent.appendChild(errorDiv);
                          }
                        }
                      }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 pointer-events-none">
                      <Play className="w-16 h-16 text-parchment opacity-80" />
                    </div>
                  </div>
                  {/* Video Type Badge */}
                  <div className="absolute top-4 right-4 z-30">
                    <span className="px-3 py-1 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter">
                      {video.type as string}
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
                    {t('videos.watchOnYoutube')}
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
            
            <h2 className="text-3xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
              {t('videos.subscribeTitle')}
            </h2>
            <p className="text-oxidized-teal/80 text-lg mb-6 font-inter">
              {t('videos.subscribeDesc')}
            </p>
            <Button
              size="lg"
              className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
              onClick={() => window.open('https://www.youtube.com/@NikaVereskova/videos', '_blank', 'noopener,noreferrer')}
            >
              {t('videos.subscribeButton')}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <AdSenseUnit
            adSlot="9759787900"
            adFormat="autorelaxed"
            className="my-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Videos;
