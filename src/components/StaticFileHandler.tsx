import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface StaticFileHandlerProps {
  fileName: string;
}

const StaticFileHandler: React.FC<StaticFileHandlerProps> = ({ fileName }) => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStaticFile = async () => {
      try {
        const response = await fetch(`/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileName}: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
        
        // Set proper content type for XML files
        if (fileName.endsWith('.xml')) {
          document.head.querySelector('meta[http-equiv="Content-Type"]')?.remove();
          const meta = document.createElement('meta');
          meta.setAttribute('http-equiv', 'Content-Type');
          meta.setAttribute('content', 'application/xml; charset=utf-8');
          document.head.appendChild(meta);
        }
      } catch (err) {
        console.error('Error fetching static file:', err);
        setError(`Error loading ${fileName}`);
      }
    };

    fetchStaticFile();
  }, [fileName]);

  // For XML files, serve as plain text with XML content type
  if (fileName.endsWith('.xml')) {
    useEffect(() => {
      if (content) {
        // Replace the entire document content with XML
        document.open();
        document.write(content);
        document.close();
      }
    }, [content]);

    return null;
  }

  // For other static files, display content
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">File Not Found</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <pre className="whitespace-pre-wrap font-mono text-sm">{content}</pre>
    </div>
  );
};

export default StaticFileHandler;