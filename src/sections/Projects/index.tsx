'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ExperienceCard from '@/components/ExperienceCard'
import ProjectModal from '@/components/ProjectModal'
import { useFullPage } from '@/context/index'
import TechIcon from '@/components/TechIcon'
import { Badge } from '@/components/ui/badge'
import { IconName } from '@/types'

interface ProjectCardContentProps {
  project: {
    title: string
    subtitle: string
    period: string
    role: string
    shortDescription?: string
  }
}

const ProjectCardContent = ({ project }: ProjectCardContentProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{project.title}</h3>
      </div>
      <p className="text-base font-medium text-primary">{project.subtitle}</p>
      <p className="text-xs text-muted-foreground italic">{project.period}</p>
      <p className="text-xs pt-1">{project.role}</p>
    </div>
  )
}

export default function Projects() {
  const t = useTranslations('projects')
  const { activeSectionId } = useFullPage()

  const [activeProject, setActiveProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setHoverTarget] = useState('')

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const projectRefs = useRef([])
  const timelineRef = useRef<GSAPTimeline | null>(null)

  const projects = t.raw('projects') || []

  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length)
  }, [projects.length])

  const openProjectModal = (projectId: unknown) => {
    const project = projects.find((p: { id: unknown }) => p.id === projectId)
    if (project) {
      setActiveProject(project)
      setIsModalOpen(true)
      document.body.classList.add('modal-open')
    }
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    document.body.classList.remove('modal-open')
    setTimeout(() => setActiveProject(null), 300)
  }

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const masterTimeline = gsap.timeline({ paused: true })
      timelineRef.current = masterTimeline

      gsap.killTweensOf([headingRef.current, ...projectRefs.current.filter(Boolean)])

      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(projectRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 50,
      })

      const isMobile = window.innerWidth < 768

      masterTimeline
        .to(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })

        .to(
          projectRefs.current.filter(Boolean),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: 'back.out(1.2)',
            stagger: {
              amount: isMobile ? 0.2 : 0.3,
              from: 'start',
            },
          },
          '-=0.1',
        )

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
      }
    },
    { scope: sectionRef, dependencies: [projects.length] },
  )

  useEffect(() => {
    const isActive = activeSectionId === 'projects'

    if (isActive && timelineRef.current) {
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      timelineRef.current.pause(0)

      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(projectRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 50,
      })
    }
  }, [activeSectionId])

  return (
    <>
      <section
        id="projects"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="max-w-screen-xl w-full mx-auto px-4 md:px-6 lg:px-8">
          <div ref={sectionRef} className="py-12 md:py-16 space-y-8">
            <div>
              <h2 ref={headingRef} className="font-display text-3xl font-bold tracking-tight">
                {t('heading')}
              </h2>
              <p className="text-muted-foreground mt-2">{t('subheading')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map(
                (
                  project: {
                    id?: string
                    isWip?: boolean
                    logoSrc?: string
                    title: string
                    techStack?: string
                    subtitle?: string
                    period?: string
                    role?: string
                    shortDescription?: string | undefined
                  },
                  index: string | number,
                ) => (
                  <div
                    key={project.id}
                    id={project.id}
                    className="transition-all duration-300 hover:translate-y-[-4px]"
                    ref={(el) => {
                      projectRefs.current[index] = el
                    }}
                  >
                    <ExperienceCard
                      workInProgress={project.isWip}
                      onClick={() => openProjectModal(project.id)}
                      onMouseOver={() => setHoverTarget(project.id)}
                      onMouseLeave={() => setHoverTarget('')}
                      logoSlot={
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={project.logoSrc}
                            alt={`${project.title} Logo`}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                          {project.isWip && (
                            <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 h-auto bg-emerald-500 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                      }
                      techSlot={
                        <>
                          {project.techStack &&
                            project.techStack.slice(0, 5).map(
                              (
                                tech: {
                                  iconName: IconName
                                  name: string | undefined
                                  href: string | undefined
                                },
                                techIndex: React.Key | null | undefined,
                              ) => (
                                <TechIcon
                                  key={techIndex}
                                  iconName={tech.iconName as IconName}
                                  name={tech.name}
                                  href={tech.href}
                                />
                              ),
                            )}
                          {project.techStack && project.techStack.length > 5 && (
                            <Badge variant="outline">+{project.techStack.length - 5}</Badge>
                          )}
                        </>
                      }
                    >
                      <ProjectCardContent project={project} />
                    </ExperienceCard>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project detail modal */}
      <ProjectModal isOpen={isModalOpen} onClose={closeProjectModal} project={activeProject} />
    </>
  )
}
