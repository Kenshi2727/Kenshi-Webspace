import prisma from "../../../Database/prisma.client.js";
import { setServiceRef, deleteMediaMetaData, deleteServiceRef, deleteMedia, getPublicIds } from "./media.controller.js";
import { parseDataTypes } from "../lib/typeParser.js";
// Note-
/* 
if req.body passed directly-
If someone sends a field that does exist in your schema but 
you don’t actually want users to control (e.g., role, isAdmin, passwordHash), Prisma will happily write it.
This is called a Mass Assignment vulnerability.
 */

// Helper functions to add/remove like count
const countLike = async (postId, likeId, operation) => {
    try {
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                likes: likes + (operation === "increment" ? 1 : -1)
            }
        });

        console.log(`Like ${operation}ed to post with ID:`, postId);
        return post;
    } catch (error) {
        console.error(`Error ${operation}ing like to post:`, error);

        // setting back like to previous state
        try {
            const likeReset = await prisma.like.update({
                where: { id: likeId },
                data: { status: false }
            });
            console.log("Like status reset due to error:", likeReset);
        } catch (error) {
            console.error("Error resetting like status:", error);
        }
        return null;
    }
}

export const createNewPost = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Creating a new post for author ID:", req.params.authorId);
    const { title, excerpt, category, thumbnail, coverImage, content, readTime, thumb_id, cover_id, referenceStatus } = req.body;

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                excerpt,
                category,
                thumbnail,
                coverImage,
                content,
                readTime: Number(readTime),
                authorId: req.params.authorId,
                referenceStatus: Boolean(referenceStatus)
            }
        });

        if (referenceStatus) {

            // setting service reference for media
            const serviceRef = await setServiceRef(newPost.id, prisma.ServiceType.POST);
            console.log("Service reference created for media:", serviceRef);
            if (serviceRef) {
                if (thumb_id) {
                    // update media meta data
                    const updatedThumbMetaData = await prisma.mediaMetaData.update({
                        where: {
                            publicId: thumb_id
                        },
                        data: {
                            serviceRefId: serviceRef.id
                        }
                    });
                    console.log("Thumbnail metadata updated with serviceRefId:", updatedThumbMetaData);
                }

                if (cover_id) {
                    // update media meta data
                    const updatedCoverMetaData = await prisma.mediaMetaData.update({
                        where: {
                            publicId: cover_id
                        },
                        data: {
                            serviceRefId: serviceRef.id
                        }
                    });
                    console.log("Cover image metadata updated with serviceRefId:", updatedCoverMetaData);
                }
            }
            else {
                console.log("Service Refrence creation failed! Deleting post...");

                const deletedPost = await prisma.post.delete({
                    where: { id: newPost.id }
                });
                console.log("Post deleted successfully:", deletedPost);
                throw new Error("Service reference is null");
            }
        }

        console.log("Post created successfully for author ID:", req.params.authorId);

        return res.status(201).json({
            message: "New post created!",
            postId: newPost.id
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Failed to create post" });
    }
}

export const getSinglePost = async (req, res) => {
    const { postId } = req.params;
    console.log("Fetching post with ID:", postId);

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                Likes: true,
            },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found !" });
        }

        console.log("Post fetched successfully:", post);
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ error: "Failed to fetch post" });
    }
}

export const getAllPosts = async (req, res, next) => {
    console.log("Fetching all posts");
    try {
        if (req.query.isFeatured === 'true') {
            console.log("Request for featured posts");
            return next();
        }

        if (req.query.populate === '*') {
            const posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });

            console.log(`Fetched ${posts.length} posts`);
            return res.status(200).json({
                params: req.query,
                posts
            });

            // Simulating network delay for testing loading states
            // setTimeout(() => {
            //     return res.status(200).json({
            //         params: req.query,
            //         posts
            //     });
            // }, 2000);
        }
        else {
            return res.status(400).json({ error: "Invalid query parameter" });
        }
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return res.status(500).json({ error: "Failed to fetch all posts" });
    }
}

export const getFeaturedPosts = async (req, res) => {
    console.log("Fetching featured posts");
    try {
        const featuredPosts = await prisma.post.findMany({
            where: {
                featured: true
            }
        });
        return res.status(200).json({ message: "Featured posts fetched successfully", featuredPosts });
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return res.status(500).json({ error: "Failed to fetch featured posts" });
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.params;
    console.log("Deleting post with ID:", postId);

    try {
        // checking reference status
        const referenceStatus = await prisma.post.findUnique({
            where: { id: postId },
            select: { referenceStatus: true }
        });

        // fetch public ids
        const publicIds = await getPublicIds(postId);
        console.log("Public IDs associated with the post:", publicIds);

        if (publicIds === null) {
            throw new Error("Failed to fetch public IDs");
        }

        // delete all meta data first to avoid foreign key constraint error(many to one relation)
        publicIds.forEach(async (publicId) => {
            const deletedMediaMetaData = await deleteMediaMetaData(publicId.publicId);
            if (deletedMediaMetaData === null) {
                throw new Error("Failed to delete media metadata");
            }
        });

        // delete service reference
        if (referenceStatus && referenceStatus.referenceStatus === true) {
            const deletedServiceRef = await deleteServiceRef(postId, prisma.ServiceType.POST);
            if (deletedServiceRef === null) {
                throw new Error("Failed to delete service reference");
            }
        }

        // delete all media from cloudinary
        publicIds.forEach(async (publicId) => {
            const response = await deleteMedia(publicId.publicId);
            if (response === null) {
                throw new Error("Failed to delete media from cloudinary");
            }
            if (response.result === 'not found') {
                console.warn(`Media with public ID ${publicId.publicId} not found in Cloudinary.`);
                throw new Error("Media not found in Cloudinary");
            }
        });

        // delete the post
        const deletedPost = await prisma.post.delete({
            where: { id: postId }
        });
        console.log("Post deleted successfully:", deletedPost);

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ error: "Failed to delete post" });
    }
}

