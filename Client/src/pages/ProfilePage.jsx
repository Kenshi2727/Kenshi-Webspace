import React, { useState, useRef } from 'react';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Link2,
    Edit3,
    Camera,
    Save,
    X,
    FileText,
    Eye,
    Heart,
    MessageCircle,
    Award,
    TrendingUp,
    Users,
    Sparkles,
    Globe,
    Github,
    Twitter,
    Linkedin,
    Star,
    BookOpen,
    Clock,
    ExternalLink,
    ChevronRight,
    Upload,
    Check,
    AlertCircle
} from 'lucide-react';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const fileInputRef = useRef(null);

    // Original profile data (simulating server data)
    const originalProfileData = {
        name: 'Kenshin Commander',
        email: 'alex@kenshiwebspace.com',
        bio: 'Passionate writer and researcher exploring the intersection of technology, philosophy, and human creativity. Always learning, always growing.',
        location: 'San Francisco, CA',
        website: 'https://alexkenshi.dev',
        joinedDate: 'March 2024',
        avatar: null,
        socialLinks: {
            twitter: 'https://twitter.com/alexkenshi',
            github: 'https://github.com/alexkenshi',
            linkedin: 'https://linkedin.com/in/alexkenshi'
        }
    };

    // Editable profile data
    const [profileData, setProfileData] = useState(originalProfileData);
    const [tempProfileData, setTempProfileData] = useState(originalProfileData);

    // Form validation errors
    const [errors, setErrors] = useState({});

    // Mock stats data
    const stats = {
        articles: 12,
        views: 2500,
        likes: 180,
        followers: 45
    };

    // Mock recent articles
    const recentArticles = [
        {
            id: 1,
            title: 'The Future of AI in Creative Writing',
            excerpt: 'Exploring how artificial intelligence is reshaping the landscape of creative content creation and what it means for writers worldwide.',
            publishedDate: '2 days ago',
            views: 234,
            likes: 18,
            comments: 5,
            readTime: '5 min read',
            category: 'Technology'
        },
        {
            id: 2,
            title: 'Understanding Quantum Computing',
            excerpt: 'A comprehensive deep dive into the principles, applications, and potential of quantum computing technology in our modern world.',
            publishedDate: '1 week ago',
            views: 456,
            likes: 32,
            comments: 12,
            readTime: '8 min read',
            category: 'Science'
        },
        {
            id: 3,
            title: 'The Philosophy of Code',
            excerpt: 'Examining the philosophical implications of programming and software development in shaping our digital future.',
            publishedDate: '2 weeks ago',
            views: 189,
            likes: 24,
            comments: 8,
            readTime: '6 min read',
            category: 'Philosophy'
        }
    ];

    const achievements = [
        {
            title: 'First Article',
            description: 'Published your first article on the platform',
            date: 'March 2024',
            icon: '🎉',
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            title: 'Popular Writer',
            description: 'Reached 1000+ total views across all articles',
            date: 'April 2024',
            icon: '📈',
            gradient: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'Community Favorite',
            description: 'Received 100+ likes from the community',
            date: 'May 2024',
            icon: '❤️',
            gradient: 'from-pink-500 to-rose-600'
        },
        {
            title: 'Consistent Creator',
            description: 'Published 10 articles maintaining quality',
            date: 'June 2024',
            icon: '✍️',
            gradient: 'from-amber-500 to-orange-600'
        }
    ];

    const interests = ['AI & Machine Learning', 'Philosophy', 'Web Development', 'Creative Writing', 'Quantum Computing', 'UI/UX Design'];

    // Validation function
    const validateForm = (data) => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (data.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!data.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (data.bio.length > 500) {
            newErrors.bio = 'Bio must be less than 500 characters';
        }

        if (data.website && !/^https?:\/\/.+/.test(data.website)) {
            newErrors.website = 'Website must be a valid URL (include http:// or https://)';
        }

        if (data.socialLinks.twitter && !/^https?:\/\/(www\.)?twitter\.com\/.+/.test(data.socialLinks.twitter)) {
            newErrors.twitter = 'Please enter a valid Twitter URL';
        }

        if (data.socialLinks.github && !/^https?:\/\/(www\.)?github\.com\/.+/.test(data.socialLinks.github)) {
            newErrors.github = 'Please enter a valid GitHub URL';
        }

        if (data.socialLinks.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(data.socialLinks.linkedin)) {
            newErrors.linkedin = 'Please enter a valid LinkedIn URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes with callback to prevent cursor jumping
    const handleInputChange = (field, value) => {
        setTempProfileData(prev => {
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                return {
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value
                    }
                };
            } else {
                return {
                    ...prev,
                    [field]: value
                };
            }
        });

        // Clear field-specific errors when user starts typing
        if (errors[field] || errors[field.split('.')[1]]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined,
                [field.split('.')[1]]: undefined
            }));
        }
    };

    // Handle avatar upload
    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setErrors(prev => ({ ...prev, avatar: 'File size must be less than 5MB' }));
                return;
            }

            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, avatar: 'Please select an image file' }));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setTempProfileData(prev => ({
                    ...prev,
                    avatar: e.target.result
                }));
                setErrors(prev => ({ ...prev, avatar: undefined }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Start editing
    const handleEdit = () => {
        setIsEditing(true);
        setTempProfileData(profileData);
        setErrors({});
        setSaveStatus(null);
    };

    // Cancel editing
    const handleCancel = () => {
        setIsEditing(false);
        setTempProfileData(profileData);
        setErrors({});
        setSaveStatus(null);
    };

    // Save changes
    const handleSave = async () => {
        if (!validateForm(tempProfileData)) {
            return;
        }

        setIsSaving(true);
        setSaveStatus(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setProfileData(tempProfileData);
            setIsEditing(false);
            setSaveStatus('success');

            setTimeout(() => setSaveStatus(null), 3000);
        } catch (error) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(null), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    // Custom Input Component with stable reference
    const CustomInput = React.memo(({ label, value, onChange, type = "text", error, placeholder, icon: Icon, field, ...props }) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-purple-200 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {label}
            </label>
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(field, e.target.value)}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-white/10 border ${error ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-xl`}
                {...props}
            />
            {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}
        </div>
    ));

    // Custom Textarea Component with stable reference
    const CustomTextarea = React.memo(({ label, value, onChange, error, placeholder, rows = 4, maxLength, field, ...props }) => (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-purple-200">
                    {label}
                </label>
                {maxLength && (
                    <span className="text-xs text-purple-300">
                        {(value || '').length}/{maxLength}
                    </span>
                )}
            </div>
            <textarea
                value={value || ''}
                onChange={(e) => onChange(field, e.target.value)}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                className={`w-full px-4 py-3 bg-white/10 border ${error ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-xl resize-none`}
                {...props}
            />
            {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}
        </div>
    ));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Success/Error Messages */}
            {saveStatus && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
                    <div className={`p-4 rounded-xl backdrop-blur-xl shadow-2xl border flex items-center gap-3 ${saveStatus === 'success'
                        ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
                        : 'bg-red-500/20 border-red-400/30 text-red-200'
                        }`}>
                        {saveStatus === 'success' ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">
                            {saveStatus === 'success' ? 'Profile updated successfully!' : 'Failed to update profile. Please try again.'}
                        </span>
                    </div>
                </div>
            )}

            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="pt-16 sm:pt-20 pb-8 sm:pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Profile Header Card */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8 hover:bg-white/10 transition-all duration-500">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                                {/* Avatar Section */}
                                <div className="relative group mx-auto lg:mx-0">
                                    <div className="relative">
                                        {(isEditing ? tempProfileData.avatar : profileData.avatar) ? (
                                            <img
                                                src={isEditing ? tempProfileData.avatar : profileData.avatar}
                                                alt={isEditing ? tempProfileData.name : profileData.name}
                                                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-purple-400/50 shadow-2xl"
                                            />
                                        ) : (
                                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl sm:text-4xl ring-4 ring-purple-400/50 shadow-2xl">
                                                {(isEditing ? tempProfileData.name : profileData.name).split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                        )}

                                        {/* Status indicator */}
                                        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-lg"></div>

                                        {/* Camera overlay */}
                                        {isEditing && (
                                            <div
                                                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Sparkle effect */}
                                    <div className="absolute -top-2 -right-2 animate-bounce">
                                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                                    </div>

                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        className="hidden"
                                    />
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                        <div>
                                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                                                {isEditing ? tempProfileData.name : profileData.name}
                                            </h1>
                                            <p className="text-purple-200 text-base sm:text-lg opacity-90">
                                                {isEditing ? tempProfileData.email : profileData.email}
                                            </p>
                                        </div>

                                        <div className="flex gap-3 mt-4 lg:mt-0 justify-center lg:justify-end">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={handleCancel}
                                                        disabled={isSaving}
                                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={isSaving}
                                                        className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        {isSaving ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                                Saving...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Save className="w-4 h-4" />
                                                                Save Changes
                                                            </>
                                                        )}
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={handleEdit}
                                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-purple-100 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                                        {isEditing ? tempProfileData.bio : profileData.bio}
                                    </p>

                                    {/* Quick Info */}
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 text-sm text-purple-200 mb-6">
                                        <div className="flex items-center justify-center lg:justify-start gap-2">
                                            <MapPin className="w-4 h-4 text-purple-300" />
                                            {isEditing ? tempProfileData.location : profileData.location}
                                        </div>
                                        <div className="flex items-center justify-center lg:justify-start gap-2">
                                            <Calendar className="w-4 h-4 text-purple-300" />
                                            Joined {profileData.joinedDate}
                                        </div>
                                        <div className="flex items-center justify-center lg:justify-start gap-2">
                                            <Link2 className="w-4 h-4 text-purple-300" />
                                            <a
                                                href={isEditing ? tempProfileData.website : profileData.website}
                                                className="text-purple-200 hover:text-white transition-colors hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {(isEditing ? tempProfileData.website : profileData.website) || 'No website'}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-3 justify-center lg:justify-start">
                                        {(isEditing ? tempProfileData.socialLinks.twitter : profileData.socialLinks.twitter) && (
                                            <a
                                                href={isEditing ? tempProfileData.socialLinks.twitter : profileData.socialLinks.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 hover:-rotate-3"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                        )}
                                        {(isEditing ? tempProfileData.socialLinks.github : profileData.socialLinks.github) && (
                                            <a
                                                href={isEditing ? tempProfileData.socialLinks.github : profileData.socialLinks.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-lg hover:shadow-gray-500/25 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {(isEditing ? tempProfileData.socialLinks.linkedin : profileData.socialLinks.linkedin) && (
                                            <a
                                                href={isEditing ? tempProfileData.socialLinks.linkedin : profileData.socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 hover:-rotate-3"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Edit Form */}
                            {isEditing && (
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Edit3 className="w-5 h-5 text-purple-400" />
                                        Edit Profile Information
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-6">
                                            <CustomInput
                                                label="Full Name"
                                                field="name"
                                                value={tempProfileData.name}
                                                onChange={handleInputChange}
                                                error={errors.name}
                                                placeholder="Enter your full name"
                                                icon={User}
                                            />

                                            <CustomInput
                                                label="Email Address"
                                                field="email"
                                                type="email"
                                                value={tempProfileData.email}
                                                onChange={handleInputChange}
                                                error={errors.email}
                                                placeholder="your.email@example.com"
                                                icon={Mail}
                                            />

                                            <CustomInput
                                                label="Location"
                                                field="location"
                                                value={tempProfileData.location}
                                                onChange={handleInputChange}
                                                error={errors.location}
                                                placeholder="City, Country"
                                                icon={MapPin}
                                            />

                                            <CustomInput
                                                label="Website"
                                                field="website"
                                                value={tempProfileData.website}
                                                onChange={handleInputChange}
                                                error={errors.website}
                                                placeholder="https://your-website.com"
                                                icon={Globe}
                                            />
                                        </div>

                                        <div className="space-y-6">
                                            <CustomTextarea
                                                label="Bio"
                                                field="bio"
                                                value={tempProfileData.bio}
                                                onChange={handleInputChange}
                                                error={errors.bio}
                                                placeholder="Tell us about yourself..."
                                                rows={4}
                                                maxLength={500}
                                            />

                                            <div className="space-y-4">
                                                <h4 className="text-sm font-medium text-purple-200">Social Links</h4>

                                                <CustomInput
                                                    label="Twitter"
                                                    field="socialLinks.twitter"
                                                    value={tempProfileData.socialLinks.twitter}
                                                    onChange={handleInputChange}
                                                    error={errors.twitter}
                                                    placeholder="https://twitter.com/username"
                                                    icon={Twitter}
                                                />

                                                <CustomInput
                                                    label="GitHub"
                                                    field="socialLinks.github"
                                                    value={tempProfileData.socialLinks.github}
                                                    onChange={handleInputChange}
                                                    error={errors.github}
                                                    placeholder="https://github.com/username"
                                                    icon={Github}
                                                />

                                                <CustomInput
                                                    label="LinkedIn"
                                                    field="socialLinks.linkedin"
                                                    value={tempProfileData.socialLinks.linkedin}
                                                    onChange={handleInputChange}
                                                    error={errors.linkedin}
                                                    placeholder="https://linkedin.com/in/username"
                                                    icon={Linkedin}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {errors.avatar && (
                                        <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.avatar}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {[
                                {
                                    label: 'Articles',
                                    value: stats.articles,
                                    icon: FileText,
                                    gradient: 'from-purple-500 to-purple-600',
                                    shadowColor: 'shadow-purple-500/25'
                                },
                                {
                                    label: 'Total Views',
                                    value: stats.views.toLocaleString(),
                                    icon: Eye,
                                    gradient: 'from-blue-500 to-indigo-600',
                                    shadowColor: 'shadow-blue-500/25'
                                },
                                {
                                    label: 'Likes',
                                    value: stats.likes,
                                    icon: Heart,
                                    gradient: 'from-pink-500 to-rose-600',
                                    shadowColor: 'shadow-pink-500/25'
                                },
                                {
                                    label: 'Followers',
                                    value: stats.followers,
                                    icon: Users,
                                    gradient: 'from-emerald-500 to-teal-600',
                                    shadowColor: 'shadow-emerald-500/25'
                                }
                            ].map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
                                >
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-3 sm:mb-4 shadow-lg ${stat.shadowColor} group-hover:shadow-xl transition-all duration-300`}>
                                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <p className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</p>
                                    <p className="text-purple-200 text-xs sm:text-sm opacity-80">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Content Tabs */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Tab Navigation */}
                            <div className="border-b border-white/10">
                                <nav className="flex flex-wrap">
                                    {[
                                        { id: 'overview', label: 'Overview', icon: TrendingUp },
                                        { id: 'articles', label: 'Articles', icon: FileText },
                                        { id: 'achievements', label: 'Achievements', icon: Award }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-all duration-300 flex-1 sm:flex-initial ${activeTab === tab.id
                                                ? 'text-white border-b-2 border-purple-400 bg-gradient-to-r from-purple-600/20 to-pink-600/20'
                                                : 'text-purple-200 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <tab.icon className="w-4 h-4 mr-2" />
                                            <span className="hidden sm:inline">{tab.label}</span>
                                            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6 sm:p-8">
                                {activeTab === 'overview' && (
                                    <div className="space-y-8">
                                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
                                            Profile Overview
                                        </h3>
                                        <div className="grid lg:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                        <User className="w-5 h-5 text-purple-400" />
                                                        About Me
                                                    </h4>
                                                    <p className="text-purple-200 leading-relaxed text-sm sm:text-base">
                                                        A passionate content creator with expertise in technology, philosophy, and creative writing.
                                                        Always exploring new ideas and sharing insights with the community.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                        <BookOpen className="w-5 h-5 text-purple-400" />
                                                        Current Focus
                                                    </h4>
                                                    <p className="text-purple-200 leading-relaxed text-sm sm:text-base">
                                                        Currently exploring the intersection of artificial intelligence and creative processes,
                                                        while building a community of like-minded thinkers and creators.
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <Star className="w-5 h-5 text-purple-400" />
                                                    Interests & Expertise
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {interests.map((interest, index) => (
                                                        <div
                                                            key={interest}
                                                            className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 text-purple-100 rounded-xl text-sm font-medium hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 transform hover:scale-105"
                                                        >
                                                            {interest}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'articles' && (
                                    <div className="space-y-6 sm:space-y-8">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                                Recent Articles
                                            </h3>
                                            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 self-start sm:self-auto">
                                                View All <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {recentArticles.map((article, index) => (
                                                <div
                                                    key={article.id}
                                                    className="group p-6 rounded-2xl bg-gradient-to-r from-white/5 to-purple-600/5 border border-white/10 hover:bg-gradient-to-r hover:from-white/10 hover:to-purple-600/10 hover:border-purple-400/30 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
                                                >
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                                <span className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/30 text-purple-200 rounded-full text-xs font-medium">
                                                                    {article.category}
                                                                </span>
                                                                <div className="flex items-center text-purple-300 text-xs gap-2">
                                                                    <Clock className="w-3 h-3" />
                                                                    {article.readTime}
                                                                </div>
                                                            </div>

                                                            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                                                                {article.title}
                                                            </h4>
                                                            <p className="text-purple-200 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                                                                {article.excerpt}
                                                            </p>

                                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                                <span className="text-purple-300 text-xs">{article.publishedDate}</span>
                                                                <div className="flex items-center gap-4 text-xs text-purple-300">
                                                                    <div className="flex items-center gap-1">
                                                                        <Eye className="w-3 h-3" />
                                                                        {article.views}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Heart className="w-3 h-3" />
                                                                        {article.likes}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <MessageCircle className="w-3 h-3" />
                                                                        {article.comments}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex sm:items-center justify-end">
                                                            <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-purple-200 transform group-hover:translate-x-1 transition-all duration-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'achievements' && (
                                    <div className="space-y-6 sm:space-y-8">
                                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                            Achievements & Milestones
                                        </h3>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {achievements.map((achievement, index) => (
                                                <div
                                                    key={index}
                                                    className="group p-6 rounded-2xl bg-gradient-to-r from-white/5 to-purple-600/5 border border-white/10 hover:border-purple-400/30 transition-all duration-500 transform hover:scale-105"
                                                >
                                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${achievement.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                                        {achievement.icon}
                                                    </div>
                                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                                                        {achievement.title}
                                                    </h4>
                                                    <p className="text-purple-200 text-sm leading-relaxed mb-3">
                                                        {achievement.description}
                                                    </p>
                                                    <p className="text-xs text-purple-300">
                                                        Achieved in {achievement.date}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;