import { useState } from "react";
import { FiCopy, FiShare2, FiCheck } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";
import toast from "react-hot-toast";
const AddRoomSuccessMessage = ({ roomId, moveToChatList }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    toast.success("Room ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const message = `🚪 Room Invitation:
Hey! Join my chat room using this Room ID: *${roomId}* 🔑

1. Open the app
2. Go to "Join Room"
3. Enter the Room ID above

Let's chat! 💬`;

    if (navigator.share) {
      navigator
        .share({
          title: "Join My Chat Room",
          text: message,
        })
        .catch((err) => {
          toast.error("Sharing cancelled or failed");
        });
    } else {
      navigator.clipboard.writeText(message);
      toast.success("Share message copied to clipboard!");
    }
  };

  return (
    <div className="sm:w-[450px] w-full shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white p-6 flex flex-col max-w-md">
      <h2 className="text-2xl font-semibold mb-4">
        <div
          className={`flex items-center gap-3 h-12 px-4 bg-green-100 rounded `}
        >
          <GoCheckCircleFill className="text-green-800" />
          <span className="text-gray-800 font-semibold text-xl">
            Room created successfully!
          </span>
        </div>
        <hr className="border-t border-green-100" />
      </h2>

      <div className="flex justify-center items-center gap-2 mb-4">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 border-2 border-dashed border-blue-500 px-4 py-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
        >
          <span className="font-mono text-lg">{roomId}</span>
          {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <FiShare2 />
          Share
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Share this Room ID with participants so they can join your chat room.
      </p>
    </div>
  );
};

export default AddRoomSuccessMessage;
