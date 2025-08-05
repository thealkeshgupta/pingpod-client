import { useSelector } from "react-redux";
import { encryptData, isAdmin, isOwner, truncateText } from "../../utils";
import { useNavigate } from "react-router-dom";
import NameAvatar from "../Chat/NameAvatar";
import { MdGroups } from "react-icons/md";

const ChatRoomListItem = ({ room }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleOpenChatRoom = (roomId) => {
    console.log(`Opening chat room ${roomId}`);
    const roomURLcode = encryptData(`${roomId}`, user.username);
    console.log("url : ", roomURLcode);
    navigate(`/chat/${roomURLcode}`);
  };

  const getJoinedDate = () => {
    let joinedDate = "";
    room.members.forEach((member) => {
      if (member.user.userId === user.id) {
        joinedDate = member.joinedAt;
      }
    });
    return joinedDate;
  };
  return (
    <div
      onClick={() => handleOpenChatRoom(room.roomId)}
      className="cursor-pointer my-3"
    >
      <div
        key={room.roomId}
        className=" h-[36vh] bg-white rounded-xl shadow-md px-[4vh] py-[2vh] hover:shadow-lg transition"
      >
        <div className="flex justify-center">
          <div className="flex items-center justify-center flex-col">
            <NameAvatar name={room.name} size={80} showBorder={true} />

            <div className="flex justify-center mt-[1vh]">
              <p className="flex items-center text-[3vh] text-gray-500 ">
                {/* <MdGroups className="mr-2" /> */}
                {truncateText(room.name, 18)}
              </p>
            </div>

            <p className="text-[0.8rem] text-gray-500 my-[1vh]">
              {isOwner(room, user.id)
                ? "Created • " + room.createdAt
                : "Joined • " + getJoinedDate()}
            </p>
            {isOwner(room, user.id) ? (
              <span className="inline-block mt-[1vh] px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                Owner
              </span>
            ) : isAdmin(room, user.id) ? (
              <span className="inline-block mt-[1vh] px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                Admin
              </span>
            ) : (
              <span className="inline-block mt-[1vh] px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                Member
              </span>
            )}
            <p className="text-[0.8rem] text-gray-500 my-[1vh]">
              {room.members.length} Members
            </p>

            <button className="bold inline-block mt-[1vh] px-10 my-[1vh] text-[2vh] bg-purple-200 hover:bg-purple-400 transition-all  text-gray-600 hover:text-gray-100 rounded-lg w-fit">
              Go to room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatRoomListItem;
