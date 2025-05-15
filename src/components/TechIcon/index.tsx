import React from 'react'
import { DynamicIcon, IconName } from '@/components/Icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface TechIconProps {
  iconName: IconName
  name?: string
  href?: string
  className?: string
}

const TechIcon = ({ iconName, name, href, className }: TechIconProps) => {
  const IconWrapper = ({ children }: { children: React.ReactNode }) => {
    return href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center justify-center size-6 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors',
          className,
        )}
      >
        {children}
      </a>
    ) : (
      <div
        className={cn(
          'inline-flex items-center justify-center size-6 rounded-md bg-muted text-muted-foreground',
          className,
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <IconWrapper>
            <DynamicIcon name={iconName} className="size-4" />
          </IconWrapper>
        </TooltipTrigger>
        {name && (
          <TooltipContent side="bottom" className="py-1 px-2 text-xs">
            <p>{name}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default TechIcon
