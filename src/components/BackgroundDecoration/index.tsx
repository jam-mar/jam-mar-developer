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

    // Create a little parallax effect for the background blobs
    const moveBlobs = (e: MouseEvent | TouchEvent) => {
      const container = containerRef.current
      if (!container) return

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      const blobs = container.querySelectorAll('.blob')
      const moveX = (clientX - window.innerWidth / 2) / window.innerWidth
      const moveY = (clientY - window.innerHeight / 2) / window.innerHeight

      blobs.forEach((blob, index) => {
        const factor = 0.02 * (index + 1)
        gsap.to(blob, {
          x: moveX * 30 * factor,
          y: moveY * 30 * factor,
          duration: 1,
          ease: 'power1.out',
        })
      })
    }

    window.addEventListener('mousemove', moveBlobs, { passive: true })
    window.addEventListener('touchmove', moveBlobs, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveBlobs)
      window.removeEventListener('touchmove', moveBlobs)
    }
  }, [])

  return (
    <div ref={containerRef} className={`background-decoration ${className}`}>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="grid-pattern"></div>
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
    </div>
  )
}

export default BackgroundDecoration
