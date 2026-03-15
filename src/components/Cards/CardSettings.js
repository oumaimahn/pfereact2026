import React, { useState, useEffect } from "react";
import axios from "axios";
 
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const getUser = () => {
  const u = localStorage.getItem("user") || sessionStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
const saveUser = (user) => {
  if (localStorage.getItem("token")) localStorage.setItem("user", JSON.stringify(user));
  else sessionStorage.setItem("user", JSON.stringify(user));
};
 
export default function CardSettings() {
  const user = getUser();
  const [loading, setLoading] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [successPwd, setSuccessPwd] = useState("");
  const [errorPwd, setErrorPwd] = useState("");
  const [imageFile, setImageFile] = useState(null);
 
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    adresseCabinet: user?.adresseCabinet || "",
  });
 
  const [pwdData, setPwdData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
 
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handlePwdChange = (e) => {
    setPwdData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
 
    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("age", formData.age);
      if (user?.role === "pediatre") data.append("adresseCabinet", formData.adresseCabinet);
      if (imageFile) data.append("image_User", imageFile);
 
      const res = await axios.put(
        `http://localhost:5000/users/updateUser/${user._id}`,
        data,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
 
      saveUser({ ...user, ...res.data.user });
      setSuccess("Profil mis à jour avec succès !");
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorPwd(""); setSuccessPwd("");
 
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      return setErrorPwd("Les mots de passe ne correspondent pas.");
    }
 
    setLoadingPwd(true);
    try {
      await axios.put(
        "http://localhost:5000/users/changePassword",
        pwdData,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setSuccessPwd("Mot de passe modifié avec succès !");
      setPwdData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setErrorPwd(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoadingPwd(false);
    }
  };
 
  const inputClass = "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150";
  const labelClass = "block uppercase text-blueGray-600 text-xs font-bold mb-2";
 
  return (
    <>
      {/* ── Informations du profil ── */}
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between items-center">
            <h6 className="text-blueGray-700 text-xl font-bold">Mon compte</h6>
            <span className="text-xs text-blueGray-400 capitalize bg-blueGray-100 px-3 py-1 rounded-full">
              {user?.role}
            </span>
          </div>
        </div>
 
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleUpdateProfile}>
 
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm mt-4">
                ✅ {success}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm mt-4">
                {error}
              </div>
            )}
 
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informations personnelles
            </h6>
 
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Prénom</label>
                  <input type="text" name="firstName" value={formData.firstName}
                    onChange={handleChange} className={inputClass} placeholder="Prénom" />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Nom</label>
                  <input type="text" name="lastName" value={formData.lastName}
                    onChange={handleChange} className={inputClass} placeholder="Nom" />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Email</label>
                  <input type="email" value={user?.email || ""} disabled
                    className="border-0 px-3 py-3 text-blueGray-400 bg-blueGray-100 rounded text-sm shadow w-full cursor-not-allowed"
                  />
                  <p className="text-xs text-blueGray-400 mt-1">L'email ne peut pas être modifié.</p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Âge</label>
                  <input type="number" name="age" value={formData.age}
                    onChange={handleChange} className={inputClass} placeholder="Âge" />
                </div>
              </div>
 
              {/* Champ pédiatre uniquement */}
              {user?.role === "pediatre" && (
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className={labelClass}>Adresse du cabinet</label>
                    <input type="text" name="adresseCabinet" value={formData.adresseCabinet}
                      onChange={handleChange} className={inputClass} placeholder="Adresse du cabinet" />
                  </div>
                </div>
              )}
 
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Photo de profil</label>
                  <input type="file" accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="border-0 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow w-full cursor-pointer"
                  />
                </div>
              </div>
            </div>
 
            <div className="flex justify-end px-4 mt-4">
              <button type="submit" disabled={loading}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50">
                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
              </button>
            </div>
 
          </form>
        </div>
      </div>
 
      {/* ── Changer le mot de passe ── */}
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <h6 className="text-blueGray-700 text-xl font-bold">Changer le mot de passe</h6>
        </div>
 
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleChangePassword}>
 
            {successPwd && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm mt-4">
                ✅ {successPwd}
              </div>
            )}
            {errorPwd && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm mt-4">
                {errorPwd}
              </div>
            )}
 
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Sécurité
            </h6>
 
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Ancien mot de passe</label>
                  <input type="password" name="oldPassword" value={pwdData.oldPassword}
                    onChange={handlePwdChange} required className={inputClass} placeholder="••••••••" />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Nouveau mot de passe</label>
                  <input type="password" name="newPassword" value={pwdData.newPassword}
                    onChange={handlePwdChange} required className={inputClass} placeholder="••••••••" />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className={labelClass}>Confirmer</label>
                  <input type="password" name="confirmPassword" value={pwdData.confirmPassword}
                    onChange={handlePwdChange} required className={inputClass} placeholder="••••••••" />
                </div>
              </div>
            </div>
 
            <div className="flex justify-end px-4 mt-4">
              <button type="submit" disabled={loadingPwd}
                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50">
                {loadingPwd ? "Modification..." : "Changer le mot de passe"}
              </button>
            </div>
 
          </form>
        </div>
      </div>
    </>
  );
}
 