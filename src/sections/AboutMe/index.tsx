'use client'

import React, { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ProfileImage from '@/components/ProfileImage'
import { useFullPage } from '@/context'

export default function AboutMe() {
  const t = useTranslations('aboutMe')
  const { activeSectionId } = useFullPage()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const imageRef = useRef(null)

  const timelineRef = useRef<GSAPTimeline | null>(null)

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

      timelineRef.current = tl

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
      }
    },
    { scope: sectionRef },
  )

  useEffect(() => {
    const isActive = activeSectionId === 'aboutMe'

    if (isActive && timelineRef.current) {
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      timelineRef.current.pause(0)

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
    <div ref={sectionRef} className="flex items-center justify-center h-full w-full bg-[#141414]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start md:items-center">
          <div className="md:order-last flex justify-center" ref={imageRef}>
            <div className="relative overflow-hidden rounded-full shadow-lg w-[300px] h-[300px] group">
              <ProfileImage
                src="/images/james.jpg"
                alt={t('profileImageAlt')}
                width={300}
                height={300}
                className="relative rounded-full shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:filter group-hover:blur-sm"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 ease-out z-10 rounded-full group-hover:opacity-100"></div>
              <div className="absolute w-10 h-10 z-[15] opacity-0 pointer-events-none rounded-full bg-gradient-radial from-white/80 to-transparent to-70%"></div>
            </div>
          </div>
          <div className="md:col-span-2">
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
