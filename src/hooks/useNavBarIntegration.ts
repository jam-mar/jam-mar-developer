'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

/**
 * This custom hook integrates your NavBar's hash links with GSAP scroll snapping
 * @param {Function} goToSectionFn - The GSAP goToSection function
 * @param {Array} snapTriggers - The ref to snap triggers array
 * @param {Object} triggerMapping - Mapping between section ids and their index in the snapTriggers array
 */
export function useNavBarIntegration(goToSectionFn, snapTriggers, triggerMapping = {}) {
  // Default mapping if not provided
  const defaultMapping = {
    home: 0,
    about: 1,
    projects: 2,
    experience: 3,
    contact: 4,
    footer: 5,
  }

  const mapping = Object.keys(triggerMapping).length > 0 ? triggerMapping : defaultMapping

  useEffect(() => {
    // Function to handle hash change
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) // Remove the # character
      if (hash && mapping[hash] !== undefined) {
        // Call the GSAP goToSection function with the appropriate index
        goToSectionFn(mapping[hash])
      }
    }

    // Function to handle clicks on anchor links
    const handleAnchorClick = (e) => {
      // Check if it's an anchor link with a hash
      if (e.target.tagName === 'A' && e.target.href && e.target.href.includes('#')) {
        const href = e.target.getAttribute('href')
        if (href.startsWith('#')) {
          e.preventDefault() // Prevent default anchor behavior
          const sectionId = href.substring(1)
          if (mapping[sectionId] !== undefined) {
            // Call the GSAP goToSection function with the appropriate index
            goToSectionFn(mapping[sectionId])

            // Update URL hash without scrolling (modern browsers)
            window.history.pushState(null, '', href)
          }
        } else if (href.includes('#')) {
          // For links like "/en/#about"
          e.preventDefault()
          const sectionId = href.split('#')[1]
          if (mapping[sectionId] !== undefined) {
            goToSectionFn(mapping[sectionId])
            window.history.pushState(null, '', `#${sectionId}`)
          }
        }
      }
    }

    // Add event listeners
    window.addEventListener('hashchange', handleHashChange)
    document.addEventListener('click', handleAnchorClick, true)

    // Check for hash on initial load
    if (window.location.hash) {
      handleHashChange()
    }

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      document.removeEventListener('click', handleAnchorClick, true)
    }
  }, [goToSectionFn, mapping])
}
