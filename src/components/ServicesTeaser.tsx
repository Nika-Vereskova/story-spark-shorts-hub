import React from 'react';
import { BookOpen, Globe, Play, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getCurrentLocale } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

const ServicesTeaser = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();

  const handleExploreProjects = () => {
    posthog.capture('explore_projects_clicked', {
      source: 'projects_teaser'
    });
    navigate(`/${locale}/projects`);
  };

  const projects = [
    {
      icon: BookOpen,
      title: "Steampunk Books",
      description: "Enchanting tales of young inventors and their magical adventures in a steampunk world."
    },
    {
      icon: Globe,
      title: "Europe Capitals Trainer",
      description: "Interactive learning tool for European countries and capitals with study mode, quiz, and map."
    },
    {
      icon: Play,
      title: "Video Content",
      description: "Educational and entertaining videos about AI, storytelling, and creative technology."
    }
  ];

  return (
    <section 
      id="projects-section" 
      className="py-16 px-6 vintage-paper-light parchment-scroll relative"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {/* Clockwork Gear Decoration */}
      <Settings className="absolute top-8 right-8 w-12 h-12 text-brass/20 animate-gear-rotation" />
      <Settings className="absolute bottom-8 left-8 w-10 h-10 text-brass/15 animate-gear-rotation" style={{animationDelay: '2s'}} />
      
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-playfair text-oxidized-teal mb-4" itemProp="name">
            Projects
          </h2>
          <p className="text-oxidized-teal/70 text-lg font-inter max-w-2xl mx-auto" itemProp="description">
            Discover innovative projects that blend creativity, technology, and education through storytelling and intelligent design.
          </p>
        </header>

        <div className="grid-responsive max-w-6xl mx-auto mb-12">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <article 
                key={index} 
                className="vintage-paper-dark weathered-edges border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop touch-target rounded-lg"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <header className="text-center p-6 pb-4">
                  <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-brass animate-icon-spin" />
                  </div>
                  <h3 className="text-oxidized-teal text-xl font-playfair leading-tight" itemProp="name">
                    {project.title}
                  </h3>
                </header>
                <div className="px-6 pb-6">
                  <p className="text-oxidized-teal/70 font-inter text-center leading-relaxed" itemProp="description">
                    {project.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            variant="steam"
            size="lg"
            className="text-lg px-8 py-3"
            onClick={handleExploreProjects}
            itemProp="mainEntityOfPage"
          >
            Explore Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;