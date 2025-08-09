
import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';

const Videos = () => {
 const videos = [
 {
 id: 1,
 title: "Steampunk Story Time",
 description: "A quick steampunk tale from Nika's workshop",
 youtubeUrl: "https://www.youtube.com/@NikaVereskova/videos",
 embedId: "5H1QWVRqPBU",
 type: t('common.short')
 }
 ];

 const handleWatchVideo = (youtubeUrl: string, title: string) => {
 if (process.env.NODE_ENV === 'development') {
 console.log(`User clicked to watch: ${title}`);
 }
 window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
 };

 return (
 <div className="min-h-screen bg-parchment bg-gear-pattern">
 <Navigation currentPage="videos" />

 <div className="pt-24 pb-16 px-6">
 <div className="container mx-auto">
 {/* Header */}
 <div className="text-center mb-12">
 <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
 {t('videos.title')}
 </h1>
 <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto ">
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
 {/* Ornate brass corners */}
 <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
 <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
 <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
 <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>
 
 <div className="relative overflow-hidden">
 {/* YouTube Thumbnail */}
 <AspectRatio
 ratio={4 / 3}
 className="w-full bg-gradient-to-br from-brass/20 to-oxidized-teal/20 flex items-center justify-center relative overflow-hidden"
 >
 <img
 src={`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`}
 alt={video.title}
 className="w-full h-full object-cover sepia transition-transform duration-300 hover:scale-110"
 loading="lazy"
 srcSet={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg 480w, https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg 1280w`}
 sizes="(max-width: 768px) 100vw, 768px"
 onError={(e) => {
 // Fallback to default thumbnail if maxresdefault doesn't exist
 e.currentTarget.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
 }}
 />
 <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
 <Play className="w-16 h-16 text-parchment opacity-80" />
 </div>
 </AspectRatio>
 <div className="absolute top-4 right-4 z-20">
 <span className="px-3 py-1 bg-brass/90 text-parchment border border-brass-dark font-medium ">
 {video.type as string}
 </span>
 </div>
 </div>
 
 <CardHeader>
 <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop">{video.title}</CardTitle>
 <CardDescription className="text-brass font-medium ">YouTube Video</CardDescription>
 </CardHeader>
 
 <CardContent>
 <p className="text-oxidized-teal/80 mb-6 text-sm leading-relaxed ">
 {video.description}
 </p>
 <Button 
 className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-medium"
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
 
 <h2 className="text-3xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
 {t('videos.subscribeTitle')}
 </h2>
 <p className="text-oxidized-teal/80 text-lg mb-6 ">
 {t('videos.subscribeDesc')}
 </p>
 <Button 
 size="lg" 
 className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-medium"
 onClick={() => window.open('https://www.youtube.com/@NikaVereskova/videos', '_blank', 'noopener,noreferrer')}
 >
 {t('videos.subscribeButton')}
 <ExternalLink className="ml-2 h-4 w-4" />
 </Button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default Videos;
