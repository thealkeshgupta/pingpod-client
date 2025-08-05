import React, { useRef, useEffect, useState, useCallback } from "react";

import { MdSend } from "react-icons/md";
import { sendMessage, typingMessage } from "../../service/socketService";
import { useSelector } from "react-redux";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBox = ({ roomId, chatRef }) => {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleOnChange = (e) => {
    setMessage(e.target.value);
    debounceTyping();
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debounceTyping = useCallback(
    debounce(() => typingMessage(roomId, user.id), 500),
    []
  );

  const handleSend = () => {
    if (message !== "") {
      const messageObj = {
        content: message,
        senderId: user.id,
      };
      console.log("sent message");
      sendMessage(roomId, messageObj);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  }, [message]);

  return (
    <div className="flex items-end gap-2 px-2 sm:px-4 py-2 w-full">
      <div className="flex items-end gap-2 relative w-full">
        {/* Textarea + Emoji Button wrapper */}
        <div className="relative flex-1 min-w-0">
          {showPicker && (
            <div
              ref={pickerRef}
              className="absolute bottom-12 right-2 z-50 w-[300px] sm:w-[350px] scale-[0.85] sm:scale-100 origin-bottom-right"
            >
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleOnChange}
            rows={1}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full resize-none overflow-y-auto px-4 pr-10 py-2 font-medium rounded-md border text-gray-800 border-gray-300 bg-white text-sm focus:outline-none"
            style={{ maxHeight: "136px" }}
          />

          {/* Emoji button inside the textarea container */}
          <button
            type="button"
            onClick={() => setShowPicker((prev) => !prev)}
            className="absolute bottom-2 right-3 p-1 rounded hover:bg-gray-100"
          >
            <RiEmojiStickerLine className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          className="bg-accent-hover text-white rounded px-3 sm:px-4 py-2 flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors duration-200 h-[40px] flex-shrink-0"
        >
          <MdSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};
export default MessageBox;
