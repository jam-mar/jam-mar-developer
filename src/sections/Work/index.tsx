'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { IconName } from '@/components/Icons'
import ExperienceCard from '@/components/ExperienceCard'
import ProjectModal from '@/components/ProjectModal'
import { useFullPage } from '@/context/index'
import TechIcon from '@/components/TechIcon'
import WorkCardContent from '@/components/WorkCardContent'
import { Badge } from '@/components/ui/badge'

export default function Work() {
  const t = useTranslations('work')
  const { activeSectionId } = useFullPage()

  const [activeWork, setActiveWork] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoverTarget, setHoverTarget] = useState('')

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const workRefs = useRef([])
  const timelineRef = useRef(null)

  // Work experience data with translations
  const workExperiences = [
    {
      id: 'ducky',
      company: t('companies.company1.name'),
      position: t('companies.company1.position'),
      period: t('companies.company1.period'),
      shortDescription: t('companies.company1.shortDescription'),
      logoSrc: '/images/ducky-logo-inverted.webp',
      isCurrent: true,
      description: t('companies.company1.description'),
      location: t('companies.company1.location'),
      sections: [
        {
          title: t('companies.company1.sections.responsibilities.title'),
          content: t('companies.company1.sections.responsibilities.content'),
        },
        {
          title: t('companies.company1.sections.achievements.title'),
          content: t('companies.company1.sections.achievements.content'),
        },
        {
          title: t('companies.company1.sections.technologies.title'),
          content: t('companies.company1.sections.technologies.content'),
        },
      ],
      screenshots: ['/images/work/ducky-project1.webp', '/images/work/ducky-project2.webp'],
      companyUrl: 'https://ducky.eco/',
      techStack: [
        {
          name: 'React',
          href: 'https://reactjs.org/',
          iconName: IconName.REACT,
        },
        {
          name: 'TypeScript',
          href: 'https://www.typescriptlang.org/',
          iconName: IconName.TYPESCRIPT,
        },
        {
          name: 'Next.js',
          href: 'https://nextjs.org/',
          iconName: IconName.NEXTJS,
        },
        {
          name: 'Python',
          href: 'https://www.python.org/',
          iconName: IconName.PYTHON,
        },
        {
          name: 'Flask',
          href: 'https://flask.palletsprojects.com/',
          iconName: IconName.FLASK,
        },
        {
          name: 'PostgreSQL',
          href: 'https://www.postgresql.org/',
          iconName: IconName.POSTGRESQL,
        },
        {
          name: 'Docker',
          href: 'https://www.docker.com/',
          iconName: IconName.DOCKER,
        },
        {
          name: 'GraphQL',
          href: 'https://graphql.org/',
          iconName: IconName.GRAPHQL,
        },
      ],
    },
    {
      id: 'oslo-nye-fagskole',
      company: t('companies.company2.name'),
      position: t('companies.company2.position'),
      period: t('companies.company2.period'),
      shortDescription: t('companies.company2.shortDescription'),
      logoSrc: '/images/work/oslo-nye-fagskole-logo.png',
      isCurrent: false,
      description: t('companies.company2.description'),
      location: t('companies.company2.location'),
      sections: [
        {
          title: t('companies.company2.sections.achievements.title'),
          content: t('companies.company2.sections.achievements.content'),
        },
      ],
      companyUrl: 'https://oslonyehoyskole.no/om-oss/Ansatte/James-Mariott',
      techStack: [
        {
          name: 'HTML',
          href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          iconName: IconName.HTML5,
        },
        {
          name: 'CSS',
          href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          iconName: IconName.CSS,
        },
        {
          name: 'JavaScript',
          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          iconName: IconName.JAVASCRIPT,
        },
        {
          name: 'React',
          href: 'https://reactjs.org/',
          iconName: IconName.REACT,
        },
      ],
    },
    {
      id: 'digital-freelancer',
      company: t('companies.company3.name'),
      position: t('companies.company3.position'),
      period: t('companies.company3.period'),
      shortDescription: t('companies.company3.shortDescription'),
      logoSrc: '/images/work/freelance-logo.png',
      isCurrent: false,
      description: t('companies.company3.description'),
      location: t('companies.company3.location'),
      sections: [
        {
          title: t('companies.company3.sections.highlights.title'),
          content: t('companies.company3.sections.highlights.content'),
        },
      ],
      techStack: [
        {
          name: 'HTML',
          href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          iconName: IconName.HTML5,
        },
        {
          name: 'CSS',
          href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          iconName: IconName.CSS,
        },
        {
          name: 'JavaScript',
          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          iconName: IconName.JAVASCRIPT,
        },
        {
          name: 'WordPress',
          href: 'https://wordpress.org/',
          iconName: IconName.WORDPRESS,
        },
      ],
    },
  ]

  useEffect(() => {
    // Initialize refs arrays with the correct length
    workRefs.current = workRefs.current.slice(0, workExperiences.length)
  }, [workExperiences.length])

  // Modal opening function
  const openWorkModal = (workId) => {
    const work = workExperiences.find((w) => w.id === workId)
    if (work) {
      setActiveWork(work)
      setIsModalOpen(true)
      // Prevent scrolling on body when modal is open
      document.body.classList.add('modal-open')
    }
  }

  // Modal closing function
  const closeWorkModal = () => {
    setIsModalOpen(false)
    // Re-enable scrolling on body
    document.body.classList.remove('modal-open')
    // Clear the active work item after animation completes
    setTimeout(() => setActiveWork(null), 300)
  }

  // Create animations using useGSAP but keep them paused
  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Create a master timeline that will be controlled via the activeSectionId
      const masterTimeline = gsap.timeline({ paused: true })
      timelineRef.current = masterTimeline

      // Reset any existing animations
      gsap.killTweensOf([headingRef.current, ...workRefs.current.filter(Boolean)])

      // Set initial states
      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(workRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 50,
      })

      // Determine if we're in mobile view
      const isMobile = window.innerWidth < 768

      // Animate heading elements
      masterTimeline.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      // Animate work cards with stagger
      masterTimeline.to(
        workRefs.current.filter(Boolean),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: {
            amount: isMobile ? 0.4 : 0.6,
            from: 'start',
          },
        },
        '>-0.1',
      )

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
      }
    },
    { scope: sectionRef, dependencies: [workExperiences.length] },
  )

  // Watch for section ID changes to play animation
  useEffect(() => {
    // Match the exact section ID 'work' from your app
    const isActive = activeSectionId === 'work'

    if (isActive && timelineRef.current) {
      // Play animation when section becomes active
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      // Reset animation when section becomes inactive
      timelineRef.current.pause(0)

      // Reset elements to initial state
      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(workRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 50,
      })
    }
  }, [activeSectionId])

  return (
    <>
      <div ref={sectionRef} className="max-w-screen-xl w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 ref={headingRef} className="text-3xl font-bold tracking-tight">
              {t('heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workExperiences.map((work, index) => (
              <div
                key={work.id}
                id={work.id}
                className="transition-all duration-300 hover:translate-y-[-4px]"
                ref={(el) => {
                  workRefs.current[index] = el
                }}
              >
                <ExperienceCard
                  workInProgress={work.isCurrent}
                  onClick={() => openWorkModal(work.id)}
                  onMouseOver={() => setHoverTarget(work.id)}
                  onMouseLeave={() => setHoverTarget('')}
                  logoSlot={
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={work.logoSrc}
                        alt={`${work.company} Logo`}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  }
                  techSlot={
                    <>
                      {work.techStack &&
                        work.techStack
                          .slice(0, 5)
                          .map((tech, techIndex) => (
                            <TechIcon
                              key={techIndex}
                              iconName={tech.iconName}
                              name={tech.name}
                              href={tech.href}
                            />
                          ))}
                      {work.techStack && work.techStack.length > 5 && (
                        <Badge variant="outline">+{work.techStack.length - 5}</Badge>
                      )}
                    </>
                  }
                >
                  <WorkCardContent work={work} t={t} />
                </ExperienceCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work detail modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeWorkModal}
        project={{
          ...activeWork,
          title: activeWork?.company,
          subtitle: activeWork?.position,
          isWip: activeWork?.isCurrent,
          liveUrl: activeWork?.companyUrl,
          tagline: activeWork?.shortDescription,
        }}
      />
    </>
  )
}
