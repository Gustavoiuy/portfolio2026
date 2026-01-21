import { Astroo, React, Dotnet, Figma, HTML, JavaScript, PostgreSQL, ReactRouter, Supabase, TailwindCSS, TanStack, TypeScript, Zod, Zustand, Star } from '@components/icons/react'
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
  { label: "Dotnet", icon: Net },
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
      <section className="flex flex-wrap items-center justify-center gap-6 max-w-2xl mx-auto my-5">
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
          <section className='relative max-w-[1300px] mx-auto my-10 px-0 md:px-4 group'>
            
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className='absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-st border border-white/10 p-3 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 cursor-pointer hidden md:block'
            >
              <ArrowLeft />
            </button>

            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className='absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-st border border-white/10 p-3 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 cursor-pointer hidden md:block'
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
              
              // --- RESPONSIVE LOGIC AÑADIDA ---
              spaceBetween={70} // Espacio pequeño por defecto (Móvil)
              breakpoints={{
                640: {
                    spaceBetween: 40 // Tablet
                },
                1024: {
                    spaceBetween: 100 // Desktop (Tu valor original)
                }
              }}
              // -------------------------------

              slidesPerView={'auto'}
              grabCursor={true}
              autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true
              }}
              className="overflow-visible py-10"
            >
              {filteredProjects.map((project: ProjectProps) => (
                // AÑADIDO: w-[85vw] para móvil (ocupa el 85% de la pantalla) y tamaños fijos para tablet/desktop
                <SwiperSlide key={project.title} className="w-[85vw] md:max-w-[420px] transition-all duration-500 ease-out">
                  
                  {({ isActive }) => (
                    <div className={`
                      transition-all duration-500 ease-out h-full
                      ${isActive 
                        ? 'scale-100 opacity-100 blur-0 grayscale-0 z-10' 
                        : 'scale-90 opacity-40 blur-[1px] grayscale hover:opacity-10 hover:grayscale-0 hover:scale-95 cursor-pointer'}
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