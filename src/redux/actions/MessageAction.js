import api from "../../api/api";
export const fetchChatRoomById = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_ROOM_INFO" });
    const { data } = await api.get(`/rooms/${roomId}`);

    const owner = data.members.find((m) => m.user.userId === data.owner.userId);
    const rest = data.members.filter(
      (m) => m.user.userId !== data.owner.userId
    );

    rest.sort((a, b) => b.admin - a.admin);

    data.members = [owner, ...rest];

    dispatch({
      type: "ROOM_INFO_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "ROOM_INFO_FAILURE",
      payload: error?.response?.data?.message || "Internal Server Error",
    });
  }
};

export const toggleAdminAccess =
  (roomId, userId, toast) => async (dispatch) => {
    try {
      dispatch({ type: "EDIT_ROOM_INFO" });
      const { data } = await api.post(
        `/rooms/toggle-admin/${roomId}/${userId}`
      );

      const owner = data.members.find(
        (m) => m.user.userId === data.owner.userId
      );
      const rest = data.members.filter(
        (m) => m.user.userId !== data.owner.userId
      );

      rest.sort((a, b) => b.admin - a.admin);

      data.members = [owner, ...rest];

      dispatch({
        type: "ROOM_INFO_SUCCESS",
        payload: data,
      });
      toast.success("Admin access modified successfully");
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ROOM_INFO_FAILURE",
        payload: error?.response?.data?.message || "Internal Server Error",
      });

      toast.success(
        error?.response?.data?.message || "Failed to modify admin access"
      );
    }
  };

export const removeUser = (roomId, userId, toast) => async (dispatch) => {
  try {
    dispatch({ type: "EDIT_ROOM_INFO" });
    const { data } = await api.delete(`/rooms/remove-user/${roomId}/${userId}`);

    const owner = data.members.find((m) => m.user.userId === data.owner.userId);
    const rest = data.members.filter(
      (m) => m.user.userId !== data.owner.userId
    );

    rest.sort((a, b) => b.admin - a.admin);

    data.members = [owner, ...rest];

    dispatch({
      type: "ROOM_INFO_SUCCESS",
      payload: data,
    });
    toast.success("Member removed successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "ROOM_INFO_FAILURE",
      payload: error?.response?.data?.message || "Internal Server Error",
    });

    toast.success(
      error?.response?.data?.message || "Failed to modify admin access"
    );
  }
};

export const fetchMessageByRoomIdAndPage =
  (roomId, page) => async (dispatch) => {
    try {
      dispatch({ type: "FETCH_MESSAGES" });
      const { data } = await api.get(`/messages/${roomId}/${page}`);

      setTimeout(() => {
        dispatch({
          type: "MESSAGES_SUCCESS",
          payload: data,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "MESSAGES_FAILURE",
        payload: error?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteBulkMessages =
  (toBeDeletedIDs, setDeleteLoading, toast, roomId, setShowDeleteSelection) =>
  async (dispatch) => {
    try {
      setDeleteLoading(true);
      await api.delete(`/messages/bulk/${roomId}`, {
        data: toBeDeletedIDs,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTimeout(() => {
        setDeleteLoading(false);
        toast.success("Message(s) deleted successfully");
        setShowDeleteSelection(false);
      }, 1000);
      return true;
    } catch (error) {
      toast.success("Failed to delete selected message(s)");
      setDeleteLoading(false);
      return false;
    }
  };
