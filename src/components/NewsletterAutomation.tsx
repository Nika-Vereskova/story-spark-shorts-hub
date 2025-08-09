import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clock, Zap, Mail, Calendar, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput } from '@/lib/security';

const NewsletterAutomation: React.FC = () => {
 const [zapierWebhookUrl, setZapierWebhookUrl] = useState('');
 const [isGenerating, setIsGenerating] = useState(false);
 const [isSettingUp, setIsSettingUp] = useState(false);
 const { toast } = useToast();

 const validateWebhookUrl = (url: string): boolean => {
 try {
 const parsedUrl = new URL(url);
 return parsedUrl.protocol === 'https:' && 
 parsedUrl.hostname.endsWith('zapier.com');
 } catch {
 return false;
 }
 };

 const handleTestGeneration = async () => {
 setIsGenerating(true);
 
 try {
 const { data, error } = await supabase.functions.invoke('generate-newsletter', {
 body: { 
 triggerZapier: false 
 }
 });

 if (error) throw error;

 toast({
 title: "Newsletter Generated! 📧",
 description: "Preview generated successfully. Check console for details.",
 });

 console.log("Generated Newsletter:", data);
 } catch (error) {
 console.error("Error generating newsletter:", error);
 toast({
 title: "Error",
 description: "Failed to generate newsletter. Please try again.",
 variant: "destructive",
 });
 } finally {
 setIsGenerating(false);
 }
 };

 const handleSetupAutomation = async () => {
 const sanitizedUrl = sanitizeInput(zapierWebhookUrl);
 
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

 setIsSettingUp(true);

 try {
 // Test the webhook with a sample newsletter
 const { data, error } = await supabase.functions.invoke('generate-newsletter', {
 body: { 
 triggerZapier: true,
 zapierWebhookUrl: sanitizedUrl
 }
 });

 if (error) throw error;

 toast({
 title: "Automation Setup Complete! 🎉",
 description: "Your Zapier webhook has been tested successfully. Set up the weekly schedule in Zapier.",
 });

 console.log("Automation test result:", data);
 } catch (error) {
 console.error("Error setting up automation:", error);
 toast({
 title: "Error",
 description: "Failed to setup automation. Please check your webhook URL.",
 variant: "destructive",
 });
 } finally {
 setIsSettingUp(false);
 }
 };

 return (
 <div className="space-y-6">
 {/* Header */}
 <Card className="bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass">
 <CardHeader>
 <CardTitle className="text-2xl text-oxidized-teal flex items-center font-playfair">
 <Clock className="mr-3 h-6 w-6" />
 Weekly Newsletter Automation
 </CardTitle>
 <CardDescription className="text-oxidized-teal/80 ">
 Automate your weekly AI-powered newsletter with Zapier integration
 </CardDescription>
 </CardHeader>
 </Card>

 {/* Features Overview */}
 <div className="grid md:grid-cols-3 gap-4">
 <Card className="bg-parchment/90 border-2 border-brass">
 <CardContent className="p-6 text-center">
 <Mail className="w-12 h-12 text-brass mx-auto mb-3" />
 <h3 className="font-semibold text-oxidized-teal mb-2 font-playfair">AI-Generated Content</h3>
 <p className="text-sm text-oxidized-teal/80 ">
 Automatically includes latest AI news, YouTube highlights, and weekly tips
 </p>
 </CardContent>
 </Card>

 <Card className="bg-parchment/90 border-2 border-brass">
 <CardContent className="p-6 text-center">
 <Calendar className="w-12 h-12 text-brass mx-auto mb-3" />
 <h3 className="font-semibold text-oxidized-teal mb-2 font-playfair">Weekly Schedule</h3>
 <p className="text-sm text-oxidized-teal/80 ">
 Sends every Tuesday at 09:00 AM to your subscriber list
 </p>
 </CardContent>
 </Card>

 <Card className="bg-parchment/90 border-2 border-brass">
 <CardContent className="p-6 text-center">
 <Zap className="w-12 h-12 text-brass mx-auto mb-3" />
 <h3 className="font-semibold text-oxidized-teal mb-2 font-playfair">Zapier Integration</h3>
 <p className="text-sm text-oxidized-teal/80 ">
 Connects to MailerLite, Mailchimp, Gmail, or any email platform
 </p>
 </CardContent>
 </Card>
 </div>

 {/* Newsletter Preview */}
 <Card className="bg-parchment/90 border-2 border-brass">
 <CardHeader>
 <CardTitle className="text-oxidized-teal font-playfair">Newsletter Preview & Testing</CardTitle>
 <CardDescription className="">
 Generate a test newsletter to see what your subscribers will receive
 </CardDescription>
 </CardHeader>
 <CardContent>
 <div className="space-y-4">
 <div className="bg-brass/10 p-4 rounded border border-brass/30">
 <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Newsletter Includes:</h4>
 <ul className="text-sm text-oxidized-teal/80 space-y-1 ">
 <li>• Latest AI news and insights from your website</li>
 <li>• YouTube video highlights and behind-the-scenes content</li>
 <li>• Book updates and new story announcements</li>
 <li>• Weekly AI tip or storytelling advice</li>
 <li>• Call-to-action buttons with your brand styling</li>
 </ul>
 </div>
 
 <Button 
 onClick={handleTestGeneration}
 disabled={isGenerating}
 className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment "
 >
 {isGenerating ? "Generating..." : "Generate Test Newsletter"}
 </Button>
 </div>
 </CardContent>
 </Card>

 {/* Zapier Setup */}
 <Card className="bg-parchment/90 border-2 border-brass">
 <CardHeader>
 <CardTitle className="text-oxidized-teal flex items-center font-playfair">
 <Settings className="mr-3 h-5 w-5" />
 Zapier Automation Setup
 </CardTitle>
 <CardDescription className="">
 Connect your Zapier webhook to automate newsletter delivery
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="bg-brass/10 p-4 rounded border border-brass/30">
 <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Setup Instructions:</h4>
 <ol className="text-sm text-oxidized-teal/80 space-y-1 list-decimal list-inside">
 <li>Create a new Zap in Zapier</li>
 <li>Set trigger: "Webhooks by Zapier" → "Catch Hook"</li>
 <li>Copy the webhook URL and paste it below</li>
 <li>Set action: Your email platform (MailerLite, Mailchimp, etc.)</li>
 <li>Schedule: Every Tuesday at 09:00 AM</li>
 <li>Test the setup using the button below</li>
 </ol>
 </div>

 <div className="space-y-4">
 <div>
 <Label htmlFor="zapier-webhook" className="">Zapier Webhook URL</Label>
 <Input
 id="zapier-webhook"
 type="url"
 placeholder="https://hooks.zapier.com/hooks/catch/..."
 value={zapierWebhookUrl}
 onChange={(e) => setZapierWebhookUrl(e.target.value)}
 className="mt-1 "
 />
 </div>
 
 <Button 
 onClick={handleSetupAutomation}
 disabled={isSettingUp || !zapierWebhookUrl}
 className="w-full bg-brass hover:bg-brass-dark text-parchment "
 >
 {isSettingUp ? "Testing Webhook..." : "Test & Setup Automation"}
 </Button>
 </div>
 </CardContent>
 </Card>

 {/* Brand Guidelines */}
 <Card className="bg-parchment/90 border-2 border-brass">
 <CardHeader>
 <CardTitle className="text-oxidized-teal font-playfair">Brand Styling</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Colors</h4>
 <div className="space-y-2 text-sm ">
 <div className="flex items-center gap-2">
 <div className="w-4 h-4 bg-[#8b7355] border"></div>
 <span>Brass: #8b7355</span>
 </div>
 <div className="flex items-center gap-2">
 <div className="w-4 h-4 bg-[#2c5530] border"></div>
 <span>Oxidized Teal: #2c5530</span>
 </div>
 </div>
 </div>
 <div>
 <h4 className="font-semibold text-oxidized-teal mb-2 font-playfair">Typography</h4>
 <div className="space-y-1 text-sm ">
 <p>Headers: Playfair Display</p>
            <p>Body: Playfair Display</p>
 <p>Style: Steampunk elegance</p>
 </div>
 </div>
 </div>
 </CardContent>
 </Card>
 </div>
 );
};

export default NewsletterAutomation;