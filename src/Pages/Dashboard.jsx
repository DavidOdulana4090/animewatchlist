import React, { useMemo } from 'react';

function Dashboard() {
    const animeData = [
        { id: 1, title: "Demon Slayer", status: "watching", progress: 75, genre: "Action", rating: 9.2 },
        { id: 2, title: "Attack on Titan", status: "completed", progress: 100, genre: "Action", rating: 9.0 },
        { id: 3, title: "My Hero Academia", status: "watching", progress: 45, genre: "Superhero", rating: 8.5 },
        { id: 4, title: "Death Note", status: "completed", progress: 100, genre: "Psychological", rating: 9.0 },
        { id: 5, title: "One Piece", status: "planned", progress: 0, genre: "Adventure", rating: 8.8 }
    ];
    
    const stats = useMemo(() => {
        const totalWatched = animeData.filter(a => a.status === 'completed').length;
        const currentlyWatching = animeData.filter(a => a.status === 'watching').length;
        const planned = animeData.filter(a => a.status === 'planned').length;
        
        return {
            totalWatched,
            currentlyWatching,
            planned,
            favoriteGenre: 'Action'
        };
    }, [animeData]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'text-emerald-400';
            case 'watching': return 'text-cyan-400';
            case 'planned': return 'text-purple-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusBg = (status) => {
        switch(status) {
            case 'completed': return 'bg-emerald-500/20 border-emerald-500/50';
            case 'watching': return 'bg-cyan-500/20 border-cyan-500/50';
            case 'planned': return 'bg-purple-500/20 border-purple-500/50';
            default: return 'bg-gray-500/20 border-gray-500/50';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-ping"></div>
            </div>

            {/* Dashboard Content */}
            <div className="relative z-10 container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Anime Dashboard
                    </h1>
                    <p className="text-gray-300 text-lg">Track your anime journey with style</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Total Watched */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm">Completed</p>
                                <p className="text-3xl font-bold text-emerald-400">{stats.totalWatched}</p>
                            </div>
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                <span className="text-emerald-400 text-2xl">🎬</span>
                            </div>
                        </div>
                    </div>

                    {/* Currently Watching */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm">Watching</p>
                                <p className="text-3xl font-bold text-cyan-400">{stats.currentlyWatching}</p>
                            </div>
                            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                <span className="text-cyan-400 text-2xl">📺</span>
                            </div>
                        </div>
                    </div>

                    {/* Planned */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm">Planned</p>
                                <p className="text-3xl font-bold text-purple-400">{stats.planned}</p>
                            </div>
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                                <span className="text-purple-400 text-2xl">📝</span>
                            </div>
                        </div>
                    </div>

                    {/* Favorite Genre */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm">Favorite Genre</p>
                                <p className="text-2xl font-bold text-pink-400">{stats.favoriteGenre}</p>
                            </div>
                            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center">
                                <span className="text-pink-400 text-2xl">🎭</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Anime List */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Your Anime List</h2>
                    
                    <div className="space-y-4">
                        {animeData.map((anime) => (
                            <div 
                                key={anime.id}
                                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-102 ${getStatusBg(anime.status)}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                                            🎌
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-lg">{anime.title}</h3>
                                            <p className={`text-sm ${getStatusColor(anime.status)} capitalize`}>
                                                {anime.status} • {anime.genre}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-6">
                                        <div className="text-right">
                                            <p className="text-gray-300 text-sm">Progress</p>
                                            <p className="text-white font-bold">{anime.progress}%</p>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="text-gray-300 text-sm">Rating</p>
                                            <p className="text-yellow-400 font-bold">{anime.rating}/10</p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-32">
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${anime.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Add New Anime
                    </button>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        View Statistics
                    </button>
                    <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Recommendations
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
