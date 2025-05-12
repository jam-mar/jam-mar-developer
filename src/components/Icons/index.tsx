import React from 'react'
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
}

interface SvgIconProps extends React.ComponentPropsWithoutRef<typeof Image> {
  src: string
  alt: string
  width?: number
  height?: number
}

const SvgIcon: React.FC<SvgIconProps> = ({ src, alt = '', width = 20, height = 20, ...props }) => {
  return <Image src={src} alt={alt} width={width} height={height} {...props} />
}

export const Auth0Icon = () => <SvgIcon src="/icons/auth0.svg" alt="Auth0/OAuth" />
export const CssIcon = () => <SvgIcon src="/icons/css3.svg" alt="CSS" />
export const DockerIcon = () => <SvgIcon src="/icons/docker.svg" alt="Docker" />
export const DrizzleIcon = () => <SvgIcon src="/icons/drizzle.svg" alt="Drizzle" />
export const FigmaIcon = () => <SvgIcon src="/icons/figma.svg" alt="Figma" />
export const FirebaseIcon = () => <SvgIcon src="/icons/firebase.svg" alt="Firebase" />
export const FlaskIcon = () => <SvgIcon src="/icons/flask.svg" alt="Flask" />
export const GithubactionsIcon = () => (
  <SvgIcon src="/icons/githubactions.svg" alt="GitHub Actions" />
)
export const GooglecloudIcon = () => <SvgIcon src="/icons/googlecloud.svg" alt="Google Cloud" />
export const GraphqlIcon = () => <SvgIcon src="/icons/graphql.svg" alt="GraphQL" />
export const GsapIcon = () => <SvgIcon src="/icons/gsap.svg" alt="GSAP" />
export const Html5Icon = () => <SvgIcon src="/icons/html5.svg" alt="HTML5" />
export const JavaScriptIcon = () => <SvgIcon src="/icons/javascript.svg" alt="JavaScript (ES6+)" />
export const MongodbIcon = () => <SvgIcon src="/icons/mongodb.svg" alt="MongoDB" />
export const NextjsIcon = () => <SvgIcon src="/icons/nextjs.svg" alt="Next.js" />
export const NodejsIcon = () => <SvgIcon src="/icons/nodejs.svg" alt="Node.js" />
export const PostgresqlIcon = () => <SvgIcon src="/icons/postgresql.svg" alt="PostgreSQL" />
export const PrismaIcon = () => <SvgIcon src="/icons/prisma.svg" alt="Prisma ORM" />
export const PythonIcon = () => <SvgIcon src="/icons/python.svg" alt="Python" />
export const ReactIcon = () => <SvgIcon src="/icons/react.svg" alt="React" />
export const SqlIcon = () => <SvgIcon src="/icons/sql.svg" alt="SQL" />
export const TypeScriptIcon = () => <SvgIcon src="/icons/typescript.svg" alt="TypeScript" />
export const ThreeJSIcon = () => <SvgIcon src="/icons/threejs.svg" alt="Three.js" />

const iconMap: Record<IconName, React.FC> = {
  [IconName.AUTH0]: Auth0Icon,
  [IconName.CSS]: CssIcon,
  [IconName.DOCKER]: DockerIcon,
  [IconName.DRIZZLE]: DrizzleIcon,
  [IconName.FIGMA]: FigmaIcon,
  [IconName.FIREBASE]: FirebaseIcon,
  [IconName.FLASK]: FlaskIcon,
  [IconName.GITHUBACTIONS]: GithubactionsIcon,
  [IconName.GOOGLECLOUD]: GooglecloudIcon,
  [IconName.GRAPHQL]: GraphqlIcon,
  [IconName.GSAP]: GsapIcon,
  [IconName.HTML5]: Html5Icon,
  [IconName.JAVASCRIPT]: JavaScriptIcon,
  [IconName.MONGODB]: MongodbIcon,
  [IconName.NEXTJS]: NextjsIcon,
  [IconName.NODEJS]: NodejsIcon,
  [IconName.POSTGRESQL]: PostgresqlIcon,
  [IconName.PRISMA]: PrismaIcon,
  [IconName.PYTHON]: PythonIcon,
  [IconName.REACT]: ReactIcon,
  [IconName.SQL]: SqlIcon,
  [IconName.TYPESCRIPT]: TypeScriptIcon,
  [IconName.THREE]: ThreeJSIcon,
}

interface DynamicIconProps {
  name: IconName | keyof typeof IconName
  size?: number | string
  className?: string
  [key: string]: unknown
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, size, className, ...props }) => {
  let iconKey: IconName

  if (typeof name === 'string') {
    iconKey = name as IconName

    if (IconName[name as keyof typeof IconName]) {
      iconKey = IconName[name as keyof typeof IconName]
    }
  } else {
    iconKey = name
  }

  const Icon = iconMap[iconKey] || (() => null)

  return <Icon {...props} />
}

export default DynamicIcon
