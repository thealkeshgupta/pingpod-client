const initialState = {
  roomInfo: null,
  messages: [],
  messagePage: 0,
  isLastPage: false,
  roomInfoLoading: null,
  messageLoading: null,
  roomInfoError: null,
  messageError: null,
  typingUsers: [],
  activeUsers: [],
};

export const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ROOM_INFO":
      return { ...state, roomInfoLoading: true };
    case "EDIT_ROOM_INFO":
      return { ...state, roomInfoLoading: true };
    case "ROOM_INFO_SUCCESS":
      return {
        ...state,
        roomInfoLoading: false,
        roomInfo: action.payload,
      };
    case "ROOM_INFO_FAILURE":
      return {
        ...state,
        roomInfoLoading: false,
        roomInfo: null,
        roomInfoError: action.payload,
      };
    case "CLEAR_ROOM_INFO":
      return {
        ...state,
        roomInfo: null,
      };
    case "FETCH_MESSAGES":
      return { ...state, messageLoading: true };
    case "MESSAGES_SUCCESS":
      return {
        ...state,
        messageLoading: false,
        messages: [...state.messages, ...action.payload.content],
        messagePage: action.payload.pageNumber,
        isLastPage: action.payload.lastPage,
      };
    case "MESSAGES_FAILURE":
      return {
        ...state,
        messageLoading: false,
        messages: [],
        messageError: action.payload,
      };
    case "NEW_MESSAGE_RECEIVED":
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };

    case "REMOVE_DELETED_MESSAGES_FROM_UI":
      return {
        ...state,
        messages: state.messages.filter(
          (msg) => !action.payload.includes(msg.id)
        ),
      };

    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: [],
      };

    case "USER_TYPING":
      return {
        ...state,
        typingUsers: state.typingUsers.some(
          (typingUser) => typingUser.userId === action.payload.userId
        )
          ? state.typingUsers
          : [...state.typingUsers, action.payload],
      };

    case "STOP_TYPING":
      return {
        ...state,
        typingUsers: state.typingUsers.filter(
          (typingUser) => typingUser.senderId !== action.payload
        ),
      };

    case "CLEAR_TYPING":
      return {
        ...state,
        typingUsers: [],
      };

    case "SET_ACTIVE_USERS":
      return {
        ...state,
        activeUsers: [...action.payload],
      };

    case "CLEAR_ACTIVE_USERS":
      return {
        ...state,
        activeUsers: [],
      };

    default:
      return state;
  }
};
