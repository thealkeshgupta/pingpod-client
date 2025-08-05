import { motion, AnimatePresence } from "framer-motion";
import { truncateText } from "../../utils";
import { useState } from "react";

const ChatMessage = ({ message, user }) => {
  const [menu, setMenu] = useState(null);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenu({ x: e.pageX, y: e.pageY });
  };

  const handleClick = () => setMenu(null);

  function stringToColor(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let r = (hash >> 0) & 0xff;
    let g = (hash >> 8) & 0xff;
    let b = (hash >> 16) & 0xff;

    r = 80 + (r % 80);
    g = 80 + (g % 80);
    b = 80 + (b % 80);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function isOnlyEmoji(str) {
    // Remove invisible emoji joiners
    const cleaned = str.trim().replace(/\uFE0F/g, "");

    const emojiRegex =
      /^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)+$/gu;

    return emojiRegex.test(cleaned);
  }

  function emojiCount(str) {
    const emojiRegex = /\p{Extended_Pictographic}/gu;
    const matches = [...str.matchAll(emojiRegex)];
    return matches.length;
  }

  return (
    <>
      <AnimatePresence key={message.id}>
        {isOnlyEmoji(message.content) && emojiCount(message.content) < 4 ? (
          <motion.div
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            key={message.id}
            style={{
              position: "relative",
              maxWidth: "300px",
              display: "inline-block",
            }}
            className={`${
              message.senderId === user.id
                ? " self-end rounded-br-none"
                : " self-start rounded-bl-none"
            }`}
          >
            {message.senderId !== user.id ? (
              <p
                className="px-4 min-w-[60%] text-sm font-semibold bg-white rounded-md"
                style={{
                  color: stringToColor(message.senderName),
                }}
              >
                {truncateText(message.senderName)} &nbsp; &nbsp;
                <p
                  className={`text-gray-400 text-xs italic text-right`}
                  style={{
                    display: "inline-block",
                  }}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </p>
            ) : null}
            <p
              className={`${
                emojiCount(message.content) === 1
                  ? "text-5xl"
                  : emojiCount(message.content) === 2
                  ? "text-4xl"
                  : "text-2xl"
              } my-1 `}
            >
              {message.content}
            </p>
            {message.senderId === user.id ? (
              <>
                <p className="whitespace-pre-wrap bg-[#17598f] text-gray-400 text-xs italic text-right rounded-md py-1 px-3">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </>
            ) : null}

            {message.senderId !== user.id ? (
              <div
                style={{
                  content: '""',
                  position: "absolute",
                  left: "-5px",
                  top: "0px",
                  width: "0",
                  height: "0",
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderRight:
                    message.senderId === user.id ? null : "10px solid #ffffff",
                  borderLeft:
                    message.senderId !== user.id ? null : "10px solid #17598f",
                }}
              />
            ) : null}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            key={message.id}
            style={{
              position: "relative",
              padding: "10px 15px",
              borderRadius: "10px",
              maxWidth: "300px",
              display: "inline-block",
            }}
            className={`p-3 max-w-[60%] min-w-[140px] rounded-3xl ${
              message.senderId === user.id
                ? "bg-[#17598f] text-white self-end rounded-br-none"
                : "bg-gray-100 text-gray-700 self-start rounded-bl-none"
            }`}
          >
            {menu && (
              <div
                style={{
                  position: "absolute",
                  top: menu.y,
                  left: menu.x,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                }}
              >
                <div style={{ padding: "8px", cursor: "pointer" }}>
                  Option 1
                </div>
                <div style={{ padding: "8px", cursor: "pointer" }}>
                  Option 2
                </div>
              </div>
            )}
            {message.senderId !== user.id ? (
              <p
                className="text-sm font-semibold"
                style={{
                  color: stringToColor(message.senderName),
                }}
              >
                {truncateText(message.senderName)}
              </p>
            ) : null}
            <p className="whitespace-pre-wrap w-full max-w-xs break-words">
              {message.content}
            </p>
            <p className=" text-gray-400 text-xs italic text-right">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <div
              style={{
                content: '""',
                position: "absolute",
                right: message.senderId === user.id ? "-10px" : null,
                left: message.senderId !== user.id ? "-10px" : null,
                top: "10px",
                width: "0",
                height: "0",
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderRight:
                  message.senderId === user.id ? null : "10px solid #ffffff",
                borderLeft:
                  message.senderId !== user.id ? null : "10px solid #17598f",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatMessage;
