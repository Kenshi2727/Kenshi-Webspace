import prisma from "@kenshi/database/prisma.client.js";
import { parseDataTypes } from "@kenshi/shared";
import * as repo from "../repositories/post.repository.js";
import * as mediaService from "./media.service.js";

// Note-
/* Reference 1 -
Be cautious
if req.body passed directly-
If someone sends a field that does exist in your schema but 
you don’t actually want users to control (e.g., role, isAdmin, passwordHash), Prisma will happily write it.
This is called a Mass Assignment vulnerability.
 */


// Helper functions/ non-exported functions
const countLike = async (postId, action, operation) => {
    try {
        const post = await repo.incrementPostField(postId, "likes", operation);

        console.log(`Like ${operation}ed to post with ID:`, postId);
        return post;
    } catch (error) {
        console.error(`Error ${operation}ing like to post:`, error);

        if (action?.id) {
            try {
                const likeReset = await repo.updatePostActionById(action.id, {
                    likeStatus: false
                });

                if (likeReset === null) {
                    throw new Error("Like status received null from repo.updatePostActionById");
                }

                console.log("Like status reset due to error:", likeReset);
            } catch (error) {
                console.error("Error resetting like status:", error);
            }
        } else if (action?.userId && action?.postId) {
            try {
                const likeReset = await repo.updatePostAction(action.userId, action.postId, {
                    likeStatus: false
                });

                if (likeReset === null) {
                    throw new Error("Like status received null from repo.updatePostAction also!");
                }

                console.log("Like status reset due to error:", likeReset);
                console.warn("Previous attempt to reset like status by action.id failed, so tried to reset by userId and postId");
            } catch (error) {
                console.error("Error resetting like status:", error);
            }
        }
        return null;
    }
}

const countBookmark = async (postId, action, operation) => {
    try {
        const post = await repo.incrementPostField(postId, "bookmarks", operation);

        console.log(`Bookmark ${operation}ed to post with ID:`, postId);
        return post;
    } catch (error) {
        console.error(`Error ${operation}ing bookmark to post:`, error);

        if (action?.id) {
            try {
                const bookmarkReset = await repo.updatePostActionById(action.id, {
                    bookmarkStatus: false
                });

                if (bookmarkReset === null) {
                    throw new Error("Bookmark status received null from repo.updatePostActionById");
                }

                console.log("Bookmark status reset due to error:", bookmarkReset);
            } catch (error) {
                console.error("Error resetting bookmark status:", error);
            }
        } else if (action?.userId && action?.postId) {
            try {
                const bookmarkReset = await repo.updatePostAction(action.userId, action.postId, {
                    bookmarkStatus: false
                });

                if (bookmarkReset === null) {
                    throw new Error("Bookmark status received null from repo.updatePostAction also!");
                }

                console.log("Bookmark status reset due to error:", bookmarkReset);
                console.warn("Previous attempt to reset bookmark status by action.id failed, so tried to reset by userId and postId");
            } catch (error) {
                console.error("Error resetting bookmark status:", error);
            }
        }
        return null;
    }
}

const createNewPost = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Creating a new post for author ID:", req.params.authorId);

    const {
        title,
        excerpt,
        category,
        thumbnail,
        coverImage,
        content,
        readTime,
        thumb_id,
        cover_id,
        referenceStatus
    } = req.body;

    try {
        const newPost = await repo.createPost({
            title,
            excerpt,
            category,
            thumbnail,
            coverImage,
            content,
            readTime: Number(readTime),
            authorId: req.params.authorId,
            referenceStatus: Boolean(referenceStatus)
        });

        if (!newPost) {
            throw new Error("Failed to create post");
        }

        if (referenceStatus) {
            const serviceRef = await mediaService.setServiceRef(newPost.id, prisma.ServiceType.POST);
            console.log("Service reference created for media:", serviceRef);

            if (serviceRef) {
                if (thumb_id) {
                    const updatedThumbMetaData = await mediaService.updateMediaMetaDataServiceRef(thumb_id, serviceRef.id);
                    console.log("Thumbnail metadata updated with serviceRefId:", updatedThumbMetaData);

                    if (updatedThumbMetaData === null) {
                        throw new Error("Failed to update thumbnail metadata with serviceRefId");
                    }
                }
                if (cover_id) {
                    const updatedCoverMetaData = await mediaService.updateMediaMetaDataServiceRef(cover_id, serviceRef.id);
                    console.log("Cover image metadata updated with serviceRefId:", updatedCoverMetaData);
                    if (updatedCoverMetaData === null) {
                        throw new Error("Failed to update cover image metadata with serviceRefId");
                    }
                }
            } else {
                console.log("Service Reference creation failed! Deleting post...");
                const deletedPost = await repo.deletePostById(newPost.id);

                if (!deletedPost) {
                    throw new Error("Failed to delete post after service reference creation failure");
                }

                throw new Error("Service reference is null");
            }
        }

        console.log("Post created successfully for author ID:", req.params.authorId);

        return {
            status: "201",
            message: "New post created!",
            postId: newPost.id
        };
    } catch (error) {
        console.error("Error creating post:", error);
        return {
            status: "500",
            message: "Internal server error while creating post",
            error: error.message
        };
    }
}

