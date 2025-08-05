import { useState } from "react";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const SecretText = ({ roomId }) => {
  const [revealed, setRevealed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID copied!");
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
    <div className="flex items-center gap-2 mt-3">
      <div className="w-8" />
      <div
        onClick={() => (revealed ? handleCopy() : null)}
        className={`relative border border-gray-300 rounded bg-gray-50 px-3 py-2 ${
          revealed ? "cursor-pointer" : ""
        }`}
      >
        <span className="absolute -top-2 left-2 bg-gray-50 text-[10px] text-gray-500 px-1">
          Room ID
        </span>

        <span className="text-base font-mono">
          {revealed ? roomId : "••••••"}
        </span>
      </div>
      <button
        onClick={() => setRevealed(!revealed)}
        className="text-gray-600 hover:text-black text-lg"
      >
        {revealed ? <FaRegEye /> : <PiEyeClosedDuotone />}
      </button>
      <button
        onClick={() => handleShare()}
        className="text-gray-600 hover:text-black text-lg"
      >
        <FaShareAlt />
      </button>
    </div>
  );
};
export default SecretText;
