import { useState } from "react";
import AddRoomForm from "./AddRoomForm";
import AddRoomSuccessMessage from "./AddRoomSuccessMessage";

const AddRoom = ({ moveToChatList }) => {
  const [roomId, setRoomId] = useState(0);
  const [roomSuccess, setRoomSuccess] = useState(false);
  return (
    <div className="w-[100%] p-4 flex justify-center items-center">
      {roomSuccess === false ? (
        <AddRoomForm setRoomSuccess={setRoomSuccess} setRoomId={setRoomId} />
      ) : (
        <AddRoomSuccessMessage
          roomId={roomId}
          moveToChatList={moveToChatList}
        />
      )}
    </div>
  );
};
export default AddRoom;
