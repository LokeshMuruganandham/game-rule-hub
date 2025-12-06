
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAnalyticsTracking } from "@/hooks/useAnalytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GamesListPage from "./pages/GamesListPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import CategoriesListPage from "./pages/CategoriesListPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

// Create query client outside of component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Analytics wrapper component
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useAnalyticsTracking();
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsWrapper>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/games" element={<GamesListPage />} />
                <Route path="/games/:id" element={<GameDetailsPage />} />
                <Route path="/categories" element={<CategoriesListPage />} />
                <Route path="/categories/:id" element={<CategoryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnalyticsWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
