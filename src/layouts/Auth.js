import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "components/Navbars/AuthNavbar.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import ForgetPassword from "views/auth/ForgetPassword";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main style={{ display: "flex", minHeight: "100vh" }}>

        {/* PARTIE GAUCHE — Photo */}
        <div style={{
          width: "45%",
          minHeight: "100vh",
          backgroundImage: "url(" + require("assets/img/pediacare_bg.jpg").default + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          left: 0,
          top: 0,
        }} />

        {/* PARTIE DROITE — Formulaire blanc */}
        <div style={{
          marginLeft: "45%",
          width: "55%",
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}>
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Switch>
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/ForgetPassword" exact component={ForgetPassword} />
              <Route path="/auth/register" exact component={Register} />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
          </div>
        </div>

      </main>
    </>
  );
}