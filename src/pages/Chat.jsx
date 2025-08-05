// Chat.jsx
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { decryptData } from "../utils";
import InvalidURL from "../components/Chat/InvalidURL";
import RoomInfo from "../components/Chat/RoomInfo";
import ChatPanel from "../components/Chat/ChatPanel";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Navbar from "../components/shared/Navbar";
import { RiChatDeleteFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const Chat = () => {
  const { roomURLcode } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [showInfo, setShowInfo] = useState(false);
  const [showDeleteSelection, setShowDeleteSelection] = useState(false);
  const roomId = decryptData(roomURLcode, user.username);

  if (roomId.length !== 6) return <InvalidURL />;

  return (
    <div className="max-h-[calc(92vh)]">
      <div className="hidden lg:block">
        <Navbar>
          {showDeleteSelection ? null : (
            <MdDelete
              className="text-[4vh] text-red-400 cursor-pointer"
              onClick={() => setShowDeleteSelection(true)}
            />
          )}
        </Navbar>
      </div>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-custom-gradient h-[8vh] px-4 py-3 shadow fixed top-0 left-0 right-0 z-40">
        <FaBars
          className="text-[4vh] text-gray-700 cursor-pointer"
          onClick={() => setShowInfo(true)}
        />
        <div className="absolute left-1/2 transform -translate-x-1/2 font-PlaywritePl font-extrabold text-[4vh] text-white">
          <div className="flex font-PlaywritePl font-extrabold text-[4vh] justify-center items-center text-white z-50">
            PingPod
          </div>
        </div>
        {showDeleteSelection ? null : (
          <MdDelete
            className="text-[4vh] text-red-400 cursor-pointer"
            onClick={() => setShowDeleteSelection(true)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex  pt-[8vh] lg:pt-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-1/4">
          <RoomInfo roomId={roomId} />
        </div>

        {/* Chat Panel */}
        <div className="flex-1 lg:w-3/4">
          <ChatPanel
            roomId={roomId}
            showDeleteSelection={showDeleteSelection}
            setShowDeleteSelection={setShowDeleteSelection}
          />
        </div>
      </div>

      {/* Mobile Top Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out bg-white shadow-md ${
          showInfo ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <RoomInfo roomId={roomId} onClose={() => setShowInfo(false)} />
      </div>
    </div>
  );
};

export default Chat;
