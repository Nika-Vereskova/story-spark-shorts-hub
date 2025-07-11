import React, { useState } from 'react';
import { Cog, Key, Glasses, Play, User, Mail, ExternalLink, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { t } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleBuyPlumberella = () => {
    // Track conversion event
    posthog.capture('book_purchase_clicked', {
      book_title: 'Plumberella',
      source: 'hero_section'
    });
    
    window.open('https://amzn.eu/d/hmK81Zj', '_blank', 'noopener,noreferrer');
  };

  const handleReadExcerpt = () => {
    // Track engagement event
    posthog.capture('excerpt_opened', {
      book_title: 'Plumberella',
      source: 'hero_section'
    });
    
    setShowExcerpt(true);
  };

  const handleCloseExcerpt = () => {
    setShowExcerpt(false);
  };

  const handleWatchStoryTime = () => {
    // Track video engagement
    posthog.capture('story_video_clicked', {
      source: 'hero_section'
    });
    
    window.open('https://youtube.com/shorts/5H1QWVRqPBU?si=zUufNsODmSQceVdZ', '_blank', 'noopener,noreferrer');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: t('common.emailRequired'),
        description: t('common.emailRequiredDesc'),
        variant: "destructive"
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: t('common.invalidEmail'),
        description: t('common.invalidEmailDesc'),
        variant: "destructive"
      });
      return;
    }
    
    // Track newsletter signup conversion
    posthog.capture('newsletter_signup', {
      email: email,
      source: 'homepage'
    });
    
    toast({
      title: t('common.subscribeSuccess'),
      description: t('common.subscribeSuccessDesc'),
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      {/* Navigation */}
      <Navigation currentPage="home" />

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
                {t('home.title')}
              </h1>
              <p className="text-xl text-oxidized-teal/80 mb-8 max-w-2xl font-inter">
                {t('home.subtitle')}
                <br /><br />
                {t('home.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 text-lg border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  onClick={handleReadExcerpt}
                >
                  <Key className="mr-2 h-5 w-5" />
                  {t('home.featuredBook')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-3 text-lg shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium hover:sepia"
                  onClick={handleWatchStoryTime}
                >
                  <Play className="mr-2 h-5 w-5" />
                  {t('home.watchVideos')}
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
                    src="/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png"
                    alt="Plumberella - Latest Children's Book"
                    className="w-full h-80 object-cover transition-all duration-300 hover:scale-110 hover:sepia"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter flex items-center">
                      <Cog className="w-3 h-3 mr-1" />
                      {t('common.featured')}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">Plumberella</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter">{t('common.ageRange')} • Steampunk Fairy Tale</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-oxidized-teal/80 mb-6 font-inter">
                    Plumberella is a witty, heartwarming steampunk fairytale about a girl, a vanishing bathroom, and the invention of truth.
                    <br /><br />
                    When a charming but deceitful stepmother moves in, young Plumberella finds herself banished to the basement while frilly dresses replace her tools. But she isn't the type to mope — she's a certified pipe-wrangler with a talent for fixing more than just faucets.
                  </p>
                  <Button 
                    className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                    onClick={handleBuyPlumberella}
                  >
                    Buy on Amazon KDP
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Excerpt Modal */}
      {showExcerpt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-parchment border-2 border-brass max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
            
            <div className="p-8 pt-12">
              <button
                onClick={handleCloseExcerpt}
                className="absolute top-4 right-4 text-oxidized-teal hover:text-brass transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-3xl font-bold text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop text-center">
                Chapter 2. Plumberella
              </h2>
              
              <div className="prose prose-lg max-w-none text-oxidized-teal/90 font-inter leading-relaxed">
                <p className="mb-4">
                  As you already know, Plumberella's birth was overshadowed by tragedy. When the time came to name the newborn, Henry, lost and heartbroken, sought some kind of anchor in the familiar. He looked at the shower in the bathroom, where he had just been soothing the baby, and thought: "Plumberella. Sweet, pure, like my life's true calling to make the world cleaner. I am the Plumber!" And so she was named Plumberella—not just officially, but also by love.
                </p>
                
                <p className="mb-4">
                  The girl grew up calm, bright, and kind. As soon as she learned to firmly hold a wrench in her hands, she immediately began helping her father. Sometimes he took her along on jobs—thankfully, the clients didn't mind, and the girl was quieter than water and very capable.
                </p>
                
                <p className="mb-4">
                  Sometimes she'd hand him an eight-millimeter wrench, or the wire cutters, or fish out the exact part from the toolbox as if by magic.
                </p>
                
                <p className="mb-4">
                  By the age of seventeen, Plumberella was already quite proficient in plumbing. Henry proudly considered: maybe it was time to give her her first solo job? Especially since she wasn't just learning from him—she was attending the plumbing guild school. Of course, she was the only girl there. Moreover, the youngest: after the entrance exams, she had been allowed to skip two levels right away.
                </p>
                
                <p className="mb-4">
                  But neither that nor the male-dominated environment fazed her. Plumberella was respected. For her intellect, composure, and directness. Some of the boys were even a little afraid of her: she not only knew the structure of a siphon better than any of them, but she could also snap off a sharp retort if someone started acting rude. The plunger—in her hands—was both a tool and a symbol of justice.
                </p>
                
                <p className="mb-4">
                  And Plumberella adored reading. Books were like portals for her—she could immerse herself in any role: a princess, a scout, a space wizard... But there was no magic in her life. There were pipes, faucets, and work. Still, in rare free hours, you could find her at the library—among towers of books and the scent of old paper.
                </p>
                
                <p className="mb-4">
                  That morning, Dad had left early. And since Plumberella's classes started later, she allowed herself the pleasure of lingering under the blanket, listening to the birds singing outside the window. In the kitchen, warm croissants waited for her—lovingly left by her father. She ate two and didn't regret it—the day promised to be interesting.
                </p>
                
                <p className="mb-4">
                  While getting ready, she carefully arranged her tools in her pink toolbox—a gift from her father on her fifteenth birthday. Everything was sorted by color: wrenches—green, screwdrivers—blue, pliers—purple, like her lavender gloves. That made it easier for her to think.
                </p>
                
                <p className="mb-4">
                  The day at school started briskly. Today's topic was the construction of toilet tanks. Theory was smooth, but a surprise awaited the students during practice. While the teacher was distracted checking notebooks, a few boys from the class decided to play a prank. The water tank of the training toilet was secretly opened, and thick green slime—brought from home by one of the students—was poured inside.
                </p>
                
                <p className="mb-4">
                  The teacher, noticing nothing, began his explanation:
                </p>
                
                <p className="mb-4 italic">
                  "So, dear apprentices, today we will learn how to diagnose faults in the flushing mechanism. One of you assembled the training setup yesterday. Let's see. I press the button—and…"
                </p>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  className="bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  onClick={handleBuyPlumberella}
                >
                  Buy the Full Book on Amazon
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links Section */}
      <section className="py-16 px-6 bg-gear-etch/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-oxidized-teal mb-12 text-center font-playfair drop-shadow-text-drop">{t('home.exploreBooks')}</h2>
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
                  {t('nav.books')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-4 font-inter">
                  {t('books.subtitle')}
                </p>
                <Link to="/books">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  >
                    {t('home.exploreBooks')}
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
                  {t('nav.videos')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-4 font-inter">
                  {t('videos.subtitle')}
                </p>
                <Link to="/videos">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium hover:sepia"
                  >
                    {t('home.watchVideos')}
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
                  {t('nav.about')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-4 font-inter">
                  {t('about.subtitle')}
                </p>
                <Link to="/about">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  >
                    {t('home.learnMore')}
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
          <h2 className="text-4xl font-bold text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">{t('contact.newsletterTitle')}</h2>
          <p className="text-oxidized-teal/80 text-lg mb-8 font-inter">
            {t('contact.newsletterDesc')}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder={t('contact.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow font-inter"
            />
            <Button 
              type="submit"
              className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
            >
              {t('contact.subscribe')}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-parchment/50 border-t-2 border-brass/50">
        <div className="container mx-auto text-center">
          <p className="text-oxidized-teal/80 font-medium font-inter">© 2024 Nika Vereskova Stories. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a 
              href="https://www.youtube.com/@NikaVereskova" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brass hover:text-brass-dark transition-colors font-inter hover:sepia"
            >
              YouTube
            </a>
            <a 
              href="https://www.instagram.com/vereskovanika" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brass hover:text-brass-dark transition-colors font-inter"
            >
              Instagram
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61577838015246" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brass hover:text-brass-dark transition-colors font-inter"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
