import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ExperienceCardProps {
  children: React.ReactNode
  logoSlot?: React.ReactNode
  techSlot?: React.ReactNode
  workInProgress?: boolean
  onClick?: () => void
  onMouseOver?: () => void
  onMouseLeave?: () => void
  className?: string
}

const ExperienceCard = ({
  children,
  logoSlot,
  techSlot,
  onClick,
  onMouseOver,
  onMouseLeave,
  className,
}: ExperienceCardProps) => {
  return (
    <Card
      className={cn(
        'w-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md relative',
        className,
      )}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {logoSlot && (
        <div className="absolute top-3 right-3 flex-shrink-0 size-14 rounded-md p-2 bg-muted flex items-center justify-center">
          {logoSlot}
        </div>
      )}
      <CardContent className="p-3 pt-4 pr-20">{children}</CardContent>
      {techSlot && (
        <CardFooter className="px-3 py-2 flex flex-wrap gap-1 border-t bg-muted/30">
          {techSlot}
        </CardFooter>
      )}
    </Card>
  )
}

export default ExperienceCard
