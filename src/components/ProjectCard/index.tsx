import React from 'react'
import Image from 'next/image'

interface ProjectProps {
  project: {
    id: string
    isWip?: boolean
    logoSrc: string
    title: string
    subtitle: string
    period: string
    role: string
    techStack?: Array<{ name: string }>
  }
  onClick: (id: string) => void
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectProps>(({ project, onClick }, ref) => {
  const cardRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={(el) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(el)
          } else {
            ref.current = el
          }
        }
        cardRef.current = el
      }}
      className="relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-5 h-full w-full cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      onClick={() => onClick(project.id)}
    >
      {project.isWip && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs py-0.5 px-2 rounded-full">
          WIP
        </div>
      )}
      <div className="flex flex-col h-full gap-3">
        <div className="w-full h-16 mb-2 flex justify-center items-center">
          <Image
            src={project.logoSrc}
            alt={`${project.title} Logo`}
            className="select-none w-auto h-full object-contain"
          />
        </div>

        <div className="leading-7 text-white/90 w-full">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <p className="text-xl font-semibold text-primary break-words">{project.subtitle}</p>
          <p className="font-light italic text-sky-200 break-words">{project.period}</p>
          <p className="font-light text-zinc-200 break-words mt-2">{project.role}</p>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {project.techStack &&
            project.techStack.map((tech, index) => (
              <div
                key={index}
                className="tech-icon p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <span className="sr-only">{tech.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
