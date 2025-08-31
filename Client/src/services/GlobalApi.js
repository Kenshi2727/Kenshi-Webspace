import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,//10 seconds
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

const createUser = (data) => instance.post('/users/create', data);

export {
    createUser
};