import React from 'react'
import { Badge } from '@/components/ui/badge'

interface WorkData {
  company: string
  position: string
  period: string
  shortDescription: string
  isCurrent?: boolean
}

interface WorkCardContentProps {
  work: WorkData
}

const WorkCardContent = ({ work }: WorkCardContentProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{work.company}</h2>
        {work.isCurrent && (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 h-5 px-1.5 text-xs py-0"
          >
            Current
          </Badge>
        )}
      </div>
      <p className="text-base font-medium text-primary">{work.position}</p>
      <p className="text-xs text-muted-foreground italic">{work.period}</p>
      <p className="text-xs pt-1">{work.shortDescription}</p>
    </div>
  )
}

export default WorkCardContent
