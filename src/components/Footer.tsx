
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-parchment/50 border-t-2 border-brass/50">
      <div className="container mx-auto text-center">
        <p className="text-oxidized-teal/80 font-medium font-inter">© 2024 Nika Vereskova Stories. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a 
            href="https://www.youtube.com/@NikaVereskova" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brass hover:text-brass-dark transition-colors font-inter hover:sepia"
          >
            YouTube
          </a>
          <a 
            href="https://www.instagram.com/vereskovanika" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brass hover:text-brass-dark transition-colors font-inter"
          >
            Instagram
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=61577838015246" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brass hover:text-brass-dark transition-colors font-inter"
          >
            Facebook
          </a>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <Link 
            to="/privacy" 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
