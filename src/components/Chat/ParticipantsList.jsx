import { useState } from "react";
import { isAdmin, isOwner, truncateText } from "../../utils";
import NameAvatar from "./NameAvatar";
import { AiFillEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUser,
  toggleAdminAccess,
} from "../../redux/actions/MessageAction";
import toast from "react-hot-toast";
import { ImExit } from "react-icons/im";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  deleteChatRoom,
  exitChatRoom,
} from "../../redux/actions/ChatRoomsAction";
import { useNavigate } from "react-router-dom";
import PulseDot from "react-pulse-dot";
import "react-pulse-dot/dist/index.css";
import { Tooltip } from "@mui/material";

const ParticipantsList = ({ room }) => {
  const [enableEdit, setEnableEdit] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const { typingUsers, activeUsers } = useSelector((state) => state.chatRoom);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleToggleAdminAccess = (userId) => {
    dispatch(toggleAdminAccess(room.roomId, userId, toast));
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(room.roomId, userId, toast));
  };

  const [exitModal, showExitModal] = useState(false);

  const [deleteModal, showDeleteModal] = useState(false);

  return (
    <div className="w-full  border rounded-md shadow-sm bg-white">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-600">
          Members ({room.members.length})
        </h2>
        <div>
          {isOwner(room, user.id) || isAdmin(room, user.id) ? (
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200 mr-3"
              onClick={() => {
                setEnableEdit(!enableEdit);
              }}
            >
              {enableEdit ? <FaCheck size={14} /> : <AiFillEdit size={14} />}
            </button>
          ) : null}

          {isOwner(room, user.id) ? (
            <button
              type="button"
              className="text-red-800 hover:text-red-950 p-1 rounded hover:bg-gray-200"
              onClick={() => {
                showDeleteModal(true);
              }}
            >
              <RiDeleteBin5Fill size={14} />
            </button>
          ) : (
            <button
              type="button"
              className="text-red-800 hover:text-red-950 p-1 rounded hover:bg-gray-200"
              onClick={() => {
                showExitModal(true);
              }}
            >
              <ImExit size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {room.members.map((member, idx) => (
          <div>
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-2 border-b hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <NameAvatar name={member.user.name} size={35} />

                <div className="flex items-center justify-center flex-col">
                  <div className="flex items-center text-sm gap-1 font-medium text-gray-700">
                    {truncateText(member.user.name, 30)}{" "}
                    {member.user.userId === user.id ? (
                      <div className="text-gray-400 bold">(You)</div>
                    ) : null}
                    {activeUsers.some(
                      (activeUser) => activeUser === member.user.userId
                    ) ? (
                      <div className="flex items-end ml-1 space-x-1">
                        <Tooltip title="Active in this room">
                          <PulseDot
                            color="success"
                            style={{ fontSize: "0.7em" }}
                          />
                        </Tooltip>
                      </div>
                    ) : null}
                    {member.user.userId !== user.id &&
                    typingUsers.some(
                      (typingUser) => typingUser.senderId === member.user.userId
                    ) ? (
                      <div className="flex items-end ml-1 space-x-1">
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-wave-pause"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-wave-pause"
                          style={{ animationDelay: "200ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-wave-pause"
                          style={{ animationDelay: "400ms" }}
                        ></span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-center items-center">
                {isOwner(room, member.user.userId) ? (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-600">
                    Owner
                  </span>
                ) : isAdmin(room, member.user.userId) ? (
                  !enableEdit ? (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-600">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        handleToggleAdminAccess(member.user.userId)
                      }
                      className="flex items-center justify-center text-xs px-2 py-0.5 rounded-full font-medium border-[1px] border-dashed border-red-700 bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      Admin
                      <ImCross className="ml-2" size={8} />
                    </button>
                  )
                ) : !enableEdit ? null : (
                  <button
                    onClick={() => handleToggleAdminAccess(member.user.userId)}
                    className="flex items-center justify-center text-xs px-2 py-0.5 rounded-full font-medium border-[1px] border-dashed border-green-700 bg-green-100  text-green-700 hover:bg-green-200 transition"
                  >
                    Admin
                    <FaPlus className="ml-2" size={10} />
                  </button>
                )}

                {!isOwner(room, member.user.userId) && enableEdit ? (
                  <button
                    onClick={() => {
                      handleRemoveUser(member.user.userId);
                    }}
                    className="flex items-center justify-center text-xs p-1 max-h-fit rounded-full font-medium border-[1px] border-solid border-red-700 bg-red-100 text-red-700 hover:bg-red-200 transition"
                  >
                    <ImCross size={8} />
                  </button>
                ) : null}
              </div>
            </div>
            <hr className="border-t border-blue-100" />
          </div>
        ))}
      </div>
      <Modal open={exitModal} onClose={() => showExitModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Stack direction={"row"} spacing={1}>
            <ImExit size={26} style={{ color: "#961600" }} />
            <Typography variant="h6" sx={{ color: "#961600" }}>
              <b>Exit Group</b>
            </Typography>
          </Stack>
          <Typography variant="subtitle">
            Do you want to exit the group?
          </Typography>
          <Stack direction={"row"} sx={{ mt: 2 }} spacing={1}>
            <Button
              sx={{ background: "#961600", color: "#FFFFFF" }}
              onClick={() => {
                dispatch(exitChatRoom(room.roomId, toast, navigate));
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                showExitModal(false);
              }}
            >
              {" "}
              No
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal open={deleteModal} onClose={() => showDeleteModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Stack direction={"row"} spacing={1}>
            <RiDeleteBin5Fill size={26} style={{ color: "#961600" }} />
            <Typography variant="h6" sx={{ color: "#961600" }}>
              <b>Delete Group</b>
            </Typography>
          </Stack>
          <Typography variant="subtitle">
            Do you want to delete the group?
          </Typography>
          <Stack direction={"row"} sx={{ mt: 2 }} spacing={1}>
            <Button
              sx={{ background: "#961600", color: "#FFFFFF" }}
              onClick={() => {
                dispatch(deleteChatRoom(room.roomId, toast, navigate));
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                showDeleteModal(false);
              }}
            >
              {" "}
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ParticipantsList;
