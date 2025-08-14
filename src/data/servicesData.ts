
import { 
  Video, 
  Globe, 
  BookOpen, 
  Smartphone, 
  Brain,
  Wand2
} from 'lucide-react';
import { t } from '@/lib/i18n';

export interface ServiceData {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  cta: string;
  price?: string;
  serviceName?: string;
  isSubscription?: boolean;
}

export const getServicesData = (): ServiceData[] => [
  {
    icon: Video,
    title: t('services.webinars.title'),
    description: t('services.webinars.description'),
    features: t('services.webinars.features'),
    cta: t('services.webinars.cta')
  },
  {
    icon: Globe,
    title: t('services.websites.title'),
    description: t('services.websites.description'),
    features: t('services.websites.features'),
    cta: t('services.websites.cta')
  },
  {
    icon: BookOpen,
    title: t('services.chapters.title'),
    description: t('services.chapters.description'),
    features: t('services.chapters.features'),
    cta: t('services.chapters.cta'),
    price: "50 SEK",
    serviceName: "Book Chapters"
  },
  {
    icon: Wand2,
    title: t('services.animation.title'),
    description: t('services.animation.description'),
    features: t('services.animation.features'),
    cta: t('services.animation.cta')
  },
  {
    icon: Smartphone,
    title: t('services.apps.title'),
    description: t('services.apps.description'),
    features: t('services.apps.features'),
    cta: t('services.apps.cta')
  },
  {
    icon: Brain,
    title: t('services.ai.title'),
    description: t('services.ai.description'),
    features: t('services.ai.features'),
    cta: t('services.ai.cta'),
    isSubscription: true
  }
];
