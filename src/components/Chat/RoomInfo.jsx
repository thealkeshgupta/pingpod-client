// RoomInfo.jsx
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatRoomById } from "../../redux/actions/MessageAction";
import { useNavigate } from "react-router-dom";
import NameAvatar from "./NameAvatar";
import { MdGroups } from "react-icons/md";
import { truncateText } from "../../utils";
import SecretText from "./SecretText";
import ParticipantsList from "./ParticipantsList";

const RoomInfo = ({ roomId, onClose }) => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.chatRoom.roomInfo);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchChatRoomById(roomId));
    return () => {
      dispatch({ type: "CLEAR_ROOM_INFO" });
    };
  }, [roomId]);

  return (
    <div className="max-h-[calc(100vh-70px)] flex flex-col justify-between bg-white shadow-md p-4 h-full">
      {/* Close button for mobile drawer */}
      {onClose && (
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl text-gray-500">
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 overflow-y-auto">
        {room && (
          <>
            <div className="flex items-center justify-center flex-col">
              <NameAvatar name={room.name} size={80} showBorder={true} />

              <div className="flex justify-center mt-3 mb-1">
                <p className="flex items-center text-2xl text-gray-500">
                  <MdGroups className="mr-2" />
                  {truncateText(room.name, 30)}
                </p>
              </div>

              <p className="text-[0.8rem] text-gray-500">
                Created • {room.createdAt}
              </p>

              <p className="text-[0.8rem] text-gray-500">
                <i>
                  Owned by{" "}
                  <b>
                    {user.id === room.owner.userId ? "me" : room.owner.name}
                  </b>
                </i>
              </p>

              {user.id === room.owner.userId && (
                <div className="text-[0.8rem] text-gray-500">
                  <SecretText roomId={room.roomId} />
                </div>
              )}
            </div>

            <div className="mt-4">
              <ParticipantsList room={room} />
            </div>
          </>
        )}
      </div>

      <div className="px-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-[4vh] h-12 flex items-center justify-center gap-2 text-white bg-blue-500 hover:bg-blue-600 rounded shadow-[0_4px_0_#86b2d7] active:translate-y-1 active:shadow-none transition duration-150"
        >
          <IoMdArrowRoundBack />
          <span className="font-semibold">Back</span>
        </button>
      </div>
    </div>
  );
};

export default RoomInfo;
