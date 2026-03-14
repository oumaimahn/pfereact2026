import React, { useEffect, useState } from "react";
import axios from "axios";
 
export default function ParentDashboard() {
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
 
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
 
          {/* Message de bienvenue */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blueGray-700 mb-2">
              Bonjour, {user?.firstName || user?.username} 👋
            </h2>
            <p className="text-blueGray-500 text-sm">
              Bienvenue sur votre espace parent. Gérez vos enfants et vos rendez-vous ici.
            </p>
          </div>
 
          {/* Cards statistiques */}
          <div className="flex flex-wrap">
 
            <div className="w-full lg:w-4/12 px-4 mb-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
                <div className="flex items-center">
                  <div className="relative p-3 inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500 text-white mr-4">
                    <i className="fas fa-child text-xl"></i>
                  </div>
                  <div>
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Mes Enfants</h5>
                    <span className="font-semibold text-xl text-blueGray-700">0</span>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="w-full lg:w-4/12 px-4 mb-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
                <div className="flex items-center">
                  <div className="relative p-3 inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500 text-white mr-4">
                    <i className="fas fa-calendar text-xl"></i>
                  </div>
                  <div>
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Rendez-vous</h5>
                    <span className="font-semibold text-xl text-blueGray-700">0</span>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="w-full lg:w-4/12 px-4 mb-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
                <div className="flex items-center">
                  <div className="relative p-3 inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500 text-white mr-4">
                    <i className="fas fa-user-md text-xl"></i>
                  </div>
                  <div>
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Mon Pédiatre</h5>
                    <span className="font-semibold text-xl text-blueGray-700">-</span>
                  </div>
                </div>
              </div>
            </div>
 
          </div>
 
          {/* Infos du compte */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blueGray-700 mb-4">Mon compte</h3>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Nom complet</p>
                <p className="text-blueGray-700">{user?.firstName} {user?.lastName}</p>
              </div>
              <div className="w-full lg:w-6/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Email</p>
                <p className="text-blueGray-700">{user?.email}</p>
              </div>
              <div className="w-full lg:w-6/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Rôle</p>
                <p className="text-blueGray-700 capitalize">{user?.role}</p>
              </div>
              <div className="w-full lg:w-6/12 px-2 mb-3">
                <p className="text-blueGray-400 text-xs uppercase font-bold">Statut</p>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  user?.accountStatus === 'actif' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
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
 