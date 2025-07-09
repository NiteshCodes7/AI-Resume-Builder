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

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Router>

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
          element={<ResumeEditor />} 
        />

      </Routes>

    </Router>
  );
}

export default App;
