import Base64AudioPlayer from "../components/elements/audioPlayer";
import Authenticate from "../pages/Authenticate";
import CandidateInterview from "../pages/CandidateInterview";
import CandidateTest from "../pages/CandidateTest";
import Dashbboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import AudioTesting from "../pages/Testing";
import TestingPage from "../pages/Testing";

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
  {
    path: "/testing",
    element: <TestingPage />,
    children: <></>,
  },
  {
    path: "/candidate-test",
    element: <CandidateTest />,
    children: <></>,
  },
  {
    path: "/candidate-interview",
    element: <CandidateInterview />,
    children: <></>,
  },
  {
    path: "/audio-testing",
    // element: <Base64AudioPlayer />,
    element: <AudioTesting />,
    children: <></>,
  },
];

export default commonRoutes;
