import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getCurrentLocale } from '@/lib/i18n';

interface BreadcrumbNavProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  const locale = getCurrentLocale();

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="text-oxidized-teal/70">
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link 
              to={`/${locale}`} 
              className="hover:text-brass transition-colors font-inter text-sm"
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator>
          <ChevronRight className="w-4 h-4 text-brass/50" />
        </BreadcrumbSeparator>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === items.length - 1 || !item.href ? (
                <BreadcrumbPage className="text-oxidized-teal font-inter text-sm font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link 
                    to={item.href} 
                    className="hover:text-brass transition-colors font-inter text-sm"
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4 text-brass/50" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
