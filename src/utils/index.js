import CryptoJS from "crypto-js";

export const isOwner = (room, userId) => {
  return room.owner?.userId === userId;
};

export const isAdmin = (room, userId) => {
  if (room.owner?.userId === userId) return false;

  return room.members?.some(
    (member) => member.user?.userId === userId && member.admin === true
  );
};

export const encryptData = (data, secretKey) => {
  const ciphercode = CryptoJS.AES.encrypt(
    data,
    secretKey + import.meta.env.VITE_CRYPTOJS_SECRET_KEY
  ).toString();

  return encodeURIComponent(ciphercode);
};

export const decryptData = (ciphercode, secretKey) => {
  const decodedCipher = decodeURIComponent(ciphercode);
  const bytes = CryptoJS.AES.decrypt(
    decodedCipher,
    secretKey + import.meta.env.VITE_CRYPTOJS_SECRET_KEY
  );
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export const truncateText = (text, charLimit = 20) => {
  if (text.length > charLimit) {
    return text.slice(0, charLimit) + "...";
  }
  return text;
};

export const formatChatDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
