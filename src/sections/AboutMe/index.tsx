'use client'

import React, { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ProfileImage from '@/components/ProfileImage'
import './styles.css'
import { useFullPage } from '@/context'

export default function AboutMe() {
  const t = useTranslations('aboutMe')
  const { activeSectionId } = useFullPage()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const imageRef = useRef(null)

  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({ paused: true })

      gsap.set([headingRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(imageRef.current, {
        autoAlpha: 0,
        x: 30,
      })

      tl.to(headingRef.current, {
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
        .to(
          imageRef.current,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4',
        )

      // Save the timeline to our ref
      timelineRef.current = tl

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
      }
    },
    { scope: sectionRef },
  )

  // Play or reset animations based on active section
  useEffect(() => {
    // FIXED: Match the exact section ID 'aboutMe' instead of 'about'
    const isActive = activeSectionId === 'aboutMe'

    if (isActive && timelineRef.current) {
      // Play animation when section becomes active
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      // Reset animation when section becomes inactive
      timelineRef.current.pause(0)

      // Reset elements to initial state
      gsap.set([headingRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(imageRef.current, {
        autoAlpha: 0,
        x: 30,
      })
    }
  }, [activeSectionId])

  return (
    <div ref={sectionRef} className="flex items-center justify-center h-full w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start md:items-center">
          <div className="about-image md:order-last" ref={imageRef}>
            <ProfileImage
              src="/images/james.jpg"
              alt={t('profileImageAlt')}
              width={300}
              height={300}
              className="mx-auto md:mx-0"
            />
          </div>
          <div className="about-content md:col-span-2">
            <h2
              ref={headingRef}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
            >
              {t('heading')}
            </h2>
            <p
              ref={descriptionRef}
              className="text-base md:text-lg text-muted-foreground mb-6 md:mb-10 leading-relaxed"
            >
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
