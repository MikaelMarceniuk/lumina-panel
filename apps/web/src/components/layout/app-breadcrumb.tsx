import { useLocation, Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import React from 'react'

export const AppBreadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const formattedValue = formatBreadcrumb(value)
          const isLast = index === pathnames.length - 1

          return (
            <React.Fragment key={to}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedValue}</BreadcrumbPage>
                ) : (
                  <Link to={to}>{formattedValue}</Link>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const formatBreadcrumb = (value: string) => {
  switch (value) {
    case 'dashboard':
      return 'Dashboard'
    case 'store':
      return 'Lojas'
    case 'product':
      return 'Produtos'
    case 'order':
      return 'Pedidos'
    case 'create':
      return 'Novo'
    default:
      return 'Detalhes'
  }
}
