import { NavigationState } from '@wppopen/components-library'
import { WppTopbar, WppTypography } from '@wppopen/components-library-react'
import { useOs } from '@wppopen/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from 'app/header/Header.module.scss'
import logoUrl from 'assets/logo.svg'

const baseNavigation: NavigationState[] = [
  { label: 'Welcome', value: 'welcome' },
  { label: 'Navigation and Workspaces', value: 'navigation-workspaces' },
]

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { osContext } = useOs()

  const navigation = baseNavigation.map(navItem => ({
    ...navItem,
    // Displayed links will have correct full url
    path: `/${osContext.baseUrl}/${navItem.value}`,
  }))
  const topbarValue = navigation
    .map(navItem => navItem.value)
    .find(navItem => location.pathname.startsWith(`/${navItem}`))

  return (
    <WppTopbar
      className={styles.wppTopBar}
      value={topbarValue}
      navigation={navigation}
      onWppChange={e => navigate(`/${e.detail.value}`)}
    >
      <div slot="app" className={styles.wppTopBarLogo}>
        <img src={logoUrl} alt="logo" />
        <WppTypography className={styles.wppTopBarTitle} type="m-strong" tag="h3">
          Your App
        </WppTypography>
      </div>
    </WppTopbar>
  )
}
