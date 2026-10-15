import React from 'react'
import InfoBanner from '../components/banners/InfoBanner'
import { tos } from '../constants/termsOfService.js'
import { Clock } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, useReducedMotion } from 'framer-motion'

const TermsPage = () => {
    const shouldReduceMotion = useReducedMotion()

    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )
    return (
        <div className='relative min-h-screen bg-linear-to-bl from-indigo-400 via-purple-800 to-purple-800 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950'>
            <div className='absolute inset-y-2 inset-x-5 sm:inset-x-10 md:inset-x-20 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4'>

                <div className='left-container flex flex-col gap-1 overflow-auto hide-scrollbar'>
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        className='flex justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold p-5 sm:p-6 md:p-7 border-b text-white/80 border-gray-600'
                    >
                        <p>Kenshi Webspace Terms of Service</p>
                    </motion.div>
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
                    >
                        <InfoBanner
                            title={tos.banner.title}
                            content={tos.banner.content}
                            badgeText={tos.banner.badgeText}
                        />
                    </motion.div>
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.24 }}
                        className='p-2 pl-0 text-white/90 font-medium text-xs flex items-center gap-2'
                    >
                        <Clock size={18} />
                        <p>Last Updated : {tos.lastUpdated}</p>
                    </motion.div>
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.28, ease: 'easeOut' }}
                        className='intro-container py-2 text-justify text-white/80 text-sm lg:text-xl leading-relaxed'
                    >
                        <p>
                            {tos.intro}
                        </p>
                    </motion.div>

                    <div className='content-container py-2 flex flex-col gap-6 font-sans cursor-pointer'>
                        {
                            tos.terms.map((term, index) => (
                                <motion.div
                                    className='group flex flex-col gap-4 rounded-md px-2 py-3 transition-all duration-300 hover:bg-white/4 dark:hover:shadow-[0_0_24px_rgba(165,180,252,0.12)] sm:px-3'
                                    id={term.heading + index}
                                    key={index}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.18), ease: 'easeOut' }}
                                >
                                    <h3 className='text-2xl lg:text-3xl font-semibold text-white transition-colors duration-300 dark:drop-shadow-[0_0_10px_rgba(165,180,252,0.2)]'>
                                        <span className="mr-3 text-sm font-medium text-white/45 align-middle">{String(index + 1).padStart(2, '0')}</span>
                                        {term.heading}
                                    </h3>
                                    <div className='h-px w-full bg-linear-to-r from-white/40 via-white/20 to-transparent transition-colors duration-300 group-hover:from-white/70' />
                                    <p className='text-sm lg:text-[1.05rem] leading-7 text-white/70 text-justify'>{term.content}</p>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
                    className='right-container max-h-screen sticky hidden md:flex justify-center items-center'
                >
                    <div className='flex flex-col justify-center items-center mb-10'>
                        <h4 className="mb-4 text-2xl lg:text-3xl leading-none font-medium text-white/80 dark:drop-shadow-[0_0_12px_rgba(165,180,252,0.22)]">Contents</h4>
                        <ScrollArea className="h-[75vh] w-64 lg:w-72 rounded-md border border-white/20 bg-white/4 shadow-xl shadow-black/10 dark:shadow-xl dark:shadow-indigo-300 backdrop-blur-sm">
                            <div className="p-4">
                                {tos.terms.map((term, index) => (
                                    <React.Fragment key={term.heading}>
                                        <a
                                            // preventing default anchor behavior to enable smooth scrolling
                                            // href={`#${term.heading + tos.terms.indexOf(term)}`} 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(term.heading + tos.terms.indexOf(term)).scrollIntoView({
                                                    behavior: 'smooth',
                                                    block: 'center'
                                                })
                                            }}
                                        >
                                            <div className="group flex items-center gap-3 text-sm p-2.5 my-2 bg-white/7 hover:bg-white/16 hover:translate-x-1 dark:hover:shadow-[0_0_14px_rgba(165,180,252,0.16)] transition-all duration-200 rounded-sm text-white/80 cursor-pointer">
                                                <span className="text-[10px] tabular-nums text-white/40 group-hover:text-white/70">{String(index + 1).padStart(2, '0')}</span>
                                                {term.heading}
                                            </div>
                                        </a>
                                    </React.Fragment>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default TermsPage