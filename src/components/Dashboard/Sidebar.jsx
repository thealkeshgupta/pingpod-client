// Sidebar.js
import { FaComments, FaPlus, FaDoorOpen, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  menuIndex,
  setMenuIndex,
  isMobile = false,
  showSidebar,
  setShowSidebar,
}) => {
  const menuItems = [
    { icon: <FaComments />, label: "Chat Rooms" },
    { icon: <FaPlus />, label: "Add Room" },
    { icon: <FaDoorOpen />, label: "Join Room" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logOutUser(navigate));
    if (isMobile) setShowSidebar(false);
  };

  if (isMobile) {
    return (
      <div className="max-h-[calc(100vh-70px)] flex flex-col justify-between bg-white shadow-md p-4 h-full">
        {/* Close button for mobile drawer */}
        {showSidebar && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowSidebar(false)}
              className="text-xl text-gray-500"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex flex-col gap-2 px-4 pb-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  setMenuIndex(index);
                  setShowSidebar(false);
                }}
                className={`flex items-center gap-3 h-12 px-4 ${
                  menuIndex !== index
                    ? "bg-bg-inverted hover:bg-blue-200 cursor-pointer"
                    : "bg-bg-deep"
                } rounded `}
              >
                <span
                  className={`${
                    menuIndex !== index
                      ? "text-text-secondary"
                      : "text-text-inverted"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`${
                    menuIndex !== index
                      ? "text-text-secondary"
                      : "text-text-inverted"
                  } font-medium`}
                >
                  {item.label}
                </span>
              </div>
              <hr className="border-t border-blue-800" />
            </div>
          ))}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={logOutHandler}
            className="w-full h-12 flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 rounded shadow-[0_4px_0_#c53030] active:translate-y-1 active:shadow-none transition duration-150"
          >
            <FaSignOutAlt />
            <span className="font-semibold">Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  // Desktop Sidebar (¼ screen width)
  return (
    <div className="max-h-[calc(100vh-70px)] flex flex-col justify-between h-screen bg-bg-soft shadow-md p-4 min-h-[calc(100vh-70px)]">
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => setMenuIndex(index)}
              className={`flex items-center gap-3 h-12 px-4 ${
                menuIndex !== index
                  ? "bg-bg-inverted hover:bg-blue-200 cursor-pointer"
                  : "bg-bg-deep"
              } rounded `}
            >
              <span
                className={`${
                  menuIndex !== index
                    ? "text-text-secondary"
                    : "text-text-inverted"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`${
                  menuIndex !== index
                    ? "text-text-secondary"
                    : "text-text-inverted"
                } font-medium`}
              >
                {item.label}
              </span>
            </div>
            <hr className="border-t border-blue-100" />
          </div>
        ))}
      </div>

      <div className="px-4">
        <button
          onClick={logOutHandler}
          className="w-full h-12 flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 rounded shadow-[0_4px_0_#c53030] active:translate-y-1 active:shadow-none transition duration-150"
        >
          <FaSignOutAlt />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
