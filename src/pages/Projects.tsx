import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { t, getCurrentLocale } from '@/lib/i18n';
import { BookOpen, Play, Globe, Brain } from 'lucide-react';
import AdSenseUnit from '@/components/AdSenseUnit';
import SteampunkGearCluster from '@/components/SteampunkGearCluster';
import MechanicalDivider from '@/components/MechanicalDivider';
import SteampunkProjectCard from '@/components/SteampunkProjectCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Projects = () => {
  const locale = getCurrentLocale();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  const projects = [
    {
      title: t('projects.books.title'),
      description: t('projects.books.description'),
      icon: BookOpen,
      link: `/${locale}/books`,
      gradient: 'from-brass/20 to-oxidized-teal/20'
    },
    {
      title: t('nav.learnAI'),
      description: 'Discover the power of artificial intelligence through interactive learning experiences and hands-on educational tools.',
      icon: Brain,
      link: `/${locale}/learn-ai`,
      gradient: 'from-teal/20 to-brass/30'
    },
    {
      title: t('projects.europeCapitals.title'),
      description: t('projects.europeCapitals.description'),
      icon: Globe,
      link: `/${locale}/europe-capitals`,
      gradient: 'from-brass/30 to-teal/20'
    },
    {
      title: t('projects.videos.title'),
      description: t('projects.videos.description'),
      icon: Play,
      link: `/${locale}/videos`, 
      gradient: 'from-oxidized-teal/20 to-brass/20'
    }
  ];

  return (
    <div className="min-h-screen vintage-paper-light parchment-scroll relative overflow-hidden">
      <SEO 
        title={`${t('projects.title')} | STEaM LOGIC Studio AB`}
        description={t('projects.description')}
        keywords="projects, AI consulting, storytelling, books, videos, Europe capitals trainer, services, STEaM LOGIC Studio AB"
      />
      
      {/* Floating decorative gears */}
      <SteampunkGearCluster 
        position="top-left" 
        size="lg" 
        className="animate-pulse opacity-10" 
      />
      <SteampunkGearCluster 
        position="top-right" 
        size="md" 
        className="animate-pulse opacity-15 delay-1000" 
      />
      <SteampunkGearCluster 
        position="bottom-left" 
        size="sm" 
        className="animate-pulse opacity-20 delay-2000" 
      />
      <SteampunkGearCluster 
        position="bottom-right" 
        size="lg" 
        className="animate-pulse opacity-10 delay-500" 
      />
      
      <Navigation currentPage="projects" />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-8 max-w-7xl relative">
          {/* Enhanced Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-20 relative transform transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-playfair text-oxidized-teal mb-6 leading-tight drop-shadow-2xl">
                {t('projects.title')}
              </h1>
              
              {/* Decorative elements around title */}
              <div className="absolute -top-4 -left-8 opacity-30">
                <SteampunkGearCluster size="sm" />
              </div>
              <div className="absolute -bottom-2 -right-6 opacity-25">
                <SteampunkGearCluster size="sm" />
              </div>
            </div>
            
            <MechanicalDivider className="max-w-2xl mx-auto my-8" />
            
            <p className="text-xl md:text-2xl text-oxidized-teal/80 max-w-4xl mx-auto leading-relaxed font-light">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {projects.map((project, index) => (
              <SteampunkProjectCard
                key={index}
                title={project.title as string}
                description={project.description as string}
                icon={project.icon}
                link={project.link}
                gradient={project.gradient}
                index={index}
              />
            ))}
          </div>

          <MechanicalDivider className="my-12" />

          {/* Enhanced Call to Action */}
          <div className="relative bg-gradient-to-br from-teal/20 via-brass/15 to-oxidized-teal/20 rounded-3xl p-12 border-2 border-brass/40 backdrop-blur-lg text-center shadow-2xl shadow-brass/10 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-4 left-4 opacity-20">
              <SteampunkGearCluster size="md" />
            </div>
            <div className="absolute bottom-4 right-4 opacity-15">
              <SteampunkGearCluster size="lg" />
            </div>
            
            {/* Corner rivets */}
            <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-brass/50 border-2 border-brass/70 shadow-inner" />
            <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-brass/50 border-2 border-brass/70 shadow-inner" />
            <div className="absolute bottom-6 left-6 w-3 h-3 rounded-full bg-brass/50 border-2 border-brass/70 shadow-inner" />
            <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-brass/50 border-2 border-brass/70 shadow-inner" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-playfair text-oxidized-teal mb-6 drop-shadow-lg">
                {t('projects.cta.title')}
              </h2>
              <p className="text-lg text-oxidized-teal/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('projects.cta.description')}
              </p>
              <Link
                to={`/${locale}/contact`}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-teal to-oxidized-teal text-parchment rounded-xl hover:from-teal/90 hover:to-oxidized-teal/90 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-teal/30"
              >
                <span>{t('projects.cta.button')}</span>
                <div className="w-5 h-5 rounded-full bg-parchment/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-parchment rounded-full animate-pulse" />
                </div>
              </Link>
            </div>
          </div>
          
          <AdSenseUnit
            adSlot="9759787900"
            adFormat="autorelaxed"
            className="my-12 rounded-xl overflow-hidden border border-brass/20"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
