import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
 
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
 
    try {
      await axios.post("http://localhost:5000/users/forgotPassword", { email });
      setSuccess(email);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
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
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔑</div>
          <h1 style={{ fontSize: "1.7rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
            Mot de passe oublié ?
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.4rem", fontSize: "0.88rem" }}>
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>
 
        {/* Message erreur */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            color: "#dc2626", padding: "0.75rem 1rem",
            borderRadius: "10px", marginBottom: "1.25rem", fontSize: "0.83rem",
          }}>
            {error}
          </div>
        )}
 
        {/* Message succès */}
        {success && (
          <div style={{
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            color: "#16a34a", padding: "1.5rem",
            borderRadius: "12px", textAlign: "center",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📧</div>
            <p style={{ fontWeight: "700", marginBottom: "0.4rem" }}>Email envoyé !</p>
            <p style={{ fontSize: "0.83rem" }}>
              Un lien de réinitialisation a été envoyé à <strong>{success}</strong>.
            </p>
            <p style={{ fontSize: "0.83rem", marginTop: "0.4rem" }}>
              Vérifiez votre boîte mail et cliquez sur le lien.
            </p>
            <p style={{ fontSize: "0.75rem", marginTop: "0.75rem", color: "#64748b" }}>
              Le lien expire dans 24 heures.
            </p>
          </div>
        )}
 
        {!success && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block", color: "#0f172a",
                fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.4rem",
              }}>
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.com"
                style={{
                  width: "100%", padding: "0.85rem 1rem",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px", color: "#1e293b",
                  fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
 
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "0.9rem",
                background: loading ? "#93c5fd" : "#2563eb",
                color: "#fff", border: "none", borderRadius: "10px",
                fontSize: "0.95rem", fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: "1.25rem",
              }}
            >
              {loading ? "Envoi en cours..." : "Envoyer le lien"}
            </button>
 
          </form>
        )}
 
        {/* Liens */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <Link to="/auth/login" style={{ color: "#2563eb", fontSize: "0.83rem", textDecoration: "none" }}>
            ← Retour à la connexion
          </Link>
          <Link to="/auth/register" style={{ color: "#64748b", fontSize: "0.83rem", textDecoration: "none" }}>
            Créer un compte
          </Link>
        </div>
 
      </div>
    </div>
  );
}