import React, { useEffect, useState } from "react";
import axios from "axios";
 
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const getUser = () => {
  const u = localStorage.getItem("user") || sessionStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
 
export default function PediatreDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ patients: 0, rdv: 0, enAttente: 0 });
 
  useEffect(() => {
    setUser(getUser());
  }, []);
 
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
 
          {/* Message de bienvenue */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-lightBlue-500 flex items-center justify-center text-white text-xl font-bold">
                {user?.firstName?.[0] || "D"}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blueGray-700">
                  Bonjour, Dr. {user?.lastName} {user?.firstName} 👋
                </h2>
                <p className="text-blueGray-400 text-sm">
                  {user?.accountStatus === 'actif'
                    ? "Votre compte est actif — bienvenue sur PediaCare"
                    : "Votre compte est en attente de validation"}
                </p>
              </div>
            </div>
          </div>
 
          {/* Statut du compte */}
          {user?.accountStatus !== 'actif' && (
            <div className="bg-orange-100 border border-orange-300 text-orange-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
              <i className="fas fa-clock text-xl"></i>
              <div>
                <p className="font-semibold">Compte en attente de validation</p>
                <p className="text-sm">L'administrateur va examiner votre dossier. Vous recevrez un email dès que votre compte sera validé.</p>
              </div>
            </div>
          )}
 
          {/* Cards statistiques */}
          <div className="flex flex-wrap">
 
            <div className="w-full lg:w-4/12 px-4 mb-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500 text-white mr-4">
                    <i className="fas fa-child text-xl"></i>
                  </div>
                  <div>
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Mes Patients</h5>
                    <span className="font-semibold text-xl text-blueGray-700">{stats.patients}</span>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="w-full lg:w-4/12 px-4 mb-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500 text-white mr-4">
                    <i className="fas fa-calendar-check text-xl"></i>
                  </div>
                  <div>
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Rendez-vous</h5>
                    <span className="font-semibold text-xl text-blueGray-700">{stats.rdv}</span>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="w-full lg:w-4/12 px-4 mb-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-emerald-500 text-white mr-4">
                    <i className="fas fa-stethoscope text-xl"></i>
                  </div>
                  <div>
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Cabinet</h5>
                    <span className="font-semibold text-sm text-blueGray-700">{user?.adresseCabinet || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
 
          </div>
 
          {/* Infos professionnelles */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blueGray-700 mb-4">
              <i className="fas fa-id-card mr-2 text-lightBlue-500"></i>
              Informations professionnelles
            </h3>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Prénom</p>
                <p className="text-blueGray-700">{user?.firstName || '-'}</p>
              </div>
              <div className="w-full lg:w-3/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Nom</p>
                <p className="text-blueGray-700">{user?.lastName || '-'}</p>
              </div>
              <div className="w-full lg:w-3/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Email</p>
                <p className="text-blueGray-700">{user?.email}</p>
              </div>
              <div className="w-full lg:w-3/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">N° Ordre</p>
                <p className="text-blueGray-700">{user?.numero_ordre || '-'}</p>
              </div>
              <div className="w-full lg:w-3/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Adresse cabinet</p>
                <p className="text-blueGray-700">{user?.adresseCabinet || '-'}</p>
              </div>
              <div className="w-full lg:w-3/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Statut</p>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  user?.accountStatus === 'actif'
                    ? 'bg-green-100 text-green-700'
                    : user?.accountStatus === 'refuse'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {user?.accountStatus}
                </span>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </>
  );
}