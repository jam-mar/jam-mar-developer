'use client'
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react'
import { DEFAULT_SECTION_IDS } from '@/constants/index'
interface FullPageContextState {
  activeSectionId: string
  setActiveSectionIdDirectly: (id: string) => void
  navigateToSection: (id: string) => void
  targetSectionNav: string | null
  setTargetSectionNav: (id: string | null) => void
  isFullPageActive: boolean
  setIsFullPageActive: (isActive: boolean) => void
  getSectionIds: () => string[]
}

const FullPageContext = createContext<FullPageContextState>({
  activeSectionId: DEFAULT_SECTION_IDS[0],
  setActiveSectionIdDirectly: (_id: string) => {},
  navigateToSection: (_id: string) => {},
  targetSectionNav: null,
  setTargetSectionNav: (_id: string | null) => {},
  isFullPageActive: false,
  setIsFullPageActive: (_isActive: boolean) => {},
  getSectionIds: () => DEFAULT_SECTION_IDS,
})

export const useFullPage = () => useContext(FullPageContext)

export const FullPageProvider = ({
  children,
  sectionIds = DEFAULT_SECTION_IDS,
}: {
  children: React.ReactNode
  sectionIds?: string[]
}) => {
  const [activeSectionIdState, setActiveSectionIdState] = useState(sectionIds[0])
  const [targetSectionNavState, setTargetSectionNavState] = useState<string | null>(null)
  const [isFullPageActiveState, setIsFullPageActiveState] = useState(false)

  const setActiveSectionIdDirectly = useCallback(
    (id: string) => {
      const validId = sectionIds.includes(id) ? id : id === '' ? sectionIds[0] : sectionIds[0]
      setActiveSectionIdState(validId)

      const basePath = typeof window !== 'undefined' ? window.location.pathname.split('#')[0] : ''
      if (typeof window !== 'undefined') {
        if (validId === sectionIds[0] && id === '') {
          history.replaceState(null, '', basePath)
        } else if (sectionIds.includes(validId) && validId !== sectionIds[0]) {
          history.replaceState(null, '', `${basePath}#${validId}`)
        } else if (validId === sectionIds[0]) {
          history.replaceState(null, '', basePath)
        }
      }
    },
    [sectionIds],
  )

  const navigateToSection = useCallback(
    (id: string) => {
      const target = id === '' || id === sectionIds[0] ? sectionIds[0] : id
      setTargetSectionNavState(target)
    },
    [sectionIds],
  )

  const setIsFullPageActive = useCallback(
    (isActive: boolean | ((prevState: boolean) => boolean)) => {
      setIsFullPageActiveState(isActive)
    },
    [],
  )

  const getSectionIds = useCallback(() => sectionIds, [sectionIds])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1)
      if (hash && sectionIds.includes(hash)) {
      } else {
        setActiveSectionIdState(sectionIds[0])
      }
    }
  }, [sectionIds])

  return (
    <FullPageContext.Provider
      value={{
        activeSectionId: activeSectionIdState,
        setActiveSectionIdDirectly,
        navigateToSection,
        targetSectionNav: targetSectionNavState,
        setTargetSectionNav: setTargetSectionNavState,
        isFullPageActive: isFullPageActiveState,
        setIsFullPageActive,
        getSectionIds,
      }}
    >
      {children}
    </FullPageContext.Provider>
  )
}
