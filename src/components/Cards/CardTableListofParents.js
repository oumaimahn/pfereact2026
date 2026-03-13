import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { getAllUsers, DeleteUserById } from "../../service/apiUser";
import axios from "axios";

export default function CardTableListofParents({ color }) {
    const [parents, setParents] = useState([]);
    const history = useHistory();

    const getParents = async () => {
        try {
            const response = await getAllUsers();
            const allUsers = response.data.UserList;
            const parentsList = allUsers.filter(user => user.role === "parent");
            setParents(parentsList);
        } catch (error) {
            console.log("Erreur lors du chargement des parents", error);
        }
    };

    const [sortedByAge, setSortedByAge] = useState(false);
    const [search, setSearch] = useState("");
    const trierParAge = () => {
    const sorted = [...parents].sort((a, b) => a.age - b.age);
    setParents(sorted);
    setSortedByAge(true);
};
const filteredParents = parents.filter(p =>
    p.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    p.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
);

    const deleteParent = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce parent ?")) return;
        try {
            await DeleteUserById(id);
            getParents();
        } catch (error) {
            console.log("Erreur suppression", error);
        }
    };

    useEffect(() => {
        getParents();
    }, []);

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
            <h3
                className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                }
            >
                Table des Parents
            </h3>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-2"
                    type="button"
                    onClick={() => trierParAge()}
                >
                    Trier par âge
                </button>
            </div>
        </div>
    </div>
</div>

                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                {["NOM & PRÉNOM", "EMAIL", "ÂGE", "STATUS", "NB ENFANTS", "ACTION"].map((col) => (
                                    <th
                                        key={col}
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                        }
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredParents.map((parent) => (
                                <tr key={parent._id}>

                                    {/* NOM & PRÉNOM */}
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                        <img
                                            src={`http://localhost:5000/images/users/${parent.image_User}`}
                                            className="h-12 w-12 bg-white rounded-full border"
                                            alt="..."
                                        />
                                        <span className={"ml-3 font-bold " + (color === "light" ? "text-blueGray-600" : "text-white")}>
                                            {parent.firstName} {parent.lastName}
                                        </span>
                                    </th>

                                    {/* EMAIL */}
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {parent.email}
                                    </td>

                                    {/* ÂGE */}
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {parent.age}
                                    </td>

                                    {/* STATUS */}
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span className={
                                            parent.accountStatus === "actif" ? "text-green-500 font-bold" :
                                                parent.accountStatus === "refuse" ? "text-red-500 font-bold" :
                                                    "text-orange-500 font-bold"
                                        }>
                                            {parent.accountStatus === "en_attente" && "En attente"}
                                            {parent.accountStatus === "actif" && "Actif"}
                                            {parent.accountStatus === "refuse" && "Refusé"}
                                        </span>
                                    </td>

                                    {/* NB ENFANTS */}
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        0 {/* à compléter quand le modèle enfant sera prêt */}
                                    </td>

                                    {/* ACTION */}
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <button
                                            className="bg-red-500 text-white font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md mr-1"
                                            onClick={() => deleteParent(parent._id)}
                                        >
                                            Supprimer
                                        </button>
                                        <button
                                            className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md"
                                            onClick={() => history.push({ pathname: "/admin/enfants", state: { parentId: parent._id } })}
                                        >
                                            Voir enfants
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

CardTableListofParents.defaultProps = {
    color: "dark",
};

CardTableListofParents.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};