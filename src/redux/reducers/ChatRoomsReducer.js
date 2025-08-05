const initialState = {
  allRooms: null,
  ownedRooms: null,
  joinedRooms: null,
  loading: false,
  error: null,
};

export const ChatRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHAT_ROOMS":
      return { ...state, loading: true };
    case "CHAT_ROOMS_SUCCESS":
      return {
        ...state,
        loading: false,
        allRooms: action.payload.allRooms,
        ownedRooms: action.payload.ownedRooms,
        joinedRooms: action.payload.joinedRooms,
      };
    case "CHAT_ROOMS_FAILURE":
      return { ...state, loading: true, error: action.payload };
    case "CLEAR_CHAT_ROOMS":
      return {
        ...state,
        allRooms: null,
        ownedRooms: null,
        joinedRooms: null,
        error: null,
      };

    default:
      return state;
  }
};
