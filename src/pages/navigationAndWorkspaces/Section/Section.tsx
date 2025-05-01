import { WppCard, WppTypography } from '@wppopen/components-library-react'
import React from 'react'

import styles from 'pages/navigationAndWorkspaces/Section/Section.module.scss'

export interface Props {
  title: string
  data: {
    title: string
    value: string | null
  }[]
}

export const Section = ({ title, data }: Props) => (
  <WppCard className={styles.section}>
    <WppTypography className={styles.cardTitle} type="l-strong" tag="h4">
      {title}
    </WppTypography>

    {data.map(({ title, value }) => (
      <div key={title} className={styles.infoItem}>
        <WppTypography className={styles.label} type="xs-body">
          {title}
        </WppTypography>
        <WppTypography type="s-body">{value}</WppTypography>
      </div>
    ))}
  </WppCard>
)
