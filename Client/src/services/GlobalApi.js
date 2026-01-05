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

const getUser = (userId, token) => instance.get(`/users/${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

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

const getUserPosts = (userId, token) => instance.get(`/posts/user-posts/${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
})

const getFeaturedPosts = () => instance.get('/posts?isFeatured=true');

const deletePost = (postId, token) => instance.delete(`/posts/${postId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const updatePost = (postId, data, token) => instance.patch(`/posts/${postId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const updatePostLikes = (postId, data, token) => instance.put(`/posts/likes/${postId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const updatePostViews = (postId) => instance.put(`/posts/views/${postId}`);

const updatePostBookmarks = (postId, data, token) => instance.put(`/posts/bookmarks/${postId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});


// Media APIs
const uploadMedia = (data, token) => instance.post('/media/upload/image', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const deleteMedia = (data, token) => instance.delete('/media', {
    data,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});


// Service APIs
const sendPublicFcmToken = (data) => instance.post('/services/fcm-token', data, {
    headers: {
        'fcm-service-type': 'public', // custom header to identify fcm service type
    }
});

export {
    pingServer,
    createUser,
    getUser,
    deleteUser,
    createPost,
    uploadMedia,
    deleteMedia,
    getSinglePost,
    getAllPosts,
    getFeaturedPosts,
    deletePost,
    updatePost,
    updatePostLikes,
    updatePostViews,
    updatePostBookmarks,
    getUserPosts,
    sendPublicFcmToken,
};