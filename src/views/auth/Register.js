import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
 
export default function Register() {
  const history = useHistory();
  const [role, setRole] = useState("parent");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
  const [formData, setFormData] = useState({
    firstName: "", lastName: "",
    email: "", password: "", confirmPassword: "",
    age: "", conditionsAccepted: false,
    numero_ordre: "", adresseCabinet: "",
  });
 
  const [justificatif, setJustificatif] = useState(null);
  const [imageUser, setImageUser] = useState(null);
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
 
    if (formData.password !== formData.confirmPassword) return setError("Les mots de passe ne correspondent pas.");
    if (role === "parent" && !formData.conditionsAccepted) return setError("Vous devez accepter les conditions d'utilisation.");
    if (role === "pediatre" && !justificatif) return setError("Le justificatif est obligatoire.");
 
    setLoading(true);
    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("username", `${formData.firstName} ${formData.lastName}`);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("age", formData.age);
 
      if (role === "parent") {
        data.append("conditionsAccepted", formData.conditionsAccepted);
        if (imageUser) data.append("image_User", imageUser);
        await axios.post("http://localhost:5000/users/addParent", data);
        setSuccess("parent");
      } else {
        data.append("numero_ordre", formData.numero_ordre);
        data.append("adresseCabinet", formData.adresseCabinet);
        data.append("justificatif", justificatif);
        if (imageUser) data.append("image_User", imageUser);
        await axios.post("http://localhost:5000/users/addPediatre", data);
        setSuccess("pediatre");
      }
      setTimeout(() => history.push("/auth/login"), 8000);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };
 
  const input = {
    width: "100%", padding: "0.75rem 1rem",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "10px", color: "#1e293b",
    fontSize: "0.88rem", outline: "none", boxSizing: "border-box",
  };
 
  const lbl = {
    display: "block", color: "#0f172a",
    fontSize: "0.82rem", fontWeight: "600",
    marginBottom: "0.35rem",
  };
 
  const field = { marginBottom: "0.85rem" };
 
  return (
    <div style={{ width: "100%" }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem",
        width: "100%",
      }}>
 
        {/* Titre */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <h1 style={{ fontSize: "1.7rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
            Créer un compte
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.3rem", fontSize: "0.85rem" }}>
            Rejoignez PediaCare en quelques étapes
          </p>
        </div>
 
        {/* Toggle rôle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
          <div style={{
            display: "flex",
            background: "#f1f5f9",
            borderRadius: "12px",
            padding: "4px", gap: "4px",
          }}>
            {["parent", "pediatre"].map((r) => (
              <button key={r} type="button" onClick={() => setRole(r)} style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "9px", fontSize: "0.85rem", fontWeight: "600",
                cursor: "pointer", border: "none",
                background: role === r ? "#2563eb" : "transparent",
                color: role === r ? "#fff" : "#64748b",
                transition: "all 0.2s",
              }}>
                {r === "parent" ? "👨‍👩‍👧 Parent" : "👨‍⚕️ Pédiatre"}
              </button>
            ))}
          </div>
        </div>
 
        {/* Messages */}
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "0.75rem 1rem", borderRadius: "10px", marginBottom: "1rem", fontSize: "0.83rem" }}>
            {error}
          </div>
        )}
 
        {success === "parent" && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📧</div>
            <p style={{ fontWeight: "700", marginBottom: "0.4rem" }}>Inscription réussie !</p>
            <p style={{ fontSize: "0.83rem" }}>Un email de vérification a été envoyé à <strong>{formData.email}</strong>.</p>
            <p style={{ fontSize: "0.75rem", marginTop: "0.75rem", color: "#64748b" }}>Redirection dans 8 secondes...</p>
          </div>
        )}
 
        {success === "pediatre" && (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
            <p style={{ fontWeight: "700", marginBottom: "0.4rem" }}>Dossier reçu !</p>
            <p style={{ fontSize: "0.83rem" }}>Votre dossier est en cours de vérification par l'administrateur.</p>
            <p style={{ fontSize: "0.75rem", marginTop: "0.75rem", color: "#64748b" }}>Redirection dans 8 secondes...</p>
          </div>
        )}
 
        {!success && (
          <form onSubmit={handleSubmit}>
 
            {/* 2 colonnes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
 
              {/* Colonne gauche */}
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.85rem" }}>
                  
                  <div>
                    <label style={lbl}>Prénom</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Prénom" style={input} />
                  </div>
                  <div>
                    <label style={lbl}>Nom</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Nom" style={input} />
                  </div>
                </div>
 
                <div style={field}>
                  <label style={lbl}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="vous@exemple.com" style={input} />
                </div>
 
                <div style={field}>
                  <label style={lbl}>Âge</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="Âge" style={input} />
                </div>
 
                <div style={field}>
                  <label style={lbl}>Photo de profil (optionnel)</label>
                  <input type="file" accept="image/*" onChange={(e) => setImageUser(e.target.files[0])}
                    style={{ ...input, padding: "0.5rem 1rem", cursor: "pointer" }} />
                </div>
              </div>
 
              {/* Colonne droite */}
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.85rem" }}>
                  <div>
                    <label style={lbl}>Mot de passe</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" style={input} />
                  </div>
                  <div>
                    <label style={lbl}>Confirmer</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" style={input} />
                  </div>
                </div>
 
                {role === "pediatre" && (
                  <>
                    <div style={field}>
                      <label style={lbl}>Numéro d'ordre</label>
                      <input type="text" name="numero_ordre" value={formData.numero_ordre} onChange={handleChange} required placeholder="Numéro d'ordre" style={input} />
                    </div>
                    <div style={field}>
                      <label style={lbl}>Adresse du cabinet</label>
                      <input type="text" name="adresseCabinet" value={formData.adresseCabinet} onChange={handleChange} required placeholder="Adresse" style={input} />
                    </div>
                    <div style={field}>
                      <label style={lbl}>Justificatif *</label>
                      <input type="file" accept=".pdf,image/*" onChange={(e) => setJustificatif(e.target.files[0])} required
                        style={{ ...input, padding: "0.5rem 1rem", cursor: "pointer" }} />
                      <p style={{ color: "#94a3b8", fontSize: "0.72rem", marginTop: "0.3rem" }}>Validé par l'administrateur.</p>
                    </div>
                  </>
                )}
 
                {role === "parent" && (
                  <div style={{ marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <input type="checkbox" name="conditionsAccepted" checked={formData.conditionsAccepted} onChange={handleChange}
                      style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#2563eb" }} />
                    <span style={{ fontSize: "0.82rem", color: "#475569" }}>
                      J'accepte les{" "}
                      <a href="#pablo" style={{ color: "#2563eb", textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
                        conditions d'utilisation
                      </a>
                    </span>
                  </div>
                )}
 
                <button type="submit" disabled={loading} style={{
                  width: "100%", padding: "0.85rem",
                  background: loading ? "#93c5fd" : "#2563eb",
                  color: "#fff", border: "none", borderRadius: "10px",
                  fontSize: "0.9rem", fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                }}>
                  {loading ? "Inscription en cours..." : "Créer mon compte"}
                </button>
 
                <div style={{ textAlign: "center", marginTop: "0.85rem" }}>
                  <Link to="/auth/ForgetPassword" style={{ color: "#2563eb", fontSize: "0.78rem", textDecoration: "none" }}>
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
            </div>
 
          </form>
        )}
 
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", margin: "1rem 0 0" }}>
          Déjà un compte ?{" "}
          <Link to="/auth/login" style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>
            Se connecter
          </Link>
        </p>
 
      </div>
    </div>
  );
}