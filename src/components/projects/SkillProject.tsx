import { forwardRef } from 'react';

interface SkillProjectProps {
  children: React.ReactNode
  label: string
  setAllSkills: React.Dispatch<React.SetStateAction<string[]>>
  active: boolean
}
export const SkillProject = forwardRef<HTMLElement, SkillProjectProps>(function SkillProject(
  { children, label, setAllSkills, active },
  ref
) {
  const handleClick = () => {
    if (label === "SALIENT") {
      setAllSkills([])
      return
    }
    setAllSkills(prev => active ? prev.filter(skill => skill !== label) : [...prev, label])
  }
  return (
    <article
      ref={ref}
      onClick={handleClick}
      className={`p-2.5 rounded-full border cursor-pointer select-none transition-colors duration-150 ${active ? " shadow-[0_0_20px_rgba(0,255,153,0.35)] border-b-blue-500 ring-1 ring-blue-500" : "grayscale opacity-80 hover:opacity-100 hover:grayscale-0"}`}
    >
      <div className="relative">
        {children}
        {active && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-700 ring-2 ring-white" aria-hidden="true" />
        )}
      </div>
    </article>
  )
})

SkillProject.displayName = "SkillProject"