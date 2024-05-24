import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import commonRoutes from "./commonRoutes";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../hooks/useAuth";
import AudioTesting from "../pages/Testing";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const CandidateTest = lazy(() => import("../pages/CandidateTest"));
const CandidateInterview = lazy(() => import("../pages/CandidateInterview"));

export default function Routing() {
  const navigate = useNavigate();
  const token = useAuth();

  useEffect(() => {
    const path = window.location.pathname;
    if (!token && !(path === "/candidate-test" || path === "/candidate-interview" || path === "/audio-testing")) {
      navigate("/login");
      console.log(path);
      console.log("no auth token found");
    }
  }, [token, navigate]);

  return (
    <Suspense fallback={<FallBack />}>
      <Routes>
        {commonRoutes.map((route, index) => {
          const { children, ...rest } = route;
          return (
            <Route key={index} {...rest}>
              {children}
            </Route>
          );
        })}
        <Route path="/candidate-test" element={<CandidateTest />} />
        <Route path="/candidate-interview" element={<CandidateInterview />} />
        <Route path="/audio-testing" element={<AudioTesting />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function FallBack() {
  return (
    <CircularProgress
      style={{
        color: "dodgerblue",
        position: "absolute",
        left: "50%",
        top: "50%",
      }}
      size={50}
    />
  );
}
