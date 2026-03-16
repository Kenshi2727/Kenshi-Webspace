import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
    Pencil,
    Eye,
    Send,
    FileText,
    Clock,
    Tag,
    Image,
    Upload,
    LoaderCircle,
    Trash,
    Info,
    CopyIcon,
    Check,
    Link as LinkIcon,
    MessageSquareWarning,
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Maximize,
    Minimize,
    Columns,
    List,
} from "lucide-react";
import {
    createPost,
    getSinglePost,
    uploadMedia,
    deleteMedia,
    updatePost,
} from "../services/GlobalApi";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import dummyContent from "../constants/dummyContent.md?raw";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useUser } from "@clerk/clerk-react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { diffeningFunction } from "../lib/utility.functions.js";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function EditorPage({ type }) {
    const [loading, setLoading] = useState(false);
    const [oldData, setOldData] = useState(null); // for storing old data in edit mode
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        category: "",
        readTime: 0,
        thumbnail: "",
        coverImage: "",
        content: "",
        referenceStatus: false,
    });
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [externalImageUrl, setExternalImageUrl] = useState("");
    const [imageCaption, setImageCaption] = useState("");
    const [contentImagePreview, setContentImagePreview] = useState(null);
    const [contentImageUploadPermission, setContentImageUploadPermission] = useState(false);
    const [contentImageUploadEventObject, setContentImageUploadEventObject] = useState(null);

    const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false);
    const [selectedComponentType, setSelectedComponentType] = useState("info");
    const [componentContentText, setComponentContentText] = useState("");

    // Zen Mode & Split Screen
    const [isZenMode, setIsZenMode] = useState(false);
    const [isSplitScreen, setIsSplitScreen] = useState(false);

    // Slash Commands
    const [showSlashMenu, setShowSlashMenu] = useState(false);
    const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
    const [slashMenuFilter, setSlashMenuFilter] = useState("");
    const [slashMenuIndex, setSlashMenuIndex] = useState(0);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // for handling image uploads
    const [thumbFile, setThumbFile] = useState(null);
    const [thumbPreview, setThumbPreview] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const params = useParams();
    const { user } = useUser();
    const currentUser = useSelector((state) => state.user);

    const { getToken, userId } = useAuth();
    const [copied, setCopied] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    useEffect(() => {
        let t;
        if (copied) t = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(t);
    }, [copied]);

    // cleanup object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            if (thumbPreview) URL.revokeObjectURL(thumbPreview);
            if (coverPreview) URL.revokeObjectURL(coverPreview);
            if (contentImagePreview) URL.revokeObjectURL(contentImagePreview);
        };
    }, [thumbPreview, coverPreview, contentImagePreview]);

    useEffect(() => {
        if (type === "new" && localStorage.getItem("draft")) {
            setFormData(JSON.parse(localStorage.getItem("draft")));
            if (localStorage.getItem("lastSaved")) {
                setLastSaved(localStorage.getItem("lastSaved"));
            }
        }
        if (type === "edit") {
            async function fetchPost() {
                try {
                    setLoading(true);
                    const post = await getSinglePost(params.id);
                    setFormData(post.data);
                    setOldData(post.data);
                } catch (error) {
                    console.error(error);
                    toast.loading("Error editing post, redirecting...", {
                        duration: 3000,
                    });
                    window.history.back();
                } finally {
                    setLoading(false);
                }
            }
            fetchPost();
            // console.log("Current user:",currentUser);
        }
    }, []);

    // Auto-Save every 1 minute (Only for new articles)
    useEffect(() => {
        if (formData) {
            const timer = setInterval(() => {
                localStorage.setItem("draft", JSON.stringify(formData));
                const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setLastSaved(timeString);
                localStorage.setItem("lastSaved", timeString);
            }, 1 * 60000); // 1 minute interval
            return () => clearInterval(timer);
        }
    }, [formData]);

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
                setFormData((prev) => ({ ...prev, thumbnail: "" }));
            } else if (type === "cover") {
                // removing previous preview
                if (coverPreview) URL.revokeObjectURL(coverPreview);

                const previewUrl = URL.createObjectURL(file);
                setCoverFile(file);
                setCoverPreview(previewUrl);
                setFormData((prev) => ({ ...prev, coverImage: "" }));
            }
        }
    };

    const handleImageDelete = (ImageType) => {
        try {
            if (ImageType === "thumbnail") {
                setThumbPreview(null);
                setThumbFile(null);
                URL.revokeObjectURL(thumbPreview);
                handleInputChange("thumbnail", "");
                toast.success("Thumbnail removed !");
            } else if (ImageType === "cover") {
                setCoverPreview(null);
                setCoverFile(null);
                URL.revokeObjectURL(coverPreview);
                handleInputChange("coverImage", "");
                toast.success("Cover image removed !");
            }
            else if (ImageType === "content") {
                setContentImagePreview(null);
                setExternalImageUrl("");
                setImageCaption("");
                setContentImageUploadPermission(false);
                setContentImageUploadEventObject(null);
                URL.revokeObjectURL(contentImagePreview);
                setContentImagePreview(null);
            }
        } catch (error) {
            toast.error("Error removing image ! Contact support.");
            console.error("Image removal error:", error);
        }
    };

    const insertMarkdownAtCursor = (markdown) => {
        const textarea = document.getElementById("md-editor");
        if (textarea) {
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const textBefore = formData.content.substring(0, startPos);
            const textAfter = formData.content.substring(
                endPos,
                formData.content.length,
            );
            const newContent = textBefore + markdown + textAfter;

            handleInputChange("content", newContent);

            setTimeout(() => {
                textarea.focus();
                textarea.selectionStart = startPos + markdown.length;
                textarea.selectionEnd = startPos + markdown.length;
            }, 0);
        } else {
            handleInputChange("content", formData.content + markdown);
        }
    };

    const generateTableOfContents = () => {
        // remark-toc is configured to look for the "Contents" header
        insertMarkdownAtCursor("\n## Contents\n");
        toast.success("Table of Contents placeholder added!");
    };

    const handleEditorDrop = (e) => {
        const url = e.dataTransfer.getData("URL");
        const html = e.dataTransfer.getData("text/html");

        let imgSrc = null;
        if (html) {
            const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (match) imgSrc = match[1];
        }

        if (!imgSrc && url && url.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i)) {
            imgSrc = url;
        }

        if (imgSrc) {
            e.preventDefault();
            insertMarkdownAtCursor(`\n![image](${imgSrc})\n`);
            return;
        }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith("image/")) {
                e.preventDefault();
                insertMarkdownAtCursor(`\n![image](image_url_here)\n`);
                toast.info("Inserted image placeholder. Please replace 'image_url_here' with the actual link.");
            }
        }
    };

    const handleEditorPaste = (e) => {
        const html = e.clipboardData.getData("text/html");
        const text = e.clipboardData.getData("text/plain");

        let imgSrc = null;
        if (html) {
            const match = html.match(/<img[^>]+src="([^">]+)"/);
            if (match) imgSrc = match[1];
        }

        if (!imgSrc && text && text.match(/^https?:\/\/.+\.(jpeg|jpg|gif|png|webp|svg)$/i)) {
            imgSrc = text;
        }

        if (imgSrc) {
            e.preventDefault();
            insertMarkdownAtCursor(`\n![image](${imgSrc})\n`);
            return;
        }

        if (e.clipboardData.files && e.clipboardData.files.length > 0) {
            const file = e.clipboardData.files[0];
            if (file.type.startsWith("image/")) {
                e.preventDefault();
                insertMarkdownAtCursor(`\n![image](image_url_here)\n`);
                toast.info("Inserted image placeholder. Please replace 'image_url_here' with the actual link.");
            }
        }
    };

    const slashCommands = [
        { title: "Heading 1", icon: <Heading1 size={14} />, markdown: "# " },
        { title: "Heading 2", icon: <Heading2 size={14} />, markdown: "## " },
        { title: "Heading 3", icon: <Heading3 size={14} />, markdown: "### " },
        { title: "Blockquote", icon: <Pencil size={14} />, markdown: "> " },
        { title: "Code Block", icon: <Columns size={14} />, markdown: "```\n\n```" },
        { title: "Bulleted List", icon: <List size={14} />, markdown: "- " },
        { title: "Divider", icon: <Minimize size={14} />, markdown: "\n---\n" },
    ];

    const filteredSlashCommands = slashCommands.filter(cmd =>
        cmd.title.toLowerCase().includes(slashMenuFilter.toLowerCase())
    );

    const executeSlashCommand = (markdown) => {
        const textarea = document.getElementById("md-editor");
        if (!textarea) return;

        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = formData.content.substring(0, cursorPosition);

        // Find where the slash command started
        const slashIndex = textBeforeCursor.lastIndexOf("/");
        if (slashIndex === -1) return;

        const textBeforeSlash = formData.content.substring(0, slashIndex);
        const textAfterCursor = formData.content.substring(cursorPosition);

        const newContent = textBeforeSlash + markdown + textAfterCursor;
        handleInputChange("content", newContent);

        setShowSlashMenu(false);
        setSlashMenuFilter("");

        setTimeout(() => {
            textarea.focus();
            const newPos = slashIndex + markdown.length;
            // if code block, put cursor inside
            if (markdown === "```\n\n```") {
                textarea.selectionStart = newPos - 4;
                textarea.selectionEnd = newPos - 4;
            } else {
                textarea.selectionStart = newPos;
                textarea.selectionEnd = newPos;
            }
        }, 0);
    };

    const handleEditorKeyDown = (e) => {
        if (!showSlashMenu) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSlashMenuIndex((prev) =>
                prev < filteredSlashCommands.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSlashMenuIndex((prev) =>
                prev > 0 ? prev - 1 : filteredSlashCommands.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredSlashCommands.length > 0) {
                executeSlashCommand(filteredSlashCommands[slashMenuIndex].markdown);
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            setShowSlashMenu(false);
            setSlashMenuFilter("");
        }
    };

    const handleEditorChange = (e) => {
        const newValue = e.target.value;
        const cursorPosition = e.target.selectionStart;
        handleInputChange("content", newValue);

        // Check for slash command trigger
        const textBeforeCursor = newValue.substring(0, cursorPosition);

        // Ensure the slash is either at the beginning of the string or preceded by a newline
        const slashMatch = textBeforeCursor.match(/(?:^|\n)\/([a-zA-Z]*)$/);

        if (slashMatch) {
            const filterText = slashMatch[1];

            // Calculate cursor position (rough approximation for simple textareas)
            // A more robust solution involves a hidden div replica, but this works for basic fixed-width fonts
            const lines = textBeforeCursor.split('\n');
            const currentLineNumber = lines.length;
            const currentColumn = lines[lines.length - 1].length;

            setSlashMenuPosition({
                top: Math.min(currentLineNumber * 20 + 10, 300), // rough line height approx
                left: Math.min(currentColumn * 8 + 20, window.innerWidth - 250) // rough char width approx
            });

            setSlashMenuFilter(filterText);
            setSlashMenuIndex(0);
            setShowSlashMenu(true);
        } else {
            setShowSlashMenu(false);
        }
    };

    const handleContentImageUpload = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        try {
            setIsUploadingImage(true);
            // toast.loading("Uploading image...", { id: "imageUpload" });
            const token = await getToken();

            const imageUploads = new FormData();
            imageUploads.append("contentImage", file);
            imageUploads.append("userId", user.id);

            const uploadResponse = await uploadMedia(imageUploads, token);

            if (uploadResponse && uploadResponse.status === 201) {
                const { contentImage } = uploadResponse.data;
                const altText = imageCaption.trim() ? imageCaption.trim() : "image";
                const imageMarkdown = `\n![${altText}](${contentImage})\n`;

                // insert at cursor position
                const textarea = document.getElementById("md-editor");
                if (textarea) {
                    const startPos = textarea.selectionStart;
                    const endPos = textarea.selectionEnd;
                    const textBefore = formData.content.substring(0, startPos);
                    const textAfter = formData.content.substring(
                        endPos,
                        formData.content.length,
                    );
                    const newContent = textBefore + imageMarkdown + textAfter;

                    handleInputChange("content", newContent);

                    // reset cursor (needs slight timeout to let React render)
                    setTimeout(() => {
                        textarea.focus();
                        textarea.selectionStart = startPos + imageMarkdown.length;
                        textarea.selectionEnd = startPos + imageMarkdown.length;
                    }, 0);
                } else {
                    handleInputChange("content", formData.content + imageMarkdown);
                }
                toast.dismiss("imageUpload");
                toast.success("Image added to editor!");
                setIsImageDialogOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.dismiss("imageUpload");
            toast.error("Failed to upload image!");
        } finally {
            setIsUploadingImage(false);
            setContentImageUploadPermission(false);
            e.target.value = null; // reset file input
            setImageCaption(""); // reset caption
            URL.revokeObjectURL(contentImagePreview);
            setContentImagePreview(null);//reset preview image url
        }
    };

    const handleExternalImageInsert = () => {
        if (!externalImageUrl.trim()) {
            toast.error("Please enter a valid image URL");
            return;
        }
        const altText = imageCaption.trim() ? imageCaption.trim() : "image";
        const imageMarkdown = `\n![${altText}](${externalImageUrl.trim()})\n`;
        const textarea = document.getElementById("md-editor");
        if (textarea) {
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const textBefore = formData.content.substring(0, startPos);
            const textAfter = formData.content.substring(
                endPos,
                formData.content.length,
            );
            const newContent = textBefore + imageMarkdown + textAfter;

            handleInputChange("content", newContent);

            setTimeout(() => {
                textarea.focus();
                textarea.selectionStart = startPos + imageMarkdown.length;
                textarea.selectionEnd = startPos + imageMarkdown.length;
            }, 0);
        } else {
            handleInputChange("content", formData.content + imageMarkdown);
        }
        setExternalImageUrl("");
        setImageCaption("");
        setContentImagePreview(null);
        setIsImageDialogOpen(false);
        toast.success("Image link inserted!");
    };

    const handleComponentInsert = () => {
        if (!componentContentText.trim()) {
            toast.error("Content cannot be empty");
            return;
        }

        let componentMarkdown = `\n<${selectedComponentType}>\n${componentContentText.trim()}\n</${selectedComponentType}>\n\n`;

        // Handling todo formatting optionally
        if (selectedComponentType === "todo" && !componentContentText.includes("\n")) {
            componentMarkdown = `\n<todo>\n- ${componentContentText.trim()}\n</todo>\n\n`;
        }

        const textarea = document.getElementById("md-editor");
        if (textarea) {
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const textBefore = formData.content.substring(0, startPos);
            const textAfter = formData.content.substring(endPos, formData.content.length);
            const newContent = textBefore + componentMarkdown + textAfter;

            handleInputChange("content", newContent);

            setTimeout(() => {
                textarea.focus();
                textarea.selectionStart = startPos + componentMarkdown.length;
                textarea.selectionEnd = startPos + componentMarkdown.length;
            }, 0);
        } else {
            handleInputChange("content", formData.content + componentMarkdown);
        }

        setSelectedComponentType("info");
        setComponentContentText("");
        setIsComponentDialogOpen(false);
        toast.success(`Custom ${selectedComponentType} inserted!`);
    };

    const handleFormatAction = (action) => {
        const textarea = document.getElementById("md-editor");
        if (!textarea) return;

        let startPos = textarea.selectionStart;
        let endPos = textarea.selectionEnd;

        // If no text is selected, do nothing or just show a small toast
        if (startPos === endPos) {
            toast.error("Please select text to format");
            return;
        }

        const fullText = formData.content;
        let selectedText = fullText.substring(startPos, endPos);
        const textBeforeSelection = fullText.substring(0, startPos);
        const textAfterSelection = fullText.substring(endPos, fullText.length);

        // --- Helper for Basic Markdown Toggling ---
        const toggleBasicFormat = (marker) => {
            const markerLen = marker.length;

            // Check if tags are immediately OUTSIDE the selection
            if (textBeforeSelection.endsWith(marker) && textAfterSelection.startsWith(marker)) {
                const newTextBefore = textBeforeSelection.slice(0, -markerLen);
                const newTextAfter = textAfterSelection.slice(markerLen);
                handleInputChange("content", newTextBefore + selectedText + newTextAfter);

                setTimeout(() => {
                    textarea.focus();
                    textarea.selectionStart = startPos - markerLen;
                    textarea.selectionEnd = endPos - markerLen;
                }, 0);
                return;
            }

            // Check if tags are immediately INSIDE the selection
            if (selectedText.startsWith(marker) && selectedText.endsWith(marker) && selectedText.length >= markerLen * 2) {
                const innerText = selectedText.slice(markerLen, -markerLen);
                handleInputChange("content", textBeforeSelection + innerText + textAfterSelection);

                setTimeout(() => {
                    textarea.focus();
                    textarea.selectionStart = startPos;
                    textarea.selectionEnd = startPos + innerText.length;
                }, 0);
                return;
            }

            // Apply formatting
            const formattedText = `${marker}${selectedText}${marker}`;
            handleInputChange("content", textBeforeSelection + formattedText + textAfterSelection);

            setTimeout(() => {
                textarea.focus();
                textarea.selectionStart = startPos;
                textarea.selectionEnd = startPos + formattedText.length;
            }, 0);
        };

        // --- Helper for Heading Toggling/Replacement ---
        const applyHeading = (level) => {
            const requestedLevelCount = parseInt(level.substring(1));
            const htmlTagMap = {
                'h1': 'h1', 'h2': 'h2', 'h3': 'h3',
                'h4': 'h4', 'h5': 'h5', 'h6': 'h6'
            };
            const requestedTag = htmlTagMap[level];

            // 1. Check HTML INSIDE
            const htmlRegexInside = /^<h([1-6])>(.*?)<\/h\1>$/s;
            const matchInside = selectedText.match(htmlRegexInside);
            if (matchInside) {
                const currentTag = `h${matchInside[1]}`;
                const innerText = matchInside[2];
                let replacementText = '';
                if (currentTag === requestedTag) {
                    replacementText = innerText; // Toggle OFF
                } else {
                    replacementText = `<${requestedTag}>${innerText}</${requestedTag}>`; // REPLACE
                }
                handleInputChange("content", textBeforeSelection + replacementText + textAfterSelection);
                setTimeout(() => {
                    textarea.focus();
                    textarea.selectionStart = startPos;
                    textarea.selectionEnd = startPos + replacementText.length;
                }, 0);
                return;
            }

            // 2. Check HTML OUTSIDE
            const matchBefore = textBeforeSelection.match(/<h([1-6])>$/);
            const matchAfter = textAfterSelection.match(/^<\/h([1-6])>/);
            if (matchBefore && matchAfter && matchBefore[1] === matchAfter[1]) {
                const currentTag = `h${matchBefore[1]}`;
                const tagBeforeLen = matchBefore[0].length;
                const tagAfterLen = matchAfter[0].length;

                const newTextBefore = textBeforeSelection.slice(0, -tagBeforeLen);
                const newTextAfter = textAfterSelection.slice(tagAfterLen);

                let newFormattedContext = '';
                let newStartPos = newTextBefore.length;
                let newEndPos = newTextBefore.length;

                if (currentTag === requestedTag) {
                    newFormattedContext = selectedText; // Toggle OFF
                    newEndPos = newStartPos + selectedText.length;
                } else {
                    newFormattedContext = `<${requestedTag}>${selectedText}</${requestedTag}>`; // REPLACE
                    newEndPos = newStartPos + newFormattedContext.length;
                }
                handleInputChange("content", newTextBefore + newFormattedContext + newTextAfter);
                setTimeout(() => {
                    textarea.focus();
                    textarea.selectionStart = newStartPos;
                    textarea.selectionEnd = newEndPos;
                }, 0);
                return;
            }

            // 3. Check MD INSIDE
            const mdRegexInside = /^(#{1,6})\s+(.*?)$/s;
            const mdMatchInside = selectedText.match(mdRegexInside);
            if (mdMatchInside) {
                const currentLevelCount = mdMatchInside[1].length;
                const innerText = mdMatchInside[2];

                let replacementText = '';
                if (currentLevelCount === requestedLevelCount) {
                    replacementText = innerText; // Toggle OFF
                } else {
                    replacementText = `<${requestedTag}>${innerText}</${requestedTag}>`; // REPLACE
                }
                handleInputChange("content", textBeforeSelection + replacementText + textAfterSelection);
                setTimeout(() => {
                    textarea.focus();
                    textarea.selectionStart = startPos;
                    textarea.selectionEnd = startPos + replacementText.length;
                }, 0);
                return;
            }

            // 4. Check MD OUTSIDE
            // Looks for heading start at the beginning of the line
            const mdMatchBefore = textBeforeSelection.match(/(^|\n)(#{1,6})\s+$/);
            if (mdMatchBefore) {
                const hashes = mdMatchBefore[2];
                const currentLevelCount = hashes.length;
                // remove only the `# ` (hashes length + space)
                const matchFullLength = hashes.length + 1;

                const newTextBefore = textBeforeSelection.slice(0, -matchFullLength);

                let newFormattedContext = '';
                let newStartPos = newTextBefore.length;
                let newEndPos = newTextBefore.length;

                if (currentLevelCount === requestedLevelCount) {
                    newFormattedContext = selectedText; // Toggle OFF
                    newEndPos = newStartPos + selectedText.length;
                } else {
                    newFormattedContext = `<${requestedTag}>${selectedText}</${requestedTag}>`; // REPLACE
                    newEndPos = newStartPos + newFormattedContext.length;
                }
                handleInputChange("content", newTextBefore + newFormattedContext + textAfterSelection);
                setTimeout(() => {
                    textarea.focus();
                    textarea.selectionStart = newStartPos;
                    textarea.selectionEnd = newEndPos;
                }, 0);
                return;
            }

            // 5. Apply new HTML heading
            const formattedText = `<${requestedTag}>${selectedText}</${requestedTag}>`;
            handleInputChange("content", textBeforeSelection + formattedText + textAfterSelection);
            setTimeout(() => {
                textarea.focus();
                textarea.selectionStart = startPos;
                textarea.selectionEnd = startPos + formattedText.length;
            }, 0);
        };

        switch (action) {
            case "bold": toggleBasicFormat("**"); break;
            case "italic": toggleBasicFormat("*"); break;
            case "strikethrough": toggleBasicFormat("~~"); break;
            case "h1": case "h2": case "h3": case "h4": case "h5": case "h6": applyHeading(action); break;
            default: break;
        }
    };

    function formValidate() {
        if (formData.title.trim() === "") {
            toast.error("Title is required !");
            return false;
        }
        if (formData.excerpt.trim() === "") {
            toast.error("Excerpt is required !");
            return false;
        }
        if (formData.category.trim() === "") {
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
            console.error("Failed to copy link to clipboard !", err);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!formValidate()) {
            setLoading(false);
            return;
        }

        try {
            const token = await getToken();
            let updatedFormData = { ...formData };

            // uploading uploaded images to cloudinary
            if (thumbFile || coverFile) {
                const imageUploads = new FormData();
                if (thumbFile) imageUploads.append("thumbnail", thumbFile);
                if (coverFile) imageUploads.append("coverImage", coverFile);
                //appending user id
                imageUploads.append("userId", user.id);
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
                        referenceStatus: true,
                    };
                }
            }

            if (type === "new") {
                // handle new article submission
                const res = await createPost(updatedFormData, userId, token);
                if (res && res.status === 201) {
                    localStorage.removeItem("draft");
                    localStorage.removeItem("lastSaved");
                    toast.success("Draft sent for review successfully !");
                    copyToClipboard(
                        `${window.location.origin}/articles/${res.data.postId}`,
                    );
                } else {
                    toast.error("Failed to create post !");
                }
            }
            if (type === "edit") {
                // handle article update submission
                const patchData = diffeningFunction(oldData, updatedFormData);

                // check referenceStatus and prepare patch data
                if (
                    oldData.referenceStatus &&
                    (!updatedFormData.thumb_id || updatedFormData.thumb_id === null) &&
                    (!updatedFormData.cover_id || updatedFormData.cover_id === null)
                ) {
                    if (!patchData.thumbnail && !patchData.coverImage) {
                        updatedFormData.referenceStatus = true;
                        patchData.referenceStatus = true;
                    }
                    if (
                        patchData.thumbnail &&
                        !patchData.coverImage &&
                        oldData.coverImage.includes(userId)
                    ) {
                        updatedFormData.referenceStatus = true;
                        patchData.referenceStatus = true;
                    }
                    if (
                        patchData.coverImage &&
                        !patchData.thumbnail &&
                        oldData.thumbnail.includes(userId)
                    ) {
                        updatedFormData.referenceStatus = true;
                        patchData.referenceStatus = true;
                    }
                    if (patchData.thumbnail && patchData.coverImage) {
                        updatedFormData.referenceStatus = false;
                        patchData.referenceStatus = false;
                    }
                }

                // Set referenceStatus to false when both images are deleted
                if (patchData.thumbnail === "" && patchData.coverImage === "") {
                    patchData.referenceStatus = false;
                }

                // handling old media deletion if changed
                if (oldData.referenceStatus) {
                    // Case 1: New images uploaded
                    if (
                        (patchData.thumb_id && patchData.thumb_id !== null) ||
                        (patchData.cover_id && patchData.cover_id !== null)
                    ) {
                        if (patchData.thumbnail && oldData.thumbnail.includes(userId)) {
                            const oldThumbId =
                                "kenshi_webspace" +
                                oldData.thumbnail.split("kenshi_webspace")[1].split(".")[0];
                            await deleteMedia({ publicId: oldThumbId }, token);
                        }
                        if (patchData.coverImage && oldData.coverImage.includes(userId)) {
                            const oldCoverId =
                                "kenshi_webspace" +
                                oldData.coverImage.split("kenshi_webspace")[1].split(".")[0];
                            await deleteMedia({ publicId: oldCoverId }, token);
                        }
                    }
                    // Case 2: Images deleted without replacement
                    else if (!thumbFile && !coverFile) {
                        if (
                            (patchData.thumbnail || patchData.thumbnail === "") &&
                            oldData.thumbnail.includes(userId)
                        ) {
                            const oldThumbId =
                                "kenshi_webspace" +
                                oldData.thumbnail.split("kenshi_webspace")[1].split(".")[0];
                            await deleteMedia({ publicId: oldThumbId }, token);
                        }
                        if (
                            (patchData.coverImage || patchData.coverImage === "") &&
                            oldData.coverImage.includes(userId)
                        ) {
                            const oldCoverId =
                                "kenshi_webspace" +
                                oldData.coverImage.split("kenshi_webspace")[1].split(".")[0];
                            await deleteMedia({ publicId: oldCoverId }, token);
                        }
                    }
                }

                // handling service reference deletion if changed
                if (
                    patchData.referenceStatus === false &&
                    oldData.referenceStatus === true
                ) {
                    patchData.del_req = true; // flag for deleting service reference
                }

                // delete thumb_id and cover_id in patch data for transmission
                // delete patchData.thumb_id;
                // delete patchData.cover_id;

                // attaching global user info for role based access control

                // patchData.user = {
                //     id: currentUser?.id,
                //     email: currentUser?.email,
                // };

                console.log("Patch data:", patchData);

                const res = await updatePost(params.id, patchData, token);

                if (res && res.status === 200) {
                    toast.success("Post updated successfully!");
                } else {
                    toast.error("Failed to update post !");
                }
            }
        } catch (error) {
            if (error.code === "ECONNABORTED")
                toast.error(
                    "Request timed out. Please check 'Your Articles' and retry if post not created.",
                );
            else toast.error("An error occurred while processing your request !");

            console.error("Submission error:", error);
        } finally {
            // resetting form data
            if (type === "new") {
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

                setFormData({
                    title: "",
                    excerpt: "",
                    category: "",
                    readTime: 0,
                    thumbnail: "",
                    coverImage: "",
                    content: dummyContent,
                    referenceStatus: false,
                });
            } else if (type === "edit") {
                setOldData(formData);
                setFormData(formData);
            }

            // set loading to false
            setLoading(false);
        }
    };

    const saveDraft = () => {
        localStorage.setItem("draft", JSON.stringify(formData));
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSaved(timeString);
        localStorage.setItem("lastSaved", timeString);
        toast.success(
            "Draft is saved locally.",
            { duration: 2000 },
        );
    };

    const categories = [
        "Technology",
        "Geopolitics",
        "History",
        "Astronomy",
        "Religion & Culture",
        "Anime",
        "Literature",
        "Travel",
    ];

    {
        type === "edit" && loading && <LoadingPage />;
    }

    return (
        <TooltipProvider>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={isZenMode
                    ? "fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-4 md:py-8 lg:py-12 px-4 md:px-6 lg:px-16"
                    : "min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-4 md:py-8 lg:py-16 px-4 md:px-6 lg:px-16"
                }
            >
                <div className="max-w-7xl mx-auto">
                    <Card className={`rounded-2xl md:rounded-3xl shadow-2xl bg-white/10 border border-white/20 backdrop-blur-xl ${isZenMode ? "min-h-[90vh]" : ""}`}>
                        <CardHeader className={isZenMode ? "hidden" : "p-4 md:p-6 lg:p-8"}>
                            <CardTitle className="flex items-center gap-2 md:gap-3 text-white text-xl md:text-2xl lg:text-3xl font-extrabold">
                                <FileText size={20} className="md:hidden" />
                                <FileText size={28} className="hidden md:block" />
                                <span className="truncate">
                                    {type === "new" ? "Create New" : "Edit your"} Article
                                </span>
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
                            {/* Article Metadata Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 ${isZenMode ? "hidden" : ""}`}
                            >
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <Label
                                            htmlFor="title"
                                            className="text-white font-medium text-sm md:text-base mb-2 block"
                                        >
                                            Article Title <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) =>
                                                handleInputChange("title", e.target.value)
                                            }
                                            placeholder="Enter your article title..."
                                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="excerpt"
                                            className="text-white font-medium text-sm md:text-base mb-2 block"
                                        >
                                            Excerpt <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="excerpt"
                                            value={formData.excerpt}
                                            onChange={(e) =>
                                                handleInputChange("excerpt", e.target.value)
                                            }
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
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) =>
                                                    handleInputChange("category", value)
                                                }
                                            >
                                                <SelectTrigger className="bg-white/5 border-white/20 text-white text-sm md:text-base">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label
                                                htmlFor="readTime"
                                                className="text-white font-medium text-sm md:text-base mb-2 block"
                                            >
                                                <Clock size={16} className="inline mr-1" />
                                                Read Time (min) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="readTime"
                                                type="number"
                                                value={formData.readTime}
                                                onChange={(e) =>
                                                    handleInputChange("readTime", e.target.value)
                                                }
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
                                        <Label
                                            htmlFor="thumbnail"
                                            className="text-white font-medium text-sm md:text-base mb-2 block"
                                        >
                                            <Image size={16} className="inline mr-1" />
                                            Thumbnail URL
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="thumbnail"
                                                value={
                                                    formData.thumbnail &&
                                                        !formData.thumbnail.includes(userId)
                                                        ? formData.thumbnail
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setThumbPreview(null);
                                                    setThumbFile(null);
                                                    handleInputChange("thumbnail", e.target.value);
                                                }}
                                                placeholder="https://example.com/thumbnail.jpg"
                                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
                                            />

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        htmlFor="thumbUpload"
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                    >
                                                        <Upload size={16} />
                                                        <input
                                                            type="file"
                                                            id="thumbUpload"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleImageUpload(e, "thumbnail")
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="thumbUpload"
                                                            className="hidden sm:block"
                                                        >
                                                            Upload Image
                                                        </label>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Upload image</TooltipContent>
                                            </Tooltip>

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
                                        </div>
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="coverImage"
                                            className="text-white font-medium text-sm md:text-base mb-2 block"
                                        >
                                            <Image size={16} className="inline mr-1" />
                                            Cover Image URL
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="coverImage"
                                                value={
                                                    formData.coverImage &&
                                                        !formData.coverImage.includes(userId)
                                                        ? formData.coverImage
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setCoverPreview(null);
                                                    setCoverFile(null);
                                                    handleInputChange("coverImage", e.target.value);
                                                }}
                                                placeholder="https://example.com/cover.jpg"
                                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
                                            />

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        htmlFor="coverUpload"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                    >
                                                        <Upload size={16} />
                                                        <input
                                                            type="file"
                                                            id="coverUpload"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleImageUpload(e, "cover")}
                                                        />
                                                        <label
                                                            htmlFor="coverUpload"
                                                            className="hidden sm:block"
                                                        >
                                                            Upload Image
                                                        </label>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Upload image</TooltipContent>
                                            </Tooltip>

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
                                        </div>
                                    </div>

                                    {/* Image Preview */}
                                    <div className="bg-white/5 p-3 md:p-4 rounded-lg border border-white/20">
                                        <Label className="text-white font-medium text-sm mb-2 block">
                                            Preview
                                        </Label>
                                        <div className="grid grid-cols-2 gap-2 space-y-2">
                                            {/* Thumbnail */}
                                            <div>
                                                <p className="text-xs text-gray-300 mb-1">Thumbnail</p>
                                                <img
                                                    src={
                                                        thumbPreview
                                                            ? thumbPreview
                                                            : formData.thumbnail === ""
                                                                ? "/placeholder.png"
                                                                : formData.thumbnail
                                                    }
                                                    onError={(e) => {
                                                        e.target.onerror = null; //prevent loop if placeholder fails
                                                        e.target.src = "/placeholder.png";
                                                    }}
                                                    alt="Thumbnail preview"
                                                    className="w-full h-40 object-fill rounded border shadow-sm border-white/20"
                                                />
                                            </div>

                                            {/* Cover Image */}
                                            <div>
                                                <p className="text-xs text-gray-300 mb-1">
                                                    Cover Image
                                                </p>
                                                <img
                                                    src={
                                                        coverPreview
                                                            ? coverPreview
                                                            : formData.coverImage === ""
                                                                ? "/placeholder.png"
                                                                : formData.coverImage
                                                    }
                                                    onError={(e) => {
                                                        e.target.onerror = null; //prevent loop if placeholder fails
                                                        e.target.src = "/placeholder.png";
                                                    }}
                                                    alt="Cover preview"
                                                    className="w-full h-40 object-fill rounded border shadow-sm border-white/20"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <Separator className={`bg-white/20 ${isZenMode ? "hidden" : ""}`} />

                            {/* Markdown Editor */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Tabs defaultValue="write" className="h-full">
                                    <TabsList className="mb-4 flex flex-wrap h-auto gap-1 md:gap-2 justify-start items-center bg-white/10 p-1 rounded-xl w-full">
                                        {/* clear and copy buttons */}
                                        <div className="mr-auto flex flex-wrap items-center justify-start gap-1">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={() => handleInputChange("content", "")}
                                                    >
                                                        <Trash size={14} className="md:w-4 md:h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Remove</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={async () => {
                                                            try {
                                                                await navigator.clipboard.writeText(
                                                                    formData.content,
                                                                );
                                                                toast.success("Copied !");
                                                                setCopied(true);
                                                            } catch (err) {
                                                                console.error("Error copying !", err);
                                                            }
                                                        }}
                                                    >
                                                        {copied ? (
                                                            <Check size={14} className="md:w-4 md:h-4" />
                                                        ) : (
                                                            <CopyIcon size={14} className="md:w-4 md:h-4" />
                                                        )}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Copy</TooltipContent>
                                            </Tooltip>

                                            <div className="mx-1 mt-1 w-[1px] h-6 bg-white/20 self-center hidden sm:block"></div>

                                            {/* Text Formatting Toolbar Elements */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={() => handleFormatAction("bold")}
                                                    >
                                                        <Bold size={14} className="md:w-4 md:h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Bold</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={() => handleFormatAction("italic")}
                                                    >
                                                        <Italic size={14} className="md:w-4 md:h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Italic</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={() => handleFormatAction("strikethrough")}
                                                    >
                                                        <Strikethrough size={14} className="md:w-4 md:h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Strikethrough</TooltipContent>
                                            </Tooltip>

                                            <Select value="" onValueChange={(val) => handleFormatAction(val)}>
                                                <SelectTrigger className="w-[70px] h-8 bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs px-2 focus:ring-0 focus:ring-offset-0 relative [&>svg]:right-1 [&>svg]:absolute pr-0 pl-2">
                                                    <SelectValue placeholder="Hx" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-purple-900 border-white/20 text-white min-w-[70px]">
                                                    <SelectItem value="h1" className="focus:bg-white/10 focus:text-white cursor-pointer"><div className="flex items-center gap-2 pr-2 -ml-2"><Heading1 size={14} /></div></SelectItem>
                                                    <SelectItem value="h2" className="focus:bg-white/10 focus:text-white cursor-pointer"><div className="flex items-center gap-2 pr-2 -ml-2"><Heading2 size={14} /></div></SelectItem>
                                                    <SelectItem value="h3" className="focus:bg-white/10 focus:text-white cursor-pointer"><div className="flex items-center gap-2 pr-2 -ml-2"><Heading3 size={14} /></div></SelectItem>
                                                    <SelectItem value="h4" className="focus:bg-white/10 focus:text-white cursor-pointer"><div className="flex items-center gap-2 pr-2 -ml-2"><Heading4 size={14} /></div></SelectItem>
                                                    <SelectItem value="h5" className="focus:bg-white/10 focus:text-white cursor-pointer"><div className="flex items-center gap-2 pr-2 -ml-2"><Heading5 size={14} /></div></SelectItem>
                                                    <SelectItem value="h6" className="focus:bg-white/10 focus:text-white cursor-pointer"><div className="flex items-center gap-2 pr-2 -ml-2"><Heading6 size={14} /></div></SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <div className="mx-1 mt-1 w-[1px] h-6 bg-white/20 self-center hidden sm:block"></div>

                                            {/* Table of Contents Generator */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                        onClick={generateTableOfContents}
                                                    >
                                                        <List size={14} className="md:w-4 md:h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Generate Table of Contents</TooltipContent>
                                            </Tooltip>

                                            <Dialog
                                                open={isImageDialogOpen}
                                                onOpenChange={(open) => {
                                                    setIsImageDialogOpen(open);
                                                    if (!open) {
                                                        setExternalImageUrl("");
                                                        setImageCaption("");
                                                        setContentImagePreview(null);
                                                        setContentImageUploadPermission(false);
                                                        setContentImageUploadEventObject(null);
                                                    }
                                                }}
                                            >
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                            >
                                                                {isUploadingImage ? (
                                                                    <LoaderCircle
                                                                        size={14}
                                                                        className="md:w-4 md:h-4 animate-spin"
                                                                    />
                                                                ) : (
                                                                    <Image size={14} className="md:w-4 md:h-4" />
                                                                )}
                                                            </Button>
                                                        </DialogTrigger>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Insert Image</TooltipContent>
                                                </Tooltip>
                                                <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 border-white/20 text-white">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-white">
                                                            Insert Image
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gray-300">
                                                            Upload a file from your device or embed an
                                                            external link.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    {/* Global Caption Field */}
                                                    <div className="px-4 pt-2">
                                                        <Label
                                                            htmlFor="imageCaption"
                                                            className="text-white font-medium text-xs mb-1.5 block"
                                                        >
                                                            Caption (Optional)
                                                        </Label>
                                                        <Input
                                                            id="imageCaption"
                                                            placeholder="A descriptive alt text..."
                                                            value={imageCaption}
                                                            onChange={(e) => setImageCaption(e.target.value)}
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm h-8"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-6 px-4 pb-4">
                                                        {(externalImageUrl || contentImagePreview) && (
                                                            <div className="bg-white/5 p-3 rounded-lg border border-white/20">
                                                                <Label className="text-white font-medium text-xs mb-2 block">
                                                                    Live Preview
                                                                </Label>
                                                                <div className="flex justify-center bg-black/40 rounded border border-white/10 p-2 h-32 overflow-hidden">
                                                                    <img
                                                                        src={
                                                                            contentImagePreview || externalImageUrl
                                                                        }
                                                                        alt="Preview"
                                                                        className="object-contain w-full h-full"
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = "/placeholder.png"; // Make sure placeholder.png exists or use a generic one
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <LinkIcon size={16} />
                                                                <h4 className="font-medium text-sm">
                                                                    Embed Link
                                                                </h4>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Input
                                                                    placeholder="https://example.com/image.png"
                                                                    value={externalImageUrl}
                                                                    onChange={(e) =>
                                                                        setExternalImageUrl(e.target.value)
                                                                    }
                                                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                                                />
                                                                <Button
                                                                    onClick={handleExternalImageInsert}
                                                                    className="bg-white/20 hover:bg-white/30 text-white"
                                                                >
                                                                    Insert
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className="relative">
                                                            <div className="absolute inset-0 flex items-center">
                                                                <span className="w-full border-t border-white/10" />
                                                            </div>
                                                            <div className="relative flex justify-center text-xs uppercase">
                                                                <span className="bg-purple-900 px-2 text-gray-400">
                                                                    Or
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Upload size={16} />
                                                                <h4 className="font-medium text-sm">
                                                                    Upload File
                                                                </h4>
                                                            </div>
                                                            <div className="flex gap-2 w-full items-center">
                                                                <Button
                                                                    asChild
                                                                    className="w-full flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white cursor-pointer"
                                                                    onClick={
                                                                        () => {
                                                                            if (contentImageUploadPermission) {
                                                                                handleContentImageUpload(contentImageUploadEventObject);
                                                                            }
                                                                        }
                                                                    }
                                                                >
                                                                    <label>
                                                                        {contentImageUploadPermission ? isUploadingImage ? <><LoaderCircle className="animate-spin" /> <span>Uploading...</span></> : "Upload"
                                                                            : "Click to select file"}
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            className="hidden"
                                                                            onChange={(e) => {
                                                                                const file =
                                                                                    e.target.files && e.target.files[0];
                                                                                if (file) {
                                                                                    const previewUrl =
                                                                                        URL.createObjectURL(file);
                                                                                    setContentImagePreview(previewUrl);
                                                                                    setContentImageUploadPermission(true);
                                                                                    setContentImageUploadEventObject(e);
                                                                                }
                                                                            }}
                                                                            disabled={isUploadingImage}
                                                                        />
                                                                    </label>
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                                    onClick={() => handleImageDelete("content")}
                                                                >
                                                                    <Trash size={16} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog
                                                open={isComponentDialogOpen}
                                                onOpenChange={(open) => {
                                                    setIsComponentDialogOpen(open);
                                                    if (!open) {
                                                        setSelectedComponentType("info");
                                                        setComponentContentText("");
                                                    }
                                                }}
                                            >
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-2 md:px-3"
                                                            >
                                                                <MessageSquareWarning size={14} className="md:w-4 md:h-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Insert Banner</TooltipContent>
                                                </Tooltip>
                                                <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 border-white/20 text-white">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-white">
                                                            Insert Banner
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gray-300">
                                                            Insert stylized callouts, quotes, warnings, and lists into your article.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className="flex flex-col gap-4 px-4 py-2">
                                                        <div>
                                                            <Label className="text-white font-medium text-xs mb-2 block">
                                                                Component Type
                                                            </Label>
                                                            <RadioGroup
                                                                value={selectedComponentType}
                                                                onValueChange={setSelectedComponentType}
                                                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
                                                            >
                                                                {["info", "note", "tip", "like", "success", "warn", "danger", "todo", "quote"].map((type) => (
                                                                    <div key={type} className="flex items-center space-x-2">
                                                                        <RadioGroupItem value={type} id={type} className="border-white/50 text-indigo-400" />
                                                                        <Label htmlFor={type} className="text-xs capitalize flex items-center gap-1 cursor-pointer hover:text-indigo-300 transition-colors">
                                                                            {type === "info" && "💡"}
                                                                            {type === "note" && "📝"}
                                                                            {type === "tip" && "💡"}
                                                                            {type === "like" && "🩷"}
                                                                            {type === "success" && "✅"}
                                                                            {type === "warn" && "⚠️"}
                                                                            {type === "danger" && "❗"}
                                                                            {type === "todo" && "📋"}
                                                                            {type === "quote" && "✨"}
                                                                            {type}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="componentContent" className="text-white font-medium text-xs mb-1.5 block">
                                                                Text Content
                                                            </Label>
                                                            <Textarea
                                                                id="componentContent"
                                                                rows={4}
                                                                value={componentContentText}
                                                                onChange={(e) => setComponentContentText(e.target.value)}
                                                                placeholder="e.g. This is a very important warning for readers..."
                                                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm resize-y"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex px-4 pb-4">
                                                        <Button
                                                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                                                            onClick={handleComponentInsert}
                                                        >
                                                            Insert Component
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        <div className="flex items-center gap-1 sm:gap-2 mr-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className={`px-2 md:px-3 text-white hover:bg-white/20 hover:text-white ${isSplitScreen ? 'bg-white/20' : ''} hidden lg:flex`}
                                                            onClick={() => setIsSplitScreen(!isSplitScreen)}
                                                        >
                                                            <Columns size={14} className="md:w-4 md:h-4" />
                                                        </Button>
                                                    </motion.div>
                                                </TooltipTrigger>
                                                <TooltipContent>Split Screen (Desktop)</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className={`px-2 md:px-3 text-white hover:bg-white/20 hover:text-white ${isZenMode ? 'bg-white/20' : ''}`}
                                                            onClick={() => setIsZenMode(!isZenMode)}
                                                        >
                                                            {isZenMode ? <Minimize size={14} className="md:w-4 md:h-4" /> : <Maximize size={14} className="md:w-4 md:h-4" />}
                                                        </Button>
                                                    </motion.div>
                                                </TooltipTrigger>
                                                <TooltipContent>{isZenMode ? "Exit Zen Mode" : "Zen Mode"}</TooltipContent>
                                            </Tooltip>
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 sm:flex-initial"
                                        >
                                            <TabsTrigger
                                                value="write"
                                                className="flex items-center gap-2 w-full text-xs md:text-sm"
                                            >
                                                <Pencil size={14} className="md:w-4 md:h-4" />
                                                <span className="hidden sm:block">Editor</span>
                                                <span className="block [@media(max-width:315px)]:hidden sm:hidden">
                                                    Edit
                                                </span>
                                            </TabsTrigger>
                                        </motion.div>

                                        {/*todo: add quill editor in future */}

                                        {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-initial">
                                            <TabsTrigger value="write" className="flex items-center gap-2 w-full text-xs md:text-sm">
                                                <Pencil size={14} className="md:w-4 md:h-4" />
                                                <span className='hidden sm:block'>Mark Editor</span>
                                                <span className='block [@media(max-width:315px)]:hidden sm:hidden'>M. Edit</span>
                                            </TabsTrigger>
                                        </motion.div> */}

                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 sm:flex-initial"
                                        >
                                            <TabsTrigger
                                                value="preview"
                                                className="flex items-center gap-2 w-full text-xs md:text-sm"
                                            >
                                                <Eye size={14} className="md:w-4 md:h-4" />
                                                <span className="hidden sm:block">Preview</span>
                                                <span className="block [@media(max-width:315px)]:hidden sm:hidden">
                                                    Prev
                                                </span>
                                            </TabsTrigger>
                                        </motion.div>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="ml-auto"
                                                >
                                                    <TabsTrigger
                                                        value="manual"
                                                        className="flex items-center gap-2 w-full text-xs md:text-sm"
                                                    >
                                                        <Info size={14} className="md:w-4 md:h-4" />
                                                    </TabsTrigger>
                                                </motion.div>
                                            </TooltipTrigger>
                                            <TooltipContent>Editor Manual</TooltipContent>
                                        </Tooltip>
                                    </TabsList>

                                    <TabsContent value="write">
                                        <div className={isSplitScreen ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""}>
                                            <div className="relative w-full h-full">
                                                <Textarea
                                                    id="md-editor"
                                                    value={formData.content}
                                                    onChange={handleEditorChange}
                                                    onClick={() => setShowSlashMenu(false)}
                                                    onKeyDown={handleEditorKeyDown}
                                                    onDrop={handleEditorDrop}
                                                    onPaste={handleEditorPaste}
                                                    placeholder="Write your markdown content here... Type '/' for command menu."
                                                    className={`p-3 md:p-4 font-mono text-xs md:text-sm bg-white/5 text-white border-white/20 resize-none hide-scrollbar ${isSplitScreen ? (isZenMode ? "max-h-[85vh] h-[85vh] overflow-y-auto" : "max-h-[300px] md:max-h-[400px] lg:max-h-[500px] h-[300px] md:h-[400px] lg:h-[500px] overflow-y-auto") : (isZenMode ? "min-h-[85vh]" : "min-h-[300px] md:min-h-[400px] lg:min-h-[500px]")}`}
                                                />

                                                {showSlashMenu && filteredSlashCommands.length > 0 && (
                                                    <div
                                                        className="absolute z-50 w-48 bg-gray-900 border border-white/20 rounded-md shadow-xl overflow-hidden"
                                                        style={{
                                                            top: `${slashMenuPosition.top}px`,
                                                            left: `${slashMenuPosition.left}px`
                                                        }}
                                                    >
                                                        <div className="text-xs text-gray-400 px-3 py-1.5 border-b border-white/10 uppercase tracking-wider font-semibold">
                                                            Basic Blocks
                                                        </div>
                                                        <div className="max-h-60 overflow-y-auto py-1">
                                                            {filteredSlashCommands.map((cmd, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors ${idx === slashMenuIndex
                                                                        ? "bg-purple-600/40 text-white"
                                                                        : "text-gray-300 hover:bg-white/10"
                                                                        }`}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        executeSlashCommand(cmd.markdown);
                                                                    }}
                                                                >
                                                                    <div className="bg-white/10 p-1.5 rounded-md flex-shrink-0">
                                                                        {cmd.icon}
                                                                    </div>
                                                                    <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{cmd.title}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {isSplitScreen && (
                                                <div
                                                    className={`px-4 py-3 wrap-break-word overflow-y-auto bg-white/5 border border-white/20 rounded-md hide-scrollbar scroll-smooth ${isZenMode ? "max-h-[85vh] h-[85vh]" : "max-h-[300px] md:max-h-[400px] lg:max-h-[500px] h-[300px] md:h-[400px] lg:h-[500px]"}`}
                                                >
                                                    <MarkdownRenderer
                                                        content={formData.content || "_Nothing to preview_"}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="preview">
                                        <div className="px-1 wrap-break-word">
                                            <MarkdownRenderer
                                                content={formData.content || "_Nothing to preview_"}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="manual" className="h-full">
                                        <ScrollArea className="h-[300px] md:h-[400px] lg:h-[500px] overflow-clip max-w-none bg-white/5 p-4 md:p-6 rounded-xl border border-white/20">
                                            <div className="px-1">
                                                <MarkdownRenderer
                                                    content={dummyContent || "_Error loading manual !_"}
                                                />
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
                                    <span className="block sm:inline">
                                        Characters: {formData.content.length}
                                    </span>
                                    <span className="hidden sm:inline"> • </span>
                                    <span className="block sm:inline">
                                        Words:{" "}
                                        {
                                            formData.content
                                                .split(/\s+/)
                                                .filter((word) => word.length > 0).length
                                        }
                                    </span>
                                    {lastSaved && (
                                        <div className="flex items-center gap-1 mt-1 text-xs text-indigo-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                            <span>Saved locally at {lastSaved}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 md:gap-3 w-full sm:w-auto order-1 sm:order-2">
                                    <Button
                                        variant="outline"
                                        // onClick={() => toast.error("Feature not implemented yet !")}
                                        onClick={saveDraft}
                                        className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white border-white/20 text-sm md:text-base"
                                    >
                                        Save Draft
                                    </Button>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 sm:flex-initial"
                                            >
                                                <Button
                                                    onClick={() => handleSubmit()}
                                                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white flex items-center justify-center gap-2 transition-all duration-200 text-sm md:text-base"
                                                >
                                                    {loading ? (
                                                        <LoaderCircle className="animate-spin" />
                                                    ) : (
                                                        <Send size={16} className="md:w-4 md:h-4" />
                                                    )}
                                                    <span className="hidden sm:inline">
                                                        {loading ? "Submitting..." : "Submit for Review"}
                                                    </span>
                                                    <span className="sm:hidden">Submit</span>
                                                </Button>
                                            </motion.div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                {loading
                                                    ? "Submitting..."
                                                    : "Submit your article for review and publication"}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </motion.div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </TooltipProvider>
    );
}

// type must be string(type checking-eslint)
EditorPage.propTypes = {
    type: PropTypes.string.isRequired,
};
