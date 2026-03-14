import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
 
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
 
import ParentDashboard from "views/parent/Dashboard.js";
import Settings from "views/admin/Settings.js";
import UpdateProfile from "views/admin/UpdateProfile.js";
 
export default function Parent() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/parent/dashboard" exact component={ParentDashboard} />
            <Route path="/parent/settings" exact component={Settings} />
            <Route path="/parent/UpdateProfile" exact component={UpdateProfile} />
            <Redirect from="/parent" to="/parent/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}