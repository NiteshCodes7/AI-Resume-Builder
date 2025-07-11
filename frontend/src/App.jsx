import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import ResumeEditor from "./pages/ResumeEditor";
import { ResumeInfoProvider } from "./context/ResumeInfoContext";
import { Toaster } from "@/components/ui/sonner"
import ResumeView from "./pages/ResumeView";
import { Loader } from "lucide-react";
import ResumeOptimizer from "./pages/ResumeOptimizer";



function App() {
  const { user, isLoaded, isSignedIn } = useUser();

if (!isLoaded)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader className="animate-spin w-8 h-8 text-gray-600" />
    </div>
  );

  
  return (
    <Router>
      <Toaster />
      <Header />

      <Routes>
        <Route 
          path="auth-sign-in" 
          element={<SignInPage />}
        />

        <Route 
          path="/" 
          element={<HomePage />} 
        />

        <Route 
          path="/dashboard" 
          element={isSignedIn ? <Dashboard /> : <Navigate to={"/auth-sign-in"} />} 
        />

        <Route 
          path="/dashboard/resume/:_id/edit" 
          element={
            <ResumeInfoProvider>
              <ResumeEditor />
            </ResumeInfoProvider>
          } 
        />

        <Route 
          path="/dashboard/resume/:_id/view" 
          element={
            <ResumeInfoProvider>
              <ResumeView />
            </ResumeInfoProvider>
          } 
        />

      </Routes>

    </Router>
  );
}

export default App;
