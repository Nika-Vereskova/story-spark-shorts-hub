
import React from 'react';
import { CheckCircle, Mail, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { t } from '@/lib/i18n';

const NewsletterConfirmed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const success = searchParams.get('success') === 'true';
  const error = searchParams.get('error');

  // Determine the state and content based on URL parameters
  const getPageContent = () => {
    if (success) {
      return {
        icon: <CheckCircle className="w-12 h-12 text-green-600" />,
        iconBg: "bg-green-100 border-2 border-green-500",
        title: "Email Confirmed Successfully! ⚙️",
        subtitle: "Welcome to the Inventor's Guild!",
        message: "Thank you for confirming your email address. You are now subscribed to the Inventor's Guild newsletter and will receive updates about:",
        showFeatures: true,
        status: 200
      };
    }

    // Handle different error types
    switch (error) {
      case 'missing_token':
        return {
          icon: <AlertCircle className="w-12 h-12 text-amber-600" />,
          iconBg: "bg-amber-100 border-2 border-amber-500",
          title: "Invalid Confirmation Link",
          subtitle: "Something's not quite right",
          message: "The confirmation link appears to be incomplete or corrupted. Please check your email and try clicking the link again.",
          showFeatures: false,
          showResubscribe: true,
          status: 400
        };
      case 'invalid_token':
        return {
          icon: <AlertCircle className="w-12 h-12 text-blue-600" />,
          iconBg: "bg-blue-100 border-2 border-blue-500",
          title: "Already Confirmed",
          subtitle: "You're all set!",
          message: "This email address has already been confirmed, or the confirmation link has expired. If you're not receiving our newsletters, please contact us for assistance.",
          showFeatures: false,
          showResubscribe: true,
          status: 200
        };
      case 'database_error':
      case 'server_error':
      default:
        return {
          icon: <RefreshCw className="w-12 h-12 text-red-600" />,
          iconBg: "bg-red-100 border-2 border-red-500",
          title: "Temporary Issue",
          subtitle: "Please try again",
          message: "We're experiencing a temporary issue with email confirmations. Please try clicking the confirmation link again in a few minutes.",
          showFeatures: false,
          showResubscribe: true,
          status: 500
        };
    }
  };

  const content = getPageContent();

  // Set the document title based on the state
  React.useEffect(() => {
    document.title = content.title;
  }, [content.title]);

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
          
          {/* Status icon */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className={`${content.iconBg} rounded-full p-4`}>
              {content.icon}
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold text-oxidized-teal mb-2 font-playfair drop-shadow-text-drop relative z-10">
            {content.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl font-medium text-oxidized-teal/80 mb-6 font-inter relative z-10">
            {content.subtitle}
          </h2>

          {/* Main message */}
          <div className="relative z-10 space-y-4 text-oxidized-teal/90 font-inter">
            <p className="text-lg leading-relaxed">
              {content.message}
            </p>
            
            {/* Feature list - only show on success */}
            {content.showFeatures && (
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
            )}

            {success && (
              <p className="text-lg font-medium text-oxidized-teal">
                Keep your goggles polished and your gears turning – magical updates are heading your way!
              </p>
            )}
          </div>

          {/* Signature - only show on success */}
          {success && (
            <div className="relative z-10 mt-8 pt-6 border-t-2 border-brass/30">
              <p className="text-oxidized-teal/80 italic">
                With clockwork wishes,<br />
                <strong className="text-oxidized-teal text-lg">Nika Vereskova</strong><br />
                <em className="text-sm">Chief Inventor & Storyteller</em>
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={() => navigate('/')}
              className="bg-brass hover:bg-brass-dark text-parchment px-6 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-inter font-medium"
            >
              Return to Home
            </Button>
            
            {success ? (
              <Button 
                onClick={() => navigate('/books')}
                variant="outline"
                className="border-2 border-brass text-oxidized-teal hover:bg-brass/10 px-6 py-3 font-inter font-medium"
              >
                Explore Stories
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="border-2 border-brass text-oxidized-teal hover:bg-brass/10 px-6 py-3 font-inter font-medium"
              >
                Contact Support
              </Button>
            )}
          </div>
        </div>

        {/* Additional info card */}
        <div className="mt-6 bg-oxidized-teal/10 border border-oxidized-teal/30 rounded-lg p-4 text-center">
          {success ? (
            <p className="text-sm text-oxidized-teal/80 font-inter">
              <strong>What's Next?</strong> You'll receive your first newsletter within the next few days. 
              Make sure to check your spam folder and add us to your contacts!
            </p>
          ) : content.showResubscribe ? (
            <p className="text-sm text-oxidized-teal/80 font-inter">
              <strong>Need Help?</strong> If you continue to experience issues, please visit our contact page 
              or try subscribing again with a different email address.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewsletterConfirmed;
