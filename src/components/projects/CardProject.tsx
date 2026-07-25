import type { ProjectProps } from '@interface/ProjectProps'
import type { ComponentType } from 'react'
import { Figma, Github, Web } from '@components/icons/react'
import {
  Astroo,
  CSS,
  Figma as FigmaIcon,
  HTML,
  JavaScript,
  Net,
  PostgreSQL,
  React as ReactIcon,
  ReactRouter,
  Supabase,
  TailwindCSS,
  TanStack,
  TypeScript,
  Zod,
  Zustand,
} from '@components/icons/react'

const SKILL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
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
  Figma: FigmaIcon,
  Net,
}

export function CardProject({ id, title, description, skills, links, colorBG }: ProjectProps) {
  const imageUrl = new URL(`../../assets/images/projects/${id}.webp`, import.meta.url).href
  const visibleSkills = skills.filter((skill) => skill !== 'SALIENT').slice(0, 4)

  return (
    <article className="project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
      <div
        className="relative aspect-[16/10] overflow-hidden border-b border-white/10 p-3 sm:aspect-video sm:p-5"
        style={{ background: `linear-gradient(135deg, ${colorBG[0]}, ${colorBG[1]})` }}
      >
        <div className="flex size-full items-center justify-center overflow-hidden rounded-xl bg-slate-950/20">
          <img
            style={{ viewTransitionName: id }}
            src={imageUrl}
            alt={`Vista previa del proyecto ${title}`}
            loading="lazy"
            decoding="async"
            className="size-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="space-y-3">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Proyecto destacado
          </p>
          <h3 className="font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-slate-300 sm:text-base">
            {description}
          </p>
        </div>

        <footer className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-4 xs:flex-row xs:items-center xs:justify-between">
          <div className="flex items-center" aria-label={`Tecnologías: ${visibleSkills.join(', ')}`}>
            {visibleSkills.map((skill, index) => {
              const Icon = SKILL_ICONS[skill]
              if (!Icon) return null

              return (
                <span
                  key={skill}
                  title={skill}
                  className="-ml-2 grid size-9 place-items-center rounded-full border border-white/15 bg-slate-900 p-2 first:ml-0"
                  style={{ zIndex: visibleSkills.length - index }}
                >
                  <Icon className="size-full" />
                </span>
              )
            })}
          </div>

          <div className="flex items-center justify-between gap-3 xs:justify-end">
            <div className="flex items-center gap-1">
              {links.figma && (
                <a href={links.figma} aria-label={`Abrir diseño de ${title} en Figma`} className="rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white" target="_blank" rel="noopener noreferrer">
                  <Figma className="size-5" />
                </a>
              )}
              {links.github && (
                <a href={links.github} aria-label={`Abrir repositorio de ${title} en GitHub`} className="rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white" target="_blank" rel="noopener noreferrer">
                  <Github className="size-5" />
                </a>
              )}
              {links.web && (
                <a href={links.web} aria-label={`Abrir sitio web de ${title}`} className="rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white" target="_blank" rel="noopener noreferrer">
                  <Web className="size-5" />
                </a>
              )}
            </div>

            <a href={`/proyectos/${id}`} className="font-sans inline-flex items-center gap-2 rounded-lg border border-cyan-300/60 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300 hover:text-slate-950">
              Ver proyecto <span aria-hidden="true">→</span>
            </a>
          </div>
        </footer>
      </div>
    </article>
  )
}
