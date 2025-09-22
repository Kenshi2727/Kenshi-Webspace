import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,//60 seconds
    headers: {
        "Content-Type": "application/json",
    }
});

// User APIs
const createUser = (data) => instance.post('/users/create', data);

const deleteUser = (data) => instance.delete('/users/delete',
    {
        data,
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
        withCredentials: true,//sending auth token
    });

// Post APIs
const createPost = (data, authorId) => instance.post(`/posts/new/${authorId}`, data);

// Media APIs
const uploadMedia = (data, token) => instance.post('/media/upload/image', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

export {
    createUser,
    deleteUser,
    createPost,
    uploadMedia
};