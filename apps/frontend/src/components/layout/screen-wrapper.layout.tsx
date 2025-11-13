import type React from 'react'

type ScreenWrapperProps = {
  children: React.ReactNode
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return <main className="space-y-4 px-4 py-2">{children}</main>
}
