import axios from 'axios';

const apiUrl = 'http://localhost:5000/users';
// export async function getAllusers(){
//     try{
//         const reponse = await axios.get(apiUrl);
//         return response.data;
//     }catch (error){
//         console.error('Error fetching users:',error);
//         throw error;
//     }
//     }

export async function getAllUsers() {
    return await axios.get(`${apiUrl}/getAllUsers`)

}
export async function DeleteUserById(id) {
    return await axios.delete(`${apiUrl}/DeleteUserById/${id}`);
}
export async function searchUsersByUsername(username) {
    return await axios.get(`${apiUrl}/searchUsersByUsername?username =${username}`)

}
export async function getOrderUsersByAge() {
    return await axios.get(`${apiUrl}/getOrderUsersByAge`);
}
export async function addParent(userData) {
    return await axios.post(`${apiUrl}/addParent`, userData);
}

export async function addPediatre(userData) {
    return await axios.post(`${apiUrl}/addPediatre`, userData);
}
export async function getOrderAllUsersByAge() {
    return await axios.get(`${apiUrl}/getOrderAllUsersByAge`)


}
export async function getUserBetweenXAndY(minAge, maxAge) {
    return await axios.get(`${apiUrl}/getUserBetweenXAndY` , {minAge , maxAge})
}
export async function deleteUserById(id) {
    return await axios.delete(`${apiUrl}/deleteUserById/${id}`)
}




