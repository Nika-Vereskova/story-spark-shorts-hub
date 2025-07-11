
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Books from "./pages/Books";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import VisitorCounter from "./components/VisitorCounter";
import LocaleRouter from "./components/LocaleRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LocaleRouter>
          <Routes>
            {/* Locale-prefixed routes */}
            <Route path="/:locale" element={<Index />} />
            <Route path="/:locale/books" element={<Books />} />
            <Route path="/:locale/videos" element={<Videos />} />
            <Route path="/:locale/about" element={<About />} />
            <Route path="/:locale/blog" element={<Blog />} />
            <Route path="/:locale/contact" element={<Contact />} />
            
            {/* Root route - will be redirected by LocaleRouter */}
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<Books />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <VisitorCounter />
        </LocaleRouter>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
