import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Pencil, Eye, Send, FileText, Clock, Tag, Image, Upload, LoaderCircle, Trash } from 'lucide-react';
import { createPost, getSinglePost, uploadMedia, deleteMedia, updatePost } from '../services/GlobalApi';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import dummyContent from '../constants/dummyContent.md?raw'
import { useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage'
import { useUser } from '@clerk/clerk-react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { diffeningFunction } from '../lib/utility.functions.js';

export default function EditorPage({ type }) {
    const [loading, setLoading] = useState(false);
    const [oldData, setOldData] = useState(null); // for storing old data in edit mode
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        category: '',
        readTime: 0,
        thumbnail: '',
        coverImage: '',
        content: dummyContent,
        referenceStatus: false
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // for handling image uploads
    const [thumbFile, setThumbFile] = useState(null);
    const [thumbPreview, setThumbPreview] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const params = useParams();
    const { user } = useUser();

    const { getToken, userId } = useAuth();

    // cleanup object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            if (thumbPreview) URL.revokeObjectURL(thumbPreview);
            if (coverPreview) URL.revokeObjectURL(coverPreview);
        };
    }, [thumbPreview, coverPreview]);

    useEffect(() => {
        if (type === "new" && localStorage.getItem("draft")) setFormData(JSON.parse(localStorage.getItem("draft")));
        if (type === "edit") {
            async function fetchPost() {
                try {
                    setLoading(true);
                    const post = await getSinglePost(params.id);
                    setFormData(post.data);
                    setOldData(post.data);
                } catch (error) {
                    console.error(error);
                    toast.loading("Error editing post, redirecting...", { duration: 3000 });
                    window.history.back();
                }
                finally {
                    setLoading(false);
                }
            }
            fetchPost();
        }
    }, [])

    const handleImageUpload = (e, type) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (file) {
            console.log(`Selected ${type}:`, file);
            if (type === "thumbnail") {
                // removing previous preview
                if (thumbPreview) URL.revokeObjectURL(thumbPreview);

                const previewUrl = URL.createObjectURL(file);
                setThumbFile(file);
                setThumbPreview(previewUrl);
                setFormData(prev => ({ ...prev, thumbnail: '' }));
            }
            else if (type === "cover") {
                // removing previous preview
                if (coverPreview) URL.revokeObjectURL(coverPreview);

                const previewUrl = URL.createObjectURL(file);
                setCoverFile(file);
                setCoverPreview(previewUrl);
                setFormData(prev => ({ ...prev, coverImage: '' }));
            }
        }
    };

    const handleImageDelete = (type) => {
        if (type === "thumbnail") {
            toast.success("Thumbnail removed !");
        }
        else if (type === "cover") {
            toast.success("Cover image removed !");
        }
    }

    function formValidate() {
        if (formData.title.trim() === '') {
            toast.error("Title is required !");
            return false;
        }
        if (formData.excerpt.trim() === '') {
            toast.error("Excerpt is required !");
            return false;
        }
        if (formData.category.trim() === '') {
            toast.error("Category is required !");
            return false;
        }
        if (formData.readTime <= 0) {
            toast.error("Read time must be a positive number !");
            return false;
        }
        return true;
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Link to post copied to clipboard !");
        } catch (err) {
            console.error('Failed to copy link to clipboard !', err);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!formValidate()) {
            setLoading(false);
            return;
        };

        try {
            const token = await getToken();
            let updatedFormData = { ...formData };

            // uploading uploaded images to cloudinary
            if (thumbFile || coverFile) {
                const imageUploads = new FormData();
                if (thumbFile) imageUploads.append('thumbnail', thumbFile);
                if (coverFile) imageUploads.append('coverImage', coverFile);
                //appending user id
                imageUploads.append('userId', user.id);
                const uploadResponse = await uploadMedia(imageUploads, token);

                // setting thumnail and coverImage URLs from response
                if (uploadResponse && uploadResponse.status === 201) {
                    const { thumbnail, coverImage, message } = uploadResponse.data;
                    updatedFormData.thumbnail = thumbnail || formData.thumbnail;
                    updatedFormData.coverImage = coverImage || formData.coverImage;
                    console.log(message);

                    // sending public ids for reference
                    const { thumb_id, cover_id } = uploadResponse.data;
                    updatedFormData = {
                        ...updatedFormData,
                        thumb_id,
                        cover_id,
                        referenceStatus: true
                    }
                }
            }

            if (type === 'new') {
                // handle new article submission
                const res = await createPost(updatedFormData, userId, token);
                if (res && res.status === 201) {
                    toast.success("Draft sent for review successfully !");
                    copyToClipboard(`${window.location.origin}/articles/${res.data.postId}`);
                } else {
                    toast.error("Failed to create post !");
                }
            }
            if (type === 'edit') {
                // handle article update submission
                const patchData = diffeningFunction(oldData, updatedFormData);

                // check referenceStatus and prepare patch data
                if (oldData.referenceStatus && !updatedFormData.thumb_id && !updatedFormData.cover_id) {
                    if (!patchData.thumbnail && !patchData.coverImage) {
                        updatedFormData.referenceStatus = true;
                        patchData.referenceStatus = true;
                    }
                    if ((patchData.thumbnail && !patchData.coverImage && oldData.coverImage.includes(userId))) {
                        updatedFormData.referenceStatus = true;
                        patchData.referenceStatus = true;
                    }
                    if ((patchData.coverImage && !patchData.thumbnail && oldData.thumbnail.includes(userId))) {
                        updatedFormData.referenceStatus = true;
                        patchData.referenceStatus = true;
                    }
                    if (patchData.thumbnail && patchData.coverImage) {
                        updatedFormData.referenceStatus = false;
                        patchData.referenceStatus = false;
                    }
                }

                // handling old media deletion if changed
                if (oldData.referenceStatus && (patchData.thumb_id || patchData.cover_id)) {
                    if (patchData.thumbnail && oldData.thumbnail.includes(userId)) {
                        const oldThumbId = 'kenshi_webspace' + oldData.thumbnail.split('kenshi_webspace')[1].split('.')[0];
                        await deleteMedia({ publicId: oldThumbId }, token);
                    }

                    if (patchData.coverImage && oldData.coverImage.includes(userId)) {
                        const oldCoverId = 'kenshi_webspace' + oldData.coverImage.split('kenshi_webspace')[1].split('.')[0];
                        await deleteMedia({ publicId: oldCoverId }, token);
                    }
                }

                // handling service reference deletion if changed
                if (patchData.referenceStatus === false && oldData.referenceStatus === true) {
                    patchData.del_req = true;// flag for deleting service reference
                }

                // delete thumb_id and cover_id in patch data for transmission
                // delete patchData.thumb_id;
                // delete patchData.cover_id;
                console.log("Patch data:", patchData);

                const res = await updatePost(params.id, patchData, token);

                if (res && res.status === 200) {
                    toast.success("Post updated successfully!");
                }
                else {
                    toast.error("Failed to update post !");
                }
            }
        } catch (error) {
            if (error.code === "ECONNABORTED")
                toast.error("Request timed out. Please check 'Your Articles' and retry if post not created.");
            else
                toast.error("An error occurred while processing your request !");

            console.error("Submission error:", error);
        }
        finally {
            // cleanup object URLs
            if (thumbPreview) {
                URL.revokeObjectURL(thumbPreview);
                setThumbPreview(null);
                setThumbFile(null);
            }
            if (coverPreview) {
                URL.revokeObjectURL(coverPreview);
                setCoverPreview(null);
                setCoverFile(null);
            }

            // resetting form data
            if (type === "new") {
                setFormData({
                    title: '',
                    excerpt: '',
                    category: '',
                    readTime: 0,
                    thumbnail: '',
                    coverImage: '',
                    content: dummyContent,
                    referenceStatus: false
                })
            }
            else if (type === "edit") {
                setOldData(formData);
                setFormData(formData);
            }

            // set loading to false
            setLoading(false);
        }
    }

    const saveDraft = () => {
        localStorage.setItem("draft", JSON.stringify(formData));
        toast.success("Draft is saved locally. Saving to cloud will be enabled in future soon...", { duration: 7000 })
    }

    const categories = [
        "Technology", "Geopolitics", "History", "Astronomy", "Religion & Culture", "Anime", "Literature", "Travel"
    ];

    { type === "edit" && loading && <LoadingPage /> }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-4 md:py-8 lg:py-16 px-4 md:px-6 lg:px-16"
        >
            <div className="max-w-7xl mx-auto">
                <Card className="rounded-2xl md:rounded-3xl shadow-2xl bg-white/10 border border-white/20 backdrop-blur-xl">
                    <CardHeader className="p-4 md:p-6 lg:p-8">
                        <CardTitle className="flex items-center gap-2 md:gap-3 text-white text-xl md:text-2xl lg:text-3xl font-extrabold">
                            <FileText size={20} className="md:hidden" />
                            <FileText size={28} className="hidden md:block" />
                            <span className="truncate">{type === 'new' ? 'Create New' : 'Edit your'} Article</span>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
                        {/* Article Metadata Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
                        >
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title" className="text-white font-medium text-sm md:text-base mb-2 block">
                                        Article Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Enter your article title..."
                                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="excerpt" className="text-white font-medium text-sm md:text-base mb-2 block">
                                        Excerpt <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                        placeholder="Brief description of your article..."
                                        rows={3}
                                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none text-sm md:text-base"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <Label className="text-white font-medium text-sm md:text-base mb-2 block">
                                            <Tag size={16} className="inline mr-1" />
                                            Category <span className="text-red-500">*</span>
                                        </Label>
                                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                                            <SelectTrigger className="bg-white/5 border-white/20 text-white text-sm md:text-base">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="readTime" className="text-white font-medium text-sm md:text-base mb-2 block">
                                            <Clock size={16} className="inline mr-1" />
                                            Read Time (min) <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="readTime"
                                            type="number"
                                            value={formData.readTime}
                                            onChange={(e) => handleInputChange('readTime', e.target.value)}
                                            placeholder="5"
                                            min="1"
                                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="thumbnail" className="text-white font-medium text-sm md:text-base mb-2 block">
                                        <Image size={16} className="inline mr-1" />
                                        Thumbnail URL
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="thumbnail"
                                            value={(formData.thumbnail && !formData.thumbnail.includes(userId)) ? formData.thumbnail : ''}
                                            onChange={(e) => {
                                                setThumbPreview(null)
                                                setThumbFile(null)
                                                handleInputChange('thumbnail', e.target.value)
                                            }}
                                            placeholder="https://example.com/thumbnail.jpg"
                                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
                                        />
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button htmlFor="thumbUpload" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3">
                                                        <Upload size={16} />
                                                        <input
                                                            type="file"
                                                            id="thumbUpload"
                                                            accept="image/*"
                                                            className='hidden'
                                                            onChange={(e) => handleImageUpload(e, "thumbnail")}
                                                        />
                                                        <label htmlFor="thumbUpload" className='hidden sm:block'>Upload Image</label>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Upload image</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={() => handleImageDelete("thumbnail")}
                                                    >
                                                        <Trash size={16} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Remove</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="coverImage" className="text-white font-medium text-sm md:text-base mb-2 block">
                                        <Image size={16} className="inline mr-1" />
                                        Cover Image URL
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="coverImage"
                                            value={(formData.coverImage && !formData.coverImage.includes(userId)) ? formData.coverImage : ''}
                                            onChange={(e) => {
                                                setCoverPreview(null)
                                                setCoverFile(null)
                                                handleInputChange('coverImage', e.target.value)
                                            }}
                                            placeholder="https://example.com/cover.jpg"
                                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
                                        />
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button size="sm" htmlFor="coverUpload" className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3">
                                                        <Upload size={16} />
                                                        <input
                                                            type="file"
                                                            id="coverUpload"
                                                            accept="image/*"
                                                            className='hidden'
                                                            onChange={(e) => handleImageUpload(e, "cover")}
                                                        />
                                                        <label htmlFor="coverUpload" className='hidden sm:block'>Upload Image</label>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Upload image</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={() => handleImageDelete("cover")}
                                                    >
                                                        <Trash size={16} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Remove</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>

                                {/* Image Preview */}
                                <div className="bg-white/5 p-3 md:p-4 rounded-lg border border-white/20">
                                    <Label className="text-white font-medium text-sm mb-2 block">Preview</Label>
                                    <div className="grid grid-cols-2 gap-2 space-y-2">

                                        {/* Thumbnail */}
                                        <div>
                                            <p className="text-xs text-gray-300 mb-1">Thumbnail</p>
                                            <img
                                                src={thumbPreview ? thumbPreview : formData.thumbnail === '' ? '/placeholder.png' : formData.thumbnail}
                                                onError={(e) => {
                                                    e.target.onerror = null;//prevent loop if placeholder fails
                                                    e.target.src = '/placeholder.png';
                                                }}
                                                alt="Thumbnail preview"
                                                className="w-full h-40 object-fill rounded border shadow-sm border-white/20"
                                            />
                                        </div>

                                        {/* Cover Image */}
                                        <div>
                                            <p className="text-xs text-gray-300 mb-1">Cover Image</p>
                                            <img
                                                src={coverPreview ? coverPreview : formData.coverImage === '' ? '/placeholder.png' : formData.coverImage}
                                                onError={(e) => {
                                                    e.target.onerror = null;//prevent loop if placeholder fails
                                                    e.target.src = '/placeholder.png';
                                                }}
                                                alt="Cover preview"
                                                className="w-full h-40 object-fill rounded border shadow-sm border-white/20"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <Separator className="bg-white/20" />

                        {/* Markdown Editor */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Tabs defaultValue="preview" className="h-full">
                                <TabsList className="mb-4 flex gap-1 md:gap-2 bg-white/10 p-1 rounded-xl w-full sm:w-auto">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-initial">
                                        <TabsTrigger value="write" className="flex items-center gap-2 w-full text-xs md:text-sm">
                                            <Pencil size={14} className="md:w-4 md:h-4" />
                                            <span className="hidden sm:inline">Write</span>
                                            <span className="sm:hidden">Editor</span>
                                        </TabsTrigger>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-initial">
                                        <TabsTrigger value="preview" className="flex items-center gap-2 w-full text-xs md:text-sm">
                                            <Eye size={14} className="md:w-4 md:h-4" />
                                            Preview
                                        </TabsTrigger>
                                    </motion.div>
                                </TabsList>

                                <TabsContent value="write">
                                    <Textarea
                                        value={formData.content}
                                        onChange={(e) => handleInputChange('content', e.target.value)}
                                        placeholder="Write your markdown content here..."
                                        className="min-h-[300px] md:min-h-[400px] lg:min-h-[500px] p-3 md:p-4 font-mono text-xs md:text-sm bg-white/5 text-white border-white/20 resize-none"
                                    />
                                </TabsContent>

                                <TabsContent value="preview" className="h-full">
                                    <ScrollArea className="h-[300px] md:h-[400px] lg:h-[500px] max-w-none bg-white/5 p-4 md:p-6 rounded-xl border border-white/20">
                                        <div className="px-1">
                                            <MarkdownRenderer content={formData.content || '_Nothing to preview_'} />
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                            </Tabs>
                        </motion.div>

                        <Separator className="bg-white/20" />

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-start sm:items-center"
                        >
                            <div className="text-xs md:text-sm text-gray-300 order-2 sm:order-1">
                                <span className="block sm:inline">Characters: {formData.content.length}</span>
                                <span className="hidden sm:inline"> • </span>
                                <span className="block sm:inline">Words: {formData.content.split(/\s+/).filter(word => word.length > 0).length}</span>
                            </div>

                            <div className="flex gap-2 md:gap-3 w-full sm:w-auto order-1 sm:order-2">
                                <Button
                                    variant="outline"
                                    // onClick={() => toast.error("Feature not implemented yet !")}
                                    disabled={type === "edit"}
                                    onClick={saveDraft}
                                    className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white border-white/20 text-sm md:text-base"
                                >
                                    Save Draft
                                </Button>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 sm:flex-initial"
                                            >
                                                <Button onClick={() => handleSubmit()} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white flex items-center justify-center gap-2 transition-all duration-200 text-sm md:text-base">
                                                    {loading ? <LoaderCircle className='animate-spin' /> : <Send size={16} className="md:w-4 md:h-4" />}
                                                    <span className="hidden sm:inline">{loading ? 'Submitting...' : 'Submit for Review'}</span>
                                                    <span className="sm:hidden">Submit</span>
                                                </Button>
                                            </motion.div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{loading ? 'Submitting...' : 'Submit your article for review and publication'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </motion.div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}