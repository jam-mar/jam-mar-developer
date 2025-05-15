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
    // Positioned at bottom-16 (higher up) and spread across the viewport
    <div className="fixed bottom-16 left-12 right-12 flex justify-between z-50">
      <Button
        variant="floating"
        size="icon"
        onClick={goToPrevSection}
        disabled={!hasPrevSection}
        className={cn(
          'transition-all duration-300 ease-in-out',
          'opacity-30 hover:opacity-100',
          'disabled:opacity-10 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:bg-black/50 disabled:hover:shadow-none',
        )}
        aria-label={t('navigation.previousSection') || 'Previous section'}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="floating"
        size="icon"
        onClick={goToNextSection}
        disabled={!hasNextSection}
        className={cn(
          'transition-all duration-300 ease-in-out',
          'opacity-30 hover:opacity-100',
          'disabled:opacity-10 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:bg-black/50 disabled:hover:shadow-none',
        )}
        aria-label={t('navigation.nextSection') || 'Next section'}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
