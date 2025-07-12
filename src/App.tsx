
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocaleRouter from "@/components/LocaleRouter";
import Index from "./pages/Index";
import About from "./pages/About";
import Books from "./pages/Books";
import Videos from "./pages/Videos";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Moved from "./pages/Moved";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LocaleRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:locale" element={<Index />} />
            <Route path="/:locale/about" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/:locale/books" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/:locale/videos" element={<Videos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/:locale/services" element={<Services />} />
            <Route path="/services" element={<Services />} />
            <Route path="/:locale/blog" element={<Blog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/:locale/contact" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:locale/admin" element={<Admin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/:locale/privacy" element={<Privacy />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/:locale/terms" element={<Terms />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/:locale/clockwork-adventures" element={<Moved />} />
            <Route path="/clockwork-adventures" element={<Moved />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LocaleRouter>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
