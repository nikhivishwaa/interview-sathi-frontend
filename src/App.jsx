import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Added by nikhlesh
// import Index from "./pages/Index";

import Index from "./screens/Index";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ScheduleInterviewScreen from "./screens/ScheduleInterviewScreen";
import InterviewScreen from "./screens/InterviewScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./screens/NotFound";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import TermsScreen from "./screens/TermsScreen";
import Dashboard from "./screens/Dashboard";
import { InterviewProvider } from "./context/InterviewContext";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <InterviewProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordScreen />}
                />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPasswordScreen />}
                />
                <Route path="/about" element={<AboutScreen />} />
                <Route path="/contact" element={<ContactScreen />} />
                <Route path="/privacy" element={<PrivacyScreen />} />
                <Route path="/terms" element={<TermsScreen />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  {/* <Route path="/dashboard" element={<DashboardScreen />} /> */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/interviews/schedule"
                    element={<ScheduleInterviewScreen />}
                  />
                  <Route path="/interviews/:id" element={<InterviewScreen />} />
                  <Route path="/feedback/:id" element={<FeedbackScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                </Route>

                {/* Catch-all Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </InterviewProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
