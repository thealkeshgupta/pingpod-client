import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createChatRoom } from "../../redux/actions/ChatRoomsAction";
import { useState } from "react";

const AddRoomForm = ({ setRoomId, setRoomSuccess }) => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError("Room name cannot be empty");
      return;
    }

    try {
      await dispatch(
        createChatRoom(
          { name: roomName },
          toast,
          setLoader,
          setRoomSuccess,
          setRoomId
        )
      );
    } catch (err) {
      setError("Failed to create room. Please try again.");
    }
  };

  return (
    <div className="sm:w-[450px] w-full shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white p-6 flex flex-col max-w-md">
      <div className="">
        <h2 className="text-2xl font-semibold mb-4">Create a New Room</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          disabled={loader}
          className="bg-blue-900 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3"
          type="submit"
          onClick={handleCreateRoom}
        >
          {loader ? (
            <>
              <CircularProgress size="1.5rem" color="inherit" />
              Processing
            </>
          ) : (
            <>Create</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddRoomForm;
