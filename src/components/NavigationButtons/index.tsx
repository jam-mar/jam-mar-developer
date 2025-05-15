'use client'

import React, { useCallback, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useFullPage } from '@/context/index'
import { useTranslations } from 'next-intl'

export default function NavigationButtons() {
  // Get everything we need directly from useFullPage
  const { activeSectionId, navigateToSection, getSectionIds, isFullPageActive } = useFullPage()
  const t = useTranslations()

  // Get section IDs directly from the hook
  const sectionIds = getSectionIds()

  // Find current section index
  const currentSectionIndex = sectionIds ? sectionIds.findIndex((id) => id === activeSectionId) : -1

  // Check if we can navigate to adjacent sections
  const hasPrevSection = sectionIds && currentSectionIndex > 0
  const hasNextSection =
    sectionIds && currentSectionIndex >= 0 && currentSectionIndex < sectionIds.length - 1

  // Navigation functions
  const goToPrevSection = useCallback(() => {
    if (hasPrevSection && sectionIds) {
      const prevSectionId = sectionIds[currentSectionIndex - 1]
      navigateToSection(prevSectionId)
    }
  }, [hasPrevSection, sectionIds, currentSectionIndex, navigateToSection])

  const goToNextSection = useCallback(() => {
    if (hasNextSection && sectionIds) {
      const nextSectionId = sectionIds[currentSectionIndex + 1]
      navigateToSection(nextSectionId)
    }
  }, [hasNextSection, sectionIds, currentSectionIndex, navigateToSection])

  // Add keyboard navigation
  useEffect(() => {
    if (!isFullPageActive || !sectionIds) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'ArrowLeft') {
          if (hasPrevSection) {
            e.preventDefault()
            goToPrevSection()
          }
        } else if (e.key === 'ArrowRight') {
          if (hasNextSection) {
            e.preventDefault()
            goToNextSection()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    goToPrevSection,
    goToNextSection,
    hasPrevSection,
    hasNextSection,
    isFullPageActive,
    sectionIds,
  ])

  // Don't render if not in fullpage mode or no sections
  if (!isFullPageActive || !sectionIds || sectionIds.length === 0) {
    return null
  }

  return (
    // Centered navigation container
    <div className="fixed bottom-10 left-0 right-0 flex justify-center items-center z-50 pointer-events-none">
      <div className="flex items-center gap-6 pointer-events-auto">
        <Button
          variant="floating"
          size="navIcon"
          onClick={goToPrevSection}
          disabled={!hasPrevSection}
          className={cn(
            'transition-all duration-300 ease-in-out',
            'opacity-70 hover:opacity-100',
            'disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:bg-black/50 disabled:hover:shadow-none',
            !hasPrevSection ? 'invisible' : '',
          )}
          aria-label={t('navigation.previousSection') || 'Previous section'}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        {/* Section indicator dots */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
          {sectionIds.map((sectionId, index) => (
            <button
              key={sectionId}
              onClick={() => navigateToSection(sectionId)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                index === currentSectionIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/30 hover:bg-white/70',
              )}
              aria-label={`Go to section ${index + 1}`}
              aria-current={index === currentSectionIndex ? 'true' : 'false'}
            />
          ))}
        </div>

        <Button
          variant="floating"
          size="navIcon"
          onClick={goToNextSection}
          disabled={!hasNextSection}
          className={cn(
            'transition-all duration-300 ease-in-out',
            'opacity-70 hover:opacity-100',
            'disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:bg-black/50 disabled:hover:shadow-none',
            !hasNextSection ? 'invisible' : '',
          )}
          aria-label={t('navigation.nextSection') || 'Next section'}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
