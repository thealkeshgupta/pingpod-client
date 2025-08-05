import { FaGithub } from "react-icons/fa6";
import display from "../assets/display.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-custom-gradient">
      <main className="flex-grow items-center ">
        <div className="md:flex hidden flex-row items-center justify-center h-[90vh] bg-custom-gradient">
          <div className="flex flex-col gap-10 justify-start w-full">
            <div className="flex font-PlaywritePl font-extrabold text-[7vw] justify-center items-center text-gray-200">
              PingPod
            </div>
            <div className="flex font-PlaywritePl font-extrabold text-[2vw] justify-center items-center text-gray-200">
              Your Daily Dose of Digital Gossip!
            </div>
            <div className="flex font-PlaywritePl mt-[4vh] font-extrabold text-[1.5vw] justify-center items-center text-gray-200">
              Wanna ping? Hit below to dive in.
            </div>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => navigate("/register")}
                className="bg-bg-primary text-white px-6 py-3 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-bg-secondary text-white px-6 py-3 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
              >
                Login
              </button>
            </div>
          </div>

          <div className="justify-end items-center w-full">
            <img src={display} className="w-[50vw]" />
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center justify-center h-[95vh] bg-custom-gradient">
          <div className="flex flex-col gap-10 justify-start w-full">
            <div className="flex font-PlaywritePl font-extrabold text-[15vw] justify-center items-center text-gray-200">
              PingPod
            </div>
            <div className="flex font-PlaywritePl font-extrabold text-[7vw] text-balance text-center  justify-center items-center text-gray-400">
              Your Daily Dose of Digital Gossip!
            </div>
            <div className="flex justify-center items-center w-full">
              <img src={display} className="w-[80vw]" />
            </div>
            <div className="flex font-PlaywritePl mt-[2vh] font-extrabold text-[3vw] justify-center items-center text-gray-200">
              Wanna ping? Hit below to dive in.
            </div>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => navigate("/register")}
                className="bg-bg-primary text-white px-6 py-3 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-bg-secondary text-white px-6 py-3 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-sm text-gray-400 flex items-center gap-1 justify-center p-4">
        © 2025 PingPod by
        <a
          href="https://github.com/thealkeshgupta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-500 hover:underline"
        >
          <FaGithub size={14} />
          Alkesh
        </a>
      </footer>
    </div>
  );
};
export default Home;
