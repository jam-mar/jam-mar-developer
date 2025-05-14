'use client'

import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = React.useRef(null)
  const hoverAreaRef = React.useRef(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!footerRef.current) return

    gsap.set(footerRef.current, { autoAlpha: 0, y: 10 })

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!footerRef.current) return

    if (isVisible) {
      gsap.to(footerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    } else {
      gsap.to(footerRef.current, {
        autoAlpha: 0,
        y: 10,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [isVisible])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  return (
    <>
      <div
        ref={hoverAreaRef}
        className="fixed bottom-0 left-0 right-0 h-10 z-40"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <footer
        ref={footerRef}
        id="footer"
        className="fixed bottom-0 left-0 right-0 py-3 px-4 text-center text-xs text-zinc-500 bg-zinc-900/90 backdrop-blur-sm z-50 border-t border-zinc-800"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto max-w-6xl">
          <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
            <li>
              Designed and developed by
              <Link
                className="hover:text-zinc-300 underline ml-1"
                href="https://github.com/jam-mar"
                target="_blank"
              >
                James Marriott
              </Link>
            </li>
            <li>
              Powered by{' '}
              <Link
                className="hover:text-zinc-300 underline"
                href="https://nextjs.org/"
                target="_blank"
              >
                Next.js
              </Link>
              ,{' '}
              <Link
                className="hover:text-zinc-300 underline"
                href="https://react.dev/"
                target="_blank"
              >
                React
              </Link>{' '}
              and{' '}
              <Link
                className="hover:text-zinc-300 underline"
                href="https://gsap.com/"
                target="_blank"
              >
                GSAP
              </Link>
            </li>
            <li>
              Hosted on{' '}
              <Link
                className="hover:text-zinc-300 underline"
                href="https://vercel.com/"
                target="_blank"
              >
                Vercel
              </Link>
            </li>
            <li>
              Inspired by, among others,{' '}
              <Link
                className="hover:text-zinc-300 underline"
                href="https://guillaumegouessan.com/"
                target="_blank"
              >
                Guillaume Gouessan
              </Link>{' '}
              and{' '}
              <Link
                className="hover:text-zinc-300 underline"
                href="https://brittanychiang.com/"
                target="_blank"
              >
                Brittany Chiang
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Footer
