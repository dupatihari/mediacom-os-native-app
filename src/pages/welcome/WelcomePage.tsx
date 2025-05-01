import {
  WppActionButton,
  WppCard,
  WppIconArrow,
  WppIconCodeView,
  WppIconTune,
  WppTypography,
} from '@wppopen/components-library-react'
import { useOs } from '@wppopen/react'

import styles from 'pages/welcome/WelcomePage.module.scss'

export const WelcomePage = () => {
  const { osContext, osApi } = useOs()
  const { firstname, lastname, country, agency, email, id } = osContext.userDetails

  const cardsData = [
    {
      title: 'Build Your App',
      description: 'Use micro-frontend approach to create your app',
      linkTitle: 'Documentation',
      linkUrl: 'https://developers.os.wpp.com/docs/developer-guide/quickstart/start-with-react',
      icon: <WppIconCodeView color="var(--wpp-brand-color)" />,
    },
    {
      title: 'UI Components',
      description: 'Use ready-made design components in the app',
      linkTitle: 'View Components',
      linkUrl: 'https://components.os.wpp.com/?path=/story/guidelines-welcome--page',
      icon: <WppIconTune color="var(--wpp-brand-color)" />,
    },
  ]

  const userData = [
    { title: 'User name', value: [firstname, lastname].filter(Boolean).join(' ') || '-' },
    { title: 'Email', value: email || '-' },
    { title: 'Agency', value: agency || '-' },
    { title: 'Country', value: country || '-' },
    { title: 'ID', value: id || '-' },
  ]

  return (
    <>
      <div className={styles.intro}>
        <WppTypography type="2xl-heading" tag="h3" className={styles.introTitle}>
          Welcome to the App Boilerplate
        </WppTypography>
        <WppTypography type="m-body" tag="p">
          Create your own app for WPP Open Platform
        </WppTypography>
      </div>

      <div className={styles.cards}>
        {cardsData.map(card => (
          <WppCard className={styles.card} key={card.title}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <WppTypography className={styles.cardTitle} type="l-strong" tag="h4">
              {card.title}
            </WppTypography>
            <WppTypography className={styles.cardDescription} type="s-body" tag="span">
              {card.description}
            </WppTypography>
            <a className={styles.cardLink} href={card.linkUrl} target="_blank" rel="noreferrer">
              <WppActionButton>
                {card.linkTitle}
                <WppIconArrow slot="icon-end" />
              </WppActionButton>
            </a>
          </WppCard>
        ))}
      </div>

      <WppCard className={styles.sectionUserDetails}>
        <div className={styles.userDetails}>
          {userData.map(({ title, value }) => (
            <div key={title} className={styles.userItem}>
              <WppTypography className={styles.userDetailsTitle} type="xs-body">
                {title}
              </WppTypography>
              <WppTypography className={styles.ellipsis} type="s-body">
                {value}
              </WppTypography>
            </div>
          ))}
        </div>
        <WppActionButton onClick={() => navigator.clipboard.writeText(osApi.getAccessToken())}>
          Copy auth token
        </WppActionButton>
      </WppCard>
    </>
  )
}
