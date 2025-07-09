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



function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

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

      </Routes>

    </Router>
  );
}

export default App;
