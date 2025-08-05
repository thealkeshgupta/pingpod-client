import { Client } from "@stomp/stompjs";
import ReconnectingWebSocket from "reconnecting-websocket";
import SockJS from "sockjs-client";
let stompClient = null;

export const connectSocket = (onMessageReceived) => {
  const socketUrl = `${import.meta.env.VITE_BACK_END_URL}/ws-chat`;

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(socketUrl, null, { withCredentials: true }),
    reconnectDelay: 3000,
    debug: (str) => console.log("debug : " + str),
    onConnect: () => {
      console.log("WebSocket connected");
    },
    onStompError: (frame) => {
      console.error("STOMP Error:", frame.headers["message"], frame.body);
    },
    onWebSocketClose: () => {
      console.warn("WebSocket connection closed");
    },
    onWebSocketError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  stompClient.activate();

  return stompClient;
};

export const subscribeToRoom = (roomId, dispatch, typingTimeouts, callback) => {
  if (stompClient && stompClient.connected) {
    const messageSubscription = stompClient.subscribe(
      `/topic/room/${roomId}`,
      (message) => {
        const body = JSON.parse(message.body);
        callback(body);
      }
    );

    const typingSubscription = stompClient.subscribe(
      `/topic/typing/${roomId}`,
      (message) => {
        const typingObj = JSON.parse(message.body);

        const senderId = typingObj.senderId;

        dispatch({ type: "USER_TYPING", payload: typingObj });
        if (typingTimeouts.current[senderId]) {
          clearTimeout(typingTimeouts.current[senderId]);
        }

        typingTimeouts.current[senderId] = setTimeout(() => {
          dispatch({ type: "STOP_TYPING", payload: senderId });
          delete typingTimeouts.current[senderId];
        }, 2000);
      }
    );

    const activeUserSubscription = stompClient.subscribe(
      `/topic/active/${roomId}`,
      (message) => {
        dispatch({
          type: "SET_ACTIVE_USERS",
          payload: JSON.parse(message.body),
        });
      }
    );

    const deletedMessagesSubscription = stompClient.subscribe(
      `/topic/room/${roomId}/messages-deleted`,
      (message) => {
        const deletedIds = JSON.parse(message.body);
        dispatch({
          type: "REMOVE_DELETED_MESSAGES_FROM_UI",
          payload: deletedIds,
        });
      }
    );

    return {
      unsubscribe: () => {
        messageSubscription.unsubscribe();
        typingSubscription.unsubscribe();
        activeUserSubscription.unsubscribe();
        deletedMessagesSubscription.unsubscribe();
      },
    };
  } else {
    console.error("Client not connected. Cannot subscribe.");
  }
};

export const sendMessage = (roomId, messageObj) => {
  if (stompClient && stompClient.connected) {
    try {
      stompClient.publish({
        destination: `/app/chat.send/${roomId}`,
        body: JSON.stringify(messageObj),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.error("Client not connected. Cannot send message.");
  }
};

export const typingMessage = (roomId, senderId) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: `/app/typing/${roomId}`,
      body: JSON.stringify({ senderId: senderId, typing: true }),
    });
  }
};

export const bringUserActive = (roomId, userId) => {
  console.log("making user active in " + roomId + " : " + userId);
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: `/app/active/${roomId}`,
      body: JSON.stringify({ roomId: roomId, username: userId }),
    });
  }
};

export const bringUserInactive = (roomId, userId) => {
  console.log("making user inactive in " + roomId + " : " + userId);
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: `/app/inactive/${roomId}`,
      body: JSON.stringify({ roomId: roomId, username: userId }),
    });
  }
};
