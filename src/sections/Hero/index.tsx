'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import './styles.css'

export default function Hero() {
  const t = useTranslations('hero')
  const [isVisible, setIsVisible] = useState(false)

  const INITIAL_ANIMATION_DELAY = 500
  const BAR_ANIMATION_BASE_DELAY = 0.5
  const BAR_ANIMATION_INCREMENT = 0.05
  const TEXT_ANIMATION_START_DELAY = 0.3
  const TEXT_ANIMATION_INCREMENT = 0.2

  const colorBarSections = [
    [
      { width: 'w-16', color: 'bg-gradient-to-r from-yellow-300 to-yellow-400' },
      { width: 'w-8', color: 'bg-gradient-to-r from-purple-300 to-purple-400' },
    ],
    [
      { width: 'w-8', color: 'bg-gradient-to-r from-red-300 to-red-400' },
      { width: 'w-20', color: 'bg-gradient-to-r from-green-300 to-green-400' },
      { width: 'w-8', color: 'bg-gradient-to-r from-blue-300 to-blue-400' },
      { width: 'size-3', color: 'bg-zinc-400', rounded: 'rounded-full' },
    ],
    [
      { width: 'w-40', color: 'bg-gradient-to-r from-blue-300 to-blue-400' },
      { width: 'w-20', color: 'bg-gradient-to-r from-green-300 to-green-400' },
      { width: 'w-4', color: 'bg-gradient-to-r from-purple-300 to-purple-400' },
    ],
    [
      { width: 'w-5', color: 'bg-zinc-400' },
      { width: 'w-10', color: 'bg-zinc-400' },
      { width: 'w-5', color: 'bg-zinc-400' },
      { width: 'size-3', color: 'bg-zinc-400' },
      { width: 'w-6', color: 'bg-zinc-400' },
    ],
    [
      { width: 'w-8', color: 'bg-zinc-400' },
      { width: 'w-5', color: 'bg-zinc-400' },
      { width: 'size-3', color: 'bg-zinc-400' },
      { width: 'w-12', color: 'bg-zinc-400' },
    ],
    [
      { width: 'w-20', color: 'bg-zinc-400' },
      { width: 'w-8', color: 'bg-zinc-400' },
      { width: 'w-24', color: 'bg-zinc-400' },
    ],
    [
      { width: 'size-3', color: 'bg-zinc-400' },
      { width: 'w-8', color: 'bg-zinc-400' },
      { width: 'w-4', color: 'bg-zinc-400' },
    ],
    [
      { width: 'w-40', color: 'bg-gradient-to-r from-yellow-300 to-yellow-400' },
      { width: 'w-20', color: 'bg-gradient-to-r from-blue-300 to-blue-400' },
      { width: 'size-3', color: 'bg-zinc-400', rounded: 'rounded-full' },
    ],
    [
      { width: 'w-10', color: 'bg-gradient-to-r from-green-300 to-green-400' },
      { width: 'w-14', color: 'bg-gradient-to-r from-purple-300 to-purple-400' },
      { width: 'w-12', color: 'bg-gradient-to-r from-red-300 to-red-400' },
    ],
    [
      { width: 'w-6', color: 'bg-gradient-to-r from-blue-300 to-blue-400' },
      { width: 'w-4', color: 'bg-gradient-to-r from-red-300 to-red-400' },
      { width: 'w-8', color: 'bg-gradient-to-r from-green-300 to-green-400' },
      { width: 'size-3', color: 'bg-zinc-400', rounded: 'rounded-full' },
    ],
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, INITIAL_ANIMATION_DELAY)

    return () => clearTimeout(timer)
  }, [])

  const getBarDelay = (index: number) => {
    return `${BAR_ANIMATION_BASE_DELAY + index * BAR_ANIMATION_INCREMENT}s`
  }

  const getTextDelay = (index: number) => {
    return `${TEXT_ANIMATION_START_DELAY + index * TEXT_ANIMATION_INCREMENT}s`
  }

  const renderColorBarGroup = (
    barGroup: Array<{ width: string; color: string; rounded?: string }>,
    startingIndex: number,
  ) => {
    return (
      <div className="gap-3 flex">
        {barGroup.map((bar, i) => {
          const barIndex = startingIndex + i
          return (
            <div
              key={barIndex}
              className={`color-bar h-3 ${bar.width} ${bar.color} ${bar.rounded || 'rounded-sm'} ${isVisible ? 'slide-in' : ''}`}
              style={{ '--delay': getBarDelay(barIndex) } as React.CSSProperties}
            />
          )
        })}
      </div>
    )
  }

  let barCounter = 0

  return (
    <div className="min-h-screen container flex items-center">
      <div className="flex flex-col p-4 max-w-xl">
        {/* Top section with color bars */}
        <div className="space-y-4">
          {colorBarSections.slice(0, 4).map((barGroup, groupIndex) => {
            const groupBars = renderColorBarGroup(barGroup, barCounter)
            barCounter += barGroup.length
            return <React.Fragment key={`top-group-${groupIndex}`}>{groupBars}</React.Fragment>
          })}
        </div>

        {/* Middle section with text */}
        <div className="pl-4 md:pl-8 lg:pl-16 py-6 space-y-4">
          <p
            className={`text-element text-zinc-400 ${isVisible ? 'slide-up' : ''}`}
            style={{ '--delay': getTextDelay(0) } as React.CSSProperties}
          >
            {t('preTitle')}
          </p>
          <h2
            className={`text-element text-4xl lg:text-7xl font-bold ${isVisible ? 'slide-up' : ''}`}
            style={{ '--delay': getTextDelay(1) } as React.CSSProperties}
          >
            {t('name')}
          </h2>

          {/* Header divider bars */}
          {renderColorBarGroup(colorBarSections[4], barCounter)}
          {(() => {
            barCounter += colorBarSections[4].length
            return null
          })()}

          <h1
            className={`text-element text-zinc-200 font-light text-xl ${isVisible ? 'slide-up' : ''}`}
            style={{ '--delay': getTextDelay(2) } as React.CSSProperties}
          >
            &lt; {t('heading')} /&gt;
          </h1>

          {/* After header bars */}
          {renderColorBarGroup(colorBarSections[5], barCounter)}
          {(() => {
            barCounter += colorBarSections[5].length
            return null
          })()}
        </div>

        {/* Bottom section with color bars */}
        <div className="space-y-4">
          {colorBarSections.slice(6).map((barGroup, groupIndex) => {
            const groupBars = renderColorBarGroup(barGroup, barCounter)
            barCounter += barGroup.length
            return <React.Fragment key={`bottom-group-${groupIndex}`}>{groupBars}</React.Fragment>
          })}
        </div>

        <h3
          className={`text-element mt-4 text-zinc-300 font-light text-lg ${isVisible ? 'slide-up' : ''}`}
          style={{ '--delay': getTextDelay(3) } as React.CSSProperties}
        >
          {t('subheading')}
        </h3>
        <div className="links"></div>
      </div>
    </div>
  )
}
