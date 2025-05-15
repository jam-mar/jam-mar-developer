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
  const elementsRef = useRef([])

  // Create refs for all animated elements
  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  const timelineRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Create a faster timeline
      const tl = gsap.timeline({ paused: true })

      // Set initial state for all elements at once
      gsap.set(elementsRef.current, {
        autoAlpha: 0,
        y: 20, // Reduced from 30 to 20 for faster animation
      })

      // Animate all elements with staggered timing
      tl.to(elementsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.35, // Reduced from 0.5/0.6 to 0.35
        stagger: 0.07, // Staggered timing with shorter delay between elements
        ease: 'power2.out',
      })

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

      // Reset all elements at once
      gsap.set(elementsRef.current, {
        autoAlpha: 0,
        y: 20,
      })
    }
  }, [activeSectionId])

  return (
    <div ref={sectionRef} className="flex items-center justify-center h-full w-full">
      <div className="container flex flex-col p-4 max-w-xl gap-2">
        <h2 ref={addToRefs} className="text-4xl font-extrabold mb-4">
          {t('heading')}
        </h2>

        <div ref={addToRefs} className="gap-3 flex">
          <div className="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
          <div className="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
          <div className="h-3 w-10 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
        </div>

        <p ref={addToRefs} className="text-lg mt-2">
          {t('availability')}
        </p>

        <div ref={addToRefs} className="mt-4">
          <p>{t('phoneLabel')}</p>
          <a className="hover:underline font-mono" href={t('phoneLink')}>
            {t('phoneNumber') || '+44 123 456 7890'}
          </a>
        </div>

        <div ref={addToRefs} className="mt-2">
          <p>{t('emailLabel')}</p>
          <a className="hover:underline font-mono" href={t('mailto')}>
            {t('email')}
          </a>
        </div>

        <div ref={addToRefs} className="block mt-4">
          <p>{t('socialsLabel')}</p>
          <div className="flex space-x-6 font-light text-zinc-400 mt-2">
            <SocialsComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
