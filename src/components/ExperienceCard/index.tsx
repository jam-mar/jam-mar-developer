'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ChevronRight } from 'lucide-react'

interface ExperienceCardProps {
  children: React.ReactNode
  logoSlot: React.ReactNode
  techSlot: React.ReactNode
  workInProgress?: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  onMouseOver?: () => void
  onMouseLeave?: () => void
}

const ExperienceCard = ({
  children,
  logoSlot,
  techSlot,
  workInProgress = false,
  onClick,
  onMouseOver,
  onMouseLeave,
}: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const openModalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !openModalRef.current) return

    const cardElement = cardRef.current
    const buttonElement = openModalRef.current

    let tl: gsap.core.Timeline | null = null

    const createHoverAnimation = () => {
      if (tl) tl.kill()

      const newTl = gsap.timeline({ paused: true })

      newTl.to(cardElement, {
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        duration: 0.3,
        ease: 'power2.out',
      })

      newTl.to(
        buttonElement,
        {
          rotation: -90,
          backgroundColor: 'hsl(0, 0%, 90%)',
          color: 'hsl(0, 0%, 10%)',
          duration: 0.3,
          ease: 'power2.out',
        },
        '<',
      )

      return newTl
    }

    tl = createHoverAnimation()

    const handleMouseEnter = () => {
      if (onMouseOver) onMouseOver()

      gsap.killTweensOf([cardElement, buttonElement])
      tl = createHoverAnimation()
      tl.play()
    }

    const handleMouseLeave = () => {
      if (onMouseLeave) onMouseLeave()

      gsap.killTweensOf([cardElement, buttonElement])
      gsap.to(cardElement, {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.2,
        ease: 'power1.out',
      })

      gsap.to(buttonElement, {
        rotation: 0,
        backgroundColor: 'hsl(200, 70%, 14%)',
        color: 'hsl(0, 0%, 100%)',
        duration: 0.2,
        ease: 'power1.out',
      })
    }

    const handleTouchStart = () => {
      if (onMouseOver) onMouseOver()

      buttonElement.focus({ preventScroll: true })
    }

    const handleTouchEnd = () => {
      if (onMouseLeave) onMouseLeave()

      buttonElement.blur()
    }

    cardElement.addEventListener('mouseenter', handleMouseEnter)
    cardElement.addEventListener('mouseleave', handleMouseLeave)
    cardElement.addEventListener('touchstart', handleTouchStart, { passive: true })
    cardElement.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      cardElement.removeEventListener('mouseenter', handleMouseEnter)
      cardElement.removeEventListener('mouseleave', handleMouseLeave)
      cardElement.removeEventListener('touchstart', handleTouchStart)
      cardElement.removeEventListener('touchend', handleTouchEnd)

      if (tl) tl.kill()
      gsap.killTweensOf([cardElement, buttonElement])
    }
  }, [onMouseOver, onMouseLeave])

  return (
    <div
      ref={cardRef}
      className="group/card relative cursor-pointer shadow-xl ring-1 ring-gray-900/5 transition-shadow duration-300 hover:shadow-2xl rounded-lg flex flex-col backdrop-blur-sm w-full"
      onClick={onClick}
    >
      <div className="absolute -top-10 left-6 sm:left-10 size-20 transition-all duration-200 flex justify-center items-center rounded-full bg-[#062C3F] border-2 border-gray-200 drop-shadow p-3 z-30">
        {logoSlot}
      </div>

      <div className="relative size-full overflow-hidden rounded-lg">
        {workInProgress && (
          <div className="absolute right-0 top-0 size-16">
            <div className="absolute rotate-45 bg-green-600 text-xs text-center text-gray-200 font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
              Work in Progress
            </div>
          </div>
        )}

        <div className="flex flex-col h-full">
          <div className="px-6 pt-12 pb-6 sm:px-10 relative h-full transition-colors duration-300 bg-gray-600/5 group-hover/card:bg-gray-400/10 focus-within:bg-gray-400/10">
            <div className="relative z-10 flex flex-col size-full">
              <div className="flex grow flex-col md:flex-row w-full gap-4">{children}</div>

              <div className="absolute -bottom-9 sm:-bottom-11 -right-4 sm:-right-8 flex">
                <div
                  ref={openModalRef}
                  className="font-semibold drop-shadow size-10 transition-all duration-300 rounded-full bg-[#062C3F] text-white justify-center items-center flex"
                  tabIndex={0}
                >
                  <ChevronRight size={24} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end bg-gray-900/40 px-4 pt-6 pb-4">
            <div className="flex flex-wrap gap-4">{techSlot}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
