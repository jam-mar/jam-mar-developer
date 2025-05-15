'use client'

import React, { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Code, Sparkles, Database, Clock, Cloud } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import './styles.css'

export default function Hero() {
  const t = useTranslations('hero')
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const nameRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const decorationRef = useRef(null)
  const wheel1Ref = useRef(null)
  const wheel2Ref = useRef(null)
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([])

  const speedLevelRef = useRef<Record<string, number>>({
    wheel1: 0,
    wheel2: 0,
  })

  const isSpinningRef = useRef<Record<string, boolean>>({
    wheel1: false,
    wheel2: false,
  })

  const MAX_SPEED_LEVEL = 5

  const tweensRef = useRef<Record<string, gsap.core.Tween | null>>({
    wheel1: null,
    wheel2: null,
  })

  const badges = [
    {
      icon: <Code className="h-3 w-3 mr-1" />,
      text: 'Frontend Specialist',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    },
    {
      icon: <Database className="h-3 w-3 mr-1" />,
      text: 'Backend Developer',
      color: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    },
    {
      icon: <Cloud className="h-3 w-3 mr-1" />,
      text: 'System Architect',
      color: 'bg-gradient-to-r from-red-500 to-orange-600',
    },
    {
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      text: 'Creative Coder',
      color: 'bg-gradient-to-r from-amber-500 to-orange-600',
    },
    {
      icon: <Clock className="h-3 w-3 mr-1" />,
      text: 'Team Player',
      color: 'bg-gradient-to-r from-violet-500 to-purple-600',
    },
  ]

  useEffect(() => {
    badgeRefs.current = badgeRefs.current.slice(0, badges.length)
  }, [badges.length])

  const resetWheel = (wheel: HTMLElement, wheelName: 'wheel1' | 'wheel2') => {
    speedLevelRef.current[wheelName] = 0
    isSpinningRef.current[wheelName] = false

    if (tweensRef.current[wheelName]) {
      tweensRef.current[wheelName]!.kill()
      tweensRef.current[wheelName] = null
    }

    gsap.to(wheel, {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
      duration: 0.3,
    })

    gsap.to(wheel, {
      boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
      duration: 1.5,
      delay: 0.3,
      ease: 'power2.out',
    })

    wheel.classList.remove('flying-off')

    gsap.set(wheel, { opacity: 0 })

    gsap.set(wheel, {
      x: 0,
      y: 0,
      rotation: Math.random() * 30,
      scale: 1,
      opacity: 0,
    })

    gsap.to(wheel, {
      opacity: 1,
      duration: 0.5,
      delay: 0.5,
    })

    gsap.to(wheel, {
      rotation: '+=5',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }

  const spinWheelWithSpeed = (
    wheel: HTMLElement,
    wheelName: 'wheel1' | 'wheel2',
    speedLevel: number,
  ) => {
    const speedFactor = Math.min(speedLevel, MAX_SPEED_LEVEL)
    const duration = Math.max(8 - speedFactor, 1)

    if (tweensRef.current[wheelName]) {
      tweensRef.current[wheelName]!.kill()
    }

    gsap.killTweensOf(wheel)

    gsap.to(wheel, {
      scale: 1 + speedFactor * 0.02, // Grows slightly with speed
      boxShadow: `0 0 ${speedFactor * 4}px rgba(255, 255, 255, ${speedFactor * 0.06})`,
      duration: 0.3,
      ease: 'power2.out',
    })

    isSpinningRef.current[wheelName] = true

    tweensRef.current[wheelName] = gsap.to(wheel, {
      rotation: '+=360',
      duration: duration,
      ease: 'power1.inOut',
      repeat: -1,
      onComplete: () => {
        isSpinningRef.current[wheelName] = false
      },
    })

    const innerElements = wheel.querySelectorAll('.wheel-element')
    if (innerElements.length) {
      gsap.to(innerElements, {
        rotation: `-=${360 + speedFactor * 60}`,
        duration: Math.max(6 - speedFactor, 1),
        ease: 'power1.inOut',
        repeat: -1,
        overwrite: true,
      })
    }

    if (speedFactor >= MAX_SPEED_LEVEL) {
      wheel.classList.add('flying-off')

      setTimeout(() => {
        if (speedLevelRef.current[wheelName] >= MAX_SPEED_LEVEL) {
          if (tweensRef.current[wheelName]) {
            tweensRef.current[wheelName]!.kill()
            tweensRef.current[wheelName] = null
          }

          const xDirection = wheelName === 'wheel1' ? -1 : 1
          const yDirection = wheelName === 'wheel1' ? -1 : 1

          gsap.to(wheel, {
            rotation: '+=720',
            x: `${xDirection * 1000}`,
            y: `${yDirection * 1000}`,
            scale: 0.5,
            duration: 1.5,
            ease: 'power2.in',
            onComplete: () => {
              resetWheel(wheel, wheelName)
            },
          })

          const innerElements = wheel.querySelectorAll('.wheel-element')
          if (innerElements.length) {
            gsap.to(innerElements, {
              rotation: '-=1080',
              duration: 1.5,
              ease: 'power2.in',
            })
          }
        }
      }, 1000)
    }

    if (speedFactor < MAX_SPEED_LEVEL) {
      setTimeout(() => {
        if (speedLevelRef.current[wheelName] === speedFactor && isSpinningRef.current[wheelName]) {
          if (speedFactor > 0) {
            gsap.to(wheel, {
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
              duration: 0.3,
              yoyo: true,
              repeat: 1,
            })
          }

          speedLevelRef.current[wheelName] = Math.max(0, speedLevelRef.current[wheelName] - 1)
          spinWheelWithSpeed(wheel, wheelName, speedLevelRef.current[wheelName])
        }
      }, 3000) // Slow down after 3 seconds
    }
  }

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      gsap.set([titleRef.current, nameRef.current, headingRef.current, subheadingRef.current], {
        y: 30,
        opacity: 0,
      })

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

      const wheels = [
        { element: wheel1Ref.current, name: 'wheel1' as const },
        { element: wheel2Ref.current, name: 'wheel2' as const },
      ].filter((w) => w.element)

      wheels.forEach(({ element: wheel, name }) => {
        if (!wheel) return

        gsap.set(wheel, { rotation: Math.random() * 30 - 7 })

        gsap.to(wheel, {
          rotation: '+=5',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        wheel.addEventListener('click', () => {
          if (speedLevelRef.current[name] >= MAX_SPEED_LEVEL) return

          speedLevelRef.current[name] = Math.min(MAX_SPEED_LEVEL, speedLevelRef.current[name] + 1)

          spinWheelWithSpeed(wheel, name, speedLevelRef.current[name])

          gsap.to(wheel, {
            scale: 1.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          })

          const speedIndicator = document.createElement('div')
          speedIndicator.className = 'speed-indicator'
          speedIndicator.textContent = `+${speedLevelRef.current[name]}`
          speedIndicator.style.position = 'absolute'
          speedIndicator.style.color = 'white'
          speedIndicator.style.fontSize = '12px'
          speedIndicator.style.fontWeight = 'bold'
          speedIndicator.style.opacity = '0'
          speedIndicator.style.top = '50%'
          speedIndicator.style.left = '50%'
          speedIndicator.style.transform = 'translate(-50%, -50%)'
          speedIndicator.style.textShadow = '0 0 8px rgba(255,255,255,0.8)'
          wheel.appendChild(speedIndicator)

          gsap.to(speedIndicator, {
            opacity: 1,
            y: -20,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(speedIndicator, {
                opacity: 0,
                duration: 0.3,
                delay: 0.2,
                onComplete: () => {
                  if (speedIndicator.parentNode) {
                    speedIndicator.parentNode.removeChild(speedIndicator)
                  }
                },
              })
            },
          })
        })
      })

      return () => {
        timeline.kill()

        wheels.forEach(({ element: wheel, name }) => {
          if (wheel) {
            gsap.killTweensOf(wheel)
            gsap.killTweensOf(wheel.querySelectorAll('.wheel-element'))
            wheel.removeEventListener('click', () => {})

            if (tweensRef.current[name]) {
              tweensRef.current[name]!.kill()
            }
          }
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <div ref={sectionRef} className="max-w-screen-xl w-full mx-auto px-4 md:px-6 lg:px-8">
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
            <div
              ref={wheel1Ref}
              className="decoration-item decoration-wheel size-16 rounded-full border-2 border-dashed border-muted/40 flex items-center justify-center cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] relative"
            >
              <div className="size-8 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 wheel-element"></div>
              {/* Add gear-like notches around the wheel */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`notch-${i}`}
                  className="wheel-element absolute h-1.5 w-1.5 bg-primary/40 rounded-full"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-7.5px)`,
                  }}
                ></div>
              ))}
              <div className="absolute inset-0 border border-primary/10 rounded-full"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>
            </div>
          </div>

          <div className="absolute right-8 -bottom-16">
            <div
              ref={wheel2Ref}
              className="decoration-item decoration-wheel size-24 rounded-full border border-muted/40 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] relative overflow-hidden"
            >
              {/* Inner rings */}
              <div className="absolute inset-3 rounded-full border border-dashed border-primary/20 wheel-element"></div>
              <div className="absolute inset-6 rounded-full border border-secondary/20 wheel-element"></div>
              <div className="absolute inset-0 m-auto size-6 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 wheel-element"></div>

              {/* Spokes */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`spoke-${i}`}
                  className="wheel-element absolute top-1/2 left-1/2 h-0.5 w-10 -translate-x-1/2 -translate-y-1/2 bg-muted/30"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg)` }}
                ></div>
              ))}

              {/* Add radial gradient for depth */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>
            </div>
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
              ref={(el) => {
                badgeRefs.current[index] = el
              }}
              variant="outline"
              className={`${badge.color} text-white text-xs py-1 px-2 font-normal`}
            >
              {badge.icon}
              {badge.text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
