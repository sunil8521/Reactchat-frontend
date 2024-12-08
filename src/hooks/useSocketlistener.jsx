import { useEffect } from "react";

const SocketListener = (socket, handlers) => {
  useEffect(() => {

        // console.log("i am here");
    Object.entries(handlers).forEach(([event,handler]) => {
      socket.on(event,handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event,handler]) => {
        socket.off(event,handler);
      });
    };
  }, [socket,handlers]);
};

export default SocketListener;
