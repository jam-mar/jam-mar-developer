import Image from 'next/image'

interface SvgIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
  width?: number
  height?: number
}

const SvgIcon = ({ src, alt = '', width = 20, height = 20 }: SvgIconProps) => {
  return <Image src={src} alt={alt} width={width} height={height} />
}

export const Auth0Icon = () => <SvgIcon src="/icons/auth0.svg" alt="Auth0/OAuth" />
export const CssIcon = () => <SvgIcon src="/icons/css3.svg" alt="CSS" />
export const DockerIcon = () => <SvgIcon src="/icons/docker.svg" alt="Docker" />
export const FigmaIcon = () => <SvgIcon src="/icons/figma.svg" alt="Figma" />
export const FirebaseIcon = () => <SvgIcon src="/icons/firebase.svg" alt="Firebase" />
export const FlaskIcon = () => <SvgIcon src="/icons/flask.svg" alt="Flask" />
export const GithubactionsIcon = () => (
  <SvgIcon src="/icons/githubactions.svg" alt="GitHub Actions" />
)
export const GooglecloudIcon = () => <SvgIcon src="/icons/googlecloud.svg" alt="Google Cloud" />
export const GraphqlIcon = () => <SvgIcon src="/icons/graphql.svg" alt="GraphQL" />
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

export const DynamicIcon = ({ name }: { name: keyof typeof iconMap; [key: string]: unknown }) => {
  const Icon = iconMap[name] || (() => null)
  return <Icon />
}

export default DynamicIcon
