'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface BackgroundDecorationProps {
  className?: string
}

const BackgroundDecoration: React.FC<BackgroundDecorationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create an extremely subtle breathing effect with gentle movement for the dots
    const dots = containerRef.current.querySelectorAll('.dot')
    dots.forEach((dot, index) => {
      // Set initial even lower opacity
      gsap.set(dot, {
        opacity: 0.15,
      })

      // Create subtle floating movement for each dot
      gsap.to(dot, {
        x: `random(-20, 20)`,
        y: `random(-20, 20)`,
        duration: 8 + index * 2, // Different duration for each dot
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Animate with very reduced peak brightness
      gsap.to(dot, {
        scale: 1.05, // Smaller scale change
        opacity: 0.25, // Even lower peak brightness
        duration: 4 + index, // Longer, varied duration
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    // Fix blob mouse tracking - make it more subtle and consistent
    const moveBlobs = (e: MouseEvent | TouchEvent) => {
      const container = containerRef.current
      if (!container) return

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      const blobs = container.querySelectorAll('.blob')
      const moveX = (clientX - window.innerWidth / 2) / window.innerWidth
      const moveY = (clientY - window.innerHeight / 2) / window.innerHeight

      // Make movement more subtle and predictable
      blobs.forEach((blob, index) => {
        // Reduced factor and consistent movement
        const factor = 0.01 * (index + 1)
        gsap.to(blob, {
          x: moveX * 15 * factor,
          y: moveY * 15 * factor,
          duration: 2, // Increased duration for smoother movement
          ease: 'power2.out',
        })
      })
    }

    // Throttle event handler to improve performance
    let throttleTimer: number | null = null
    const throttledMoveBlobs = (e: MouseEvent | TouchEvent) => {
      if (throttleTimer === null) {
        throttleTimer = window.setTimeout(() => {
          moveBlobs(e)
          throttleTimer = null
        }, 50) // 50ms throttle
      }
    }

    window.addEventListener('mousemove', throttledMoveBlobs, { passive: true })
    window.addEventListener('touchmove', throttledMoveBlobs, { passive: true })

    return () => {
      window.removeEventListener('mousemove', throttledMoveBlobs)
      window.removeEventListener('touchmove', throttledMoveBlobs)
      if (throttleTimer) window.clearTimeout(throttleTimer)
    }
  }, [])

  return (
    <div ref={containerRef} className={`background-decoration ${className}`}>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="grid-pattern"></div>
      {/* Fixed positions for dots so they always pulse in the same place */}
      <div className="dot dot-1" style={{ position: 'absolute', top: '20%', left: '15%' }}></div>
      <div className="dot dot-2" style={{ position: 'absolute', top: '70%', left: '80%' }}></div>
    </div>
  )
}

export default BackgroundDecoration