const getSinglePost = async (req, res) => {
    const { postId } = req.params;
    console.log("Fetching post with ID:", postId);

    try {
        const post = await repo.getPostById(postId);

        if (!post) {
            return {
                status: "404",
                error: "Post not found !"
            };
        }

        console.log("Post fetched successfully:", post);
        return {
            status: "200",
            message: "Post fetched successfully",
            post
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return {
            status: "500",
            error: "Failed to fetch post"
        };
    }
}

const getAllPosts = async (req, res, next) => {
    console.log("Fetching all posts");
    try {
        const posts = await repo.getAllPosts();
        console.log(`Fetched ${posts?.length ?? 0} posts`);

        if (posts === null) {
            throw new Error("Failed to fetch posts from repository");
        }

        return {
            status: "200",
            message: posts && posts.length > 0 ? "All posts fetched successfully" : "No posts found",
            params: req.query,
            posts
        };

        // Simulating network delay for testing loading states
        // setTimeout(() => {
        //     return res.status(200).json({
        //         params: req.query,
        //         posts
        //     });
        // }, 2000);

    } catch (error) {
        console.error("Error fetching all posts:", error);
        return {
            status: "500",
            error: "Failed to fetch all posts"
        };
    }
}

const getFeaturedPosts = async (req, res) => {
    console.log("Fetching featured posts");
    try {
        const featuredPosts = await repo.getFeaturedPosts();

        if (featuredPosts === null) {
            throw new Error("Failed to fetch featured posts from repository");
        }

        return {
            status: "200",
            message: "Featured posts fetched successfully",
            featuredPosts
        };
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return {
            status: "500",
            error: "Failed to fetch featured posts"
        };
    }
}

const checkCategoryPosts = async (req, res, next, category) => {
    try {
        const count = await repo.countPostsByCategory(category);

        if (count === null) {
            throw new Error("Failed to count posts by category");
        }

        console.log(`Found ${count} posts for category:`, category);
        return {
            status: "200",
            message: "Category post count fetched successfully",
            category: decodedCategory,
            exists: count > 0,
            count,
        };
    } catch (error) {
        console.error("Error checking category posts:", error);
        return {
            status: "500",
            error: "Failed to check category posts"
        };
    }
}

const getCategoryPostCounts = async (req, res) => {
    console.log("Fetching post counts by category");

    try {
        const groupedCounts = await repo.getCategoryPostCounts();

        if (groupedCounts === null) {
            throw new Error("Failed to fetch category post counts from repository");
        }

        const counts = groupedCounts.reduce((categoryCounts, categoryGroup) => {
            const key = categoryGroup.category.trim().toLowerCase();
            categoryCounts[key] = (categoryCounts[key] || 0) + categoryGroup._count._all;
            return categoryCounts;
        }, {});

        return {
            status: "200",
            message: "Category post counts fetched successfully",
            counts
        };
    } catch (error) {
        console.error("Error fetching category post counts:", error);
        return {
            status: "500",
            error: "Failed to fetch category post counts"
        };
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Fetch request for user with ID", userId);
        const posts = await repo.getPostsByAuthor(userId);

        if (!posts || posts.length === 0) {
            console.log("No posts found for user with ID:", userId);
            return {
                status: "404",
                error: "No posts found for this user",
            };
        }

        console.log("Posts fetched successully:", posts);
        return {
            status: "200",
            message: "Posts fetched successfully",
            posts
        };
    } catch (error) {
        console.error("Error fetching posts for user:", error);
        return {
            status: "500",
            error: "Failed to fetch posts of user"
        };
    }
}

const deletePost = async (req, res) => {
    const { postId } = req.params;
    console.log("Deleting post with ID:", postId);

    try {
        const referenceStatus = await repo.getPostReferenceStatus(postId);
        if (referenceStatus === null) {
            throw new Error("Failed to fetch post reference status");
        }


        const publicIds = await mediaService.getPublicIds(postId);
        console.log("Public IDs associated with the post:", publicIds);

        if (publicIds === null) {
            throw new Error("Failed to fetch public IDs");
        }

        for (const publicId of publicIds) {
            const deletedMediaMetaData = await mediaService.deleteMediaMetaData(publicId.publicId);
            if (deletedMediaMetaData === null) {
                throw new Error("Failed to delete media metadata");
            }
        }

        if (referenceStatus && referenceStatus.referenceStatus === true) {
            const deletedServiceRef = await mediaService.deleteServiceRef(postId, prisma.ServiceType.POST);
            if (deletedServiceRef === null) {
                throw new Error("Failed to delete service reference");
            }
        }

        for (const publicId of publicIds) {
            const response = await mediaService.deleteMedia(publicId.publicId);
            if (response === null) {
                throw new Error("Failed to delete media from cloudinary");
            }
            if (response.result === 'not found') {
                console.warn(`Media with public ID ${publicId.publicId} not found in Cloudinary.`);
                throw new Error("Media not found in Cloudinary");
            }
        }

        const deletedPost = await repo.deletePostById(postId);
        if (!deletedPost) {
            throw new Error("Failed to delete post");
        }

        console.log("Post deleted successfully:", deletedPost);

        return {
            status: "200",
            message: "Post deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting post:", error);
        return {
            status: "500",
            error: "Failed to delete post"
        };
    }
}

const updatePost = async (req, res) => {
    console.log("Update post request body:", req.body);

    try {
        const { del_req } = req.body;
        const { postId } = req.params;
        // delete service reference if del_req is true
        if (del_req && Boolean(del_req) === true) {
            console.log("Service reference deletion requested(del_req request)");
            const deletedServiceRef = await mediaService.deleteServiceRef(postId, prisma.ServiceType.POST);
            if (deletedServiceRef === null) {
                // silent error 
                console.error("Failed to delete service reference");
                // todo: implemnt logger to log this error for further investigation
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

        const { thumb_id, cover_id } = req.body;
        if (thumb_id || cover_id) {
            const checkRef = await mediaService.getServiceRefById(postId);

            if (checkRef && checkRef.error) {
                throw new Error("Failed to check service reference as mediaService.getServiceRefById returned an error: " + checkRef.error);
            }

            if (checkRef) {
                console.log("Service Reference already exists!", checkRef);
                console.log("Updating timestamp...");
                const updatedServiceRef = await mediaService.setServiceRef(postId, prisma.ServiceType.POST);

                if (thumb_id) {
                    const updatedThumbMetaData = await mediaService.updateMediaMetaDataServiceRef(thumb_id, postId);
                    console.log("Thumbnail metadata updated with serviceRefId:", updatedThumbMetaData);
                }

                if (cover_id) {
                    const updatedCoverMetaData = await mediaService.updateMediaMetaDataServiceRef(cover_id, postId);
                    console.log("Cover image metadata updated with serviceRefId:", updatedCoverMetaData);
                }

                console.log("Updated Service Reference:", updatedServiceRef);
            } else {
                console.log("No Service Reference exists! Initiating Service Reference creation");
                const newServiceRef = await mediaService.setServiceRef(postId, prisma.ServiceType.POST);

                if (newServiceRef) {
                    console.log("New Service Reference created! Appending ServiceRefId to Media Meta data...");

                    if (thumb_id) {
                        const updatedThumbMetaData = await mediaService.updateMediaMetaDataServiceRef(thumb_id, postId);
                        console.log("Thumbnail metadata updated with serviceRefId:", updatedThumbMetaData);

                        if (updatedThumbMetaData === null) {
                            throw new Error("Failed to update thumbnail metadata with serviceRefId");
                        }
                    }

                    if (cover_id) {
                        const updatedCoverMetaData = await mediaService.updateMediaMetaDataServiceRef(cover_id, postId);
                        console.log("Cover image metadata updated with serviceRefId:", updatedCoverMetaData);

                        if (updatedCoverMetaData === null) {
                            throw new Error("Failed to update cover image metadata with serviceRefId");
                        }
                    }
                } else {
                    console.error("Service Reference creation failed!");
                    throw new Error("New Service Reference Creation failed!");
                }
            }
        }

        const updatedPost = await repo.updatePostById(postId, updatedData);
        if (!updatedPost) {
            throw new Error("Failed to update post");
        }
        console.log("Post updated successfully:", updatedPost);
        return {
            status: "200",
            message: "Post updated successfully"
        };
    } catch (error) {
        console.error("Error updating post:", error);
        return {
            status: "500",
            error: "Failed to update post"
        };
    }
}

const updatePostLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        console.log(`Updating like status for post ID: ${postId} by user ID: ${userId}`);

        // Check if a post action already exists
        const existingAction = await repo.findPostAction(userId, postId);

        if (existingAction && existingAction.error) {
            throw new Error("Failed to find post action as repo.findPostAction returned an error: " + existingAction.error);
        }

        if (existingAction) {
            // update operation - toggle status
            const updatedLike = await repo.updatePostActionById(existingAction.id, {
                likeStatus: !existingAction.likeStatus
            });

            if (updatedLike === null) {
                throw new Error("Failed to update post action as repo.updatePostActionById returned null");
            }

            console.log("Like status updated:", updatedLike);

            const postLikeUpdate = await countLike(postId, updatedLike, updatedLike.likeStatus ? "increment" : "decrement");
            if (postLikeUpdate === null) {
                throw new Error("Failed to update post like count");
            }
            console.log("Post succesfully updated with like count:", postLikeUpdate);
        } else {
            // If a post action does not exist, create it (like)
            const newLike = await repo.createPostAction({
                postId,
                userId,
                likeStatus: true
            });

            console.log("Like created:", newLike);

            const postLikeUpdate = await countLike(postId, newLike, newLike.likeStatus ? "increment" : "decrement");
            if (postLikeUpdate === null) {
                throw new Error("Failed to update post like count");
            }
            console.log("Post succesfully updated with like count:", postLikeUpdate);
        }
        return {
            status: "200",
            message: "Post like status updated successfully"
        };
    } catch (error) {
        console.error("Error updating post likes:", error);
        return {
            status: "500",
            error: "Failed to update post likes"
        };
    }
}

const countView = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await repo.incrementPostField(postId, "views", "increment");
        console.log("View count incremented for post ID:", postId);
        return {
            status: "200",
            message: "View count updated successfully",
            viewCount: post.views
        };
    } catch (error) {
        console.log("Error updating view count for post Id", postId);
        return {
            status: "500",
            error: "Failed to update view count"
        };
    }
}

