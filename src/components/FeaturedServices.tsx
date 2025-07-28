import React from 'react';
import { Users, Brain, Bot, Calendar, Wrench, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FeaturedServices = () => {
  const services = [
    {
      icon: Users,
      title: "Author & Speaker",
      description: "Bringing steampunk stories and AI insights to audiences worldwide",
      features: [
        "School visits & storytelling workshops",
        "Conference keynotes on AI & creativity", 
        "Book readings & character performances",
        "Educational content for children"
      ],
      cta: "Book an Event",
      action: () => window.open('#', '_blank')
    },
    {
      icon: Brain,
      title: "AI Consulting",
      description: "Strategic AI implementation with ethical foundations",
      features: [
        "Prompt engineering & optimization",
        "AI policy development",
        "Full-stack LLM prototypes",
        "Team training & workshops"
      ],
      cta: "Explore Consulting",
      action: () => window.location.href = '/ai-services'
    },
    {
      icon: Bot,
      title: "Bespoke GPTs",
      description: "Custom AI assistants tailored to your specific needs",
      features: [
        "Child-safe storytelling bots",
        "Translation assistants",
        "Educational content creators",
        "Business workflow automation"
      ],
      cta: "Build a GPT",
      action: () => window.location.href = '/ai-services'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-oxidized-teal/5 to-brass/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
            Stories & Solutions
          </h2>
          <p className="text-oxidized-teal/80 text-lg max-w-2xl mx-auto font-inter">
            Where imagination meets innovation - from children's books to cutting-edge AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop group relative overflow-hidden"
            >
              {/* Animated gear background */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity">
                <service.icon className="w-full h-full text-brass animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-brass/20 rounded-full flex items-center justify-center group-hover:bg-brass/30 transition-colors">
                    <service.icon className="w-6 h-6 text-brass" />
                  </div>
                  <CardTitle className="text-oxidized-teal text-xl font-playfair">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-oxidized-teal/70 font-inter">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-oxidized-teal/80 font-inter">
                      <Wrench className="w-4 h-4 text-brass mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={service.action}
                  className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                >
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;