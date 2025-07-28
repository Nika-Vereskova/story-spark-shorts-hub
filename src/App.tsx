
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LocaleRouter from "@/components/LocaleRouter";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import AIServices from "./pages/AIServices";
import AINews from "./pages/AINews";
import Books from "./pages/Books";
import Videos from "./pages/Videos";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Moved from "./pages/Moved";
import NewsletterConfirmed from "./pages/NewsletterConfirmed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LocaleRouter>
            <Routes>
              {/* Root route - will be handled by LocaleRouter */}
              <Route path="/" element={<Index />} />
              
              {/* Newsletter confirmation route - standalone, no locale handling */}
              <Route path="/newsletter-confirmed" element={<NewsletterConfirmed />} />
              
              {/* Locale-prefixed routes */}
              <Route path="/:locale" element={<Index />} />
              <Route path="/:locale/about" element={<About />} />
              <Route path="/:locale/services" element={<Services />} />
              <Route path="/:locale/ai-services" element={<AIServices />} />
              <Route path="/:locale/ai-news" element={<AINews />} />
              <Route path="/:locale/books" element={<Books />} />
              <Route path="/:locale/videos" element={<Videos />} />
              <Route path="/:locale/blog" element={<Blog />} />
              <Route path="/:locale/contact" element={<Contact />} />
              <Route path="/:locale/admin" element={<Admin />} />
              <Route path="/:locale/privacy" element={<Privacy />} />
              <Route path="/:locale/terms" element={<Terms />} />
              <Route path="/:locale/moved" element={<Moved />} />
              
              {/* Non-localized routes for backward compatibility */}
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ai-services" element={<AIServices />} />
              <Route path="/ai-news" element={<AINews />} />
              <Route path="/books" element={<Books />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/moved" element={<Moved />} />
              
              {/* Catch all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LocaleRouter>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
