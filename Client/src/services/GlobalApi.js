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
    // toast.loading("Analysing network, please wait...", { duration: 60000 });
    while (Date.now() - startTime <= 60000) {
        try {
            const response = await instance.get('/ping');
            // toast.dismiss();
            return response;
        } catch (error) {
            console.log("Retry failed");
            console.warn(error);
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
});

const getFeaturedPosts = () => instance.get('/posts?isFeatured=true');

const getCategoryPostCounts = () => instance.get('/posts/category/counts');

const checkCategoryPosts = (categoryName) => instance.get(`/posts/category/check/${encodeURIComponent(categoryName)}`);

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



// Second temp instance for services 
const instance1 = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_NOTIF_SERVICE,
    // timeout: 60000,//60 seconds
    headers: {
        "Content-Type": "application/json",
    }
});


// Service APIs
const sendPublicFcmToken = (data) => instance1.post('/tokens/fcm-token', data, {
    headers: {
        'fcm-service-type': 'public', // custom header to identify fcm service type
    }
});

const multicast = (data) => instance1.post('/notifications/multicast', data);

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
    getCategoryPostCounts,
    checkCategoryPosts,
    deletePost,
    updatePost,
    updatePostLikes,
    updatePostViews,
    updatePostBookmarks,
    getUserPosts,
    sendPublicFcmToken,
    multicast,
};




