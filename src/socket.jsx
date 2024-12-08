import { useMemo } from "react";
import io from "socket.io-client";
import { socketContextProvider } from "./socketContext";
import { server } from "./constants";

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }, []));
  return (
    <socketContextProvider.Provider value={socket}>
      {children}
    </socketContextProvider.Provider>
  );
};
export default SocketProvider;
