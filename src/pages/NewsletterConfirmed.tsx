
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const NewsletterConfirmed = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'success';
  const message = searchParams.get('message');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brass border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-600',
          title: 'Email Confirmed Successfully! ⚙️',
          description: 'Thank you for confirming your email address. You are now subscribed to the Inventor\'s Guild newsletter and will receive updates about new steampunk fairy tales, workshop videos, and exclusive clockwork adventures.',
          additionalText: 'Keep your goggles polished and your gears turning – magical updates are heading your way!'
        };
      case 'already_confirmed':
        return {
          icon: AlertCircle,
          iconColor: 'text-amber-600',
          title: 'Already Confirmed',
          description: 'This email is already confirmed or the link has already been used. You\'re all set to receive our clockwork adventures!',
          additionalText: null
        };
      case 'invalid':
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          title: 'Invalid Confirmation Link',
          description: message || 'The confirmation link is invalid or has expired. Please try subscribing again or contact us if you continue to have issues.',
          additionalText: null
        };
      default:
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          title: 'Confirmation Error',
          description: message || 'An error occurred while confirming your subscription. Please try again or contact support.',
          additionalText: null
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment via-gear-etch to-parchment flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-2 border-brass shadow-brass-drop">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <IconComponent className={`w-16 h-16 ${config.iconColor}`} />
          </div>
          <CardTitle className="text-3xl font-playfair text-oxidized-teal mb-4">
            {config.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-oxidized-teal leading-relaxed font-playfair">
            {config.description}
          </p>
          
          {config.additionalText && (
            <p className="text-base text-oxidized-teal/80 italic font-playfair">
              {config.additionalText}
            </p>
          )}
          
          {status === 'success' && (
            <div className="bg-brass/10 rounded-lg p-4 border border-brass/20">
              <p className="text-sm text-oxidized-teal font-playfair">
                <strong>What's next?</strong> You'll receive updates about:
              </p>
              <ul className="text-sm text-oxidized-teal mt-2 space-y-1 font-playfair">
                <li>📚 New steampunk fairy tales</li>
                <li>🎬 Workshop videos and behind-the-scenes content</li>
                <li>⚙️ Exclusive clockwork adventures and activities</li>
                <li>🎁 Special surprises and downloadable content</li>
              </ul>
            </div>
          )}
          
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-brass hover:bg-brass-dark text-white font-semibold px-8 py-3 rounded-lg shadow-brass-drop transition-all duration-200 hover:shadow-lg"
            >
              <Link to="/">
                Return to Inventor's Guild
              </Link>
            </Button>
            <Button
              asChild
              className="bg-brass hover:bg-brass-dark text-white font-semibold px-8 py-3 rounded-lg shadow-brass-drop transition-all duration-200 hover:shadow-lg"
            >
              <Link to="/stories">
                Explore Stories
              </Link>
            </Button>
          </div>
          
          <div className="pt-4 border-t border-brass/20">
            <p className="text-sm text-oxidized-teal/70 italic font-playfair">
              With clockwork wishes,<br />
              <strong>Nika Vereskova</strong><br />
              <em>Chief Inventor & Storyteller</em>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterConfirmed;
