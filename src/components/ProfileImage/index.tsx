'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  // Component state
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const matrixRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Animation controller - using a ref object to keep all animation state together
  const animation = useRef({
    active: false,
    frame: null as number | null,
    interval: null as NodeJS.Timeout | null,
    columns: [] as HTMLDivElement[],

    // Add the missing cleanup method
    cleanup: function () {
      // Cancel animation frame if active
      if (this.frame !== null) {
        cancelAnimationFrame(this.frame)
        this.frame = null
      }

      // Clear interval if active
      if (this.interval !== null) {
        clearInterval(this.interval)
        this.interval = null
      }

      // Reset active state
      this.active = false
    },

    // Start the matrix animation
    start: function (containerEl: HTMLDivElement, matrixEl: HTMLDivElement) {
      // Don't start if already running
      if (this.active) return

      // Clear any existing animation
      this.cleanup()

      // Mark as active
      this.active = true

      // Show the matrix
      matrixEl.style.opacity = '1'
      matrixEl.classList.add('active')

      // Create the matrix columns
      this.createColumns(containerEl, matrixEl)

      // Start the animation loop
      this.animateRain(containerEl)

      // Set up character changes
      this.interval = setInterval(() => this.changeCharacters(), 200)
    },

    // Stop the matrix animation with clean teardown
    stop: function () {
      // Clean up all animation resources
      this.cleanup()

      // Remove active class after a short delay to allow for fade out
      if (matrixRef.current) {
        matrixRef.current.classList.remove('active')
      }
    },

    // Create matrix columns
    createColumns: function (containerEl: HTMLDivElement, matrixEl: HTMLDivElement) {
      // Remove any existing columns
      while (matrixEl.firstChild) {
        matrixEl.removeChild(matrixEl.firstChild)
      }
      this.columns = []

      const rect = containerEl.getBoundingClientRect()
      const numColumns = Math.floor(rect.width / 12)

      // Create columns
      for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div')
        column.className = 'matrix-code-column'
        column.style.left = `${i * 12}px`

        // Random properties
        column.style.opacity = (Math.random() * 0.5 + 0.5).toString()
        column.dataset.speed = (Math.random() * 60 + 70).toString()
        column.dataset.delay = (Math.random() * 1000).toString()

        // Create characters
        const length = Math.floor(Math.random() * 8) + 6
        for (let j = 0; j < length; j++) {
          const char = document.createElement('span')
          char.className = 'matrix-code-character'

          // First character is the head
          if (j === 0) {
            char.classList.add('head-character')
          }

          // Pick a random character
          char.textContent = codeCharacters[Math.floor(Math.random() * codeCharacters.length)]

          // Fade opacity for trailing characters
          char.style.opacity = (0.1 + (1 - j / length) * 0.4).toString()

          column.appendChild(char)
        }

        matrixEl.appendChild(column)
        this.columns.push(column)
      }
    },

    // Animate rain effect
    animateRain: function (containerEl: HTMLDivElement) {
      if (!this.active) return

      const rect = containerEl.getBoundingClientRect()
      const height = rect.height

      // Move each column
      this.columns.forEach((column) => {
        const speed = parseFloat(column.dataset.speed || '60')
        const delay = parseFloat(column.dataset.delay || '0')

        // Check if column is ready to start moving
        if (performance.now() < delay) {
          this.frame = requestAnimationFrame(() => this.animateRain(containerEl))
          return
        }

        // Get current position
        const y = parseFloat(column.style.top || '-20')

        // Move column down
        const newY = y + speed / 60 // Approximating 60fps

        // Reset if off screen
        if (newY > height) {
          column.style.top = '-20px'
          this.refreshColumnCharacters(column)
        } else {
          column.style.top = `${newY}px`
        }
      })

      // Continue animation if still active
      if (this.active) {
        this.frame = requestAnimationFrame(() => this.animateRain(containerEl))
      }
    },

    // Change random characters
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

    // Refresh characters in a column
    refreshColumnCharacters: function (column: HTMLDivElement) {
      const chars = column.querySelectorAll('.matrix-code-character')
      chars.forEach((char, index) => {
        char.textContent = codeCharacters[Math.floor(Math.random() * codeCharacters.length)]

        // Make first character the head
        if (index === 0) {
          char.classList.add('head-character')
        } else {
          char.classList.remove('head-character')
        }
      })
    },
  })

  // Clean up on unmount
  useEffect(() => {
    return () => {
      animation.current.cleanup()
    }
  }, [])

  useEffect(() => {
    if (!isRevealed) return

    if (isHovering && containerRef.current && matrixRef.current) {
      // Show overlay
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '1'
      }

      // Reset matrix opacity if it was faded out
      if (matrixRef.current) {
        matrixRef.current.style.opacity = '1'
      }

      // Start matrix animation
      try {
        animation.current.start(containerRef.current, matrixRef.current)
      } catch (error) {
        console.error('Error starting matrix animation:', error)
      }
    } else {
      // Hide overlay
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0'
      }

      // Stop matrix with a small delay to allow for fade out
      setTimeout(() => {
        if (!isHovering) {
          // Fade out matrix first
          if (matrixRef.current) {
            matrixRef.current.style.opacity = '0'
          }

          // Then stop animation after fade out
          setTimeout(() => {
            if (!isHovering) {
              animation.current.stop()
            }
          }, 300)
        }
      }, 100)
    }
  }, [isHovering, isRevealed])

  // Setup initial reveal animation
  useGSAP(() => {
    if (!containerRef.current) return

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        // First animate the container
        gsap.to(containerRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Show overlay
            if (overlayRef.current) {
              gsap.to(overlayRef.current, {
                opacity: 0.8,
                duration: 0.3,
              })
            }

            // Start matrix animation during unblur
            if (containerRef.current && matrixRef.current) {
              animation.current.start(containerRef.current, matrixRef.current)
            }

            // Unblur the image
            gsap.to('.profile-image', {
              filter: 'blur(0px)',
              scale: 1,
              duration: 2,
              ease: 'power3.out',
              onComplete: () => {
                // Fade out matrix after reveal
                gsap.to(matrixRef.current, {
                  opacity: 0,
                  duration: 0.8,
                  onComplete: () => {
                    // Stop animation
                    animation.current.stop()

                    // Set as revealed
                    setIsRevealed(true)

                    // Hide overlay
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

    // Set initial state
    gsap.set(containerRef.current, {
      autoAlpha: 0,
      y: 40,
      scale: 0.8,
    })
  }, [])

  return (
    <>
      <div
        className="profile-image-container"
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`profile-image profile-image-blur object-cover aspect-square ${className}`}
          priority
        />
        <div className="profile-image-overlay" ref={overlayRef}></div>
        <div className="matrix-code" ref={matrixRef}></div>
      </div>
    </>
  )
}

export default ProfileImage