export const updatePost = async (req, res) => {
    console.log("Update post request body:", req.body);

    try {
        const { del_req } = req.body;
        const { postId } = req.params;
        // delete service reference if del_req is true
        if (del_req && Boolean(del_req) === true) {
            console.log("Service reference deletion requested(del_req request)");
            const deletedServiceRef = await deleteServiceRef(postId, prisma.ServiceType.POST);
            if (deletedServiceRef === null) {
                console.error("Failed to delete service reference");
            }
            console.log("Service reference deleted:", deletedServiceRef);
        }

        // proceed to update post
        const updatedData = { ...req.body };

        // delete thumb_id and cover_id from patch data (NOT PART OF DATABASE SCHEMA)
        delete updatedData.thumb_id;
        delete updatedData.cover_id;
        if (del_req) delete updatedData.del_req;

        // handling parsing of data types
        parseDataTypes(updatedData, {
            readTime: Number,
            referenceStatus: Boolean,
        });

        // checking service reference
        const { thumb_id, cover_id } = req.body;
        if (thumb_id || cover_id) {
            const checkRef = await prisma.serviceRef.findUnique({
                where: {
                    id: postId
                }
            });

            if (checkRef) {
                console.log("Service Reference already exists!", checkRef);

                console.log("Updating timestamp...");
                const updatedServiceRef = await prisma.serviceRef.update({
                    where: {
                        id: postId
                    },
                    data: {
                        updatedAt: new Date()
                    }
                });

                // media meta data update
                if (thumb_id) {
                    // update media meta data
                    const updatedThumbMetaData = await prisma.mediaMetaData.update({
                        where: {
                            publicId: thumb_id
                        },
                        data: {
                            serviceRefId: postId
                        }
                    });
                    console.log("Thumbnail metadata updated with serviceRefId:", updatedThumbMetaData);
                }

                if (cover_id) {
                    // update media meta data
                    const updatedCoverMetaData = await prisma.mediaMetaData.update({
                        where: {
                            publicId: cover_id
                        },
                        data: {
                            serviceRefId: postId
                        }
                    });
                    console.log("Cover image metadata updated with serviceRefId:", updatedCoverMetaData);
                }

                console.log("Updated Service Reference:", updatedServiceRef);
            } else {
                console.log("No Service Reference exits! Initiating Service Reference creation");
                const newServiceRef = await setServiceRef(postId, prisma.ServiceType.POST);

                if (newServiceRef) {
                    console.log("New Service Reference created! Appending ServiceRefId to Media Meta data...");

                    // media meta data update
                    if (thumb_id) {
                        // update media meta data
                        const updatedThumbMetaData = await prisma.mediaMetaData.update({
                            where: {
                                publicId: thumb_id
                            },
                            data: {
                                serviceRefId: postId
                            }
                        });
                        console.log("Thumbnail metadata updated with serviceRefId:", updatedThumbMetaData);
                    }

                    if (cover_id) {
                        // update media meta data
                        const updatedCoverMetaData = await prisma.mediaMetaData.update({
                            where: {
                                publicId: cover_id
                            },
                            data: {
                                serviceRefId: postId
                            }
                        });
                        console.log("Cover image metadata updated with serviceRefId:", updatedCoverMetaData);
                    }

                }
                else {
                    console.error("Service Reference creation failed!");
                    throw new Error("New Service Refrence Creation failed!");
                }
            }
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: updatedData
        });
        console.log("Post updated successfully:", updatedPost);
        return res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ error: "Failed to update post" });
    }
}

export const updatePostLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        console.log(`Updating like status for post ID: ${postId} by user ID: ${userId}`);

        // Check if the like already exists
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if (existingLike) {
            // update operation - toggle status
            const updatedLike = await prisma.like.update({
                where: {
                    userId_postId: {
                        userId,
                        postId
                    }
                },
                data: {
                    status: !existingLike.status
                }
            });

            console.log("Like status updated:", updatedLike);

            const postLikeUpdate = await countLike(postId, updatedLike.id, updatedLike.status ? "increment" : "decrement");
            if (postLikeUpdate === null) {
                throw new Error("Failed to update post like count");
            }
            console.log("Post succesfully updated with like count:", postLikeUpdate);
        } else {
            // If like does not exist, create it (like)
            const newLike = await prisma.like.create({
                data: {
                    postId,
                    userId,
                    status: true
                }
            });

            console.log("Like created:", newLike);

            const postLikeUpdate = await countLike(postId, newLike.id, newLike.status ? "increment" : "decrement");
            if (postLikeUpdate === null) {
                throw new Error("Failed to update post like count");
            }
            console.log("Post succesfully updated with like count:", postLikeUpdate);
        }
        return res.status(200).json({ message: "Post like status updated successfully" });
    } catch (error) {
        console.error("Error updating post likes:", error);
        return res.status(500).json({ error: "Failed to update post likes" });
    }
}