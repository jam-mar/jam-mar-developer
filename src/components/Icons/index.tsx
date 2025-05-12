// src/components/icons/index.js
import Image from 'next/image'

/**
 * Simple SVG icon importer for Next.js
 *
 * This file imports SVG files from the public directory and
 * exports them as Next.js Image components.
 *
 * Usage:
 * 1. Place your SVG files in the public/icons/ directory
 * 2. Import the icon components where needed
 * 3. Use them like: <TypeScriptIcon className="icon" width={20} height={20} />
 */

// Base SVG component - uses Next.js Image
const SvgIcon = ({ src, alt = '', width = 20, height = 20, ...props }) => {
  return <Image src={src} alt={alt} width={width} height={height} {...props} />
}
// Export icon components with appropriate paths
export const Auth0Icon = (props) => <SvgIcon src="/icons/auth0.svg" alt="Auth0/OAuth" {...props} />
export const CssIcon = (props) => <SvgIcon src="/icons/css3.svg" alt="CSS" {...props} />
export const DockerIcon = (props) => <SvgIcon src="/icons/docker.svg" alt="Docker" {...props} />
export const FigmaIcon = (props) => <SvgIcon src="/icons/figma.svg" alt="Figma" {...props} />
export const FirebaseIcon = (props) => (
  <SvgIcon src="/icons/firebase.svg" alt="Firebase" {...props} />
)
export const FlaskIcon = (props) => <SvgIcon src="/icons/flask.svg" alt="Flask" {...props} />
export const GithubactionsIcon = (props) => (
  <SvgIcon src="/icons/githubactions.svg" alt="GitHub Actions" {...props} />
)
export const GooglecloudIcon = (props) => (
  <SvgIcon src="/icons/googlecloud.svg" alt="Google Cloud" {...props} />
)
export const GraphqlIcon = (props) => <SvgIcon src="/icons/graphql.svg" alt="GraphQL" {...props} />
export const GsapIcon = (props) => <SvgIcon src="/icons/gsap.svg" alt="GSAP" {...props} />
export const Html5Icon = (props) => <SvgIcon src="/icons/html5.svg" alt="HTML5" {...props} />
export const JavaScriptIcon = (props) => (
  <SvgIcon src="/icons/javascript.svg" alt="JavaScript (ES6+)" {...props} />
)
export const MongodbIcon = (props) => <SvgIcon src="/icons/mongodb.svg" alt="MongoDB" {...props} />
export const NextjsIcon = (props) => <SvgIcon src="/icons/nextjs.svg" alt="Next.js" {...props} />
export const NodejsIcon = (props) => <SvgIcon src="/icons/nodejs.svg" alt="Node.js" {...props} />
export const PostgresqlIcon = (props) => (
  <SvgIcon src="/icons/postgresql.svg" alt="PostgreSQL" {...props} />
)
export const PrismaIcon = (props) => <SvgIcon src="/icons/prisma.svg" alt="Prisma ORM" {...props} />
export const PythonIcon = (props) => <SvgIcon src="/icons/python.svg" alt="Python" {...props} />
export const ReactIcon = (props) => <SvgIcon src="/icons/react.svg" alt="React" {...props} />
export const SqlIcon = (props) => <SvgIcon src="/icons/sql.svg" alt="SQL" {...props} />
export const TypeScriptIcon = (props) => (
  <SvgIcon src="/icons/typescript.svg" alt="TypeScript" {...props} />
)
export const ThreeJSIcon = (props) => <SvgIcon src="/icons/threejs.svg" alt="Three.js" {...props} />

// Create a mapping for dynamic icon lookup by name
const iconMap = {
  auth0: Auth0Icon,
  css: CssIcon,
  docker: DockerIcon,
  figma: FigmaIcon,
  firebase: FirebaseIcon,
  flask: FlaskIcon,
  githubactions: GithubactionsIcon,
  googlecloud: GooglecloudIcon,
  graphql: GraphqlIcon,
  gsap: GsapIcon,
  html5: Html5Icon,
  javascript: JavaScriptIcon,
  mongodb: MongodbIcon,
  nextjs: NextjsIcon,
  nodejs: NodejsIcon,
  postgresql: PostgresqlIcon,
  prisma: PrismaIcon,
  python: PythonIcon,
  react: ReactIcon,
  sql: SqlIcon,
  typescript: TypeScriptIcon,
  three: ThreeJSIcon,
}

// Dynamic icon component that renders an icon by name
export const DynamicIcon = ({ name, ...props }) => {
  const Icon = iconMap[name] || (() => null)
  return <Icon {...props} />
}

export default DynamicIcon
