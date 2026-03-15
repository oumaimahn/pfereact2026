import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
 
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const getUser = () => {
  const u = localStorage.getItem("user") || sessionStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
 
export default function UserDropdown() {
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const user = getUser();
 
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/users/logout", {}, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
    } catch (e) {
      console.error("Logout error:", e);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    history.push("/auth/login");
  };
 
  return (
    <>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-blueGray-500 flex items-center gap-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-lightBlue-500 flex items-center justify-center text-white text-sm font-bold">
            {user?.firstName?.[0] || user?.username?.[0] || "U"}
          </div>
          <span className="text-sm font-semibold text-white hidden lg:block">
            {user?.firstName} {user?.lastName}
          </span>
          <i className="fas fa-chevron-down text-white text-xs"></i>
        </button>
 
        {dropdownOpen && (
          <>
            {/* Overlay pour fermer */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-blueGray-100">
                <p className="text-sm font-semibold text-blueGray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-blueGray-400 capitalize">{user?.role}</p>
              </div>
 
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (user?.role === "admin") history.push("/admin/settings");
                  else if (user?.role === "parent") history.push("/parent/settings");
                  else if (user?.role === "pediatre") history.push("/pediatre/settings");
                }}
                className="w-full text-left px-4 py-2 text-sm text-blueGray-600 hover:bg-blueGray-50 flex items-center gap-2"
              >
                <i className="fas fa-user-cog text-blueGray-400"></i>
                Mon profil
              </button>
 
              <div className="border-t border-blueGray-100">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <i className="fas fa-sign-out-alt text-red-400"></i>
                  Se déconnecter
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
 