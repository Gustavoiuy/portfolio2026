import { Astroo, React, CSS, Figma, HTML, JavaScript, PostgreSQL, ReactRouter, Supabase, TailwindCSS, TanStack, TypeScript, Zod, Zustand, Star } from '@components/icons/react'
import { SkillProject } from '@components/projects/SkillProject'
import { CardProject } from '@components/projects/CardProject'
import { useState } from 'react'
import type { ProjectProps } from '@interface/ProjectProps'
import projects from '@data/projects.json'
import Tippy, { useSingleton } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

const SKILLS_PROJECTS = [
  {
    label: "Astro",
    icon: Astroo
  },
  {
    label: "CSS",
    icon: CSS
  },
  {
    label: "HTML",
    icon: HTML
  },
  {
    label: "React",
    icon: React
  },
  {
    label: "Figma",
    icon: Figma
  },
  {
    label: "JavaScript",
    icon: JavaScript
  },
  {
    label: "PostgreSQL",
    icon: PostgreSQL
  },
  {
    label: "React Router",
    icon: ReactRouter
  },
  {
    label: "Supabase",
    icon: Supabase
  },
  {
    label: "TailwindCSS",
    icon: TailwindCSS
  },
  {
    label: "TanStack Query",
    icon: TanStack
  },
  {
    label: "TypeScript",
    icon: TypeScript
  },
  {
    label: "Zod",
    icon: Zod
  },
  {
    label: "Zustand",
    icon: Zustand
  },
]

export const ProjectLogic = () => {
  const [allSkills, setAllSkills] = useState<string[]>([])
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
              </ SkillProject >
            </Tippy>
          ))
        }
      </section>

      {
        filteredProjects.length === 0 ? (
          <div className='content-center mx-auto max-w-xl text-center border border-dashed border-st/60 rounded-2xl p-8 flex flex-col items-center gap-4'>

            <h3 className='text-2xl'>Sin resultados</h3>
            <p className='opacity-80 max-w-md'>
              No hay proyectos que coincidan con esas tecnologías. Ajusta los filtros o vuelve a ver los destacados.
            </p>
            <div className='flex items-center gap-3'>
              <button
                type="button"
                onClick={() => setAllSkills([])}
                className='px-4 py-2 rounded-full border border-st text-white hover:bg-st hover:text-black transition-colors cursor-pointer'
                aria-label='Limpiar filtros'
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        ) : (
          <section className='justify-center grid grid-cols-2 md:grid-cols-3 gap-4'>
            {
              filteredProjects.map((project: ProjectProps) => (
                <CardProject key={project.title} {...project} />
              ))
            }
          </section>
        )
      }
    </>
  )
}