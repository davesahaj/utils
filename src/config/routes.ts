import React from 'react'

import { ROUTES } from '@/constants'
import { Home, PageNotFound } from '@/pages'

export const publicRoutes: {
  path: string
  component: () => React.JSX.Element | null
}[] = [
  {
    path: ROUTES.HOME,
    component: Home,
  },
  {
    path: '',
    component: PageNotFound,
  },
]
