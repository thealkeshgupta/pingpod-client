import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

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
function stringAvatar(name, size) {
  const nameParts = name.trim().split(" ");
  const initials =
    nameParts.length === 1
      ? nameParts[0][0]
      : `${nameParts[0][0]}${nameParts[1][0]}`;

  return {
    sx: {
      height: size / 10 + "vh",
      width: size / 10 + "vh",
      fontSize: size * 0.04 + "vh",
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
}

const NameAvatar = ({ name, size, showBorder }) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        border: showBorder ? "2px dashed " + stringToColor(name) : null, // light green bg
        padding: "0.6vh", // creates gap between border and avatar
        borderRadius: "50%", // optional: makes border round
      }}
    >
      <Avatar {...stringAvatar(name, size)} />
    </Box>
  );
};
export default NameAvatar;
