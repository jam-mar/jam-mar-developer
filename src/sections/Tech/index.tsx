'use client'

import React, { useRef, useEffect, JSX } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useFullPage } from '@/context/index'
import TechIcon from '@/components/TechIcon'
import type { Tech } from '@/types'
import { techCategories, allTechs } from '@/constants'

const TechItem = React.forwardRef<HTMLDivElement, { tech: Tech; className?: string }>(
  ({ tech, className = '' }, ref) => {
    const itemRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (!itemRef.current) return

      const element = itemRef.current

      const handleMouseEnter = (): void => {
        gsap.to(element, {
          scale: 1.1,
          y: -3,
          duration: 0.2,
          ease: 'back.out(1.7)',
          overwrite: true,
        })
      }

      const handleMouseLeave = (): void => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.15,
          ease: 'power1.out',
          overwrite: true,
        })
      }

      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
        gsap.killTweensOf(element)
      }
    }, [])

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
          itemRef.current = el
        }}
        className="whitespace-nowrap px-2 py-2 md:px-4 md:py-4 md:gap-4 font-semibold bg-gray-800 text-sky-200 rounded text-sm flex items-center gap-2"
      >
        <TechIcon iconName={tech.iconName} />
        <span className="text-xs">{tech.name}</span>
      </div>
    )
  },
)

TechItem.displayName = 'TechItem'

export default function Tech(): JSX.Element {
  const t = useTranslations('tech')
  const { activeSectionId } = useFullPage()

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef = useRef<HTMLParagraphElement | null>(null)
  const categoryRefs = useRef<Array<HTMLDivElement | null>>([])
  const techItemRefs = useRef<Array<HTMLDivElement | null>>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    techItemRefs.current = techItemRefs.current.slice(0, allTechs.length)
    categoryRefs.current = categoryRefs.current.slice(0, techCategories.length)
  }, [allTechs.length, techCategories.length])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const masterTimeline = gsap.timeline({ paused: true })
      timelineRef.current = masterTimeline

      // Reset all elements
      gsap.set(
        [
          headingRef.current,
          descriptionRef.current,
          ...categoryRefs.current.filter(Boolean),
          ...techItemRefs.current.filter(Boolean),
        ],
        { clearProps: 'all' },
      )

      // Set initial states
      gsap.set([headingRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 20,
      })

      gsap.set(categoryRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 15,
      })

      gsap.set(techItemRefs.current.filter(Boolean), {
        autoAlpha: 0,
        scale: 0.95,
        y: 10,
      })

      // Build animation timeline
      masterTimeline
        .to(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
        .to(
          descriptionRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3',
        )

      // Animate each category and its tech items
      techCategories.forEach((_, categoryIndex) => {
        const categoryRef = categoryRefs.current[categoryIndex]

        const startIndex = techCategories
          .slice(0, categoryIndex)
          .reduce((acc, cat) => acc + cat.techs.length, 0)

        const categoryTechCount = techCategories[categoryIndex].techs.length
        const categoryTechItems = techItemRefs.current
          .slice(startIndex, startIndex + categoryTechCount)
          .filter(Boolean)

        // Add category animation
        if (categoryRef) {
          masterTimeline.to(
            categoryRef,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
            },
            '>-0.2',
          )

          // Add tech items animation
          if (categoryTechItems.length > 0) {
            masterTimeline.to(
              categoryTechItems,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.2)',
                stagger: {
                  amount: 0.3,
                  from: 'start',
                  ease: 'power1.in',
                },
              },
              '>-0.1',
            )
          }
        }
      })

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
      }
    },
    { scope: sectionRef, dependencies: [allTechs.length, techCategories.length] },
  )

  useEffect(() => {
    const isActive = activeSectionId === 'tech'

    if (isActive && timelineRef.current) {
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      timelineRef.current.pause(0)

      // Reset all elements when section is not active
      gsap.set([headingRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 20,
      })

      gsap.set(categoryRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 15,
      })

      gsap.set(techItemRefs.current.filter(Boolean), {
        autoAlpha: 0,
        scale: 0.95,
        y: 10,
      })
    }
  }, [activeSectionId])

  return (
    <div ref={sectionRef} className="flex items-center justify-center h-full w-full">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3" ref={headingRef}>
            {t('heading')}
          </h2>
          <p
            className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto"
            ref={descriptionRef}
          >
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="tech-category"
              ref={(el) => {
                categoryRefs.current[categoryIndex] = el
              }}
            >
              <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 border-b pb-1 w-full text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.techs.map((tech, techIndex) => {
                  const globalIndex =
                    techCategories
                      .slice(0, categoryIndex)
                      .reduce((acc, cat) => acc + cat.techs.length, 0) + techIndex

                  return (
                    <TechItem
                      key={tech.name}
                      tech={tech}
                      ref={(el) => {
                        techItemRefs.current[globalIndex] = el
                      }}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
