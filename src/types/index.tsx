import Image from 'next/image'

export enum IconName {
  AUTH0 = 'auth0',
  CSS = 'css',
  DOCKER = 'docker',
  FIGMA = 'figma',
  FIREBASE = 'firebase',
  FLASK = 'flask',
  GITHUBACTIONS = 'githubactions',
  GOOGLECLOUD = 'googlecloud',
  GRAPHQL = 'graphql',
  HTML5 = 'html5',
  JAVASCRIPT = 'javascript',
  MONGODB = 'mongodb',
  NEXTJS = 'nextjs',
  NODEJS = 'nodejs',
  POSTGRESQL = 'postgresql',
  PRISMA = 'prisma',
  PYTHON = 'python',
  REACT = 'react',
  SQL = 'sql',
  TYPESCRIPT = 'typescript',
  THREE = 'three',
  DRIZZLE = 'drizzle',
  GSAP = 'gsap',
  TAILWIND = 'tailwind',
  VERCEL = 'vercel',
}

export interface SvgIconProps extends React.ComponentPropsWithoutRef<typeof Image> {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface Tech {
  name: string
  iconName: IconName
}

export interface TechCategory {
  title: string
  techs: Tech[]
}
