import React from "react";
 
const getUser = () => {
  const u = localStorage.getItem("user") || sessionStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
 
export default function CardProfile() {
  const user = getUser();
 
  const getInitials = () => {
    if (user?.firstName && user?.lastName)
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    return user?.username?.[0]?.toUpperCase() || "U";
  };
 
  const getStatusColor = () => {
    if (user?.accountStatus === "actif") return "bg-green-100 text-green-700";
    if (user?.accountStatus === "refuse") return "bg-red-100 text-red-700";
    return "bg-orange-100 text-orange-700";
  };
 
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
 
          {/* Avatar */}
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                {user?.image_User && user.image_User !== "parent.png" ? (
                  <img
                    alt="profil"
                    src={`http://localhost:5000/uploads/${user.image_User}`}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px object-cover"
                    style={{ width: "150px", height: "150px" }}
                  />
                ) : (
                  <div
                    className="shadow-xl rounded-full absolute -m-16 -ml-20 lg:-ml-16 flex items-center justify-center bg-lightBlue-500 text-white font-bold text-3xl"
                    style={{ width: "150px", height: "150px" }}
                  >
                    {getInitials()}
                  </div>
                )}
              </div>
            </div>
 
            {/* Infos */}
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 pt-8">
                <div className="px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor()}`}>
                    {user?.accountStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Détails */}
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
              {user?.firstName} {user?.lastName}
            </h3>
 
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-user-tag mr-2 text-lg text-blueGray-400"></i>
              {user?.role}
            </div>
 
            <div className="mb-2 text-blueGray-600 mt-4">
              <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
              {user?.email}
            </div>
 
            {user?.age && (
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-birthday-cake mr-2 text-lg text-blueGray-400"></i>
                {user.age} ans
              </div>
            )}
 
            {/* Infos pédiatre */}
            {user?.role === "pediatre" && (
              <>
                {user?.numero_ordre && (
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-id-card mr-2 text-lg text-blueGray-400"></i>
                    N° ordre : {user.numero_ordre}
                  </div>
                )}
                {user?.adresseCabinet && (
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {user.adresseCabinet}
                  </div>
                )}
              </>
            )}
          </div>
 
          <div className="mt-6 py-6 border-t border-blueGray-200 text-center">
            <p className="text-sm text-blueGray-400">
              Membre depuis{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })
                : "—"}
            </p>
          </div>
 
        </div>
      </div>
    </>
  );
}