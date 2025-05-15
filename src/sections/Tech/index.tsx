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
      let tl: gsap.core.Timeline | null = null

      const createAnimation = (): gsap.core.Timeline => {
        if (tl) tl.kill()

        const newTl = gsap.timeline({ paused: true })
        newTl.to(element, {
          scale: 1.1,
          y: -5,
          duration: 0.2,
          ease: 'back.out(2)',
        })
        return newTl
      }

      tl = createAnimation()

      let isHovering = false

      const handleMouseEnter = (): void => {
        isHovering = true

        gsap.killTweensOf(element)
        gsap.set(element, { scale: 1, y: 0 })

        tl = createAnimation()
        tl.play()
      }

      const handleMouseLeave = (): void => {
        isHovering = false

        gsap.killTweensOf(element)

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
        if (tl) tl.kill()
        gsap.killTweensOf(element)
        gsap.set(element, { scale: 1, y: 0, clearProps: 'all' })
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
        className={`tech-item flex items-center bg-secondary text-secondary-foreground px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm cursor-pointer transition-shadow hover:shadow-md text-xs md:text-sm ${className}`}
      >
        <TechIcon iconName={tech.iconName} />
        <span className="tech-name font-medium">{tech.name}</span>
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

      gsap.killTweensOf([
        headingRef.current,
        descriptionRef.current,
        ...categoryRefs.current.filter(Boolean),
        ...techItemRefs.current.filter(Boolean),
      ])

      gsap.set([headingRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(categoryRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 20,
      })

      gsap.set(techItemRefs.current.filter(Boolean), {
        autoAlpha: 0,
        scale: 0.9,
        y: 15,
      })

      const isMobile = window.innerWidth < 768

      masterTimeline
        .to(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
        .to(
          descriptionRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3',
        )

      const initialCategoryDelay = isMobile ? 0.15 : 0.2

      const cascadeEase = 'power2.in'

      techCategories.forEach((_, categoryIndex) => {
        const categoryRef = categoryRefs.current[categoryIndex]

        const startIndex = techCategories
          .slice(0, categoryIndex)
          .reduce((acc, cat) => acc + cat.techs.length, 0)

        const categoryTechCount = techCategories[categoryIndex].techs.length
        const categoryTechItems = techItemRefs.current
          .slice(startIndex, startIndex + categoryTechCount)
          .filter(Boolean)

        const categoryDelayFactor = Math.max(0.05, initialCategoryDelay - categoryIndex * 0.03)
        const timePosition = `>-${0.4 - categoryIndex * categoryDelayFactor}`

        if (categoryRef) {
          masterTimeline.to(
            categoryRef,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
            },
            timePosition,
          )

          if (categoryTechItems.length > 0) {
            const baseStaggerAmount = isMobile ? 0.12 : 0.16
            const staggerAmount = baseStaggerAmount - 0.02 * categoryIndex

            masterTimeline.to(
              categoryTechItems,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.2)',
                stagger: {
                  amount: staggerAmount,
                  from: 'start',
                  ease: cascadeEase,
                },
              },
              '>-0.2',
            )
          }
        }
      })

      const allTechItems = techItemRefs.current.filter(Boolean)
      if (allTechItems.length > 0) {
        masterTimeline.to(
          allTechItems,
          {
            scale: 1.03,
            duration: 0.3,
            stagger: {
              amount: 0.8,
              from: 'center',
              grid: 'auto',
              ease: 'sine.inOut',
            },
            ease: 'power1.inOut',
            yoyo: true,
            repeat: 1,
          },
          '>0.5',
        )
      }

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

      gsap.set([headingRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(categoryRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 20,
      })

      gsap.set(techItemRefs.current.filter(Boolean), {
        autoAlpha: 0,
        scale: 0.9,
        y: 15,
      })
    }
  }, [activeSectionId])

  return (
    <div ref={sectionRef} className="flex items-center justify-center h-full w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" ref={headingRef}>
            {t('heading') || 'Technologies I Work With'}
          </h2>
          <p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            ref={descriptionRef}
          >
            {t('description') ||
              'A collection of technologies and tools I use to build modern web applications'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="tech-category"
              ref={(el) => {
                categoryRefs.current[categoryIndex] = el
              }}
            >
              <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 border-b pb-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
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
