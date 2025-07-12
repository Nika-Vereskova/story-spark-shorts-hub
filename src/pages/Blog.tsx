import React from 'react';
import { Calendar, ExternalLink, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "My First Book is Here! ☀️",
      date: "Summer 2025",
      excerpt: "My summer has been productive so far… I wrote and published my first book!",
      content: `My summer has been productive so far… I wrote and published my first book!

Plumberella isn't your typical fairytale. It's a witty, heartfelt steampunk story about a brave, inventive girl who creates truth instead of waiting for magic.

This story blends:
• Clever heroines and critical thinking
• The magic of invention and courage
• Empowerment for young readers and dreamers of all ages

I wrote Plumberella for those who believe kindness and cleverness can change the world.`,
      bookExcerpt: `**Chapter 2. Plumberella**

As you already know, Plumberella's birth was overshadowed by tragedy. When the time came to name the newborn, Henry, lost and heartbroken, sought some kind of anchor in the familiar. He looked at the shower in the bathroom, where he had just been soothing the baby, and thought: "Plumberella. Sweet, pure, like my life's true calling to make the world cleaner. I am the Plumber!" And so she was named Plumberella—not just officially, but also by love.

The girl grew up calm, bright, and kind. As soon as she learned to firmly hold a wrench in her hands, she immediately began helping her father. Sometimes he took her along on jobs—thankfully, the clients didn't mind, and the girl was quieter than water and very capable.

Sometimes she'd hand him an eight-millimeter wrench, or the wire cutters, or fish out the exact part from the toolbox as if by magic.

By the age of seventeen, Plumberella was already quite proficient in plumbing. Henry proudly considered: maybe it was time to give her her first solo job? Especially since she wasn't just learning from him—she was attending the plumbing guild school. Of course, she was the only girl there. Moreover, the youngest: after the entrance exams, she had been allowed to skip two levels right away.

But neither that nor the male-dominated environment fazed her. Plumberella was respected. For her intellect, composure, and directness. Some of the boys were even a little afraid of her: she not only knew the structure of a siphon better than any of them, but she could also snap off a sharp retort if someone started acting rude. The plunger—in her hands—was both a tool and a symbol of justice.

And Plumberella adored reading. Books were like portals for her—she could immerse herself in any role: a princess, a scout, a space wizard... But there was no magic in her life. There were pipes, faucets, and work. Still, in rare free hours, you could find her at the library—among towers of books and the scent of old paper.

That morning, Dad had left early. And since Plumberella's classes started later, she allowed herself the pleasure of lingering under the blanket, listening to the birds singing outside the window. In the kitchen, warm croissants waited for her—lovingly left by her father. She ate two and didn't regret it—the day promised to be interesting.

While getting ready, she carefully arranged her tools in her pink toolbox—a gift from her father on her fifteenth birthday. Everything was sorted by color: wrenches—green, screwdrivers—blue, pliers—purple, like her lavender gloves. That made it easier for her to think.

The day at school started briskly. Today's topic was the construction of toilet tanks. Theory was smooth, but a surprise awaited the students during practice. While the teacher was distracted checking notebooks, a few boys from the class decided to play a prank. The water tank of the training toilet was secretly opened, and thick green slime—brought from home by one of the students—was poured inside.

The teacher, noticing nothing, began his explanation:

"So, dear apprentices, today we will learn how to diagnose faults in the flushing mechanism. One of you assembled the training setup yesterday. Let's see. I press the button—and…"`,
      links: [
        { title: "English", url: "https://amzn.eu/d/3IRmXaF" },
        { title: "Swedish", url: "https://amzn.eu/d/8CAuCN4" },
        { title: "Russian", url: "https://lnkd.in/dX6EdEAs" }
      ]
    }
  ];

  const [expandedExcerpt, setExpandedExcerpt] = React.useState(false);

  const handleLinkClick = (url: string, title: string) => {
    console.log(`User clicked to open: ${title}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <Navigation currentPage="blog" />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">Clockwork Chronicles Blog</h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              Follow my writing journey, creative process, and the magical world of steampunk storytelling.
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 shadow-brass-drop animate-fade-in relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-brass mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium font-inter">{post.date}</span>
                  </div>
                  <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">{post.title}</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter">Latest Updates</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-oxidized-teal/80 font-inter whitespace-pre-line leading-relaxed">
                    {post.content}
                  </div>
                  
                  {/* Book Links */}
                  <div className="space-y-4">
                    <h3 className="text-oxidized-teal font-semibold font-playfair flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Read Plumberella now:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {post.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          variant="outline"
                          className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                          onClick={() => handleLinkClick(link.url, link.title)}
                        >
                          {link.title}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Excerpt Toggle */}
                  <div className="pt-4 border-t border-brass/30">
                    <Button
                      variant="outline"
                      className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium mb-4"
                      onClick={() => setExpandedExcerpt(!expandedExcerpt)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      {expandedExcerpt ? 'Hide Excerpt' : 'Read the Excerpt'}
                    </Button>
                    
                    {expandedExcerpt && (
                      <div className="bg-brass/5 p-6 rounded-lg border border-brass/20 animate-fade-in">
                        <div className="prose prose-oxidized-teal max-w-none">
                          <div className="text-oxidized-teal/80 font-inter whitespace-pre-line leading-relaxed text-sm">
                            {post.bookExcerpt}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Social Media Follow */}
                  <div className="pt-4 border-t border-brass/30">
                    <p className="text-oxidized-teal/80 mb-4 font-inter">
                      📌 Follow me for updates, art, and behind-the-scenes magic:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium"
                        onClick={() => handleLinkClick('https://www.facebook.com/profile.php?id=61577838015246', 'Facebook')}
                      >
                        Facebook
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 shadow-inner-glow transition-all duration-300 font-inter font-medium"
                        onClick={() => handleLinkClick('https://www.instagram.com/vereskovanika', 'Instagram')}
                      >
                        Instagram
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 italic text-oxidized-teal/70 font-inter">
                    "Let's inspire the next generation of thinkers and builders – one story at a time."
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
