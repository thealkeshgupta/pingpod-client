import api from "../../api/api";

export const fetchChatRoomsList = (toast) => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_CHAT_ROOMS" });
    const { data } = await api.get("/rooms/");

    const loggedInUser = getState().auth.user;

    const ownedRooms = data.filter(
      (room) => room.owner.userId === loggedInUser.id
    );
    const joinedRooms = data.filter(
      (room) => room.owner.userId !== loggedInUser.id
    );

    setTimeout(() => {
      dispatch({
        type: "CHAT_ROOMS_SUCCESS",
        payload: {
          ownedRooms,
          joinedRooms,
          allRooms: data,
        },
      });
    }, 1000);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Internal Server Error");
    dispatch({
      type: "CHAT_ROOMS_FAILURE",
      payload: error?.response?.data?.message || "Internal Server Error",
    });
  } finally {
  }
};

export const clearChatRoomsList = () => (dispatch) => {
  dispatch({ type: "CLEAR_CHAT_ROOMS" });
};

export const createChatRoom =
  (sendData, toast, setLoader, setRoomSuccess, setRoomId) =>
  async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/rooms/create", sendData);
      toast.success(data?.message || "Chat room created successfully");
      setRoomId(data.roomId);
      setRoomSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error"
      );
    } finally {
      setLoader(false);
    }
  };

export const joinChatRoom =
  (roomId, toast, setLoader, moveToChatList) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post(`/rooms/join/${roomId}`);
      toast.success(data?.message || "Chat room joined successfully");
      moveToChatList();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error"
      );
    } finally {
      setLoader(false);
    }
  };

export const exitChatRoom = (roomId, toast, navigate) => async (dispatch) => {
  try {
    const { data } = await api.post(`/rooms/exit/${roomId}`);
    toast.success(data?.message || "Chat room exited successfully");
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.password ||
        "Internal Server Error"
    );
  } finally {
  }
};

export const deleteChatRoom = (roomId, toast, navigate) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/rooms/${roomId}`);
    toast.success(data?.message || "Chat room exited successfully");
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.password ||
        "Internal Server Error"
    );
  } finally {
  }
};
