'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { ExternalLink, X } from 'lucide-react'
import TechIconDetailed from '@/components/TechIconDetailed'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface Section {
  title: string
  content: string
}

interface Project {
  title: string
  subtitle: string
  period: string
  tagline?: string
  description: string
  location: string
  isWip?: boolean
  logoSrc?: string
  sections?: Section[]
  screenshots?: string[]
  liveUrl?: string
  techStack?: {
    name: string
    href: string
    iconName: string
  }[]
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  // Only render the component if we have a project
  if (!project) return null

  const headerRef = useRef(null)
  const mainContentRef = useRef(null)
  const sectionsRef = useRef(null)
  const techStackRef = useRef(null)
  const modalRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    // Cleanup function to kill any active timelines
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  useEffect(() => {
    // Only run animation if modal is open and project exists
    if (!isOpen || !project) return

    // Wait for next frame to ensure DOM elements are available
    const timeoutId = setTimeout(() => {
      try {
        // Create a new timeline
        const tl = gsap.timeline()
        timelineRef.current = tl

        // Safely gather elements that exist
        const elements = []
        if (headerRef.current) elements.push(headerRef.current)
        if (mainContentRef.current) elements.push(mainContentRef.current)

        // Only reset elements that exist
        if (elements.length > 0) {
          gsap.set(elements, {
            opacity: 0,
            y: 20,
          })
        }

        // Safely animate sections if they exist
        const sectionElements = sectionsRef.current?.children
          ? Array.from(sectionsRef.current.children).filter(Boolean)
          : []

        if (sectionElements.length > 0) {
          gsap.set(sectionElements, { opacity: 0, y: 20 })
        }

        // Safely set tech stack if it exists
        if (techStackRef.current) {
          gsap.set(techStackRef.current, { opacity: 0, y: 20 })
        }

        // Start animation sequence with safety checks
        if (headerRef.current) {
          tl.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
        }

        if (mainContentRef.current) {
          tl.to(
            mainContentRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.3',
          )
        }

        if (sectionElements.length > 0) {
          tl.to(
            sectionElements,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
            },
            '-=0.2',
          )
        }

        if (techStackRef.current) {
          tl.to(
            techStackRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.3',
          )
        }
      } catch (err) {
        console.log('Animation error:', err)
      }
    }, 100) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timeoutId)
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isOpen, project])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={modalRef}
        className="text-white max-w-6xl max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-sm border shadow-lg"
      >
        <DialogClose className="absolute top-3 right-3 z-50 rounded-full p-1.5 text-muted-foreground hover:text-foreground bg-background hover:bg-muted transition-all duration-200">
          <span className="sr-only">Close</span>
        </DialogClose>

        <ScrollArea className="h-full px-6 py-6">
          <DialogHeader ref={headerRef} className="mb-4">
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="text-primary font-medium">
              {project.subtitle}
            </DialogDescription>
          </DialogHeader>

          <div ref={mainContentRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-full md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground italic">{project.period}</p>
                {project.isWip && (
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  >
                    Current position
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground">{project.location}</p>

              <p className="text-sm">{project.description}</p>
            </div>

            <div className="col-span-full md:col-span-1 flex justify-center md:justify-end">
              {project.logoSrc && (
                <div className="bg-muted p-4 rounded-lg">
                  <Image
                    src={project.logoSrc}
                    alt={`${project.title} Logo`}
                    width={130}
                    height={130}
                    className="object-contain h-24 w-24"
                  />
                </div>
              )}
            </div>

            <Separator className="col-span-full my-1" />

            <div ref={sectionsRef} className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.sections?.map((section, index) => (
                <Card
                  key={index}
                  className={cn(
                    'bg-card border shadow-sm hover:shadow-md transition-all duration-300 h-full',
                    index === 0 && project.sections?.length === 1 && 'col-span-full',
                    project.sections?.length === 2 && index === 0 && 'col-span-full md:col-span-2',
                    project.sections?.length === 2 && index === 1 && 'col-span-full md:col-span-1',
                  )}
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                >
                  <CardContent className="p-4">
                    <h3 className="text-base font-semibold mb-2">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {project.screenshots && project.screenshots.length > 0 && (
              <div className="col-span-full mt-2">
                <h3 className="text-base font-semibold mb-3">Screenshots</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <Image
                        src={screenshot}
                        alt={`${project.title} Screenshot ${index + 1}`}
                        width={800}
                        height={450}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div ref={techStackRef} className="col-span-full space-y-6 mt-4">
              {project.liveUrl && (
                <div>
                  <Button
                    variant="outline"
                    className="gap-2 hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  </Button>
                </div>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech, index) => (
                      <TechIconDetailed
                        key={index}
                        iconName={tech.iconName}
                        name={tech.name}
                        href={tech.href}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
