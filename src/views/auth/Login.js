import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
 
export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
 
    try {
      const res = await axios.post("http://localhost:5000/users/login", { email, password });
      const { user, token } = res.data;
 
      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }
 
      if (user.role === "admin") history.push("/admin/dashboard");
      else if (user.role === "parent") history.push("/parent/dashboard");
      else if (user.role === "pediatre") history.push("/pediatre/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };
 
  const inputStyle = {
    width: "100%", padding: "0.85rem 1rem",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "10px", color: "#1e293b",
    fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
  };
 
  const labelStyle = {
    display: "block", color: "#475569",
    fontSize: "0.85rem", fontWeight: "600",
    marginBottom: "0.4rem",
  };
 
  return (
    <div style={{ width: "100%" }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2.5rem",
        width: "100%",
      }}>
 
        {/* Titre */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
            Connexion
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.4rem", fontSize: "0.88rem" }}>
            Accédez à votre espace personnel
          </p>
        </div>
 
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            color: "#dc2626", padding: "0.75rem 1rem",
            borderRadius: "10px", marginBottom: "1.25rem", fontSize: "0.83rem",
          }}>
            {error}
          </div>
        )}
 
        <form onSubmit={handleSubmit}>
 
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email" autoComplete="off"
              value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder="vous@exemple.com"
              style={inputStyle}
            />
          </div>
 
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Mot de passe</label>
            <input
              type="password" autoComplete="new-password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="••••••••"
              style={inputStyle}
            />
          </div>
 
          {/* Rester connecté + Mot de passe oublié */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input
                type="checkbox" checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: "15px", height: "15px", accentColor: "#2563eb", cursor: "pointer" }}
              />
              <span style={{ color: "#64748b", fontSize: "0.83rem" }}>Rester connecté</span>
            </label>
            <Link to="/auth/ForgetPassword" style={{ color: "#2563eb", fontSize: "0.83rem", textDecoration: "none" }}>
              Mot de passe oublié ?
            </Link>
          </div>
 
          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "0.9rem",
              background: loading ? "#93c5fd" : "#2563eb",
              color: "#fff", border: "none", borderRadius: "10px",
              fontSize: "0.95rem", fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "1.25rem",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
 
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", margin: 0 }}>
            Pas encore de compte ?{" "}
            <Link to="/auth/register" style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>
              Créer un compte
            </Link>
          </p>
 
        </form>
      </div>
    </div>
  );
}
 