import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { t, getCurrentLocale } from '@/lib/i18n';
import { BookOpen, Cog, Play, Globe } from 'lucide-react';
import AdSenseUnit from '@/components/AdSenseUnit';

const Projects = () => {
  const locale = getCurrentLocale();

  const projects = [
    {
      title: t('projects.books.title'),
      description: t('projects.books.description'),
      icon: BookOpen,
      link: `/${locale}/books`,
      gradient: 'from-brass/20 to-oxidized-teal/20'
    },
    {
      title: t('projects.europeCapitals.title'),
      description: t('projects.europeCapitals.description'),
      icon: Globe,
      link: `/${locale}/europe-capitals`,
      gradient: 'from-teal/20 to-brass/20'
    },
    {
      title: t('projects.services.title'),
      description: t('projects.services.description'), 
      icon: Cog,
      link: `/${locale}/services`,
      gradient: 'from-oxidized-teal/20 to-teal/20'
    },
    {
      title: t('projects.videos.title'),
      description: t('projects.videos.description'),
      icon: Play,
      link: `/${locale}/videos`, 
      gradient: 'from-brass/20 to-oxidized-teal/20'
    }
  ];

  return (
    <div className="min-h-screen vintage-paper-light parchment-scroll relative">
      <SEO 
        title={`${t('projects.title')} | STEaM LOGIC Studio AB`}
        description={t('projects.description')}
        keywords="projects, AI consulting, storytelling, books, videos, Europe capitals trainer, services, STEaM LOGIC Studio AB"
      />
      
      <Navigation currentPage="projects" />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair text-parchment mb-4">
              {t('projects.title')}
            </h1>
            <p className="text-lg text-parchment/80 max-w-3xl mx-auto leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {projects.map((project, index) => (
              <Link
                key={index}
                to={project.link}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${project.gradient} rounded-2xl p-6 border border-brass/30 backdrop-blur-sm hover:border-brass/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center group-hover:bg-brass/30 transition-colors duration-300">
                      <project.icon className="w-6 h-6 text-brass" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-playfair text-parchment mb-2 group-hover:text-brass transition-colors duration-300">
                        {project.title as string}
                      </h3>
                      <p className="text-parchment/80 text-sm leading-relaxed">
                        {project.description as string}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-teal/20 to-brass/20 rounded-2xl p-8 border border-brass/30 backdrop-blur-sm text-center">
            <h2 className="text-2xl md:text-3xl font-playfair text-parchment mb-4">
              {t('projects.cta.title')}
            </h2>
            <p className="text-parchment/80 mb-6 max-w-2xl mx-auto">
              {t('projects.cta.description')}
            </p>
            <Link
              to={`/${locale}/contact`}
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal to-oxidized-teal text-parchment rounded-lg hover:from-teal/90 hover:to-oxidized-teal/90 transition-all duration-200 font-medium"
            >
              {t('projects.cta.button')}
            </Link>
          </div>
          <AdSenseUnit
            adSlot="9759787900"
            adFormat="autorelaxed"
            className="my-8"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
