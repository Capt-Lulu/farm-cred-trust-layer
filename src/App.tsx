import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
// import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import OnboardingSteps from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import LenderDashboard from "./pages/LenderDashboard";
import CooperativeDashboard from "./pages/CooperativeDashboard";
import PortalSelection from "./pages/PortalSelection";
import LoanApplication from "./pages/LoanApplication";
import MakePayment from "./pages/MakePayment";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import LearnMore from "./pages/LearnMore";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
   <AuthProvider>
       <TooltipProvider>
         <Toaster />
         <Sonner />
         <BrowserRouter>
           <Routes>
             <Route path="/" element={<Index />} />
             <Route path="/auth" element={<Auth />} />
             <Route path="/onboarding" element={<OnboardingSteps />} />
             <Route path="/portals" element={<PortalSelection />} />
             <Route
              path="/dashboard"
              element={
                // <ProtectedRoute requiredUserType="farmer">
                  <Dashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/lender"
              element={
                // <ProtectedRoute requiredUserType="bank">
                  <LenderDashboard />
                // </ProtectedRoute>
             }
            />
            <Route
              path="/cooperative"
              element={
                // <ProtectedRoute requiredUserType="cooperative">
                  <CooperativeDashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/loan-application"
              element={
                // <ProtectedRoute requiredUserType="farmer">
                  <LoanApplication />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/make-payment"
              element={
                // <ProtectedRoute requiredUserType="farmer">
                  <MakePayment />
                // </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/security" element={<Security />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
