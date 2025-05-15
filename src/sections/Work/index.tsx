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

  const [activeWork, setActiveWork] = useState<(typeof workExperiences)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setHoverTarget] = useState('')

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const workRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

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
      logoSrc: '/images/onf-logo.png',
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
      logoSrc: '/images/freelance-logo.png',
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
    workRefs.current = workRefs.current.slice(0, workExperiences.length)
  }, [workExperiences.length])

  const openWorkModal = (workId: string) => {
    const work = workExperiences.find((w) => w.id === workId)
    if (work) {
      setActiveWork(work)
      setIsModalOpen(true)

      document.body.classList.add('modal-open')
    }
  }

  const closeWorkModal = () => {
    setIsModalOpen(false)

    document.body.classList.remove('modal-open')

    setTimeout(() => setActiveWork(null), 300)
  }

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const masterTimeline = gsap.timeline({ paused: true })
      timelineRef.current = masterTimeline

      gsap.killTweensOf([headingRef.current, ...workRefs.current.filter(Boolean)])

      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 30,
      })

      gsap.set(workRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: 50,
      })

      const isMobile = window.innerWidth < 768

      masterTimeline.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3, // Reduced from 0.6 to 0.3
        ease: 'power2.out',
      })

      masterTimeline.to(
        workRefs.current.filter(Boolean),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3, // Reduced from 0.6 to 0.3
          ease: 'back.out(1.2)',
          stagger: {
            amount: isMobile ? 0.2 : 0.3, // Reduced from 0.4/0.6 to 0.2/0.3
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

  useEffect(() => {
    const isActive = activeSectionId === 'work'

    if (isActive && timelineRef.current) {
      timelineRef.current.restart()
    } else if (!isActive && timelineRef.current) {
      timelineRef.current.pause(0)

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

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeWorkModal}
        project={
          activeWork
            ? {
                ...activeWork,
                title: activeWork.company,
                subtitle: activeWork.position,
                isWip: activeWork.isCurrent,
                liveUrl: activeWork.companyUrl,
                tagline: activeWork.shortDescription,
                description: activeWork.description,
                location: activeWork.location,
              }
            : null
        }
      />
    </>
  )
}
