import type { ProjectProps } from '@interface/ProjectProps'
import { Github, Web } from '@components/icons/react'
import {
  Astroo,
  React as ReactIcon,
  CSS,
  HTML,
  JavaScript,
  TypeScript,
  TailwindCSS,
  Zod,
  Zustand,
  ReactRouter,
  TanStack,
  Supabase,
  PostgreSQL,
  Figma,
} from '@components/icons/react'

const SKILL_ICONS: Record<string, any> = {
  Astro: Astroo,
  React: ReactIcon,
  CSS,
  HTML,
  JavaScript,
  TypeScript,
  'React Router': ReactRouter,
  'TanStack Query': TanStack,
  TailwindCSS,
  Zod,
  Zustand,
  Supabase,
  PostgreSQL,
  Figma,
}

export function CardProject({ id, title, description, skills, links, colorBG }: ProjectProps) {
  const imageUrl = new URL(`../../assets/images/projects/${id}.webp`, import.meta.url).href
  return (
    <article className='project-card flex flex-col border group overflow-hidden rounded-lg transition-all duration-300' >
      {/* CAMBIO: aspect-video para movil, aspect-9/4 para pantallas medianas (sm/md) en adelante */}
      <div className='relative w-full aspect-video sm:aspect-9/4 bg-transparent overflow-hidden p-4 sm:p-5' style={{ "background": `linear-gradient(to right, ${colorBG[0]}, ${colorBG[1]})` }}>
        <img
          style={{ "viewTransitionName": id }}
          src={imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />

      </div>
      <div className='p-4 flex flex-col gap-2 justify-between flex-1'>
        {/* CAMBIO: Texto responsivo */}
        <h3 className='text-xl sm:text-2xl font-bold'>{title}</h3>
        <p className='line-clamp-4 text-sm sm:text-base'>{description}</p>
        
        {/* CAMBIO: flex-wrap para evitar desbordamiento en pantallas muy pequeñas */}
        <div className='flex flex-wrap gap-3 justify-end xs:items-center xs:justify-between xs:ml-4 mt-auto'>
          <div className='hidden xs:flex mt-2 items-end'>
            {skills.map((skill, index) => {
              if (!(index < 4)) return
              if (skill === "SALIENT") return
              const Icon = SKILL_ICONS[skill]
              return <Icon
                key={skill}
                className={`size-8 sm:size-10 p-2 rounded-full border -ml-4 relative bg-[#101010] duration-500 hover:-translate-y-5 hover:z-${10}`}
                title={skill} style={{ "zIndex": index }}
              />
            })}
            {
              skills.length > 3 && (
                <div className='ml-1 flex gap-1.5' aria-hidden="true">
                  <div className='size-1.5 sm:size-2 bg-white rounded-full relative animate-none group-hover:animate-dot-bounce [animation-delay:0ms] group-hover:bg-st/80' aria-hidden="true"></div>
                  <div className='size-1.5 sm:size-2 bg-white rounded-full relative animate-none group-hover:animate-dot-bounce [animation-delay:300ms] group-hover:bg-st/80' aria-hidden="true"></div>
                  <div className='size-1.5 sm:size-2 bg-white rounded-full relative animate-none group-hover:animate-dot-bounce [animation-delay:600ms] group-hover:bg-st/80' aria-hidden="true"></div>
                </div>
              )
            }
          </div>
          <div className='flex gap-2 items-center justify-center w-full xs:w-auto'>
            <div className='flex items-center justify-center gap-2'>
              {
                links.figma.length !== 0 && (
                  <a href={links.figma} className='block md:hidden lg:block group/icon relative' target="_blank" rel="noopener noreferrer" aria-label={`Ir al figma del proyecto ${title}`}>
                    <Figma className='size-6 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:filter-[drop-shadow(0_0_5px_rgb(255_255_255))]' />
                    <span className='absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover/icon:scale-150 transition-transform duration-500 blur-md -z-10'></span>
                  </a>
                )
              }
              {
                links.github.length !== 0 && (
                  <a href={links.github} className='group/icon relative' target="_blank" rel="noopener noreferrer" aria-label={`Ir al github del proyecto ${title}`}>
                    <Github className='size-6 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:filter-[drop-shadow(0_0_5px_rgb(255_255_255))]' />
                    <span className='absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/icon:scale-150 transition-transform duration-500 blur-md -z-10'></span>
                  </a>
                )
              }
              <a href={links.web} className='group/icon relative' target="_blank" rel="noopener noreferrer" aria-label={`Ir al sitio web del proyecto ${title}`}>
                <Web className='size-6 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:filter-[drop-shadow(0_0_5px_rgb(255_255_255))]' />
                <span className='absolute inset-0 rounded-full bg-blue-500/20 scale-0 group-hover/icon:scale-150 transition-transform duration-500 blur-md -z-10'></span>
              </a>
            </div>
            <a href={`/proyectos/${id}`} className='relative px-5 py-2 font-bold group/btn transition-all duration-300 ' aria-label={`Ver más sobre el proyecto`}>
              <span className='absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-st transition-all duration-300 group-hover/btn:w-full group-hover/btn:h-full'></span>
              <span className='absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-st transition-all duration-300 group-hover/btn:w-20 group-hover/btn:h-full'></span>
              <h3 className='relative z-10 transition-all duration-300 group-hover/btn:text-st'>VER</h3>
            </a>
          </div>
        </div>
      </div>
    </article >
  )
}