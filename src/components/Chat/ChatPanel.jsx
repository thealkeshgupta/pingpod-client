import React, { useRef, useEffect, useState } from "react";

import { MdSend } from "react-icons/md";
import MessageBox from "./MessageBox";
import ChatHistory from "./ChatHistory";
import { useSelector } from "react-redux";

const ChatPanel = ({ roomId, showDeleteSelection, setShowDeleteSelection }) => {
  const chatRef = useRef(null);

  const { typingUsers, roomInfo } = useSelector((state) => state.chatRoom);
  const { user } = useSelector((state) => state.auth);

  const showTypingMessage = () => {
    if (typingUsers.length > 0) {
      let typingUsersName = [];

      typingUsers.forEach((typer) => {
        if (typer.senderId !== user.id) {
          roomInfo.members.map((member) => {
            if (typer.senderId === member.user.userId) {
              typingUsersName.push(member.user.name);
            }
          });
        }
      });

      if (typingUsers.length === 1 && typingUsers[0].senderId === user.id)
        return null;

      return typingUsersName.length === 1
        ? `${typingUsersName[0]} is typing...`
        : typingUsersName.length === 2
        ? `${typingUsersName[0]} and ${typingUsersName[1]} are typing...`
        : `${typingUsersName[0]} and ${
            typingUsersName.length - 1
          } others are typing...`;
    } else return null;
  };

  return (
    <div className="flex flex-col  h-[92vh] bg-custom-gradient shadow-md p-4">
      <div ref={chatRef} className="flex-1 min-h-0 overflow-y-auto pr-2">
        <ChatHistory
          roomId={roomId}
          chatRef={chatRef}
          showDeleteSelection={showDeleteSelection}
          setShowDeleteSelection={setShowDeleteSelection}
        />
      </div>

      <div className="flex text-base text-gray-300 italic pl-8 ">
        {showTypingMessage()}
      </div>
      <div className="flex items-center justify-center">
        <MessageBox roomId={roomId} chatRef={chatRef} />
      </div>
    </div>
  );
};
export default ChatPanel;
