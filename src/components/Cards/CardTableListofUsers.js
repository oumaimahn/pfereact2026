import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
  getAllUsers,
  getOrderUsersByAge,
  addParent,
  addPediatre,
  getOrderAllUsersByAge,
  getUserBetweenXAndY,
  DeleteUserById,
  searchUsersByUsername,
  updateUserById,
} from "../../service/apiUser";
import { useHistory } from "react-router-dom";
// components

export default function CardTableListofUsers({ color }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    image_User: "",
  });

  const getUsers = async () => {
    try {
      await getAllUsers()
        .then((response) => {
          setUsers(response.data.UserList);
          console.log("users", response.data.UserList);
        })
        .catch((error) => {
          console.log("Error while calling getUsers API", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API", error);
    }
  };

  const SearchUsers = async () => {
    try {
      await searchUsersByUsername(username)
        .then((response) => {
          setUsers(response.data.UserList);
          console.log("users", response.data.UserList);
        })
        .catch((error) => {
          console.log("Error while calling getUsers API", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API", error);
    }
  };

  const getOrderUsers = async () => {
    try {
      await getOrderUsersByAge()
        .then((response) => {
          setUsers(response.data.UserList);
          console.log("users", response.data.UserList);
        })
        .catch((error) => {
          console.log("Error while calling getUsers API", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API", error);
    }
  };
  const filteredUsers = users.filter(u =>
    u.firstName?.toLowerCase().includes(username.toLowerCase()) ||
    u.lastName?.toLowerCase().includes(username.toLowerCase()) ||
    u.email?.toLowerCase().includes(username.toLowerCase())
);

  useEffect(() => {
    getUsers();
    //   const interval = setInterval(() => {
    //     getUsers();
    //   }, 5000);

    //   return () => clearInterval(interval);
  }, []);

  const deleteUser = async (id) => {
    try {
      await DeleteUserById(id)
        .then((response) => {
          getUsers();
          console.log("utilisateur supprimé");
        })
        .catch((error) => {
          console.log("Error while calling getUsers API", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API", error);
    }
  };
  // const updateUserById = async (id, updateData) => {
  //   try {
  //     await updateUserById(id, updateData)
  //       .then((response) => {
  //         console.log("Utilisateur mis à jour :", response.data.user);
  //         getUsers(); // Rafraîchit la liste après mise à jour
  //       })
  //       .catch((error) => {
  //         console.log("Erreur lors de la mise à jour de l'utilisateur", error);
  //       });
  //   } catch (error) {
  //     console.log("Erreur lors de la mise à jour de l'utilisateur", error);
  //   }
  // };
  const history = useHistory();








  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
  <div className="flex flex-wrap items-center justify-between">
    <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex items-center justify-between">
      <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
        Table des Utilisateurs
      </h3>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-64"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-2"
          type="button"
          onClick={() => getOrderUsers()}
        >
          Trier par âge
        </button>
      </div>
    </div>
  </div>
</div>
        

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  NOM & PRÉNOM
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  EMAIL
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  AGE
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  RÔLE
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  STATUS
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={`http://localhost:5000/images/users/${user.image_User}`}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    />
                    <span
                      className={
                        "ml-3 font-bold " +
                        (color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                      {user.firstName} {user.lastName}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.age}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">{user.role}</div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <div className="relative w-full">
                        {user.accountStatus === "en_attente" && "En attente"}
                        {user.accountStatus === "actif" && "Actif"}
                        {user.accountStatus === "refuse" && "Refusé"}
                      </div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => history.push({ pathname: "/admin/UpdateProfile", state: { user: user } })}

                    >
                      MODIFIER
                    </button>
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => deleteUser(user._id)}
                    >
                      SUPPRIMER
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTableListofUsers.defaultProps = {
  color: "dark",
};

CardTableListofUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};