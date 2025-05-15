'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
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
          y: 30,
        },
      )

      tl.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .to(
          colorBarsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .to(
          descriptionRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2',
        )
        .to(
          phoneRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2',
        )
        .to(
          emailRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2',
        )
        .to(
          socialsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2',
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
          y: 30,
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

        <div ref={phoneRef} className="mt-4">
          <p>{t('phoneLabel')}</p>
          <a className="hover:underline font-mono" href={t('phoneLink')}>
            {t('phoneNumber') || '+44 123 456 7890'}
          </a>
        </div>

        <div ref={emailRef} className="mt-2">
          <p>{t('emailLabel')}</p>
          <a className="hover:underline font-mono" href={t('mailto')}>
            {t('email')}
          </a>
        </div>

        <div ref={socialsRef} className="block mt-4">
          <p>{t('socialsLabel')}</p>
          <div className="flex space-x-6 font-light text-zinc-400 mt-2">
            <SocialsComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
