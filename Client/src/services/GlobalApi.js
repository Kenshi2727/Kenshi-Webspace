import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // timeout: 60000,//60 seconds
    headers: {
        "Content-Type": "application/json",
    }
});

// Pinging Server
const pingServer = async () => {
    const startTime = Date.now();
    // retrying for 60 seconds
    toast.loading("Waking up server, please wait...", { duration: 60000 });
    while (Date.now() - startTime <= 60000) {
        try {
            const response = await instance.get('/ping');
            toast.dismiss();
            return response;
        } catch (error) {
            console.log("Retry failed");
            continue;
        }
    }
    toast.error("Server is down, please try again later.");
}

// User APIs
const createUser = (data) => instance.post('/users/create', data);

const deleteUser = (data) => instance.delete('/users/delete',
    {
        data,// data field in CONFIG only for delete method
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
        withCredentials: true,//sending auth token
    });


// Post APIs
const createPost = (data, authorId, token) => instance.post(`/posts/new/${authorId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const getSinglePost = (postId) => instance.get(`/posts/${postId}`);

const getAllPosts = () => instance.get('/posts?populate=*');

const getFeaturedPosts = () => instance.get('/posts?isFeatured=true');

// Media APIs
const uploadMedia = (data, token) => instance.post('/media/upload/image', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

export {
    pingServer,
    createUser,
    deleteUser,
    createPost,
    uploadMedia,
    getSinglePost,
    getAllPosts,
    getFeaturedPosts
};