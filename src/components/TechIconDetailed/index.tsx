import React from 'react'
import { DynamicIcon } from '@/components/Icons'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TechIconDetailedProps {
  iconName: string
  name: string
  href: string
  className?: string
}

const TechIconDetailed = ({ iconName, name, href, className }: TechIconDetailedProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('no-underline', className)}
    >
      <Card className="bg-muted border-0 hover:bg-muted/80 transition-all duration-300 w-full max-w-16">
        <CardContent className="p-2 flex flex-col items-center justify-center gap-1">
          <div className="p-1 rounded-md bg-background">
            <DynamicIcon name={iconName} className="h-4 w-4" />
          </div>
          <span className="text-[10px] text-center font-medium">{name}</span>
        </CardContent>
      </Card>
    </a>
  )
}

export default TechIconDetailed
