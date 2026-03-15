import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers, validerPediatre, refuserPediatre } from "../../service/apiUser";
 
export default function CardTableListofPediatres({ color }) {
    const [pediatres, setPediatres] = useState([]);
    const [search, setSearch] = useState("");
    const [sortedByAge, setSortedByAge] = useState(false);
 
    const getPediatres = async () => {
        try {
            const response = await getAllUsers();
            const allUsers = response.data.UserList;
            setPediatres(allUsers.filter(user => user.role === "pediatre"));
        } catch (error) {
            console.log("Erreur chargement pédiatres", error);
        }
    };
 
    const trierParAge = () => {
        const sorted = [...pediatres].sort((a, b) => a.age - b.age);
        setPediatres(sorted);
        setSortedByAge(true);
    };
 
    const filteredPediatres = pediatres.filter(p =>
        p.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        p.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase())
    );
 
    const handleValider = async (id) => {
        try {
            await validerPediatre(id);
            getPediatres();
        } catch (error) {
            console.log("Erreur validation", error);
        }
    };
 
    const handleRefuser = async (id) => {
        const reason = prompt("Raison du refus :");
        if (!reason) return;
        try {
            await refuserPediatre(id, reason);
            getPediatres();
        } catch (error) {
            console.log("Erreur refus", error);
        }
    };
 
    useEffect(() => { getPediatres(); }, []);
 
    const thClass = "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700");
 
    return (
        <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " + (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex items-center justify-between">
                        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                            Table des Pédiatres
                        </h3>
                        <div className="flex items-center">
                            <input type="text" placeholder="Rechercher par nom ou email..."
                                className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-64"
                                value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md ml-2"
                                type="button" onClick={trierParAge}>Trier par âge</button>
                        </div>
                    </div>
                </div>
            </div>
 
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            {["NOM & PRÉNOM", "EMAIL", "ÂGE", "N° ORDRE", "JUSTIFICATIF", "STATUS", "ACTION ADMIN"].map(col => (
                                <th key={col} className={thClass}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPediatres.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-8 text-blueGray-400">Aucun pédiatre trouvé</td></tr>
                        ) : filteredPediatres.map((pediatre) => (
                            <tr key={pediatre._id}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    <div className="h-12 w-12 bg-lightBlue-500 rounded-full border flex items-center justify-center text-white font-bold text-sm">
                                        {pediatre.firstName?.[0]}{pediatre.lastName?.[0]}
                                    </div>
                                    <span className={"ml-3 font-bold " + (color === "light" ? "text-blueGray-600" : "text-white")}>
                                        {pediatre.firstName} {pediatre.lastName}
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{pediatre.email}</td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{pediatre.age}</td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{pediatre.numero_ordre || "—"}</td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {pediatre.justificatif ? (
                                        <a href={`http://localhost:5000/uploads/${pediatre.justificatif}`} target="_blank" rel="noopener noreferrer"
                                            className="bg-blueGray-500 text-white font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md">
                                            Voir
                                        </a>
                                    ) : "—"}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <span className={
                                        pediatre.accountStatus === "actif" ? "text-green-500 font-bold" :
                                        pediatre.accountStatus === "refuse" ? "text-red-500 font-bold" : "text-orange-500 font-bold"
                                    }>
                                        {pediatre.accountStatus === "en_attente" && "En attente"}
                                        {pediatre.accountStatus === "actif" && "Actif"}
                                        {pediatre.accountStatus === "refuse" && "Refusé"}
                                    </span>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {pediatre.accountStatus !== "actif" && (
                                        <button className="bg-green-500 text-white font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md mr-1"
                                            onClick={() => handleValider(pediatre._id)}>Valider</button>
                                    )}
                                    {pediatre.accountStatus !== "refuse" && (
                                        <button className="bg-red-500 text-white font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md"
                                            onClick={() => handleRefuser(pediatre._id)}>Refuser</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
CardTableListofPediatres.defaultProps = { color: "dark" };
CardTableListofPediatres.propTypes = { color: PropTypes.oneOf(["light", "dark"]) };