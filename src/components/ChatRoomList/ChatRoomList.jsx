import { useEffect, useState } from "react";
import {
  clearChatRoomsList,
  fetchChatRoomsList,
} from "../../redux/actions/ChatRoomsAction";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ChatRoomListItem from "./ChatRoomListItem";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FaCrown, FaUsers } from "react-icons/fa";
import ContentLoader from "../shared/ContentLoader";
import { Grid } from "@mui/material";

const ChatRoomList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        console.log("Fetching chat rooms...");
        await dispatch(fetchChatRoomsList(toast));
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
    return () => {
      dispatch(clearChatRoomsList());
    };
  }, [dispatch]);

  const { allRooms, ownedRooms, joinedRooms, loading } = useSelector(
    (state) => state.roomsList
  );

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const RoomTabPanel = ({ icon: Icon, label, count, active }) => {
    return (
      <div
        className={`flex items-center justify-between gap-3 px-4 py-2 cursor-pointer rounded-md transition-all
        ${
          active
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
      `}
      >
        <div className="flex items-center gap-2">
          <Icon className="text-lg" />
          <span className="font-medium">{label}</span>
        </div>
        <div
          className={`text-xs font-bold px-2 py-0.5 rounded-full 
        ${active ? "bg-white text-blue-600" : "bg-blue-100 text-blue-700"}
      `}
        >
          {count}
        </div>
      </div>
    );
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className="max-h-[calc(75vh)] overflow-y-scroll"
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return loading ? (
    <div className="w-full p-4 flex items-center justify-center">
      <ContentLoader />
    </div>
  ) : (
    <div className="w-full p-4 overflow-y-auto">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "slategrey" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <RoomTabPanel
                  icon={FaUsers}
                  label="Joined Rooms"
                  count={joinedRooms ? joinedRooms.length : 0}
                  active={activeTab === 0}
                />
              }
            />
            <Tab
              label={
                <RoomTabPanel
                  icon={FaCrown}
                  label="Owned Rooms"
                  count={ownedRooms ? ownedRooms.length : 0}
                  active={activeTab === 1}
                />
              }
            />
          </Tabs>
        </Box>
      </Box>
      <CustomTabPanel value={activeTab} index={0}>
        <Grid
          container
          justifyContent={"center"}
          justifyItems={"center"}
          spacing={2}
        >
          {joinedRooms && joinedRooms.length > 0 ? (
            joinedRooms
              .slice()
              .reverse()
              .map((room) => (
                <Grid item size={{ xs: 12, sm: 6, md: 5, lg: 4 }}>
                  <ChatRoomListItem key={room.id} room={room} />
                </Grid>
              ))
          ) : (
            <p className="text-gray-500">No joined rooms available.</p>
          )}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <Grid
          container
          justifyContent={"center"}
          justifyItems={"center"}
          spacing={2}
        >
          {ownedRooms && ownedRooms.length > 0 ? (
            ownedRooms
              .slice()
              .reverse()
              .map((room) => (
                <Grid item size={{ xs: 12, sm: 6, md: 5, lg: 4 }}>
                  <ChatRoomListItem key={room.id} room={room} />
                </Grid>
              ))
          ) : (
            <p className="text-gray-500">No owned rooms available.</p>
          )}
        </Grid>
      </CustomTabPanel>
    </div>
  );
};
export default ChatRoomList;
