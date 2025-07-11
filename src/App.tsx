
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Books from "./pages/Books";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import VisitorCounter from "./components/VisitorCounter";
import LocaleRouter from "./components/LocaleRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <LocaleRouter>
            <Routes>
              {/* Auth route - accessible to everyone */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes - only for admins */}
              <Route path="/:locale" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/:locale/books" element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              } />
              <Route path="/:locale/videos" element={
                <ProtectedRoute>
                  <Videos />
                </ProtectedRoute>
              } />
              <Route path="/:locale/about" element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } />
              <Route path="/:locale/blog" element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              } />
              <Route path="/:locale/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
              
              {/* Root route - will be redirected by LocaleRouter */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/books" element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              } />
              <Route path="/videos" element={
                <ProtectedRoute>
                  <Videos />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } />
              <Route path="/blog" element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <VisitorCounter />
          </LocaleRouter>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
