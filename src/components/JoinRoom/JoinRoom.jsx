import { CircularProgress } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { joinChatRoom } from "../../redux/actions/ChatRoomsAction";

const JoinRoom = ({ moveToChatList }) => {
  const [roomId, setRoomId] = useState(0);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const handleJoinRoom = async () => {
    if (roomId.length !== 6) {
      setError("Please enter a valid 6-digit Room ID");
      return;
    }

    try {
      await dispatch(joinChatRoom(roomId, toast, setLoader, moveToChatList));
    } catch (err) {
      console.error("Failed to join room:", err);
      setError("Failed to join room. Please try again.");
    }
  };

  return (
    <div className="w-[100%] p-4 flex justify-center items-center">
      <div className="sm:w-[450px] w-full shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white p-6 flex flex-col max-w-md">
        <div className="">
          <h2 className="text-2xl font-semibold mb-5">Join Room</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <OTPInput
            value={roomId}
            onChange={setRoomId}
            numInputs={6}
            isInputNum
            shouldAutoFocus
            placeholder="ROOMID"
            renderSeparator={
              <span className="mx-1 text-xl font-semibold text-gray-200">
                .
              </span>
            }
            renderInput={(inputProps) => {
              const { onChange, ...rest } = inputProps;
              return (
                <input
                  {...rest}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      onChange(e);
                    }
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-12 h-12 text-3xl text-gray-600 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 bg-white"
                />
              );
            }}
            containerStyle="flex justify-center gap-2 mb-4"
          />

          <button
            disabled={loader}
            className="bg-blue-900 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3"
            type="submit"
            onClick={handleJoinRoom}
          >
            {loader ? (
              <>
                <CircularProgress size="1.5rem" color="inherit" />
                Joining
              </>
            ) : (
              <>Join</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default JoinRoom;
