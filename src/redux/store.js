import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/AuthReducer";
import { ChatRoomsReducer } from "./reducers/ChatRoomsReducer";
import { MessageReducer } from "./reducers/MessageReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  auth: { user: user },
  roomsList: {
    allRooms: null,
    ownedRooms: null,
    joinedRooms: null,
    loading: false,
    error: null,
  },
  chatRoom: {
    roomInfo: null,
    messages: [],
    roomInfoLoading: false,
    messageLoading: false,
    messagePage: 0,
    isLastPage: false,
    roomInfoError: null,
    messageError: null,
    typingUsers: [],
    activeUsers: [],
  },
};

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    roomsList: ChatRoomsReducer,
    chatRoom: MessageReducer,
  },
  preloadedState: initialState,
});

export default store;
