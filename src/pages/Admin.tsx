
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Send, Users, Mail, Lock } from 'lucide-react';
import { User } from '@supabase/supabase-js';

const Admin = () => {
 const [subject, setSubject] = useState('');
 const [content, setContent] = useState('');
 const [isSending, setIsSending] = useState(false);
 const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
 const [user, setUser] = useState<User | null>(null);
 const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const { toast } = useToast();

 // Check authentication and admin status
 useEffect(() => {
 const checkAuth = async () => {
 try {
 const { data: { session } } = await supabase.auth.getSession();
 
 if (!session?.user) {
 setUser(null);
 setIsAdmin(false);
 setIsLoading(false);
 return;
 }

 setUser(session.user);

 // Check if user has admin role
 const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
 _user_id: session.user.id,
 _role: 'admin'
 });

 if (error) {
 console.error('Error checking admin role:', error);
 setIsAdmin(false);
 } else {
 setIsAdmin(hasAdminRole || false);
 }
 } catch (error) {
 console.error('Auth check error:', error);
 setIsAdmin(false);
 } finally {
 setIsLoading(false);
 }
 };

 checkAuth();

 // Listen for auth changes
 const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
 if (session?.user) {
 setUser(session.user);
 checkAuth();
 } else {
 setUser(null);
 setIsAdmin(false);
 setIsLoading(false);
 }
 });

 return () => subscription.unsubscribe();
 }, []);

 // Load subscriber count on component mount (only if admin)
 useEffect(() => {
 if (isAdmin) {
 const loadSubscriberCount = async () => {
 try {
 const { count, error } = await supabase
 .from('newsletter_subscribers')
 .select('*', { count: 'exact', head: true })
 .eq('is_active', true);

 if (error) throw error;
 setSubscriberCount(count || 0);
 } catch (error) {
 console.error('Error loading subscriber count:', error);
 }
 };

 loadSubscriberCount();
 }
 }, [isAdmin]);

 const handleSendNewsletter = async (e: React.FormEvent) => {
 e.preventDefault();
 
 if (!subject.trim() || !content.trim()) {
 toast({
 title: 'Missing Information',
 description: 'Please provide both subject and content for the newsletter.',
 variant: 'destructive'
 });
 return;
 }

 setIsSending(true);

 try {
 const { data: { session } } = await supabase.auth.getSession();
 
 if (!session) {
 toast({
 title: 'Authentication Required',
 description: 'Please sign in to send newsletters.',
 variant: 'destructive'
 });
 return;
 }

 const { data, error } = await supabase.functions.invoke('send-newsletter', {
 body: {
 subject: subject.trim(),
 content: content.trim(),
 },
 headers: {
 Authorization: `Bearer ${session.access_token}`
 }
 });

 if (error) throw error;

 toast({
 title: 'Newsletter Sent!',
 description: `Successfully sent to ${data.sent_count} subscribers.`,
 duration: 8000,
 });

 // Clear form
 setSubject('');
 setContent('');

 } catch (error: unknown) {
 const err = error instanceof Error ? error : new Error('Unknown error');
 console.error('Error sending newsletter:', err);
 toast({
 title: 'Failed to Send',
 description: err.message || 'An error occurred while sending the newsletter.',
 variant: 'destructive'
 });
 } finally {
 setIsSending(false);
 }
 };

 const handleSignIn = async () => {
 try {
 const { error } = await supabase.auth.signInWithPassword({
 email: prompt('Enter your email:') || '',
 password: prompt('Enter your password:') || ''
 });

 if (error) {
 toast({
 title: 'Sign In Failed',
 description: error.message,
 variant: 'destructive'
 });
 }
 } catch (error: unknown) {
 const err = error instanceof Error ? error : new Error('Unknown error');
 toast({
 title: 'Sign In Error',
 description: err.message || 'An error occurred during sign in.',
 variant: 'destructive'
 });
 }
 };

 // Loading state
 if (isLoading) {
 return (
 <div className="min-h-screen bg-parchment bg-gear-pattern">
 <Navigation currentPage="admin" />
 <div className="pt-24 pb-16 px-6">
 <div className="container mx-auto max-w-4xl">
 <div className="text-center">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brass mx-auto"></div>
 <p className="text-oxidized-teal mt-4 ">Loading...</p>
 </div>
 </div>
 </div>
 </div>
 );
 }

 // Not authenticated
 if (!user) {
 return (
 <div className="min-h-screen bg-parchment bg-gear-pattern">
 <Navigation currentPage="admin" />
 <div className="pt-24 pb-16 px-6">
 <div className="container mx-auto max-w-4xl">
 <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop">
 <CardHeader className="text-center">
 <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop flex items-center justify-center">
 <Lock className="mr-2 h-6 w-6" />
 Authentication Required
 </CardTitle>
 <CardDescription className="text-oxidized-teal/80 ">
 Please sign in to access the admin panel
 </CardDescription>
 </CardHeader>
 <CardContent className="text-center">
 <Button
 onClick={handleSignIn}
 className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-medium"
 >
 Sign In
 </Button>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
 }

 // Not admin
 if (!isAdmin) {
 return (
 <div className="min-h-screen bg-parchment bg-gear-pattern">
 <Navigation currentPage="admin" />
 <div className="pt-24 pb-16 px-6">
 <div className="container mx-auto max-w-4xl">
 <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop">
 <CardHeader className="text-center">
 <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop flex items-center justify-center">
 <Lock className="mr-2 h-6 w-6" />
 Access Denied
 </CardTitle>
 <CardDescription className="text-oxidized-teal/80 ">
 You don't have permission to access the admin panel
 </CardDescription>
 </CardHeader>
 <CardContent className="text-center">
 <p className="text-oxidized-teal/70 ">
 Only administrators can access this page. If you believe this is an error, please contact the site administrator.
 </p>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
 }

 // Admin user - show full admin panel
 return (
 <div className="min-h-screen bg-parchment bg-gear-pattern">
 <Navigation currentPage="admin" />

 <div className="pt-24 pb-16 px-6">
 <div className="container mx-auto max-w-4xl">
 {/* Header */}
 <div className="text-center mb-12">
 <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
 Newsletter Admin
 </h1>
 <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto ">
 Send updates to your Inventor's Guild subscribers
 </p>
 </div>

 {/* Stats Card */}
 <div className="mb-8">
 <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop">
 <CardHeader>
 <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
 <Users className="mr-2 h-5 w-5" />
 Subscriber Statistics
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex items-center gap-2">
 <Mail className="h-4 w-4 text-brass" />
 <span className=" text-oxidized-teal">
 Active Subscribers: <strong>{subscriberCount !== null ? subscriberCount : 'Loading...'}</strong>
 </span>
 </div>
 </CardContent>
 </Card>
 </div>

 {/* Newsletter Form */}
 <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop relative">
 {/* Ornate brass corners */}
 <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
 <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
 <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
 <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
 
 <CardHeader>
 <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop flex items-center">
 <Send className="mr-2 h-6 w-6" />
 Compose Newsletter
 </CardTitle>
 <CardDescription className="text-oxidized-teal/80 ">
 Create and send a newsletter to all active subscribers
 </CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleSendNewsletter} className="space-y-6">
 <div>
 <label htmlFor="subject" className="block text-oxidized-teal font-medium mb-2">
 Subject Line
 </label>
 <Input
 id="subject"
 type="text"
 value={subject}
 onChange={(e) => setSubject(e.target.value)}
 placeholder="Enter newsletter subject..."
 disabled={isSending}
 className="w-full px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow "
 maxLength={100}
 />
 </div>

 <div>
 <label htmlFor="content" className="block text-oxidized-teal font-medium mb-2">
 Newsletter Content
 </label>
 <Textarea
 id="content"
 value={content}
 onChange={(e) => setContent(e.target.value)}
 placeholder="Write your newsletter content here..."
 disabled={isSending}
 className="w-full px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow min-h-[200px]"
 maxLength={5000}
 />
 <p className="text-sm text-oxidized-teal/60 mt-1 ">
 {content.length}/5000 characters
 </p>
 </div>

 <Button
 type="submit"
 disabled={isSending || !subject.trim() || !content.trim()}
 className="w-full bg-brass hover:bg-brass-dark text-parchment px-8 py-4 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-medium disabled:opacity-50 text-lg"
 >
 {isSending ? (
 <>
 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-parchment mr-2"></div>
 Sending Newsletter...
 </>
 ) : (
 <>
 <Send className="mr-2 h-5 w-5" />
 Send to {subscriberCount || 0} Subscribers
 </>
 )}
 </Button>
 </form>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
};

export default Admin;
