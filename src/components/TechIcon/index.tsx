import { DynamicIcon, IconName } from '@/components/Icons'
interface TechIconProps {
  iconName: IconName
  name: string
  href: string
}

const TechIcon = ({ iconName, name, href }: TechIconProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center mx-1"
      title={name}
    >
      <div className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
        <DynamicIcon name={iconName} className="w-5 h-5" />
      </div>
      <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
        {name}
      </span>
    </a>
  )
}

export default TechIcon
