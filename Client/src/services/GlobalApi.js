import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // timeout: 60000,//60 seconds
    headers: {
        "Content-Type": "application/json",
    }
});


// interceptor for downloading data(central place to handle download progress)
let progressHandler = null;

instance.interceptors.request.use(
    (config) => {
        // modify the request configif needed
        config.onDownloadProgress = (progressEvent) => {
            const { loaded, total } = progressEvent;
            if (total && progressHandler) {
                const percentage = Math.floor((loaded * 100) / total);
                console.log(`Download Progress: ${percentage}%`);
                progressHandler(percentage);
            }
            else {
                progressHandler && progressHandler(0);
            }

        };
        return config;
    }
);

// progress handler for React components to set
export const setProgressHandler = (handler) => {
    progressHandler = handler;
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
    uploadMedia,
    getSinglePost
};