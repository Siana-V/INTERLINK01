import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { initializeStorage } from "@/lib/storage";
import { useRole } from "@/hooks/use-interlink";
import { Header } from "@/components/layout/Header";

// Pages
import { RoleSelection } from "@/pages/RoleSelection";
import { StudentHome } from "@/pages/StudentHome";
import { StudentConnect } from "@/pages/StudentConnect";
import { StudentPosts } from "@/pages/StudentPosts";
import { StudentReviews } from "@/pages/StudentReviews";
import { StudentContact } from "@/pages/StudentContact";
import { ProfessionalDetails } from "@/pages/ProfessionalDetails";
import { IndustryHome } from "@/pages/IndustryHome";
import { IndustryPosts } from "@/pages/IndustryPosts";
import { IndustryProfile } from "@/pages/IndustryProfile";
import { IndustryLogin } from "@/pages/IndustryLogin";
import { ChatAssistant } from "@/pages/ChatAssistant";

const queryClient = new QueryClient();

// Route Protection Component
function ProtectedRoute({ component: Component, allowedRole, ...rest }: any) {
  const { role } = useRole();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (role !== undefined && role !== allowedRole) {
      setLocation("/");
    }
  }, [role, allowedRole, setLocation]);

  if (role === allowedRole) {
    return <Component {...rest} />;
  }
  return null;
}

function Router() {
  const { role } = useRole();
  const [location, setLocation] = useLocation();

  // Root redirect logic
  useEffect(() => {
    if (location === "/" && role) {
      setLocation(role === "student" ? "/student" : "/industry");
    }
  }, [location, role, setLocation]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={RoleSelection} />
        
        {/* Student Routes */}
        <Route path="/student">
          {() => <ProtectedRoute component={StudentHome} allowedRole="student" />}
        </Route>
        <Route path="/student/connect">
          {() => <ProtectedRoute component={StudentConnect} allowedRole="student" />}
        </Route>
        <Route path="/student/posts">
          {() => <ProtectedRoute component={StudentPosts} allowedRole="student" />}
        </Route>
        <Route path="/student/reviews">
          {() => <ProtectedRoute component={StudentReviews} allowedRole="student" />}
        </Route>
        <Route path="/student/assistant">
          {() => <ProtectedRoute component={ChatAssistant} allowedRole="student" />}
        </Route>
        <Route path="/student/contact">
          {() => <ProtectedRoute component={StudentContact} allowedRole="student" />}
        </Route>
        <Route path="/student/professional/:id">
          {() => <ProtectedRoute component={ProfessionalDetails} allowedRole="student" />}
        </Route>

        {/* Industry Routes */}
        <Route path="/industry/login" component={IndustryLogin} />
        <Route path="/industry">
          {() => <ProtectedRoute component={IndustryHome} allowedRole="industry" />}
        </Route>
        <Route path="/industry/posts">
          {() => <ProtectedRoute component={IndustryPosts} allowedRole="industry" />}
        </Route>
        <Route path="/industry/profile">
          {() => <ProtectedRoute component={IndustryProfile} allowedRole="industry" />}
        </Route>

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    // Clear the active role context on any hard page refresh
    localStorage.removeItem("interlink_role");
    initializeStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