const updatePostBookmarks = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        console.log(`Updating bookmark status for post ID: ${postId} by user ID: ${userId}`);

        // Check if a post action already exists
        const existingAction = await repo.findPostAction(userId, postId);

        if (existingAction && existingAction.error) {
            throw new Error("Failed to find post action as repo.findPostAction returned an error: " + existingAction.error);
        }

        if (existingAction) {
            // update operation - toggle status
            const updatedBookmark = await repo.updatePostActionById(existingAction.id, {
                bookmarkStatus: !existingAction.bookmarkStatus
            });

            console.log("Bookmark status updated:", updatedBookmark);
            const postBookmarkUpdate = await countBookmark(postId, updatedBookmark, updatedBookmark.bookmarkStatus ? "increment" : "decrement");
            if (postBookmarkUpdate === null) {
                throw new Error("Failed to update post bookmark count");
            }
            console.log("Post succesfully updated with bookmark count:", postBookmarkUpdate);
        } else {
            // If a post action does not exist, create it (bookmark)
            const newBookmark = await repo.createPostAction({
                postId,
                userId,
                bookmarkStatus: true
            });

            console.log("Bookmark created:", newBookmark);

            const postBookmarkUpdate = await countBookmark(postId, newBookmark, newBookmark.bookmarkStatus ? "increment" : "decrement");
            if (postBookmarkUpdate === null) {
                throw new Error("Failed to update post bookmark count");
            }
            console.log("Post succesfully updated with bookmark count:", postBookmarkUpdate);
        }
        return {
            status: "200",
            message: "Post bookmark status updated successfully"
        };
    } catch (error) {
        console.error("Error updating post bookmarks:", error);
        return {
            status: "500",
            error: "Failed to update post bookmarks"
        };
    }
}

export {
    countLike,
    countBookmark,
    createNewPost,
    getSinglePost,
    getAllPosts,
    getFeaturedPosts,
    checkCategoryPosts,
    getCategoryPostCounts,
    getUserPosts,
    deletePost,
    updatePost,
    updatePostLikes,
    countView,
    updatePostBookmarks
}

