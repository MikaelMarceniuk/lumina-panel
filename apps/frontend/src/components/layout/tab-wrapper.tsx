import type React from 'react'

type TabWrapperProps = {
  title: string
  children: React.ReactNode
}

export const TabWrapper: React.FC<TabWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
