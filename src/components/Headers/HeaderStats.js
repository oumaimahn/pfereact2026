import React, { useEffect, useState } from "react";
import CardStats from "components/Cards/CardStats.js";
import axios from "axios";
 
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const getUser = () => {
  const u = localStorage.getItem("user") || sessionStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
 
export default function HeaderStats() {
  const user = getUser();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPediatres: 0,
    totalParents: 0,
    enAttente: 0,
  });
 
  useEffect(() => {
    if (user?.role === "admin") {
      axios.get("http://localhost:5000/users/getAllUsers", {
        headers: { Authorization: `Bearer ${getToken()}` }
      }).then((res) => {
        const users = res.data.UserList || [];
        setStats({
          totalUsers: users.length,
          totalPediatres: users.filter(u => u.role === "pediatre").length,
          totalParents: users.filter(u => u.role === "parent").length,
          enAttente: users.filter(u => u.accountStatus === "en_attente").length,
        });
      }).catch(() => {});
    }
  }, []);
 
  return (
    <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
 
              {/* Admin stats */}
              {user?.role === "admin" && (
                <>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Utilisateurs totaux"
                      statTitle={String(stats.totalUsers)}
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-emerald-500"
                      statDescripiron="tous rôles confondus"
                      statIconName="fas fa-users"
                      statIconColor="bg-red-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Pédiatres"
                      statTitle={String(stats.totalPediatres)}
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-emerald-500"
                      statDescripiron="pédiatres inscrits"
                      statIconName="fas fa-user-md"
                      statIconColor="bg-orange-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Parents"
                      statTitle={String(stats.totalParents)}
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-emerald-500"
                      statDescripiron="parents inscrits"
                      statIconName="fas fa-child"
                      statIconColor="bg-pink-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="En attente"
                      statTitle={String(stats.enAttente)}
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-orange-500"
                      statDescripiron="comptes à valider"
                      statIconName="fas fa-clock"
                      statIconColor="bg-lightBlue-500"
                    />
                  </div>
                </>
              )}
 
              {/* Parent stats */}
              {user?.role === "parent" && (
                <>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Mes enfants"
                      statTitle="0"
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-emerald-500"
                      statDescripiron="enfants enregistrés"
                      statIconName="fas fa-child"
                      statIconColor="bg-lightBlue-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Rendez-vous"
                      statTitle="0"
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-emerald-500"
                      statDescripiron="rendez-vous planifiés"
                      statIconName="fas fa-calendar"
                      statIconColor="bg-orange-500"
                    />
                  </div>
                </>
              )}
 
              {/* Pédiatre stats */}
              {user?.role === "pediatre" && (
                <>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Mes patients"
                      statTitle="0"
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-emerald-500"
                      statDescripiron="patients suivis"
                      statIconName="fas fa-child"
                      statIconColor="bg-lightBlue-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Consultations"
                      statTitle="0"
                      statArrow="up"
                      statPercent=""
                      statPercentColor="text-emerald-500"
                      statDescripiron="consultations effectuées"
                      statIconName="fas fa-stethoscope"
                      statIconColor="bg-pink-500"
                    />
                  </div>
                </>
              )}
 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 