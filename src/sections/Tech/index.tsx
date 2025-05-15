'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'
import SocialsComponent from '@/components/Socials'
import { useFullPage } from '@/context/index'

export default function Contact() {
  const t = useTranslations('contact')
  const { activeSectionId } = useFullPage()

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const colorBarsRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)
  const socialsRef = useRef(null)

  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({ paused: true })

      // Set initial states with more dramatic offsets
      gsap.set(
        [
          headingRef.current,
          colorBarsRef.current,
          titleRef.current,
          descriptionRef.current,
          phoneRef.current,
          emailRef.current,
          socialsRef.current,
        ],
        {
          autoAlpha: 0,
          y: 40, // Slightly larger offset for more dynamic movement
          scale: 0.95, // Start slightly smaller for a pop effect
        },
      )

      // Create a much faster, snappier animation sequence
      tl.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.3, // Faster
        ease: 'back.out(1.2)', // Add a slight bounce
      })
        .to(
          colorBarsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power1.out',
            stagger: {
              amount: 0.1, // Animate the bars with a quick stagger
              from: 'start',
            },
          },
          '-=0.2', // More overlap
        )
        .to(
          [titleRef.current, descriptionRef.current],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.2', // More overlap
        )
        .to(
          [phoneRef.current, emailRef.current, socialsRef.current],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.05, // Quick stagger between contact elements
            ease: 'back.out(1.1)', // Slight bounce for emphasis
          },
          '-=0.1', // More overlap
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
    const isActive = activeSectionId === 'contact'

    if (isActive && timelineRef.current) {
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      timelineRef.current.pause(0)

      gsap.set(
        [
          headingRef.current,
          colorBarsRef.current,
          titleRef.current,
          descriptionRef.current,
          phoneRef.current,
          emailRef.current,
          socialsRef.current,
        ],
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.95,
        },
      )
    }
  }, [activeSectionId])

  return (
    <div ref={sectionRef} className="flex items-center justify-center h-full w-full">
      <div className="container flex flex-col p-4 max-w-xl gap-2">
        <h2 ref={headingRef} className="text-4xl font-extrabold mb-4">
          {t('heading')}
        </h2>

        <div ref={colorBarsRef} className="gap-3 flex">
          <div className="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
          <div className="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
          <div className="h-3 w-10 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
        </div>

        <p ref={descriptionRef} className="text-lg mt-2">
          {t('availability')}
        </p>

        <div ref={phoneRef} className="mt-4 hover:translate-x-1 transition-transform">
          <p className="text-sm text-muted-foreground">{t('phoneLabel')}</p>
          <a
            className="hover:underline font-mono hover:text-primary transition-colors"
            href={t('phoneLink')}
          >
            {t('phoneNumber') || '+44 123 456 7890'}
          </a>
        </div>

        <div ref={emailRef} className="mt-2 hover:translate-x-1 transition-transform">
          <p className="text-sm text-muted-foreground">{t('emailLabel')}</p>
          <a
            className="hover:underline font-mono hover:text-primary transition-colors"
            href={t('mailto')}
          >
            {t('email')}
          </a>
        </div>

        <div ref={socialsRef} className="block mt-4">
          <p className="text-sm text-muted-foreground">{t('socialsLabel')}</p>
          <div className="flex space-x-6 font-light text-zinc-400 mt-2">
            <SocialsComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
