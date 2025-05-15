'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const codeCharacters = [
  '{',
  '}',
  '[',
  ']',
  '(',
  ')',
  ';',
  ':',
  '=',
  '.',
  '+',
  '-',
  '*',
  '/',
  '%',
  '!',
  '?',
  '<',
  '>',
  '|',
  '&',
  '^',
  '~',
  '$',
  '#',
  '@',
  '_',
  '\\',
  '/',
  'const',
  'let',
  'var',
  'function',
  'class',
  'if',
  'else',
  'return',
  'async',
  'await',
  'import',
  'export',
  'from',
  'for',
  'while',
  'try',
  'catch',
  'null',
  'undefined',
  'true',
  'false',
]

interface ProfileImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  width = 300,
  height = 300,
  className = '',
}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const matrixRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const animation = useRef({
    active: false,
    frame: null as number | null,
    interval: null as NodeJS.Timeout | null,
    columns: [] as HTMLDivElement[],

    cleanup: function () {
      if (this.frame !== null) {
        cancelAnimationFrame(this.frame)
        this.frame = null
      }

      if (this.interval !== null) {
        clearInterval(this.interval)
        this.interval = null
      }

      this.active = false
    },

    start: function (containerEl: HTMLDivElement, matrixEl: HTMLDivElement) {
      if (this.active) return

      this.cleanup()

      this.active = true

      matrixEl.style.opacity = '1'
      matrixEl.classList.add('active')

      this.createColumns(containerEl, matrixEl)

      this.animateRain(containerEl)

      this.interval = setInterval(() => this.changeCharacters(), 200)
    },

    stop: function () {
      this.cleanup()

      if (matrixRef.current) {
        matrixRef.current.classList.remove('active')
      }
    },

    createColumns: function (containerEl: HTMLDivElement, matrixEl: HTMLDivElement) {
      while (matrixEl.firstChild) {
        matrixEl.removeChild(matrixEl.firstChild)
      }
      this.columns = []

      const rect = containerEl.getBoundingClientRect()
      const numColumns = Math.floor(rect.width / 12)

      for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div')
        column.className = 'matrix-code-column'
        column.style.left = `${i * 12}px`

        column.style.opacity = (Math.random() * 0.5 + 0.5).toString()
        column.dataset.speed = (Math.random() * 60 + 70).toString()
        column.dataset.delay = (Math.random() * 1000).toString()

        const length = Math.floor(Math.random() * 8) + 6
        for (let j = 0; j < length; j++) {
          const char = document.createElement('span')
          char.className = 'matrix-code-character'

          if (j === 0) {
            char.classList.add('head-character')
          }

          char.textContent = codeCharacters[Math.floor(Math.random() * codeCharacters.length)]

          char.style.opacity = (0.1 + (1 - j / length) * 0.4).toString()

          column.appendChild(char)
        }

        matrixEl.appendChild(column)
        this.columns.push(column)
      }
    },

    animateRain: function (containerEl: HTMLDivElement) {
      if (!this.active) return

      const rect = containerEl.getBoundingClientRect()
      const height = rect.height

      this.columns.forEach((column) => {
        const speed = parseFloat(column.dataset.speed || '60')
        const delay = parseFloat(column.dataset.delay || '0')

        if (performance.now() < delay) {
          this.frame = requestAnimationFrame(() => this.animateRain(containerEl))
          return
        }

        const y = parseFloat(column.style.top || '-20')

        const newY = y + speed / 60

        if (newY > height) {
          column.style.top = '-20px'
          this.refreshColumnCharacters(column)
        } else {
          column.style.top = `${newY}px`
        }
      })

      if (this.active) {
        this.frame = requestAnimationFrame(() => this.animateRain(containerEl))
      }
    },

    changeCharacters: function () {
      if (!this.active) return

      this.columns.forEach((column) => {
        const chars = column.querySelectorAll('.matrix-code-character')
        chars.forEach((char) => {
          if (Math.random() < 0.1) {
            char.textContent = codeCharacters[Math.floor(Math.random() * codeCharacters.length)]
          }
        })
      })
    },

    refreshColumnCharacters: function (column: HTMLDivElement) {
      const chars = column.querySelectorAll('.matrix-code-character')
      chars.forEach((char, index) => {
        char.textContent = codeCharacters[Math.floor(Math.random() * codeCharacters.length)]

        if (index === 0) {
          char.classList.add('head-character')
        } else {
          char.classList.remove('head-character')
        }
      })
    },
  })

  useEffect(() => {
    const currentAnimation = animation.current
    return () => {
      currentAnimation.cleanup()
    }
  }, [])

  useEffect(() => {
    if (!isRevealed) return

    if (isHovering && containerRef.current && matrixRef.current) {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '1'
      }

      if (matrixRef.current) {
        matrixRef.current.style.opacity = '1'
      }

      try {
        animation.current.start(containerRef.current, matrixRef.current)
      } catch (error) {
        console.error('Error starting matrix animation:', error)
      }
    } else {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0'
      }

      setTimeout(() => {
        if (!isHovering) {
          if (matrixRef.current) {
            matrixRef.current.style.opacity = '0'
          }

          setTimeout(() => {
            if (!isHovering) {
              animation.current.stop()
            }
          }, 300)
        }
      }, 100)
    }
  }, [isHovering, isRevealed])

  useGSAP(() => {
    if (!containerRef.current) return

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(containerRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.7)',
          onComplete: () => {
            if (overlayRef.current) {
              gsap.to(overlayRef.current, {
                opacity: 0.8,
                duration: 0.3,
              })
            }

            if (containerRef.current && matrixRef.current) {
              animation.current.start(containerRef.current, matrixRef.current)
            }

            gsap.to('.profile-image', {
              filter: 'blur(0px)',
              scale: 1,
              duration: 2,
              ease: 'power3.out',
              onComplete: () => {
                gsap.to(matrixRef.current, {
                  opacity: 0,
                  duration: 0.8,
                  onComplete: () => {
                    animation.current.stop()

                    setIsRevealed(true)

                    if (overlayRef.current) {
                      gsap.to(overlayRef.current, {
                        opacity: 0,
                        duration: 0.5,
                      })
                    }
                  },
                })
              },
            })
          },
        })
      },
    })

    gsap.set(containerRef.current, {
      autoAlpha: 0,
      y: 40,
      scale: 0.8,
    })
  }, [])

  return (
    <div
      className={cn('relative overflow-hidden rounded-md shadow-md', className)}
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'profile-image profile-image-blur object-cover aspect-square transition-all duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoadingComplete={() => setIsLoaded(true)}
          priority
        />
        {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse rounded-md" />}
      </div>
      <div
        className="absolute inset-0 bg-background/40 transition-opacity duration-300"
        ref={overlayRef}
      ></div>
      <div className="matrix-code absolute inset-0 pointer-events-none" ref={matrixRef}></div>
    </div>
  )
}

export default ProfileImage
