import React from 'react'

import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import './styles.css'

interface AboutMeProps {
  locale: string
}

export default async function AboutMe({ locale }: AboutMeProps) {
  // Use the client-side translation hook with the correct namespace
  const t = await getTranslations({ locale, namespace: 'aboutMe' })
  // For the skills section, you might want to map through dynamic data
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'GSAP', level: 75 },
    { name: 'Node.js', level: 85 },
  ]

  return (
    <section className="about-me" id="about">
      <div className="container">
        <div className="about-content">
          <h2>{t('heading')}</h2>
          <p>{t('description')}</p>

          <div className="skills">
            <h3>{t('skillsHeading')}</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-image">
          <Image
            src="/profile-image.jpg"
            alt={t('profileImageAlt')}
            width={300}
            height={300}
            className="profile-image"
          />
        </div>
      </div>
    </section>
  )
}
