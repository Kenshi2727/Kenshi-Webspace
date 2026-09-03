import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // timeout: 60000,//60 seconds
    headers: {
        "Content-Type": "application/json",
    },
    // onDownloadProgress: (progressEvent) => {
    //     const downloadPercentage = Math.floor((progressEvent.loaded / progressEvent.total)) * 100
    //     console.log("Axios Percentage=>", downloadPercentage);
    // }
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


// Content Service APIs
const createUser = (data) => instance.post('/api/content/users/create', data);

const getUser = (userId, token) => instance.get(`/api/content/users/${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const deleteUser = (data) => instance.delete('/api/content/users/delete',
    {
        data,// data field in CONFIG only for delete method
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
        withCredentials: true,//sending auth token
    });

const createPost = (data, authorId, token) => instance.post(`/api/content/posts/new/${authorId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const getSinglePost = (postId) => instance.get(`/api/content/posts/${postId}`);

const getAllPosts = () => instance.get('/api/content/posts?populate=*');

const getUserPosts = (userId, token) => instance.get(`/api/content/posts/user-posts/${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const getFeaturedPosts = () => instance.get('/api/content/posts?isFeatured=true');

const getCategoryPostCounts = () => instance.get('/api/content/posts/category/counts');

const checkCategoryPosts = (categoryName) => instance.get(`/api/content/posts/category/check/${encodeURIComponent(categoryName)}`);

const deletePost = (postId, token) => instance.delete(`/api/content/posts/${postId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const updatePost = (postId, data, token) => instance.patch(`/api/content/posts/${postId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const updatePostLikes = (postId, data, token) => instance.put(`/api/content/posts/likes/${postId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const updatePostViews = (postId) => instance.put(`/api/content/posts/views/${postId}`);

const updatePostBookmarks = (postId, data, token) => instance.put(`/api/content/posts/bookmarks/${postId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const uploadMedia = (data, token) => instance.post('/api/content/media/upload/image', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

const deleteMedia = (data, token) => instance.delete('/api/content/media', {
    data,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});


// Notification Service APIs
const sendPublicFcmToken = (data) => instance.post('/api/notification/tokens/fcm-token', data, {
    headers: {
        'fcm-service-type': 'public', // custom header to identify fcm service type
    }
});

const multicast = (data) => instance.post('/api/notification/notifications/multicast', data);

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




