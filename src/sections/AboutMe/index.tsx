'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProfileImage from '@/components/ProfileImage'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMe() {
  const t = useTranslations('aboutMe')

  return (
    <section className="about-me py-10 md:py-16 lg:py-24" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start md:items-center">
          <div className="about-image md:order-last">
            <ProfileImage
              src="/images/james.jpg"
              alt={t('profileImageAlt')}
              width={300}
              height={300}
              className="mx-auto md:mx-0"
            />
          </div>
          <div className="about-content md:col-span-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              {t('heading')}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-10 leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
