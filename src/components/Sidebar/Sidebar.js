/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
 
const getUser = () => {
  const u = localStorage.getItem("user") || sessionStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
 
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const user = getUser();
  const role = user?.role || "admin";
 
  const isActive = (path) => window.location.href.indexOf(path) !== -1;
 
  const linkClass = (path) =>
    "text-xs uppercase py-3 font-bold block " +
    (isActive(path)
      ? "text-lightBlue-500 hover:text-lightBlue-600"
      : "text-blueGray-700 hover:text-blueGray-500");
 
  const iconClass = (path) =>
    "mr-2 text-sm " + (isActive(path) ? "opacity-75" : "text-blueGray-300");
 
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
 
          {/* Toggler mobile */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
 
          {/* Logo */}
          <Link
            className="md:block text-left md:pb-2 text-lightBlue-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            ❤️ PediaCare
          </Link>
 
          {/* User mobile */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
 
          {/* Collapse */}
          <div className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }>
 
            {/* Header mobile collapse */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link className="md:block text-left md:pb-2 text-lightBlue-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" to="/">
                    ❤️ PediaCare
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
 
            <hr className="my-4 md:min-w-full" />
 
            {/* ── ADMIN ── */}
            {role === "admin" && (
              <>
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  Administration
                </h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link className={linkClass("/admin/dashboard")} to="/admin/dashboard">
                      <i className={"fas fa-tv " + iconClass("/admin/dashboard")}></i> Dashboard
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link className={linkClass("/admin/pediatres")} to="/admin/pediatres">
                      <i className={"fas fa-user-md " + iconClass("/admin/pediatres")}></i> Pédiatres
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link className={linkClass("/admin/parents")} to="/admin/parents">
                      <i className={"fas fa-users " + iconClass("/admin/parents")}></i> Parents
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link className={linkClass("/admin/tables")} to="/admin/tables">
                      <i className={"fas fa-table " + iconClass("/admin/tables")}></i> Tables
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link className={linkClass("/admin/maps")} to="/admin/maps">
                      <i className={"fas fa-map-marked " + iconClass("/admin/maps")}></i> Maps
                    </Link>
                  </li>
                </ul>
                <hr className="my-4 md:min-w-full" />
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link className={linkClass("/admin/settings")} to="/admin/settings">
                      <i className={"fas fa-user-cog " + iconClass("/admin/settings")}></i> Mon compte
                    </Link>
                  </li>
                </ul>
              </>
            )}
 
            {/* ── PARENT ── */}
            {role === "parent" && (
              <>
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  Espace Parent
                </h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link className={linkClass("/parent/dashboard")} to="/parent/dashboard">
                      <i className={"fas fa-tv " + iconClass("/parent/dashboard")}></i> Dashboard
                    </Link>
                  </li>
                </ul>
                <hr className="my-4 md:min-w-full" />
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link className={linkClass("/parent/settings")} to="/parent/settings">
                      <i className={"fas fa-user-cog " + iconClass("/parent/settings")}></i> Mon compte
                    </Link>
                  </li>
                </ul>
              </>
            )}
 
            {/* ── PÉDIATRE ── */}
            {role === "pediatre" && (
              <>
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  Espace Pédiatre
                </h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link className={linkClass("/pediatre/dashboard")} to="/pediatre/dashboard">
                      <i className={"fas fa-tv " + iconClass("/pediatre/dashboard")}></i> Dashboard
                    </Link>
                  </li>
                </ul>
                <hr className="my-4 md:min-w-full" />
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link className={linkClass("/pediatre/settings")} to="/pediatre/settings">
                      <i className={"fas fa-user-cog " + iconClass("/pediatre/settings")}></i> Mon compte
                    </Link>
                  </li>
                </ul>
              </>
            )}
 
          </div>
        </div>
      </nav>
    </>
  );
}