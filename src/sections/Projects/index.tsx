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

  // State for modal
  const [activeProject, setActiveProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoverTarget, setHoverTarget] = useState('')

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const projectRefs = useRef([])
  const timelineRef = useRef(null)

  // Get projects from translations
  const projects = t.raw('projects') || []

  useEffect(() => {
    // Initialize refs arrays with the correct length
    projectRefs.current = projectRefs.current.slice(0, projects.length)
  }, [projects.length])

  // Modal opening function - sets the active project and opens the modal
  const openProjectModal = (projectId) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      setActiveProject(project)
      setIsModalOpen(true)
      // Prevent scrolling on body when modal is open
      document.body.classList.add('modal-open')
    }
  }

  // Modal closing function
  const closeProjectModal = () => {
    setIsModalOpen(false)
    // Re-enable scrolling on body
    document.body.classList.remove('modal-open')
    // Clear the active project after animation completes
    setTimeout(() => setActiveProject(null), 300)
  }

  // Create GSAP animations using useGSAP but keep them paused
  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Create a master timeline that will be controlled via the activeSectionId
      const masterTimeline = gsap.timeline({ paused: true })
      timelineRef.current = masterTimeline

      // Reset any existing animations
      gsap.killTweensOf([headingRef.current, ...projectRefs.current.filter(Boolean)])

      // Set initial states
      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(projectRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 50,
      })

      // Determine if we're in mobile view
      const isMobile = window.innerWidth < 768

      // Add animations to the master timeline
      masterTimeline
        .to(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
        // Animate project cards with stagger
        .to(
          projectRefs.current.filter(Boolean),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.2)',
            stagger: {
              amount: isMobile ? 0.4 : 0.6,
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

  // Watch for section ID changes to play animation
  useEffect(() => {
    const isActive = activeSectionId === 'projects'

    if (isActive && timelineRef.current) {
      // Play animation when section becomes active
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      // Reset animation when section becomes inactive
      timelineRef.current.pause(0)

      // Reset elements to initial state
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
              {projects.map((project, index) => (
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
                          project.techStack
                            .slice(0, 5)
                            .map((tech, techIndex) => (
                              <TechIcon
                                key={techIndex}
                                iconName={tech.iconName as IconName}
                                name={tech.name}
                                href={tech.href}
                              />
                            ))}
                        {project.techStack && project.techStack.length > 5 && (
                          <Badge variant="outline">+{project.techStack.length - 5}</Badge>
                        )}
                      </>
                    }
                  >
                    <ProjectCardContent project={project} />
                  </ExperienceCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project detail modal */}
      <ProjectModal isOpen={isModalOpen} onClose={closeProjectModal} project={activeProject} />
    </>
  )
}
