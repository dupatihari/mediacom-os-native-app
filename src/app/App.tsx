import { useOs } from '@wppopen/react'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import styles from 'app/App.module.scss'
import { Header } from 'app/header/Header'
import { NavigationAndWorkspacesPage } from 'pages/navigationAndWorkspaces/NavigationAndWorkspacesPage'
import { WelcomePage } from 'pages/welcome/WelcomePage'

export function App() {
  /**
   * This hook is provided by the utility package for more convenient work with OS context
   * @return osContext
   * - is a subscribe function that returns you the main context object with MicroAppContext data
   * @return osApi
   * - methods to fire actions on the parent OS level
   *
   * Read more about it in the README file
   */
  const { osContext } = useOs()

  return (
    <BrowserRouter basename={osContext.baseUrl || undefined}>
      <div className={styles.container}>
        <Header />
        <div className={styles.pageContent}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/navigation-workspaces" element={<NavigationAndWorkspacesPage />} />
            <Route index element={<Navigate replace to="/welcome" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
