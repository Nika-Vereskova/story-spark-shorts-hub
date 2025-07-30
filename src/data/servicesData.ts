
import { 
  Video, 
  Globe, 
  BookOpen, 
  Smartphone, 
  Brain
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
    cta: t('services.webinars.cta'),
    price: "100 SEK",
    serviceName: "Webinars"
  },
  {
    icon: Globe,
    title: t('services.websites.title'),
    description: t('services.websites.description'),
    features: t('services.websites.features'),
    cta: t('services.websites.cta'),
    price: "1,000 SEK",
    serviceName: "Website Building"
  },
  {
    icon: BookOpen,
    title: t('services.chapters.title'),
    description: t('services.chapters.description'),
    features: t('services.chapters.features'),
    cta: t('services.chapters.cta'),
    price: "10 SEK",
    serviceName: "Book Chapters"
  },
  {
    icon: Smartphone,
    title: t('services.apps.title'),
    description: t('services.apps.description'),
    features: t('services.apps.features'),
    cta: t('services.apps.cta'),
    price: "1,000 SEK",
    serviceName: "App Development"
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
