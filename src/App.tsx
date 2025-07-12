
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
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/clockwork-adventures" element={<Moved />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LocaleRouter>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
