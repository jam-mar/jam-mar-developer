'use client'

import React, { useRef, useEffect, JSX } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DynamicIcon, IconName } from '@/components/Icons'
import ProfileImage from '@/components/ProfileImage'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

type SkillIconProps = {
  iconName: IconName
  className?: string
}

type Skill = {
  name: string
  iconName: IconName
}

type SkillItemProps = {
  skill: Skill
  className?: string
}

const SkillIcon: React.FC<SkillIconProps> = ({ iconName, className = '' }) => {
  return <DynamicIcon name={iconName} size="20px" className={`mr-2 ${className}`} />
}

const SkillItem = React.forwardRef<HTMLDivElement, SkillItemProps>(
  ({ skill, className = '' }, ref) => {
    const itemRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (!itemRef.current) return

      const element = itemRef.current
      let tl: gsap.core.Timeline | null = null

      const createAnimation = (): gsap.core.Timeline => {
        if (tl) tl.kill()

        const newTl = gsap.timeline({ paused: true })
        newTl.to(element, {
          scale: 1.1,
          y: -5,
          duration: 0.2,
          ease: 'back.out(2)',
        })
        return newTl
      }

      tl = createAnimation()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let isHovering = false

      const handleMouseEnter = (): void => {
        isHovering = true

        gsap.killTweensOf(element)
        gsap.set(element, { scale: 1, y: 0 })

        tl = createAnimation()
        tl.play()
      }

      const handleMouseLeave = (): void => {
        isHovering = false

        gsap.killTweensOf(element)

        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.15,
          ease: 'power1.out',
          overwrite: true,
        })
      }

      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
        if (tl) tl.kill()
        gsap.killTweensOf(element)
        gsap.set(element, { scale: 1, y: 0, clearProps: 'all' })
      }
    }, [])

    return (
      <div
        ref={(el) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(el)
            } else {
              ref.current = el
            }
          }
          itemRef.current = el
        }}
        className={`skill-item flex items-center bg-secondary text-secondary-foreground px-4 py-2 rounded-full shadow-sm cursor-pointer transition-shadow hover:shadow-md ${className}`}
      >
        <SkillIcon iconName={skill.iconName} className="skill-icon" />
        <span className="skill-name text-sm font-medium">{skill.name}</span>
      </div>
    )
  },
)

SkillItem.displayName = 'SkillItem'

export default function AboutMe(): JSX.Element {
  const t = useTranslations('aboutMe')

  const sectionRef = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef = useRef<HTMLParagraphElement | null>(null)
  const skillsHeadingRef = useRef<HTMLHeadingElement | null>(null)
  const skillItemRefs = useRef<Array<HTMLDivElement | null>>([])

  const skills: Skill[] = [
    { name: 'Auth0/OAuth', iconName: IconName.AUTH0 },
    { name: 'CSS', iconName: IconName.CSS },
    { name: 'Docker', iconName: IconName.DOCKER },
    { name: 'Figma', iconName: IconName.FIGMA },
    { name: 'Firebase', iconName: IconName.FIREBASE },
    { name: 'Flask', iconName: IconName.FLASK },
    { name: 'GSAP', iconName: IconName.GSAP },
    { name: 'GitHub Actions', iconName: IconName.GITHUBACTIONS },
    { name: 'Google Cloud', iconName: IconName.GOOGLECLOUD },
    { name: 'GraphQL', iconName: IconName.GRAPHQL },
    { name: 'HTML', iconName: IconName.HTML5 },
    { name: 'JavaScript (ES6+)', iconName: IconName.JAVASCRIPT },
    { name: 'MongoDB', iconName: IconName.MONGODB },
    { name: 'Next.js', iconName: IconName.NEXTJS },
    { name: 'Node.js', iconName: IconName.NODEJS },
    { name: 'PostgreSQL', iconName: IconName.POSTGRESQL },
    { name: 'Prisma', iconName: IconName.PRISMA },
    { name: 'Python', iconName: IconName.PYTHON },
    { name: 'React', iconName: IconName.REACT },
    { name: 'SQL', iconName: IconName.SQL },
    { name: 'TypeScript', iconName: IconName.TYPESCRIPT },
  ]

  useEffect(() => {
    skillItemRefs.current = skillItemRefs.current.slice(0, skills.length)
  }, [skills.length])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const elementsToAnimate = [
        headingRef.current,
        descriptionRef.current,
        skillsHeadingRef.current,
        ...skillItemRefs.current.filter(Boolean),
      ].filter(Boolean)

      gsap.set(elementsToAnimate, {
        autoAlpha: 0,
        y: 40,
        scale: 0.8,
      })

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      mainTl.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })

      mainTl.to(
        descriptionRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.4)',
        },
        '-=0.5',
      )

      mainTl.to(
        skillsHeadingRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.4)',
        },
        '-=0.4',
      )

      const currentSkillItems = skillItemRefs.current.filter(Boolean)
      if (currentSkillItems.length > 0) {
        mainTl.to(
          currentSkillItems,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            stagger: {
              amount: 1,
              from: 'random',
              grid: 'auto',
            },
          },
          '-=0.3',
        )
      }
    },
    { scope: sectionRef },
  )

  return (
    <section className="about-me py-16 md:py-24" id="about" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start md:items-center">
          <div className="about-image md:order-last">
            <ProfileImage
              src="/images/james.jpg"
              alt={t('profileImageAlt')}
              width={300}
              height={300}
            />
          </div>
          <div className="about-content md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" ref={headingRef}>
              {t('heading')}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed" ref={descriptionRef}>
              {t('description')}
            </p>
            <div className="skills">
              <h3 className="text-2xl font-semibold mb-6" ref={skillsHeadingRef}>
                {t('skillsHeading')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    ref={(el) => {
                      skillItemRefs.current[index] = el
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
