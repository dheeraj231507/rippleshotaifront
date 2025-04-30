import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Login from "./components/Auth/login/Login";
import SignIn from "./components/Auth/signin/SignIn";
import DashBoard from "./components/Dashboard/DashBoard";
import LandingPage from "./components/Landingpage/LandingPage";
import Review from "./components/Review/Review";
import Uploaded from "./components/Upload/Upload";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshTokenThunk } from "./features/auth/auth.thunk";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Gallery from "./components/Gallery/Gallery";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(refreshTokenThunk());
      } catch (error) {
        console.log("Authentication initialization failed:", error);
      }
    };

    if (isAuthenticated === null) {
      initializeAuth();
    }
  }, [dispatch, isAuthenticated]);
  return (
    <div className="bg-black min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute>
              <Review />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Uploaded />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
