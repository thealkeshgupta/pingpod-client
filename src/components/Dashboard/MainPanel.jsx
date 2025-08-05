import AddRoom from "../AddRoom/AddRoom";
import ChatRoomList from "../ChatRoomList/ChatRoomList";
import JoinRoom from "../JoinRoom/JoinRoom";
const MainPanel = ({ menuIndex, setMenuIndex }) => {
  const moveToChatList = () => {
    setMenuIndex(0);
  };
  return (
    <div className="bg-bg-primary min-h-[calc(92vh)] flex">
      {menuIndex === 0 && <ChatRoomList />}
      {menuIndex === 1 && <AddRoom moveToChatList={moveToChatList} />}
      {menuIndex === 2 && <JoinRoom moveToChatList={moveToChatList} />}
    </div>
  );
};
export default MainPanel;
