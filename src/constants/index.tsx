import { TechCategory, Tech, IconName } from '@/types'

export const DEFAULT_SECTION_IDS = ['hero', 'aboutMe', 'tech', 'work', 'projects', 'contact']

export const navItems = [
  { id: DEFAULT_SECTION_IDS[0], labelKey: 'navigation.home', isRootPageLink: true },
  { id: DEFAULT_SECTION_IDS[1], labelKey: 'navigation.about_me' },
  { id: DEFAULT_SECTION_IDS[2], labelKey: 'navigation.tech' },
  { id: DEFAULT_SECTION_IDS[3], labelKey: 'navigation.work' },
  { id: DEFAULT_SECTION_IDS[4], labelKey: 'navigation.projects' },
  { id: DEFAULT_SECTION_IDS[5], labelKey: 'navigation.contact' },
  {
    id: 'blog',
    labelKey: 'navigation.blog',
    isRootPageLink: false,
    isExternalLink: true,
    href: '/blog',
  },
].slice(0, DEFAULT_SECTION_IDS.length + 1)

export const techCategories: TechCategory[] = [
  {
    title: 'Frontend Essentials',
    techs: [
      { name: 'JavaScript (ES6+)', iconName: IconName.JAVASCRIPT },
      { name: 'TypeScript', iconName: IconName.TYPESCRIPT },
      { name: 'HTML', iconName: IconName.HTML5 },
      { name: 'CSS', iconName: IconName.CSS },
    ],
  },
  {
    title: 'UI Frameworks & Libraries',
    techs: [
      { name: 'React', iconName: IconName.REACT },
      { name: 'Next.js', iconName: IconName.NEXTJS },
      { name: 'GSAP', iconName: IconName.GSAP },
    ],
  },
  {
    title: 'Backend & APIs',
    techs: [
      { name: 'Node.js', iconName: IconName.NODEJS },
      { name: 'Python', iconName: IconName.PYTHON },
      { name: 'Flask', iconName: IconName.FLASK },
      { name: 'GraphQL', iconName: IconName.GRAPHQL },
    ],
  },
  {
    title: 'Databases',
    techs: [
      { name: 'SQL', iconName: IconName.SQL },
      { name: 'MongoDB', iconName: IconName.MONGODB },
      { name: 'PostgreSQL', iconName: IconName.POSTGRESQL },
      { name: 'Prisma', iconName: IconName.PRISMA },
      { name: 'Firebase', iconName: IconName.FIREBASE },
    ],
  },
  {
    title: 'DevOps & Tools',
    techs: [
      { name: 'Docker', iconName: IconName.DOCKER },
      { name: 'GitHub Actions', iconName: IconName.GITHUBACTIONS },
      { name: 'Google Cloud', iconName: IconName.GOOGLECLOUD },
    ],
  },
  {
    title: 'Design & Auth',
    techs: [
      { name: 'Figma', iconName: IconName.FIGMA },
      { name: 'Auth0/OAuth', iconName: IconName.AUTH0 },
    ],
  },
]

export const allTechs: Tech[] = techCategories.flatMap((category) => category.techs)
