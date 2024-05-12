import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Routing";
import { AuthProvider } from "./Providers/AuthProvider";
import Header from "./components/elements/header";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
