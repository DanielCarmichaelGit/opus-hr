import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Routing";
import { AuthProvider } from "./Providers/AuthProvider";
import Header from "./components/elements/header";
import { SocketProvider } from "./Providers/socketContext.jsx";
import store from "./StateManagement/Store/store.js";
import { Provider } from "react-redux";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <SocketProvider>
            {window.location.pathname.includes("/login") ||
            window.location.pathname.includes("/signup") ||
            window.location.pathname.includes("candidate-test") ||
            window.location.pathname.includes("candidate-interview") ? null : (
              <Header />
            )}
            <Routing />
          </SocketProvider>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
