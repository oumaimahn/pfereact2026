import axios from 'axios';
 
const apiUrl = 'http://localhost:5000/users';
 
// Fonction helper pour récupérer le token (localStorage OU sessionStorage)
const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};
 
// Header avec token
const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});
 
// ──────────────────────────────────────────────
// ROUTES PUBLIQUES (pas besoin de token)
// ──────────────────────────────────────────────
export async function addParent(userData) {
    return await axios.post(`${apiUrl}/addParent`, userData);
}
 
export async function addPediatre(userData) {
    return await axios.post(`${apiUrl}/addPediatre`, userData);
}
 
// ──────────────────────────────────────────────
// ROUTES ADMIN (token obligatoire)
// ──────────────────────────────────────────────
export async function getAllUsers() {
    return await axios.get(`${apiUrl}/getAllUsers`, authHeader());
}
 
export async function DeleteUserById(id) {
    return await axios.delete(`${apiUrl}/DeleteUserById/${id}`, authHeader());
}
 
export async function searchUsersByUsername(search) {
    return await axios.get(`${apiUrl}/searchUsersByUsername?search=${search}`, authHeader());
}
 
export async function getOrderUsersByAge() {
    return await axios.get(`${apiUrl}/getOrderUsersByAge`, authHeader());
}
 
export async function getUserBetweenXAndY(minAge, maxAge) {
    return await axios.post(`${apiUrl}/getUserByAgeBetweenXAndY`, { minAge, maxAge }, authHeader());
}
 
export async function updateUserById(id, updateData) {
    return await axios.put(`${apiUrl}/updateUser/${id}`, updateData, authHeader());
}
 
export async function validerPediatre(id) {
    return await axios.put(`${apiUrl}/validerPediatre/${id}`, {}, authHeader());
}
 
export async function refuserPediatre(id, reason) {
    return await axios.put(`${apiUrl}/refuserPediatre/${id}`, { reason }, authHeader());
}
 
// ──────────────────────────────────────────────
// ROUTES UTILISATEUR CONNECTÉ (token obligatoire)
// ──────────────────────────────────────────────
export async function getUserById(id) {
    return await axios.get(`${apiUrl}/getUserById/${id}`, authHeader());
}
 
export async function updateProfile(id, updateData) {
    return await axios.put(`${apiUrl}/updateUser/${id}`, updateData, authHeader());
}
 
export async function changePassword(data) {
    return await axios.put(`${apiUrl}/changePassword`, data, authHeader());
}
 
export async function logout() {
    return await axios.post(`${apiUrl}/logout`, {}, authHeader());
}
 