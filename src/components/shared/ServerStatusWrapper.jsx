import { useEffect, useState } from "react";
import api from "../../api/api";

const ServerStatusWrapper = ({ children }) => {
  const [isServerReady, setIsServerReady] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        await api.get("/health"); // Replace with your actual ping/health endpoint
        setIsServerReady(true);
      } catch (error) {
        setIsServerReady(false);
      }
    };

    // First check immediately
    checkServer();

    // Recheck every 5 seconds
    const interval = setInterval(checkServer, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isServerReady) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-gray-600">
        <div className="flex flex-col items-center justify-center h-screen text-gray-600">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg font-semibold">
            Server is initiating... Please wait.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ServerStatusWrapper;
