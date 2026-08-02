import React, { useState, useRef } from 'react';
import {
    Shield,
    Users,
    Settings,
    Database,
    Activity,
    AlertTriangle,
    Search,
    Filter,
    MoreVertical,
    Crown,
    UserPlus,
    UserMinus,
    Lock,
    Unlock,
    Trash2,
    Edit3,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    Clock,
    Mail,
    Calendar,
    MapPin,
    UserCheck,
    UserX,
    Download,
    Upload,
    RefreshCw,
    Bell,
    LogOut,
    Ban,
    Star,
    Flag,
    MessageSquare,
    FileText,
    Zap,
    TrendingUp,
    BarChart3,
    PieChart,
    Globe,
    Server,
    Cpu,
    HardDrive,
    Wifi,
    Save,
    X,
    AlertCircle,
    Check,
    Plus,
    Minus
} from 'lucide-react';

const MaintainerPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    // Mock system stats
    const systemStats = {
        totalUsers: 1247,
        activeUsers: 89,
        admins: 5,
        moderators: 12,
        bannedUsers: 23,
        todaySignups: 7,
        totalArticles: 3456,
        pendingReviews: 15,
        systemHealth: 98.5,
        uptime: '99.9%',
        serverLoad: 45,
        storage: 72,
        bandwidth: 65
    };

    // Mock user data
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Alex Johnson',
            email: 'alex.johnson@email.com',
            role: 'admin',
            status: 'active',
            lastActive: '2 hours ago',
            joinDate: '2024-01-15',
            articles: 25,
            avatar: null,
            permissions: ['read', 'write', 'delete', 'manage_users', 'system_admin']
        },
        {
            id: 2,
            name: 'Sarah Chen',
            email: 'sarah.chen@email.com',
            role: 'moderator',
            status: 'active',
            lastActive: '5 minutes ago',
            joinDate: '2024-02-20',
            articles: 18,
            avatar: null,
            permissions: ['read', 'write', 'moderate']
        },
        {
            id: 3,
            name: 'Mike Torres',
            email: 'mike.torres@email.com',
            role: 'user',
            status: 'active',
            lastActive: '1 day ago',
            joinDate: '2024-03-10',
            articles: 7,
            avatar: null,
            permissions: ['read', 'write']
        },
        {
            id: 4,
            name: 'Emma Davis',
            email: 'emma.davis@email.com',
            role: 'user',
            status: 'suspended',
            lastActive: '3 days ago',
            joinDate: '2024-01-28',
            articles: 3,
            avatar: null,
            permissions: ['read']
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david.wilson@email.com',
            role: 'admin',
            status: 'active',
            lastActive: '30 minutes ago',
            joinDate: '2023-12-05',
            articles: 42,
            avatar: null,
            permissions: ['read', 'write', 'delete', 'manage_users', 'system_admin']
        }
    ]);

    // Recent activities
    const recentActivities = [
        {
            id: 1,
            type: 'user_action',
            message: 'Sarah Chen promoted to moderator',
            user: 'System Admin',
            timestamp: '2 hours ago',
            icon: Crown,
            severity: 'info'
        },
        {
            id: 2,
            type: 'security',
            message: 'Multiple failed login attempts detected',
            user: 'Security System',
            timestamp: '3 hours ago',
            icon: AlertTriangle,
            severity: 'warning'
        },
        {
            id: 3,
            type: 'content',
            message: 'New article pending review',
            user: 'Mike Torres',
            timestamp: '4 hours ago',
            icon: FileText,
            severity: 'info'
        },
        {
            id: 4,
            type: 'system',
            message: 'Database backup completed successfully',
            user: 'System',
            timestamp: '6 hours ago',
            icon: Database,
            severity: 'success'
        }
    ];

    // Filter users based on search and role filter
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    // Handle user selection for bulk actions
    const handleUserSelect = (userId) => {
        setSelectedUsers(prev => {
            const newSelection = prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId];
            setShowBulkActions(newSelection.length > 0);
            return newSelection;
        });
    };

    // Handle select all users
    const handleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
            setShowBulkActions(false);
        } else {
            const allIds = filteredUsers.map(user => user.id);
            setSelectedUsers(allIds);
            setShowBulkActions(true);
        }
    };

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Handle role change
    const handleRoleChange = async (userId, newRole) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUsers(prev => prev.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            ));
            showNotification(`User role updated to ${newRole}`);
        } catch (error) {
            showNotification('Failed to update user role', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle user status change
    const handleStatusChange = async (userId, newStatus) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUsers(prev => prev.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            ));
            showNotification(`User ${newStatus === 'active' ? 'activated' : 'suspended'}`);
        } catch (error) {
            showNotification('Failed to update user status', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle bulk actions
    const handleBulkAction = async (action) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            switch (action) {
                case 'promote':
                    setUsers(prev => prev.map(user =>
                        selectedUsers.includes(user.id)
                            ? { ...user, role: user.role === 'user' ? 'moderator' : user.role }
                            : user
                    ));
                    showNotification(`${selectedUsers.length} users promoted`);
                    break;
                case 'suspend':
                    setUsers(prev => prev.map(user =>
                        selectedUsers.includes(user.id)
                            ? { ...user, status: 'suspended' }
                            : user
                    ));
                    showNotification(`${selectedUsers.length} users suspended`);
                    break;
                case 'activate':
                    setUsers(prev => prev.map(user =>
                        selectedUsers.includes(user.id)
                            ? { ...user, status: 'active' }
                            : user
                    ));
                    showNotification(`${selectedUsers.length} users activated`);
                    break;
            }

            setSelectedUsers([]);
            setShowBulkActions(false);
        } catch (error) {
            showNotification('Bulk action failed', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Get role badge color
    const getRoleBadge = (role) => {
        const badges = {
            admin: 'from-red-500 to-red-600 text-white',
            moderator: 'from-blue-500 to-blue-600 text-white',
            user: 'from-gray-500 to-gray-600 text-white'
        };
        return badges[role] || badges.user;
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        const badges = {
            active: 'from-green-500 to-green-600 text-white',
            suspended: 'from-orange-500 to-orange-600 text-white',
            banned: 'from-red-500 to-red-600 text-white'
        };
        return badges[status] || badges.active;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Notification */}
            {notification && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
                    <div className={`p-4 rounded-xl backdrop-blur-xl shadow-2xl border flex items-center gap-3 ${notification.type === 'success'
                            ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
                            : 'bg-red-500/20 border-red-400/30 text-red-200'
                        }`}>
                        {notification.type === 'success' ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">{notification.message}</span>
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
                {/* Header */}
                <div className="pt-16 sm:pt-20 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 mb-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                                        Kenshi Webspace
                                    </h1>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-purple-200 mb-4">
                                        Maintainer Dashboard
                                    </h2>
                                    <p className="text-purple-200 opacity-90">
                                        Manage users, monitor system health, and maintain platform integrity
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-400/30 rounded-xl">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-emerald-200 text-sm font-medium">System Healthy</span>
                                    </div>
                                    <button className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110">
                                        <Bell className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* System Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
                            {[
                                { label: 'Total Users', value: systemStats.totalUsers.toLocaleString(), icon: Users, gradient: 'from-blue-500 to-blue-600' },
                                { label: 'Active Now', value: systemStats.activeUsers, icon: Activity, gradient: 'from-green-500 to-green-600' },
                                { label: 'Admins', value: systemStats.admins, icon: Crown, gradient: 'from-red-500 to-red-600' },
                                { label: 'Moderators', value: systemStats.moderators, icon: Shield, gradient: 'from-purple-500 to-purple-600' },
                                { label: 'Articles', value: systemStats.totalArticles.toLocaleString(), icon: FileText, gradient: 'from-indigo-500 to-indigo-600' },
                                { label: 'Pending Reviews', value: systemStats.pendingReviews, icon: Clock, gradient: 'from-orange-500 to-orange-600' }
                            ].map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105 group"
                                >
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <p className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</p>
                                    <p className="text-purple-200 text-xs sm:text-sm opacity-80">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Tab Navigation */}
                            <div className="border-b border-white/10">
                                <nav className="flex overflow-x-auto">
                                    {[
                                        { id: 'overview', label: 'Overview', icon: BarChart3 },
                                        { id: 'users', label: 'User Management', icon: Users },
                                        { id: 'system', label: 'System Health', icon: Server },
                                        { id: 'activities', label: 'Activity Log', icon: Activity },
                                        { id: 'settings', label: 'Settings', icon: Settings }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
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
                                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                            System Overview
                                        </h3>

                                        <div className="grid lg:grid-cols-2 gap-8">
                                            {/* System Health */}
                                            <div className="space-y-6">
                                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <Server className="w-5 h-5 text-purple-400" />
                                                    System Performance
                                                </h4>

                                                <div className="space-y-4">
                                                    {[
                                                        { label: 'Server Load', value: systemStats.serverLoad, icon: Cpu, color: 'blue' },
                                                        { label: 'Storage Usage', value: systemStats.storage, icon: HardDrive, color: 'purple' },
                                                        { label: 'Bandwidth Usage', value: systemStats.bandwidth, icon: Wifi, color: 'green' }
                                                    ].map((metric) => (
                                                        <div key={metric.label} className="p-4 bg-white/5 rounded-xl border border-white/10">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <metric.icon className="w-4 h-4 text-purple-400" />
                                                                    <span className="text-purple-200 text-sm">{metric.label}</span>
                                                                </div>
                                                                <span className="text-white font-semibold">{metric.value}%</span>
                                                            </div>
                                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full bg-gradient-to-r ${metric.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                                                            metric.color === 'purple' ? 'from-purple-500 to-purple-600' :
                                                                                'from-green-500 to-green-600'
                                                                        }`}
                                                                    style={{ width: `${metric.value}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Quick Stats */}
                                            <div className="space-y-6">
                                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5 text-purple-400" />
                                                    Quick Statistics
                                                </h4>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-400/30 rounded-xl">
                                                        <div className="text-2xl font-bold text-emerald-200">{systemStats.uptime}</div>
                                                        <div className="text-emerald-300 text-sm">Uptime</div>
                                                    </div>
                                                    <div className="p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-400/30 rounded-xl">
                                                        <div className="text-2xl font-bold text-blue-200">{systemStats.todaySignups}</div>
                                                        <div className="text-blue-300 text-sm">New Signups Today</div>
                                                    </div>
                                                    <div className="p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-400/30 rounded-xl">
                                                        <div className="text-2xl font-bold text-orange-200">{systemStats.bannedUsers}</div>
                                                        <div className="text-orange-300 text-sm">Banned Users</div>
                                                    </div>
                                                    <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl">
                                                        <div className="text-2xl font-bold text-purple-200">{systemStats.systemHealth}%</div>
                                                        <div className="text-purple-300 text-sm">System Health</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'users' && (
                                    <div className="space-y-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                                User Management
                                            </h3>

                                            <div className="flex flex-wrap gap-4">
                                                {/* Search */}
                                                <div className="relative flex-1 min-w-64">
                                                    <Search className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search users..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                                    />
                                                </div>

                                                {/* Filter */}
                                                <select
                                                    value={filterRole}
                                                    onChange={(e) => setFilterRole(e.target.value)}
                                                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                                >
                                                    <option value="all">All Roles</option>
                                                    <option value="admin">Admins</option>
                                                    <option value="moderator">Moderators</option>
                                                    <option value="user">Users</option>
                                                </select>

                                                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2">
                                                    <UserPlus className="w-4 h-4" />
                                                    Add User
                                                </button>
                                            </div>
                                        </div>

                                        {/* Bulk Actions */}
                                        {showBulkActions && (
                                            <div className="p-4 bg-purple-600/20 border border-purple-400/30 rounded-xl flex flex-wrap items-center gap-4">
                                                <span className="text-purple-200">
                                                    {selectedUsers.length} user(s) selected
                                                </span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleBulkAction('promote')}
                                                        disabled={isLoading}
                                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all duration-300 flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                        <Crown className="w-3 h-3" />
                                                        Promote
                                                    </button>
                                                    <button
                                                        onClick={() => handleBulkAction('suspend')}
                                                        disabled={isLoading}
                                                        className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg transition-all duration-300 flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                        <Ban className="w-3 h-3" />
                                                        Suspend
                                                    </button>
                                                    <button
                                                        onClick={() => handleBulkAction('activate')}
                                                        disabled={isLoading}
                                                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-all duration-300 flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                        <CheckCircle className="w-3 h-3" />
                                                        Activate
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Users Table */}
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-white/10">
                                                        <th className="text-left py-4 px-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                                                onChange={handleSelectAll}
                                                                className="w-4 h-4 rounded"
                                                            />
                                                        </th>
                                                        <th className="text-left py-4 px-4 text-purple-200 font-medium">User</th>
                                                        <th className="text-left py-4 px-4 text-purple-200 font-medium">Role</th>
                                                        <th className="text-left py-4 px-4 text-purple-200 font-medium">Status</th>
                                                        <th className="text-left py-4 px-4 text-purple-200 font-medium">Last Active</th>
                                                        <th className="text-left py-4 px-4 text-purple-200 font-medium">Articles</th>
                                                        <th className="text-left py-4 px-4 text-purple-200 font-medium">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredUsers.map((user) => (
                                                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                                                            <td className="py-4 px-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedUsers.includes(user.id)}
                                                                    onChange={() => handleUserSelect(user.id)}
                                                                    className="w-4 h-4 rounded"
                                                                />
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-white font-medium">{user.name}</div>
                                                                        <div className="text-purple-300 text-sm">{user.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <select
                                                                    value={user.role}
                                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                                    disabled={isLoading}
                                                                    className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getRoleBadge(user.role)} border-0 disabled:opacity-50`}
                                                                >
                                                                    <option value="user">User</option>
                                                                    <option value="moderator">Moderator</option>
                                                                    <option value="admin">Admin</option>
                                                                </select>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <button
                                                                    onClick={() => handleStatusChange(
                                                                        user.id,
                                                                        user.status === 'active' ? 'suspended' : 'active'
                                                                    )}
                                                                    disabled={isLoading}
                                                                    className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getStatusBadge(user.status)} transition-all duration-300 hover:scale-105 disabled:opacity-50`}
                                                                >
                                                                    {user.status}
                                                                </button>
                                                            </td>
                                                            <td className="py-4 px-4 text-purple-200 text-sm">{user.lastActive}</td>
                                                            <td className="py-4 px-4 text-purple-200 text-sm">{user.articles}</td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex items-center gap-2">
                                                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
                                                                        <Eye className="w-4 h-4 text-purple-400" />
                                                                    </button>
                                                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
                                                                        <Edit3 className="w-4 h-4 text-purple-400" />
                                                                    </button>
                                                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
                                                                        <MoreVertical className="w-4 h-4 text-purple-400" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'system' && (
                                    <div className="space-y-8">
                                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                            System Health & Monitoring
                                        </h3>

                                        <div className="grid lg:grid-cols-2 gap-8">
                                            {/* System Resources */}
                                            <div className="space-y-6">
                                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <Server className="w-5 h-5 text-purple-400" />
                                                    System Resources
                                                </h4>

                                                <div className="space-y-4">
                                                    {[
                                                        {
                                                            label: 'CPU Usage',
                                                            value: systemStats.serverLoad,
                                                            icon: Cpu,
                                                            color: systemStats.serverLoad > 80 ? 'red' : systemStats.serverLoad > 60 ? 'orange' : 'green',
                                                            status: systemStats.serverLoad > 80 ? 'Critical' : systemStats.serverLoad > 60 ? 'Warning' : 'Normal'
                                                        },
                                                        {
                                                            label: 'Memory Usage',
                                                            value: 67,
                                                            icon: Database,
                                                            color: 'blue',
                                                            status: 'Normal'
                                                        },
                                                        {
                                                            label: 'Disk Storage',
                                                            value: systemStats.storage,
                                                            icon: HardDrive,
                                                            color: systemStats.storage > 85 ? 'red' : systemStats.storage > 70 ? 'orange' : 'green',
                                                            status: systemStats.storage > 85 ? 'Critical' : systemStats.storage > 70 ? 'Warning' : 'Normal'
                                                        },
                                                        {
                                                            label: 'Network I/O',
                                                            value: systemStats.bandwidth,
                                                            icon: Wifi,
                                                            color: 'purple',
                                                            status: 'Normal'
                                                        }
                                                    ].map((metric) => (
                                                        <div key={metric.label} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color === 'red' ? 'from-red-500 to-red-600' :
                                                                            metric.color === 'orange' ? 'from-orange-500 to-orange-600' :
                                                                                metric.color === 'green' ? 'from-green-500 to-green-600' :
                                                                                    metric.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                                                                        'from-purple-500 to-purple-600'
                                                                        }`}>
                                                                        <metric.icon className="w-5 h-5 text-white" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-white font-medium">{metric.label}</div>
                                                                        <div className={`text-xs ${metric.color === 'red' ? 'text-red-300' :
                                                                                metric.color === 'orange' ? 'text-orange-300' :
                                                                                    'text-green-300'
                                                                            }`}>
                                                                            {metric.status}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-2xl font-bold text-white">{metric.value}%</div>
                                                                </div>
                                                            </div>
                                                            <div className="w-full bg-white/10 rounded-full h-3">
                                                                <div
                                                                    className={`h-3 rounded-full bg-gradient-to-r transition-all duration-1000 ${metric.color === 'red' ? 'from-red-500 to-red-600' :
                                                                            metric.color === 'orange' ? 'from-orange-500 to-orange-600' :
                                                                                metric.color === 'green' ? 'from-green-500 to-green-600' :
                                                                                    metric.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                                                                        'from-purple-500 to-purple-600'
                                                                        }`}
                                                                    style={{ width: `${metric.value}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* System Actions */}
                                            <div className="space-y-6">
                                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <Settings className="w-5 h-5 text-purple-400" />
                                                    System Actions
                                                </h4>

                                                <div className="space-y-4">
                                                    <button className="w-full p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-400/30 rounded-xl hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 flex items-center gap-3">
                                                        <RefreshCw className="w-5 h-5 text-blue-400" />
                                                        <div className="text-left">
                                                            <div className="text-white font-medium">Restart Services</div>
                                                            <div className="text-blue-300 text-sm">Restart all system services</div>
                                                        </div>
                                                    </button>

                                                    <button className="w-full p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-xl hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 flex items-center gap-3">
                                                        <Database className="w-5 h-5 text-green-400" />
                                                        <div className="text-left">
                                                            <div className="text-white font-medium">Backup Database</div>
                                                            <div className="text-green-300 text-sm">Create system backup</div>
                                                        </div>
                                                    </button>

                                                    <button className="w-full p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 flex items-center gap-3">
                                                        <Zap className="w-5 h-5 text-purple-400" />
                                                        <div className="text-left">
                                                            <div className="text-white font-medium">Clear Cache</div>
                                                            <div className="text-purple-300 text-sm">Clear system cache</div>
                                                        </div>
                                                    </button>

                                                    <button className="w-full p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-400/30 rounded-xl hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-300 flex items-center gap-3">
                                                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                                                        <div className="text-left">
                                                            <div className="text-white font-medium">Maintenance Mode</div>
                                                            <div className="text-orange-300 text-sm">Enable maintenance mode</div>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* System Info */}
                                                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                                                    <h5 className="text-lg font-semibold text-white mb-4">System Information</h5>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-purple-300">Uptime</span>
                                                            <span className="text-white font-medium">{systemStats.uptime}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-purple-300">System Health</span>
                                                            <span className="text-green-400 font-medium">{systemStats.systemHealth}%</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-purple-300">Version</span>
                                                            <span className="text-white font-medium">v2.4.1</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-purple-300">Last Backup</span>
                                                            <span className="text-white font-medium">2 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'activities' && (
                                    <div className="space-y-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                                Activity Log
                                            </h3>

                                            <div className="flex gap-4">
                                                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2">
                                                    <Download className="w-4 h-4" />
                                                    Export
                                                </button>
                                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition-all duration-300 flex items-center gap-2">
                                                    <RefreshCw className="w-4 h-4" />
                                                    Refresh
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {recentActivities.map((activity, index) => (
                                                <div
                                                    key={activity.id}
                                                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`p-3 rounded-xl ${activity.severity === 'success' ? 'bg-green-600/20 border border-green-400/30' :
                                                                activity.severity === 'warning' ? 'bg-orange-600/20 border border-orange-400/30' :
                                                                    activity.severity === 'error' ? 'bg-red-600/20 border border-red-400/30' :
                                                                        'bg-blue-600/20 border border-blue-400/30'
                                                            }`}>
                                                            <activity.icon className={`w-5 h-5 ${activity.severity === 'success' ? 'text-green-400' :
                                                                    activity.severity === 'warning' ? 'text-orange-400' :
                                                                        activity.severity === 'error' ? 'text-red-400' :
                                                                            'text-blue-400'
                                                                }`} />
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div>
                                                                    <p className="text-white font-medium mb-1">
                                                                        {activity.message}
                                                                    </p>
                                                                    <p className="text-purple-300 text-sm">
                                                                        by {activity.user}
                                                                    </p>
                                                                </div>
                                                                <span className="text-purple-400 text-sm whitespace-nowrap">
                                                                    {activity.timestamp}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'settings' && (
                                    <div className="space-y-8">
                                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                            System Settings
                                        </h3>

                                        <div className="grid lg:grid-cols-2 gap-8">
                                            {/* Platform Settings */}
                                            <div className="space-y-6">
                                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <Globe className="w-5 h-5 text-purple-400" />
                                                    Platform Settings
                                                </h4>

                                                <div className="space-y-4">
                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                        <label className="flex items-center justify-between cursor-pointer">
                                                            <div>
                                                                <div className="text-white font-medium">Registration</div>
                                                                <div className="text-purple-300 text-sm">Allow new user registrations</div>
                                                            </div>
                                                            <div className="relative">
                                                                <input type="checkbox" className="sr-only" defaultChecked />
                                                                <div className="w-12 h-6 bg-purple-600 rounded-full shadow-inner">
                                                                    <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-7 translate-y-1 transition-transform"></div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                        <label className="flex items-center justify-between cursor-pointer">
                                                            <div>
                                                                <div className="text-white font-medium">Email Verification</div>
                                                                <div className="text-purple-300 text-sm">Require email verification for new accounts</div>
                                                            </div>
                                                            <div className="relative">
                                                                <input type="checkbox" className="sr-only" defaultChecked />
                                                                <div className="w-12 h-6 bg-purple-600 rounded-full shadow-inner">
                                                                    <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-7 translate-y-1 transition-transform"></div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                        <label className="flex items-center justify-between cursor-pointer">
                                                            <div>
                                                                <div className="text-white font-medium">Content Moderation</div>
                                                                <div className="text-purple-300 text-sm">Enable automatic content moderation</div>
                                                            </div>
                                                            <div className="relative">
                                                                <input type="checkbox" className="sr-only" defaultChecked />
                                                                <div className="w-12 h-6 bg-purple-600 rounded-full shadow-inner">
                                                                    <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-7 translate-y-1 transition-transform"></div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Security Settings */}
                                            <div className="space-y-6">
                                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <Shield className="w-5 h-5 text-purple-400" />
                                                    Security Settings
                                                </h4>

                                                <div className="space-y-4">
                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                        <div className="mb-4">
                                                            <div className="text-white font-medium mb-2">Session Timeout</div>
                                                            <div className="text-purple-300 text-sm mb-3">Auto-logout inactive users</div>
                                                        </div>
                                                        <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                                                            <option value="30">30 minutes</option>
                                                            <option value="60" selected>1 hour</option>
                                                            <option value="120">2 hours</option>
                                                            <option value="240">4 hours</option>
                                                        </select>
                                                    </div>

                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                        <label className="flex items-center justify-between cursor-pointer">
                                                            <div>
                                                                <div className="text-white font-medium">Two-Factor Authentication</div>
                                                                <div className="text-purple-300 text-sm">Require 2FA for admin accounts</div>
                                                            </div>
                                                            <div className="relative">
                                                                <input type="checkbox" className="sr-only" defaultChecked />
                                                                <div className="w-12 h-6 bg-purple-600 rounded-full shadow-inner">
                                                                    <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-7 translate-y-1 transition-transform"></div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                        <label className="flex items-center justify-between cursor-pointer">
                                                            <div>
                                                                <div className="text-white font-medium">IP Blocking</div>
                                                                <div className="text-purple-300 text-sm">Block suspicious IP addresses</div>
                                                            </div>
                                                            <div className="relative">
                                                                <input type="checkbox" className="sr-only" defaultChecked />
                                                                <div className="w-12 h-6 bg-purple-600 rounded-full shadow-inner">
                                                                    <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-7 translate-y-1 transition-transform"></div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Save Settings Button */}
                                        <div className="flex justify-end">
                                            <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                                                <Save className="w-5 h-5" />
                                                Save Settings
                                            </button>
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

export default MaintainerPage;