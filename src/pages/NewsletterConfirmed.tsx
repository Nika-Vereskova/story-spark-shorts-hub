
import React from 'react';
import { CheckCircle, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';

const NewsletterConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment via-brass/10 to-oxidized-teal/20 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Main confirmation card */}
        <div className="bg-parchment/90 backdrop-blur-sm border-2 border-brass shadow-brass-drop rounded-lg p-8 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-4 left-4 text-6xl">⚙️</div>
            <div className="absolute top-8 right-8 text-4xl">🔧</div>
            <div className="absolute bottom-4 left-8 text-5xl">🎭</div>
            <div className="absolute bottom-8 right-4 text-3xl">✨</div>
          </div>
          
          {/* Success icon */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className="bg-green-100 border-2 border-green-500 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop relative z-10">
            Email Confirmed Successfully! 
            <span className="ml-2 text-3xl">⚙️</span>
          </h1>

          {/* Thank you message */}
          <div className="relative z-10 space-y-4 text-oxidized-teal/90 font-inter">
            <p className="text-lg leading-relaxed">
              Thank you for confirming your email address. You are now subscribed to the 
              <strong className="text-oxidized-teal"> Inventor's Guild newsletter</strong> and will receive updates about:
            </p>
            
            {/* Feature list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="flex items-center space-x-2 bg-brass/10 rounded-lg p-3">
                <Sparkles className="w-5 h-5 text-brass" />
                <span className="text-sm font-medium">Steampunk Fairy Tales</span>
              </div>
              <div className="flex items-center space-x-2 bg-brass/10 rounded-lg p-3">
                <Mail className="w-5 h-5 text-brass" />
                <span className="text-sm font-medium">Workshop Videos</span>
              </div>
              <div className="flex items-center space-x-2 bg-brass/10 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-brass" />
                <span className="text-sm font-medium">Exclusive Adventures</span>
              </div>
            </div>

            <p className="text-lg font-medium text-oxidized-teal">
              Keep your goggles polished and your gears turning – magical updates are heading your way!
            </p>
          </div>

          {/* Signature */}
          <div className="relative z-10 mt-8 pt-6 border-t-2 border-brass/30">
            <p className="text-oxidized-teal/80 italic">
              With clockwork wishes,<br />
              <strong className="text-oxidized-teal text-lg">Nika Vereskova</strong><br />
              <em className="text-sm">Chief Inventor & Storyteller</em>
            </p>
          </div>

          {/* Action buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={() => navigate('/')}
              className="bg-brass hover:bg-brass-dark text-parchment px-6 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-inter font-medium"
            >
              Return to Home
            </Button>
            <Button 
              onClick={() => navigate('/books')}
              variant="outline"
              className="border-2 border-brass text-oxidized-teal hover:bg-brass/10 px-6 py-3 font-inter font-medium"
            >
              Explore Stories
            </Button>
          </div>
        </div>

        {/* Additional info card */}
        <div className="mt-6 bg-oxidized-teal/10 border border-oxidized-teal/30 rounded-lg p-4 text-center">
          <p className="text-sm text-oxidized-teal/80 font-inter">
            <strong>What's Next?</strong> You'll receive your first newsletter within the next few days. 
            Make sure to check your spam folder and add us to your contacts!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterConfirmed;
