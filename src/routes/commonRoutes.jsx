import Authenticate from "../pages/Authenticate";
import Dashbboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

const commonRoutes = [
  {
    path: "/",
    element: <Dashbboard />,
    children: <></>
  },
  {
    path: "/profile",
    element: <Profile />,
    children: <></>
  },
  {
    path: "/login",
    element: <Authenticate type={"login"} />,
    children: <></>,
  },
  {
    path: "/signup",
    element: <Authenticate type={"signup"}/>,
    children: <></>,
  },
];

export default commonRoutes;
