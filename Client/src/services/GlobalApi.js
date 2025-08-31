import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,//10 seconds
    headers: {
        "Content-Type": "application/json",
    }
});

const createUser = (data) => instance.post('/users/create', data);

const deleteUser = (data) => instance.delete('/users/delete',
    {
        data,
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
        withCredentials: true,//sending auth token
    });

export {
    createUser,
    deleteUser
};