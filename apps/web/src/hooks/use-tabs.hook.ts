import { useState, useMemo } from 'react'

export type UseTabsReturn<T extends Record<string, any>, K extends keyof T> = {
  currentTab: TabListItem<T, K>
  currentTabKey: K
  tabList: TabListItem<T, K>[]
  handleTabChange: (key: K) => void
}

export type TabList<T extends Record<string, any>> = {
  key: keyof T
} & T[keyof T]

export type TabListItem<T extends Record<string, any>, K extends keyof T> = {
  key: K
} & T[K]

export function useTabs<T extends Record<string, any>, K extends keyof T>(
  tabs: T,
  initialKey: K
) {
  const tabList = useMemo(
    () =>
      Object.entries(tabs).map(([key, value]) => ({
        key: key as K,
        ...value,
      })) as TabListItem<T, K>[],
    [tabs]
  )

  const [currentTabKey, setCurrentTabKey] = useState<K>(initialKey)

  const currentTab = useMemo(
    () => tabList.find((t) => t.key === currentTabKey)!,
    [tabList, currentTabKey]
  )

  const handleTabChange = (key: K) => setCurrentTabKey(key)

  return {
    currentTab,
    currentTabKey,
    tabList,
    handleTabChange,
  }
}
