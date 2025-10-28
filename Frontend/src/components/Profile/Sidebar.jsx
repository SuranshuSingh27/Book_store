import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // useSelector is needed
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- FIX: Get the role from the Redux store ---
  const role = useSelector((state) => state.auth.role);

  if (!data) {
    return (
      <div className="bg-zinc-800 p-4 rounded h-full flex items-center justify-center">
        <p className="text-zinc-300">Loading...</p>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full w-full sm:w-[250px]">
      {/* Profile Section */}
      <div className="flex items-center flex-col justify-center text-center">
        <img
          src={data.avatar}
          className="h-[10vh] sm:h-[12vh] w-auto rounded-full object-cover"
          alt="User Avatar"
        />
        <p className="mt-3 text-lg sm:text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-sm sm:text-base text-zinc-300 break-words px-2">
          {data.email}
        </p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {/* Links Section - This will now work correctly */}
      {role === "user" && (
        <div className="w-full flex flex-col items-center justify-center mt-6 lg:mt-0">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm sm:text-base"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full py-2 mt-2 sm:mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm sm:text-base"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2 mt-2 sm:mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300 text-sm sm:text-base"
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="h-screen w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
          >
            Add Book
          </Link>
        </div>
      )}

      {/* Logout Button */}
      <button
        className="bg-zinc-900 w-4/6 sm:w-3/6 lg:w-full mt-6 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded transition-all duration-300 hover:bg-white hover:text-zinc-900 text-sm sm:text-base"
        onClick={handleLogout}
      >
        Log Out <FaArrowRightFromBracket className="ms-2 sm:ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;