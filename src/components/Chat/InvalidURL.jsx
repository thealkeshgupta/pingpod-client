import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const InvalidURL = () => {
  const navigate = useNavigate();

  return (
    <div className="chat-container">
      <div className="min-h-[calc(100vh-70px)]  bg-gray-400 flex items-center justify-center text-white px-4">
        <div className="max-w-md w-full bg-gray-200 rounded-2xl shadow-2xl p-8 text-center space-y-6 border border-blue-700">
          <FaExclamationTriangle className="text-red-700 text-6xl mx-auto" />
          <h1 className="text-3xl font-bold text-red-800">Oops! Invalid URL</h1>
          <p className="text-gray-800 text-lg">
            The chat room link seems to be broken or incorrect.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};
export default InvalidURL;
