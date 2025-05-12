'use client'
import React, { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import { useFullPage } from '@/context/index'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const FullPageSections = ({
  children,
  sectionIdsProp = [],
  locale = '',
}: {
  children: React.ReactNode
  sectionIdsProp?: string[]
  locale?: string
}) => {
  const {
    setActiveSectionIdDirectly,
    targetSectionNav,
    setTargetSectionNav,
    setIsFullPageActive,
    getSectionIds,
  } = useFullPage()

  const contextGlobalSectionIds = getSectionIds()
  const resolvedSectionIds =
    sectionIdsProp && sectionIdsProp.length > 0 ? sectionIdsProp : contextGlobalSectionIds

  const mainContainerRef = useRef(null)
  const stageRef = useRef(null)
  const sectionRefs = useRef<React.RefObject<HTMLElement>[]>([])
  const sections = React.Children.toArray(children)
  sectionRefs.current = sections.map(
    (_, i) => sectionRefs.current[i] || React.createRef<HTMLElement>(),
  )
  const mainScrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    setIsFullPageActive(true)
    return () => {
      setIsFullPageActive(false)
    }
  }, [setIsFullPageActive])

  const scrollToSectionById = useCallback(
    (id: string, animDuration = 0.75) => {
      const stInstance = mainScrollTriggerRef.current
      const panels = sectionRefs.current.map((ref) => ref.current).filter(Boolean)
      const numActualPanels = panels.length

      if (!stInstance || !stInstance.vars || numActualPanels === 0) {
        console.warn('FullPageSections: ScrollTrigger or panels not ready for scrollToSectionById.')
        return
      }

      let targetIndex = 0
      const firstSectionIdInUse = resolvedSectionIds[0]

      if (id && id !== firstSectionIdInUse) {
        const foundIndex = panels.findIndex((p) => p.id === id)
        if (foundIndex !== -1) {
          targetIndex = foundIndex
        } else {
          console.warn(
            `FullPageSections: Panel with ID "${id}" not found among rendered children. Cannot scroll.`,
          )
          return
        }
      } else if (!id || id === firstSectionIdInUse) {
        targetIndex = 0
      } else {
        console.warn(`FullPageSections: Scroll target ID "${id}" not recognized.`)
        return
      }

      if (targetIndex >= numActualPanels) {
        console.warn(
          `FullPageSections: Target index ${targetIndex} is out of bounds for ${numActualPanels} panels.`,
        )
      }

      let targetScrollY
      if (numActualPanels > 1 && targetIndex > 0) {
        const progress = targetIndex / (numActualPanels - 1)
        targetScrollY = stInstance.start + progress * (stInstance.end - stInstance.start)
      } else {
        targetScrollY = stInstance.start
      }

      const wasSnapEnabled = stInstance.vars.snap
      if (stInstance.vars.snap) stInstance.vars.snap = undefined

      gsap.to(window, {
        scrollTo: { y: targetScrollY, autoKill: true },
        duration: animDuration,
        ease: 'power2.inOut',
        onComplete: () => {
          if (wasSnapEnabled && stInstance.vars) stInstance.vars.snap = wasSnapEnabled

          const currentPanel = panels[targetIndex]
          if (currentPanel) {
            const idToSetActive = targetIndex === 0 ? resolvedSectionIds[0] : currentPanel.id
            setActiveSectionIdDirectly(idToSetActive)
          }
        },
        onInterrupt: () => {
          if (wasSnapEnabled && stInstance.vars) stInstance.vars.snap = wasSnapEnabled
        },
      })
    },
    [mainScrollTriggerRef, resolvedSectionIds, sectionRefs, setActiveSectionIdDirectly],
  )

  useEffect(() => {
    if (targetSectionNav !== null) {
      scrollToSectionById(targetSectionNav)
      setTargetSectionNav(null)
    }
  }, [targetSectionNav, scrollToSectionById, setTargetSectionNav])

  useGSAP(
    () => {
      const panels = sectionRefs.current.map((ref) => ref.current).filter(Boolean)
      const numActualPanels = panels.length
      if (numActualPanels === 0) return

      panels.forEach((panel, i) => {
        panel.id = resolvedSectionIds[i] || `panel-${i}`
      })

      gsap.set(stageRef.current, {
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
      })
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: i + 1,
        })
        if (i === 0) gsap.set(panel.children, { autoAlpha: 1, x: 0 })
        else gsap.set(panel.children, { autoAlpha: 0, x: 50 })
      })
      gsap.set(panels[0], { xPercent: 0 })
      for (let i = 1; i < numActualPanels; i++) gsap.set(panels[i], { xPercent: 100 })

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: () =>
            `+=${(numActualPanels > 1 ? numActualPanels - 1 : 0) * window.innerHeight * 1.2}`,
          scrub: 1.0,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          snap: {
            snapTo: numActualPanels > 1 ? 1 / (numActualPanels - 1) : 0,
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.inOut',
            delay: 0.05,
            onComplete: (self) => {
              if (
                !mainScrollTriggerRef.current ||
                !mainScrollTriggerRef.current.vars ||
                numActualPanels === 0
              )
                return
              const snappedIndex =
                numActualPanels > 1 ? Math.round(self.progress * (numActualPanels - 1)) : 0
              const currentPanel = panels[snappedIndex]
              if (currentPanel) {
                const idToSet = snappedIndex === 0 ? resolvedSectionIds[0] : currentPanel.id
                setActiveSectionIdDirectly(idToSet)
              }
            },
          },
        },
      })
      if (masterTimeline.scrollTrigger) {
        mainScrollTriggerRef.current = masterTimeline.scrollTrigger
      }

      for (let i = 1; i < numActualPanels; i++) {
        masterTimeline.addLabel(`section-${i}-start`)
        masterTimeline.to(
          panels[i - 1],
          { xPercent: -100, ease: 'power2.inOut' },
          `section-${i}-start`,
        )
        masterTimeline.to(
          panels[i - 1].children,
          { autoAlpha: 0, x: -50, stagger: 0.05, duration: 0.3, ease: 'power1.in' },
          '<0.1',
        )
        masterTimeline.to(panels[i], { xPercent: 0, ease: 'power2.inOut' }, `section-${i}-start`)
        masterTimeline.to(
          panels[i].children,
          { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.4, ease: 'power1.out' },
          '>-0.3',
        )
        masterTimeline.addLabel(`section-${i}-end`)
        if (i < numActualPanels - 1) masterTimeline.to({}, { duration: 0.2 })
      }

      const initialTargetFromContext = targetSectionNav
      if (
        initialTargetFromContext !== null &&
        resolvedSectionIds.includes(initialTargetFromContext)
      ) {
        const targetIdx = resolvedSectionIds.indexOf(initialTargetFromContext)
        if (targetIdx < numActualPanels) {
          scrollToSectionById(initialTargetFromContext, 0.01)
          setTargetSectionNav(null)
        } else {
          setActiveSectionIdDirectly(resolvedSectionIds[0])
        }
      } else {
        setActiveSectionIdDirectly(resolvedSectionIds[0])
      }

      return () => {
        if (mainScrollTriggerRef.current) mainScrollTriggerRef.current.kill()
        if (masterTimeline) masterTimeline.kill()
        if (mainContainerRef.current)
          gsap.set(mainContainerRef.current, { clearProps: 'height,paddingBottom' })
        if (stageRef.current) gsap.set(stageRef.current, { clearProps: 'all' })
        panels.forEach((p) => {
          if (p) gsap.set(p, { clearProps: 'all' })
          if (p && p.children) gsap.set(p.children, { clearProps: 'all' })
        })
      }
    },
    {
      scope: mainContainerRef,
      dependencies: [sections.length, resolvedSectionIds, locale, setActiveSectionIdDirectly],
    },
  )

  return (
    <div ref={mainContainerRef} className="fullpage-scroll-area">
      <div ref={stageRef} className="fullpage-stage">
        {sections.map((child, index) => (
          <section
            key={index}
            ref={sectionRefs.current[index]}
            className={`full-page-panel panel-${index}`}
            aria-label={
              React.isValidElement(child) && typeof child.type === 'function'
                ? child.type.name || `Section ${index + 1}`
                : `Section ${index + 1}`
            }
          >
            {child}
          </section>
        ))}
      </div>
    </div>
  )
}

export default FullPageSections
