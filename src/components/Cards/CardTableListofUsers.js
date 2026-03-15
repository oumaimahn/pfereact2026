import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { getAllUsers, getOrderUsersByAge, DeleteUserById } from "../../service/apiUser";
 
export default function CardTableListofUsers({ color }) {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const history = useHistory();
 
    const getUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data.UserList);
        } catch (error) {
            console.log("Erreur chargement utilisateurs", error);
        }
    };
 
    const getOrderUsers = async () => {
        try {
            const response = await getOrderUsersByAge();
            setUsers(response.data.UserList);
        } catch (error) {
            console.log("Erreur tri", error);
        }
    };
 
    const filteredUsers = users.filter(u =>
        u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
 
    const deleteUser = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
        try {
            await DeleteUserById(id);
            getUsers();
        } catch (error) {
            console.log("Erreur suppression", error);
        }
    };
 
    useEffect(() => { getUsers(); }, []);
 
    const thClass = "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700");
 
    return (
        <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " + (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex items-center justify-between">
                        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                            Table des Utilisateurs
                        </h3>
                        <div className="flex items-center">
                            <input type="text" placeholder="Rechercher par nom ou email..."
                                className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-64"
                                value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md ml-2"
                                type="button" onClick={getOrderUsers}>Trier par âge</button>
                        </div>
                    </div>
                </div>
            </div>
 
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            {["NOM & PRÉNOM", "EMAIL", "ÂGE", "RÔLE", "STATUS", "ACTIONS"].map(col => (
                                <th key={col} className={thClass}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-8 text-blueGray-400">Aucun utilisateur trouvé</td></tr>
                        ) : filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    <div className="h-12 w-12 bg-lightBlue-500 rounded-full border flex items-center justify-center text-white font-bold text-sm">
                                        {user.firstName?.[0]}{user.lastName?.[0]}
                                    </div>
                                    <span className={"ml-3 font-bold " + (color === "light" ? "text-blueGray-600" : "text-white")}>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.email}</td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.age}</td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        user.role === "admin" ? "bg-purple-100 text-purple-700" :
                                        user.role === "pediatre" ? "bg-blue-100 text-blue-700" :
                                        "bg-green-100 text-green-700"
                                    }`}>{user.role}</span>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <span className={
                                        user.accountStatus === "actif" ? "text-green-500 font-bold" :
                                        user.accountStatus === "refuse" ? "text-red-500 font-bold" : "text-orange-500 font-bold"
                                    }>
                                        {user.accountStatus === "en_attente" && "En attente"}
                                        {user.accountStatus === "actif" && "Actif"}
                                        {user.accountStatus === "refuse" && "Refusé"}
                                    </span>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <button className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md mr-1"
                                        onClick={() => history.push({ pathname: "/admin/UpdateProfile", state: { user } })}>
                                        Modifier
                                    </button>
                                    <button className="bg-red-500 text-white font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md"
                                        onClick={() => deleteUser(user._id)}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
CardTableListofUsers.defaultProps = { color: "dark" };
CardTableListofUsers.propTypes = { color: PropTypes.oneOf(["light", "dark"]) };