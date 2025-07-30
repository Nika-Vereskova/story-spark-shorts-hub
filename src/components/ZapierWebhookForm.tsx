import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput } from '@/lib/security';

const ZapierWebhookForm: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateWebhookUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      // Only allow HTTPS webhooks from zapier.com
      return parsedUrl.protocol === 'https:' && 
             parsedUrl.hostname.endsWith('zapier.com');
    } catch {
      return false;
    }
  };

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedUrl = sanitizeInput(webhookUrl);
    
    if (!sanitizedUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateWebhookUrl(sanitizedUrl)) {
      toast({
        title: "Error", 
        description: "Please enter a valid Zapier webhook URL (must be HTTPS and from zapier.com)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    if (process.env.NODE_ENV === 'development') {
      console.log("Triggering Zapier webhook:", sanitizedUrl);
    }

    try {
      const response = await fetch(sanitizedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Request Sent",
        description: "The request was sent to Zapier. Please check your Zap's history to confirm it was triggered.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
        <Input
          id="webhook-url"
          type="url"
          placeholder="https://hooks.zapier.com/hooks/catch/..."
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button 
        onClick={handleTrigger} 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Sending..." : "Trigger Zapier Webhook"}
      </Button>
    </div>
  );
};

export default ZapierWebhookForm;