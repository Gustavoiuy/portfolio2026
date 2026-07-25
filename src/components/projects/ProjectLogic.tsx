import { Astroo, HTML, JavaScript, Net, React, Star, Supabase } from '@components/icons/react'
import { SkillProject } from '@components/projects/SkillProject'
import { CardProject } from '@components/projects/CardProject'
import { useState, useRef } from 'react'
import type { ProjectProps } from '@interface/ProjectProps'
import projects from '@data/projects.json'
import Tippy, { useSingleton } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

// --- Imports de Swiper ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
// -------------------------

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
)
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
)

const SKILLS_PROJECTS = [
  { label: "Astro", icon: Astroo },
  { label: "Net", icon: Net },
  { label: "HTML", icon: HTML },
  { label: "React", icon: React },
  { label: "JavaScript", icon: JavaScript },
  { label: "Supabase", icon: Supabase },
  
]

export const ProjectLogic = () => {
  const [allSkills, setAllSkills] = useState<string[]>([])
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredProjects = projects.filter((project: ProjectProps) => {
    if (allSkills.length === 0) return project.skills.includes("SALIENT")
    return allSkills.every((skill) => project.skills.includes(skill))
  })
  
  const [source, target] = useSingleton();

  return (
    <>
      <section aria-label="Filtrar proyectos por tecnología" className="mx-auto my-6 flex max-w-3xl justify-start gap-3 overflow-x-auto px-4 pb-2 sm:justify-center sm:px-0">
        <Tippy
          singleton={source}
          appendTo={() => document.body}
          delay={[0, 100]}
          duration={[100, 240]}
          arrow={false}
          placement="top"
          animation="shift-away"
          moveTransition="transform 0.22s ease-out"
          className='text-sm text-white border border-st px-1 py-0.5'
        />
        <Tippy key={"Destacado"} singleton={target} content={"Destacados"}>
          <SkillProject active={allSkills.length === 0} setAllSkills={setAllSkills} label={"SALIENT"}>
            <Star className="size-6" />
          </SkillProject>
        </Tippy>
        {
          SKILLS_PROJECTS.map((skill) => (
            <Tippy key={skill.label} singleton={target} content={skill.label}>
              <SkillProject setAllSkills={setAllSkills} label={skill.label} active={allSkills.includes(skill.label)}>
                <skill.icon className="size-6" />
              </SkillProject>
            </Tippy>
          ))
        }
      </section>

      {/* --- RESULTADOS --- */}
      {
        filteredProjects.length === 0 ? (
          <div className='content-center mx-auto max-w-xl text-center border border-dashed border-st/60 rounded-2xl p-8 flex flex-col items-center gap-4 mt-10'>
            <h3 className='text-2xl font-bold'>Sin resultados</h3>
            <p className='opacity-80 max-w-md'>Intenta combinar menos tecnologías o revisa los destacados.</p>
            <button
              type="button"
              onClick={() => setAllSkills([])}
              className='px-6 py-2 rounded-full border border-st text-st hover:bg-st hover:text-white transition-all cursor-pointer'
            >
              Ver todo
            </button>
          </div>
        ) : (
          <section className='relative mx-auto my-8 max-w-6xl px-4 sm:px-10 md:my-12 md:px-14 group'>
            
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label='Ver proyecto anterior'
              className='absolute left-0 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/90 p-3 text-white shadow-lg transition hover:border-cyan-300 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:grid md:place-items-center'
            >
              <ArrowLeft />
            </button>

            <button 
              onClick={() => swiperRef.current?.slideNext()}
              aria-label='Ver proyecto siguiente'
              className='absolute right-0 top-1/2 z-20 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/90 p-3 text-white shadow-lg transition hover:border-cyan-300 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:grid md:place-items-center'
            >
              <ArrowRight />
            </button>

            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Autoplay]}
              centeredSlides={true} 
              loop={filteredProjects.length > 2} 
              
              spaceBetween={24}
              breakpoints={{
                640: {
                    spaceBetween: 32
                },
                1024: {
                    spaceBetween: 48
                }
              }}

              slidesPerView={'auto'}
              grabCursor={true}
              autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true
              }}
              className="overflow-visible py-4 sm:py-6"
            >
              {filteredProjects.map((project: ProjectProps) => (
                <SwiperSlide key={project.title} className="w-[calc(100vw-2rem)] max-w-[520px] sm:w-[460px] lg:w-[500px] transition-all duration-500 ease-out">
                  
                  {({ isActive }) => (
                    <div className={`
                      transition-all duration-500 ease-out h-full
                      ${isActive 
                        ? 'scale-100 opacity-100 blur-0 grayscale-0 z-10' 
                        : 'scale-[0.96] opacity-45 grayscale-[0.45] hover:opacity-75 hover:grayscale-0 hover:scale-[0.98] cursor-pointer'}
                    `}>
                      <CardProject {...project} />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )
      }
    </>
  )
}
