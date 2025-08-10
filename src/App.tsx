
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import LocaleRouter from "@/components/LocaleRouter";
const Index = React.lazy(() => import("./pages/Index"));
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const AIServices = React.lazy(() => import("./pages/AIServices"));
const AINews = React.lazy(() => import("./pages/AINews"));
const Books = React.lazy(() => import("./pages/Books"));
const Videos = React.lazy(() => import("./pages/Videos"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Admin = React.lazy(() => import("./pages/Admin"));
const Newsletter = React.lazy(() => import("./pages/Newsletter"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Terms = React.lazy(() => import("./pages/Terms"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Moved = React.lazy(() => import("./pages/Moved"));
const NewsletterConfirmed = React.lazy(() => import("./pages/NewsletterConfirmed"));

const queryClient = new QueryClient();

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HelmetProvider>
          <BrowserRouter>
          <LocaleRouter>
            <Routes>
              {/* Root route - will be handled by LocaleRouter */}
              <Route path="/" element={withSuspense(Index)} />

              {/* Newsletter confirmation route - standalone, no locale handling */}
              <Route path="/newsletter-confirmed" element={withSuspense(NewsletterConfirmed)} />

              {/* Locale-prefixed routes */}
              <Route path="/:locale" element={withSuspense(Index)} />
              <Route path="/:locale/about" element={withSuspense(About)} />
              <Route path="/:locale/services" element={withSuspense(Services)} />
              <Route path="/:locale/ai-services" element={withSuspense(AIServices)} />
              <Route path="/:locale/ai-news" element={withSuspense(AINews)} />
              <Route path="/:locale/books" element={withSuspense(Books)} />
              <Route path="/:locale/videos" element={withSuspense(Videos)} />
              <Route path="/:locale/blog" element={withSuspense(Blog)} />
              <Route path="/:locale/contact" element={withSuspense(Contact)} />
              <Route path="/:locale/admin" element={withSuspense(Admin)} />
              <Route path="/:locale/newsletter" element={withSuspense(Newsletter)} />
              <Route path="/:locale/privacy" element={withSuspense(Privacy)} />
              <Route path="/:locale/terms" element={withSuspense(Terms)} />
              <Route path="/:locale/moved" element={withSuspense(Moved)} />

              {/* Non-localized routes for backward compatibility */}
              <Route path="/about" element={withSuspense(About)} />
              <Route path="/services" element={withSuspense(Services)} />
              <Route path="/ai-services" element={withSuspense(AIServices)} />
              <Route path="/ai-news" element={withSuspense(AINews)} />
              <Route path="/books" element={withSuspense(Books)} />
              <Route path="/videos" element={withSuspense(Videos)} />
              <Route path="/blog" element={withSuspense(Blog)} />
              <Route path="/contact" element={withSuspense(Contact)} />
              <Route path="/admin" element={withSuspense(Admin)} />
              <Route path="/newsletter" element={withSuspense(Newsletter)} />
              <Route path="/privacy" element={withSuspense(Privacy)} />
              <Route path="/terms" element={withSuspense(Terms)} />
              <Route path="/moved" element={withSuspense(Moved)} />

              {/* Catch all for 404 */}
              <Route path="*" element={withSuspense(NotFound)} />
            </Routes>
          </LocaleRouter>
        </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
