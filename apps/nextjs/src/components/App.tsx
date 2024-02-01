import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import DashboardLayout from '~/components/layouts/dashboard/dashboard.layout'
import {DashboardProvider, type DashboardLink} from '~/components/layouts/dashboard/dashboard.provider'
import { trpc } from '~/utils/trpc'
import { useAuth } from '@clerk/nextjs'
import SignUpPage from '~/pages/sign-up/[[...index]]'
import SignInPage from '~/pages/sign-in/[[...index]]'

export const BIPROXI_COMPANY_ID = "cklcyhie8007404lgz9dahl5l"

export const dashboardLinks: DashboardLink[] = []

export const adminLinks: DashboardLink[] = []

const App: React.FC = () => {
  const { userId } = useAuth()

  const appLinks: DashboardLink[] = [
    ...dashboardLinks,
  ]

  return (
    <BrowserRouter>
      <DashboardProvider>
        <Routes>
          <Route element={<DashboardLayout />}>
            {appLinks.map((item) => (
              <Route path={item.link} key={item.link} element={item.screen} />
            ))}
          </Route>
          <Route path='*' element={<Navigate to={'/sign-in'} />} />
          <Route path='/' element={<Navigate to={'/'} />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
        </Routes>
      </DashboardProvider>
    </BrowserRouter>
  )
}

export default App
