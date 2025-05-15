import { DynamicIcon, IconName } from '@/components/Icons'

interface TechIconProps {
  iconName: IconName
  name?: string
  href?: string
}

const TechIcon = ({ iconName, name, href }: TechIconProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={name}>
      <DynamicIcon name={iconName} />
      <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
        {name}
      </span>
    </a>
  )
}

export default TechIcon
