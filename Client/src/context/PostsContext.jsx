import React, { createContext, useContext, useState } from 'react';
import { featuredPosts as seedPosts } from '../seeds/blogs.seed';

const PostsContext = createContext();

export function PostsProvider({ children }) {
    // initialize from seed only (no localStorage)
    const [posts, setPosts] = useState(() => seedPosts.map(p => ({ ...p })));

    function getPost(id) {
        return posts.find(p => String(p.id) === String(id));
    }

    function updatePost(id, patch) {
        setPosts(prev => prev.map(p => (String(p.id) === String(id) ? { ...p, ...patch } : p)));
    }

    function addPost(post) {
        setPosts(prev => [...prev, post]);
    }

    return (
        <PostsContext.Provider value={{ posts, getPost, updatePost, addPost }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const ctx = useContext(PostsContext);
    if (!ctx) throw new Error('usePosts must be used within PostsProvider');
    return ctx;
}
