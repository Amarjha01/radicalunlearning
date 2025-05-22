import React from 'react'

const Features = () => {
  return (
    <div className=' w-full h-fit  flex flex-col items-center text-white'>
        <div className=' w-[80%] 2xl:w-full h-fit flex flex-col gap-5'>
            <div className='relative w-full h-fit lg:h-[50vh] 2xl:h-[40vh] bg-transparent border border-gray-500 rounded-2xl flex flex-col lg:flex lg:flex-row overflow-hidden'>
                <div className=' w-full lg:w-[40%] px-5 h-full flex flex-col items-center justify-center gap-10 py-5'>
                <h2 className='anta-regular lg:text-2xl 2xl:text-4xl'> Beyond Subjects</h2>
                <p className='roboto-regular 2xl:text-2xl'>Learning isn’t just about subjects — it’s about systems, stories, and self-awareness. Explore curiosity-led journeys in philosophy, art, technology, nature, culture, design, and more. What matters isn’t what you study, but how it shapes the way you think.</p>
                </div>
               
                <div className='h-full flex justify-end lg:absolute lg:right-0 lg:top-10 lg:w-[50%] lg:translate-x-32 lg:-rotate-[25deg] 2xl:top-5 2xl:h-auto 2xl:translate-x-32  2xl:-rotate-[20deg]'>
                    <img src="/skillsAnalytics.jpg" alt="" className=' object-cover h-full w-full' />
                </div>
            </div>

            <div className=' w-full h-fit   flex flex-col gap-5 lg:flex-row '>
                <div className=' relative h-auto border border-gray-500 rounded-2xl  pt-5 px-2 flex flex-col  gap-5 lg:w-[50%] '>
                    <div className='py-5 flex flex-col gap-10'>
                        <h2 className='anta-regular lg:text-2xl 2xl:text-4xl'>Craft Your Learning Identity</h2>
                        <p className='roboto-regular 2xl:text-2xl'>Forget standardized resumes — build a learning story. Showcase your unique path through experiences, projects, reflections, and collaborations. Your portfolio isn’t a template. It’s a mirror of your journey — made by you, not AI.</p>
                    </div>
                    <div className=' relative grow-1  h-72  lg:h-auto flex flex-col justify-end'>
                        <div className=' absolute  h-fit w-full  '>
                            <img src="https://www.linuxsocials.com/img/feature_resume.png" alt="" className='  h-fit w-full rounded-b-md' />
                        </div>
                    </div>

                </div>
                <div className=' h-full lg:w-[50%] flex flex-col gap-5'>
                    <div className=' border border-gray-500 rounded-2xl'>
                        <div>
                            <img src="https://www.linuxsocials.com/img/feature_calendar.png" alt="" />
                        </div>
                       <div className='px-3 py-5'>
                       <h2 className='anta-regular lg:text-2xl 2xl:text-4xl'>Learning Flow Calendar</h2>
                       <p className='roboto-regular 2xl:text-2xl'>Design your own rhythm. No exams. No deadlines. Just your learning path mapped out the way you grow best. Track reflections, daily insights, peer collabs, and deep-dive sessions — not just “tasks.”</p>
                       </div>
                    </div>
                    <div className=' border border-gray-500 rounded-2xl'>
                        <div className=' px-3 py-5'>
                            <h2 className='anta-regular lg:text-2xl 2xl:text-4xl'>Progress with Purpose</h2>
                            <p className='roboto-regular 2xl:text-2xl'>Growth is more than graphs. Track the evolution of your questions, your thoughts, your creations. Revisit where you started, celebrate where you are, and stay grounded in why you’re learning — not just what.</p>
                        </div>
                        <div className='w-full h-full '>
                            <img src="https://www.linuxsocials.com/img/feature_chart.png" alt="" className=' w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features