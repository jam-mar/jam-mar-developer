'use client'

import React, { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { ChevronDown, Code, Sparkles, Database, Palette, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import './hero-animations.css'

export default function Hero() {
  const t = useTranslations('hero')
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const nameRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const buttonRef = useRef(null)
  const decorationRef = useRef(null)
  const badgeRefs = useRef([])

  const badges = [
    {
      icon: <Code className="h-3 w-3 mr-1" />,
      text: 'Frontend Developer',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    },
    {
      icon: <Database className="h-3 w-3 mr-1" />,
      text: 'Backend Expert',
      color: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    },
    {
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      text: 'Creative Coder',
      color: 'bg-gradient-to-r from-amber-500 to-orange-600',
    },
    {
      icon: <Clock className="h-3 w-3 mr-1" />,
      text: 'Fast Delivery',
      color: 'bg-gradient-to-r from-violet-500 to-purple-600',
    },
  ]

  useEffect(() => {
    // Initialize badge refs array with the correct length
    badgeRefs.current = badgeRefs.current.slice(0, badges.length)
  }, [badges.length])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      gsap.set(
        [
          titleRef.current,
          nameRef.current,
          headingRef.current,
          subheadingRef.current,
          buttonRef.current,
        ],
        {
          y: 30,
          opacity: 0,
        },
      )

      gsap.set(decorationRef.current, {
        opacity: 0,
        scale: 0.9,
      })

      gsap.set(badgeRefs.current.filter(Boolean), {
        y: 20,
        opacity: 0,
        scale: 0.8,
      })

      timeline
        .to(titleRef.current, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 })
        .to(nameRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .to(headingRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .to(subheadingRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .to(decorationRef.current, { opacity: 1, scale: 1, duration: 1 }, '-=0.6')
        .to(
          badgeRefs.current.filter(Boolean),
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.8',
        )
        .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')

      // Floating animation for decoration elements
      gsap.to(decorationRef.current.querySelectorAll('.decoration-item'), {
        y: -15,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      })

      return () => {
        timeline.kill()
      }
    },
    { scope: sectionRef },
  )

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('aboutMe')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-screen container flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background decoration removed - now handled by the layout */}

      {/* Decorative elements */}
      <div
        ref={decorationRef}
        className="absolute right-0 top-1/4 transform -translate-y-1/2 hidden lg:block"
      >
        <div className="relative space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={`line-${index}`}
              className={`decoration-item h-1 rounded-full ${index === 0 ? 'w-40 bg-primary/60' : index === 1 ? 'w-20 bg-secondary/60' : 'w-60 bg-muted'}`}
              style={{
                transform: `translateX(${-index * 20}px)`,
                opacity: 0.8 - index * 0.2,
                animationDelay: `${index * 0.2}s`,
              }}
            ></div>
          ))}

          <div className="absolute -left-16 -top-8">
            <div className="decoration-item size-16 rounded-full border-2 border-dashed border-muted/40 flex items-center justify-center">
              <div className="size-8 rounded-full bg-primary/20"></div>
            </div>
          </div>

          <div className="absolute right-8 -bottom-16">
            <div className="decoration-item size-24 rounded-full border border-muted/40"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl space-y-6 relative">
        <p ref={titleRef} className="text-muted-foreground"></p>

        <h1
          ref={nameRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight relative font-display"
        >
          {t('name')}
          <span className="absolute -top-2 -right-2 size-4 bg-primary rounded-full opacity-80 animate-pulse hidden sm:block"></span>
        </h1>

        <div className="h-px w-16 bg-primary/60 my-4"></div>

        <h2 ref={headingRef} className="text-xl sm:text-2xl font-light text-primary">
          {t('heading')}
        </h2>

        <p ref={subheadingRef} className="text-lg font-light text-muted-foreground max-w-xl">
          {t('subheading')}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              ref={(el) => (badgeRefs.current[index] = el)}
              variant="outline"
              className={`${badge.color} text-white text-xs py-1 px-2 font-normal`}
            >
              {badge.icon}
              {badge.text}
            </Badge>
          ))}
        </div>

        <div ref={buttonRef}>
          <Button variant="default" onClick={scrollToNextSection} className="mt-6 group">
            <span className="mr-2">{t('scrollCta')}</span>
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToNextSection}
          className="animate-bounce"
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
