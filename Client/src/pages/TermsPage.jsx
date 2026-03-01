import React from 'react'
import InfoBanner from '../components/banners/InfoBanner'
import { tos } from '../constants/termsOfService.js'
import { Clock } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

const TermsPage = () => {

    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )
    return (
        <div className='relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'>
            <div className='absolute inset-y-2 inset-x-5 sm:inset-x-10 md:inset-x-20 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4'>

                <div className='left-container flex flex-col gap-1 overflow-auto hide-scrollbar'>
                    <div className='flex justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold p-5 sm:p-6 md:p-7 border-b text-white/80 border-gray-600'>
                        <p>Kenshi Webspace Terms of Service</p>
                    </div>
                    <div>
                        <InfoBanner
                            title={tos.banner.title}
                            content={tos.banner.content}
                            badgeText={tos.banner.badgeText}
                        />
                    </div>
                    <div className='p-2 pl-0 text-white/90 font-medium text-xs flex items-center gap-2'>
                        <Clock size={18} />
                        <p>Last Updated : {tos.lastUpdated}</p>
                    </div>
                    <div className='intro-container py-2 text-justify text-white/80 text-sm lg:text-xl'>
                        <p>
                            {tos.intro}
                        </p>
                    </div>

                    <div className='content-container py-2 flex flex-col gap-6 font-sans cursor-pointer'>
                        {
                            tos.terms.map((term, index) => (
                                <div
                                    className='flex flex-col gap-4 hover:scale-[1.01] hover:px-1.5 transition-all'
                                    id={term.heading + index}
                                    key={index}
                                >
                                    <h3 className='text-2xl lg:text-3xl font-semibold text-white'>{term.heading}</h3>
                                    <div className='h-1 w-full bg-white/20 rounded-full' />
                                    <p className='text-sm lg:text-[1.05rem] text-white/70 text-justify'>{term.content}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='right-container max-h-screen sticky hidden md:flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center mb-10'>
                        <h4 className="mb-4 text-2xl lg:text-3xl leading-none font-medium text-white/80">Contents</h4>
                        <ScrollArea className="h-[75vh] w-64 lg:w-72 rounded-md border">
                            <div className="p-4">
                                {tos.terms.map((term) => (
                                    <React.Fragment key={term}>
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
                                            <div className="text-sm p-2 my-3 bg-white/10 hover:bg-white/20 hover:scale-105 transition-transform rounded-sm text-white/80 cursor-pointer">
                                                {term.heading}
                                            </div>
                                        </a>
                                    </React.Fragment>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsPage