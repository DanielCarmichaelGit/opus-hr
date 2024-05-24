import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [prodUrl, setProdUrl] = useState(
    "https://opus-hr-5a58227c45be.herokuapp.com"
  );
  const [devUrl, setDevUrl] = useState("http://localhost:5000");

  useEffect(() => {
    const newSocket = io(devUrl, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      // Handle the connection error, e.g., show an error message or retry the connection
    });

    newSocket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
      // Handle the disconnection, e.g., show a message or try to reconnect
    });

    return () => newSocket.close();
  }, [devUrl]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
