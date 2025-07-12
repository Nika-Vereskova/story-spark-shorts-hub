
import React from 'react';
import Navigation from '@/components/Navigation';
import { t } from '@/lib/i18n';

const Terms = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navigation currentPage="terms" />
      
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold text-oxidized-teal mb-8 text-center font-playfair">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none text-oxidized-teal/90 font-inter space-y-6">
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Nika Vereskova Stories' website for personal, non-commercial transitory viewing only.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Disclaimer</h2>
            <p>The materials on Nika Vereskova Stories' website are provided on an 'as is' basis. Nika Vereskova Stories makes no warranties, expressed or implied.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Limitations</h2>
            <p>In no event shall Nika Vereskova Stories or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us through our contact page.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
