import Sidebar from "../components/Dashboard/Sidebar";
import MainPanel from "../components/Dashboard/MainPanel";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Navbar from "../components/shared/Navbar";

const Dashboard = () => {
  const [menuIndex, setMenuIndex] = useState(0);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="max-h-[calc(92vh)]">
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="lg:hidden flex items-center justify-between bg-custom-gradient h-[8vh] px-4 py-3 shadow fixed top-0 left-0 right-0 z-40">
        <FaBars
          className="text-[4vh] text-gray-700 cursor-pointer"
          onClick={() => setShowSidebar(true)}
        />
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex font-PlaywritePl font-extrabold text-[3vh] justify-center items-center text-white z-50">
            PingPod
          </div>
        </div>
      </div>

      <div className="flex  pt-[8vh] lg:pt-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-1/4">
          <Sidebar
            menuIndex={menuIndex}
            setMenuIndex={setMenuIndex}
            isMobile={false}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>

        {/* Chat Panel */}
        <div className="flex-1 lg:w-3/4">
          <MainPanel menuIndex={menuIndex} setMenuIndex={setMenuIndex} />
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out bg-white shadow-md ${
          showSidebar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Sidebar
          menuIndex={menuIndex}
          setMenuIndex={setMenuIndex}
          isMobile={true}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
    </div>
  );
};

export default Dashboard;
