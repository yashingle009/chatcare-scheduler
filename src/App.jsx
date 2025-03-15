
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfessionalsByCategory from "./pages/ProfessionalsByCategory";
import FindProfessionals from "./pages/FindProfessionals";
import ProfessionalDetail from "./pages/ProfessionalDetail";
import ExpertDashboard from "./pages/ExpertDashboard";
import ExpertProfile from "./pages/ExpertProfile";
import ExpertAvailability from "./pages/ExpertAvailability";
import ExpertBookings from "./pages/ExpertBookings";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/professionals/category/:categoryId" element={<ProfessionalsByCategory />} />
            <Route path="/professionals" element={<FindProfessionals />} />
            <Route path="/professional/:professionalId" element={<ProfessionalDetail />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfessionalDetail />
              </ProtectedRoute>
            } />
            <Route path="/expert-dashboard" element={
              <ProtectedRoute>
                <ExpertDashboard />
              </ProtectedRoute>
            } />
            <Route path="/expert-profile" element={
              <ProtectedRoute>
                <ExpertProfile />
              </ProtectedRoute>
            } />
            <Route path="/expert-availability" element={
              <ProtectedRoute>
                <ExpertAvailability />
              </ProtectedRoute>
            } />
            <Route path="/expert-bookings" element={
              <ProtectedRoute>
                <ExpertBookings />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
