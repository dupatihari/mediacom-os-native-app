import { HierarchyCustomNodeType } from '@wppopen/core'
import { useOs } from '@wppopen/react'
import { useLocation } from 'react-router-dom'

import { Section } from 'pages/navigationAndWorkspaces/Section/Section'

export const NavigationAndWorkspacesPage = () => {
  const location = useLocation()
  const { osContext } = useOs()
  const selectedWorkspace = osContext.workspace?.mapping[osContext.workspace?.azId]

  const navigationData = [
    { title: 'OS baseUrl', value: osContext.baseUrl },
    { title: 'Microapp route', value: location.pathname },
  ]

  const workspaceTypeLabel =
    selectedWorkspace?.type === HierarchyCustomNodeType
      ? `Custom (${selectedWorkspace?.customTypeName})`
      : selectedWorkspace?.type

  const workspaceData = [
    { title: 'Selected workspace', value: selectedWorkspace?.name || 'None' },
    {
      title: 'Type',
      value: workspaceTypeLabel || '-',
    },
    { title: 'Workspace azId', value: selectedWorkspace?.azId || '-' },
  ]

  return (
    <>
      <Section title="Navigation" data={navigationData} />
      <Section title="Workspaces" data={workspaceData} />
    </>
  )
}
