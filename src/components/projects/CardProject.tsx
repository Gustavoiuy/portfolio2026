import type { ProjectProps } from '@interface/ProjectProps'
import { Github, Web } from '@components/icons/react'
import { BackgroundGradient } from "../ui/background-gradient";
import {  CardContainer } from "@/components/ui/3d-card";
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
  const customStyle = {
    backgroundColor: colorBG[0]
  };
  
  return (
    
    <BackgroundGradient 
      className="rounded-[22px] w-full h-full p-1 sm:p-4 bg-white dark:bg-zinc-900"
      containerClassName="h-full" 
      style={customStyle}
    >
      <article className='project-card flex flex-col h-full border group overflow-hidden rounded-lg transition-all duration-300 bg-gray-800' >
        
     
        <div className='flex items-center justify-center relative w-full aspect-video bg-transparent overflow-hidden p-2 sm:p-5' style={{ "background": `linear-gradient(to right, ${colorBG[0]}, ${colorBG[1]})` }}>
          <CardContainer className="w-full h-full flex items-center justify-center">
            <img
              style={{ "viewTransitionName": id }}
              src={imageUrl}
              alt={title}
              loading="lazy"
              decoding="async"
           
              className="w-auto h-auto max-w-full max-h-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
            />
          </CardContainer>
        </div>
        
       
        <div className='p-4 flex flex-col gap-3 justify-between flex-1'>
          <div>
            <h4 className='text-lg sm:text-2xl font-mono font-bold text-white mb-1'>{title}</h4>
            <p className='line-clamp-3 sm:line-clamp-4 text-sm sm:text-base text-gray-300'>{description}</p>
          </div>
          
         
          <div className='flex flex-wrap items-end justify-between gap-3 mt-auto'>
            
          
            <div className='hidden xs:flex items-center'>
              {skills.map((skill, index) => {
                if (!(index < 4)) return
                if (skill === "SALIENT") return
                const Icon = SKILL_ICONS[skill]
                return <Icon
                  key={skill}
                  
                  className={`size-7 sm:size-10 p-1.5 sm:p-2 rounded-full border -ml-3 first:ml-0 relative bg-[#101010] duration-500 hover:-translate-y-2 hover:z-10 border-white/10`}
                  title={skill} style={{ "zIndex": index }}
                />
              })}
              {
                skills.length > 3 && (
                  <div className='ml-2 flex gap-1' aria-hidden="true">
                    <div className='size-1 sm:size-1.5 bg-white/50 rounded-full'></div>
                    <div className='size-1 sm:size-1.5 bg-white/50 rounded-full'></div>
                  </div>
                )
              }
            </div>

            
            <div className='flex items-center gap-3 w-full xs:w-auto justify-between xs:justify-end'>
              
           
              <div className='flex items-center gap-2'>
                {links.figma.length !== 0 && (
                  <a href={links.figma} className='group/icon relative p-1' target="_blank" rel="noopener noreferrer">
                    <Figma className='size-5 sm:size-6 text-gray-300 hover:text-white transition-colors' />
                  </a>
                )}
                {links.github.length !== 0 && (
                  <a href={links.github} className='group/icon relative p-1' target="_blank" rel="noopener noreferrer">
                    <Github className='size-5 sm:size-6 text-gray-300 hover:text-white transition-colors' />
                  </a>
                )}
                <a href={links.web} className='group/icon relative p-1' target="_blank" rel="noopener noreferrer">
                  <Web className='size-5 sm:size-6 text-gray-300 hover:text-white transition-colors' />
                </a>
              </div>

          
              <a href={`/proyectos/${id}`} className='relative px-4 py-1.5 sm:px-5 sm:py-2 font-bold group/btn transition-all duration-300 shrink-0'>
                <span className='absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-st transition-all duration-300 group-hover/btn:w-full group-hover/btn:h-full'></span>
                <span className='absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-st transition-all duration-300 group-hover/btn:w-20 group-hover/btn:h-full'></span>
                <h3 className='relative z-10 text-sm sm:text-base text-white transition-all duration-300 group-hover/btn:text-st'>VER</h3>
              </a>
            </div>
            
          </div>
          
        </div>
        
      </article >
    </BackgroundGradient>
  )
}