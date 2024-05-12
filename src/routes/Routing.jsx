import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import commonRoutes from "./commonRoutes";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../hooks/useAuth";

const Dashboard = lazy(() => import("../pages/Dashboard"));

export default function Routing() {
  const navigate = useNavigate();
  const token = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

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
