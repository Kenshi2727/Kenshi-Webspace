import React from 'react'
import toast from 'react-hot-toast'

const Notice = () => {
    return (
        toast.custom((t) => (
            <div
                role="status"
                aria-live="polite"
                className={`${t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
                    } max-w-sm lg:max-w-xl w-full bg-gradient-to-br from-violet-600/95 via-purple-600/95 to-indigo-800/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-3xl pointer-events-auto flex overflow-hidden transition-all duration-500 transform-gpu relative group`}
                style={{
                    boxShadow: '0 25px 60px -12px rgba(139, 92, 246, 0.25), 0 10px 30px -10px rgba(168, 85, 247, 0.2), 0 4px 16px -4px rgba(0, 0, 0, 0.4)',
                }}
            >
                {/* Animated gradient border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-800 rounded-3xl opacity-75 blur-sm animate-pulse group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-indigo-800/10 rounded-3xl"></div>

                {/* Main content */}
                <div className="relative flex-1 w-0 p-5 lg:p-6 z-10">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 relative">
                            {/* Pulsing ring around icon */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-800 rounded-2xl opacity-20 animate-ping"></div>
                            <div className="relative h-10 w-10 lg:h-12 lg:w-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-400/40 transition-shadow duration-300">
                                {/* Enhanced Kenshi logo/icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2L13.09 5.26L16 4L14.74 7.26L18 6L16.74 9.26L20 8L18.74 11.26L22 10L20.74 13.26L24 12L20.74 10.74L22 14L18.74 12.74L20 16L16.74 14.74L18 18L14.74 16.74L16 20L13.09 18.74L14 22H10L10.91 18.74L8 20L9.26 16.74L6 18L7.26 14.74L4 16L5.26 12.74L2 14L3.26 10.74L0 12L3.26 13.26L2 10L5.26 11.26L4 8L7.26 9.26L6 6L9.26 7.26L8 4L10.91 5.26L10 2H14L12 2Z" />
                                    <circle cx="12" cy="12" r="3" className="animate-pulse" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-base lg:text-lg font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent truncate">
                                    Kenshi Webspace
                                </h3>
                                <span className="px-3 py-1 text-xs font-semibold bg-transparent/20 text-white rounded-full border border-violet-400/30 shadow-sm backdrop-blur-sm animate-pulse">
                                    ✨ Beta Soon
                                </span>
                            </div>
                            <p className="text-sm lg:text-base text-slate-300 leading-relaxed font-medium">
                                Building something extraordinary — prototype launching soon.
                                <span className="text-violet-300 font-semibold"> Thanks for your patience!</span>
                            </p>

                            {/* Progress indicator */}
                            <div className="mt-3 flex items-center gap-2">
                                <div className="flex-1 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '25%' }}></div>
                                </div>
                                <span className="text-xs text-slate-200 font-medium">25%</span>
                            </div>
                        </div>

                        <div className="flex-shrink-0 self-start">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="h-9 w-9 rounded-xl flex items-center justify-center text-gray-200 hover:text-gray-700 hover:bg-violet-100/50 focus:outline-none focus:ring-2 focus:ring-violet-300/50 transition-all duration-300 group/button backdrop-blur-sm border-2 border-violet-200/80 hover:border-violet-300/60"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/button:scale-110 group-hover/button:rotate-90 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute top-2 left-4 w-1 h-1 bg-violet-300 rounded-full animate-ping opacity-60"></div>
                <div className="absolute top-4 right-6 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-3 left-6 w-1 h-1 bg-pink-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }}></div>
            </div>
        ), {
            duration: 6000,
            position: 'top-center'
        })
    )
}

export default Notice