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
    <div ref={sectionRef} className="container py-12 md:py-16">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:order-last flex justify-center" ref={imageRef}>
            <ProfileImage
              src="/images/james.jpg"
              alt={t('profileImageAlt')}
              width={280}
              height={280}
              className="w-[250px] h-[250px] md:w-[280px] md:h-[280px]"
            />
          </div>

          <div className="md:col-span-2">
            <h2 ref={headingRef} className="text-3xl font-bold tracking-tight mb-4">
              {t('heading')}
            </h2>
            <div ref={descriptionRef} className="text-muted-foreground leading-relaxed space-y-4">
              <p>{t('description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
