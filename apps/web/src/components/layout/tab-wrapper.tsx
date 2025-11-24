import { cn } from '@/lib/utils'
import type React from 'react'

type TabWrapperProps = {
  title: string
  className?: string
  children: React.ReactNode
}

export const TabWrapper: React.FC<TabWrapperProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <div className={cn('bg-muted/30 rounded-md p-4', className)}>
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
