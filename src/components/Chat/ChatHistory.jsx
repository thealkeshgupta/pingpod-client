import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBulkMessages,
  fetchMessageByRoomIdAndPage,
} from "../../redux/actions/MessageAction";
import {
  bringUserActive,
  bringUserInactive,
  connectSocket,
  subscribeToRoom,
} from "../../service/socketService";
import { formatChatDate, isAdmin, isOwner } from "../../utils";
import Spinners from "../shared/Spinners";
import { FaAngleDoubleUp } from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import { Checkbox } from "@mui/material";
import toast from "react-hot-toast";

const ChatHistory = ({
  roomId,
  chatRef,
  showDeleteSelection,
  setShowDeleteSelection,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const room = useSelector((state) => state.chatRoom);
  const { messages, messagePage, messageLoading, isLastPage } = room;

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const prevLastMessageIdRef = useRef(null);
  const typingTimeouts = useRef({});

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const toggleSelectMessage = (messageId) => {
    if (selectedMessages.includes(messageId)) {
      let oldSelectedMessages = selectedMessages;
      oldSelectedMessages = oldSelectedMessages.filter(
        (item) => item !== messageId
      );
      setSelectedMessages([...oldSelectedMessages]);
    } else {
      setSelectedMessages((prev) => [...prev, messageId]);
    }
  };

  const handleConfirmDeleteMessage = () => {
    dispatch(
      deleteBulkMessages(
        selectedMessages,
        setDeleteLoading,
        toast,
        roomId,
        setShowDeleteSelection
      )
    );
  };

  useEffect(() => {
    setSelectedMessages([]);
  }, [showDeleteSelection]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const prevLastMessageId = prevLastMessageIdRef.current;

    const isNewMessageAppended =
      lastMessage?.id && lastMessage.id === prevLastMessageId;

    prevLastMessageIdRef.current = lastMessage?.id;

    if (isNewMessageAppended || prevLastMessageId === undefined) {
      const timeout = setTimeout(scrollToBottom, 0);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollTop;
    if (scrollTop === 0 && !isLastPage) {
      console.log("Reached top of scroll!");
      dispatch(fetchMessageByRoomIdAndPage(roomId, messagePage + 1));
    }
  };

  useEffect(() => {
    dispatch(fetchMessageByRoomIdAndPage(roomId, 0));

    const stompClient = connectSocket();

    const onMessageReceived = (message) => {
      dispatch({ type: "NEW_MESSAGE_RECEIVED", payload: message });
    };

    const connectionInterval = setInterval(() => {
      if (stompClient && stompClient.connected) {
        subscribeToRoom(roomId, dispatch, typingTimeouts, onMessageReceived);

        bringUserActive(roomId, user.id);

        clearInterval(connectionInterval);
      }
    }, 500);

    return () => {
      bringUserInactive(roomId, user.id);
      dispatch({ type: "CLEAR_MESSAGES" });
    };
  }, [roomId]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {});
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  let lastRenderedDate = "";

  return (
    <>
      {showDeleteSelection ? (
        <div className="relative">
          <div className="absolute top-0 left-0 flex z-10 bg-[#d4d4d4b9] border italic font-bold border-[rgba(0,0,0,0.1)] text-gray-800 lg:text-[1vw] text-[2.5vw] py-[1vh] px-[2vw] w-full justify-between items-center">
            <div>
              {selectedMessages.length > 0
                ? "Do you want to delete the selected message(s)?"
                : "Please click on the messsages you want to delete"}
            </div>

            <div className="flex justify-around gap-6">
              {selectedMessages.length > 0 ? (
                <button
                  disabled={deleteLoading}
                  onClick={handleConfirmDeleteMessage}
                  className="flex gap-2 items-center justify-center bg-red-800  hover:bg-red-700 transition-colors px-[1vw] py-[0.5vh] rounded-md text-gray-50"
                >
                  {deleteLoading ? (
                    <>
                      <Spinners /> Deleting...
                    </>
                  ) : (
                    <>Confirm</>
                  )}
                </button>
              ) : null}
              <button
                disabled={deleteLoading}
                onClick={() => {
                  setShowDeleteSelection(false);
                }}
                className="bg-gray-500 hover:bg-gray-400 transition-colors px-[1vw] py-[0.5vh] rounded-md text-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        onScroll={handleScroll}
        ref={scrollRef}
        className="flex flex-col gap-4 p-4 max-h-[40rem] overflow-y-auto"
      >
        {messageLoading ? (
          <div className="flex justify-center">
            <Spinners />
          </div>
        ) : !isLastPage ? (
          <div className="flex justify-center">
            <FaAngleDoubleUp
              onClick={() =>
                dispatch(fetchMessageByRoomIdAndPage(roomId, messagePage + 1))
              }
              className=" mt-2 size-7 rounded-full hover:bg-blue-600 transition-colors bg-blue-400 p-1 shadow-inner shadow-blue-950 text-white"
            />
          </div>
        ) : null}

        {messages
          ?.slice()
          .reverse()
          .map((message) => {
            const messageDate = formatChatDate(message.timestamp);
            const showDateSeparator = messageDate !== lastRenderedDate;
            lastRenderedDate = messageDate;

            return (
              <Fragment>
                {showDateSeparator && (
                  <div className="text-center text-xs text-gray-600 italic my-4">
                    <span className="inline-block bg-blue-300 px-3 py-1 rounded-full shadow-sm border border-blue-300">
                      {messageDate}
                    </span>
                  </div>
                )}
                {message.senderId !== user.id ? (
                  <div className="self-start flex">
                    <div
                      className={
                        showDeleteSelection &&
                        (isOwner(room.roomInfo, user.id) ||
                          isAdmin(room.roomInfo, user.id))
                          ? "cursor-pointer"
                          : null
                      }
                      onClick={() => {
                        (isOwner(room.roomInfo, user.id) ||
                          isAdmin(room.roomInfo, user.id)) &&
                          toggleSelectMessage(message.id);
                      }}
                    >
                      <ChatMessage message={message} user={user} />
                    </div>
                    {showDeleteSelection &&
                    (isOwner(room.roomInfo, user.id) ||
                      isAdmin(room.roomInfo, user.id)) ? (
                      <Checkbox
                        onClick={() => {
                          toggleSelectMessage(message.id);
                        }}
                        disableRipple
                        sx={{
                          cursor: "default",
                          color: "white",
                          "&.Mui-checked": {
                            color: "#FF6969",
                          },
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        checked={selectedMessages.includes(message.id)}
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className="self-end flex">
                    {showDeleteSelection ? (
                      <Checkbox
                        onClick={() => {
                          toggleSelectMessage(message.id);
                        }}
                        disableRipple
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                          color: "white",
                          "&.Mui-checked": {
                            color: "#FF6969",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 24,
                          },
                        }}
                        checked={selectedMessages.includes(message.id)}
                      />
                    ) : null}
                    <div
                      className={showDeleteSelection ? "cursor-pointer" : null}
                      onClick={() => {
                        toggleSelectMessage(message.id);
                      }}
                    >
                      <ChatMessage message={message} user={user} />
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
      </div>
    </>
  );
};
export default ChatHistory;
