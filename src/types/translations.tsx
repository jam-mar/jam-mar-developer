export interface Badge {
  text: string
  icon: string
  color: string
}

export interface SkillCategory {
  title: string
  items: string[]
}

export interface Skills {
  languages: SkillCategory
  frameworks: SkillCategory
  databases: SkillCategory
  devops: SkillCategory
  other: SkillCategory
}

export interface CompanySection {
  title: string
  content: string
}

export interface Company {
  name: string
  position: string
  period: string
  shortDescription: string
  description: string
  location: string
  sections: Record<string, CompanySection>
}

export interface TechStack {
  name: string
  href: string
  iconName: string
}

export interface ProjectSection {
  title: string
  content: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  tagline: string
  period: string
  role: string
  shortDescription: string
  logoSrc: string
  isWip: boolean
  description: string
  location: string
  sections: ProjectSection[]
  screenshots: string[]
  liveUrl?: string
  techStack: TechStack[]
}
export interface TranslationData {
  navigation: {
    brand: string
    home: string
    about_me: string
    projects: string
    experience: string
    contact: string
    cv: string
    tech: string
    work: string
    blog: string
    footer: string
    previousSection: string
    nextSection: string
  }
  hero: {
    name: string
    heading: string
    subheading: string
    scrollCta: string
    email: string
    badges: Badge[]
  }
  aboutMe: {
    heading: string
    description: string
    skillsHeading: string
    profileImageAlt: string
  }
  expertise: {
    heading: string
    description: string
  }
  tech: {
    heading: string
    description: string
    skills: Skills
    profileImageAlt: string
  }
  projects: {
    heading: string
    description: string
    liveDemo: string
    sourceCode: string
    projectOne: {
      title: string
      description: string
    }
    projectTwo: {
      title: string
      description: string
    }
    projectThree: {
      title: string
      description: string
    }
    subheading: string
    projects: Project[]
  }
  work: {
    heading: string
    subheading: string
    companies: Record<string, Company>
  }
  contact: {
    availability: string
    description: string
    email: string
    emailLabel: string
    emailMe: string
    errorGeneric: string
    errorMessage: string
    formEmail: string
    formEmailPlaceholder: string
    formMessage: string
    formMessagePlaceholder: string
    formName: string
    formNamePlaceholder: string
    formSubject: string
    formSubjectPlaceholder: string
    formSubmit: string
    heading: string
    location: string
    mailto: string
    phone: string
    phoneLink: string
    phoneLabel: string
    phoneNumber: string
    sending: string
    socialsLabel: string
    successMessage: string
  }
  footer: {
    siteName: string
    tagline: string
    navigation: string
    home: string
    about: string
    tech: string
    work: string
    projects: string
    experience: string
    contact: string
    connect: string
    languages: string
    copyright: string
    poweredBy: string
  }
  // Allows indexing with any string, value is unknown
  [key: string]: unknown
}
