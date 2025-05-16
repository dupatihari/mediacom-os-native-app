import { useOs } from '@wppopen/react'
import React, { useEffect, useState } from 'react'

interface Member {
  name: string
  role: string
}

const ContextInfoPage = () => {
  const [members, setMembers] = useState<Member[]>([])
  const { osContext, osApi } = useOs()
  const context = osContext
  const [client, setClient] = useState<string | undefined>(undefined)
  const [market, setMarket] = useState<string | undefined>(undefined)
  const [tenant, setTenant] = useState<string | undefined>(undefined)
  console.log('osContext:', osContext)

  useEffect(() => {
    if (!context) return

    const rawHierarchy = context?.hierarchy
    const mapping = rawHierarchy?.mapping
    const hierarchyItems = mapping ? Object.values(mapping) : []

    const clientName = hierarchyItems.find(item => item.type === 'CLIENT')?.name || ''
    const marketName = hierarchyItems.find(item => item.type === 'MARKET')?.name || ''
    const tenantName = hierarchyItems.find(item => item.type === 'TENANT')?.name || ''

    console.log('Hierarchy items parsed:', hierarchyItems)
    console.log('Client:', clientName)
    console.log('Market:', marketName)
    console.log('Tenant:', tenantName)

    setTenant(tenantName ?? undefined)
    setClient(clientName ?? undefined)
    setMarket(marketName ?? undefined)

    const baseUrl = 'https://storagemediacom.z6.web.core.windows.net/'
    const isLocal = window.location.hostname === 'local.apps.wpp-stage.os-dev.io'
    const jsonUrl = isLocal ? 'http://localhost:8500/team-members.json' : `${baseUrl}team-members.json`
    fetch(jsonUrl)
      .then(res => res.json())
      .then(data => {
        const match = data.find((entry: any) => entry.client === clientName)

        setMembers(match ? match.members : [])
      })
  }, [context])
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>OS Context Information</h2>

        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ color: '#888' }}>Tenant:</strong>
          <br />
          <span style={{ fontSize: '1.2rem', color: '#222' }}>{tenant || '—'}</span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ color: '#888' }}>Client:</strong>
          <br />
          <span style={{ fontSize: '1.2rem', color: '#222' }}>{client || '—'}</span>
        </div>

        <div>
          <strong style={{ color: '#888' }}>Market:</strong>
          <br />
          <span style={{ fontSize: '1.2rem', color: '#222' }}>{market || '—'}</span>
        </div>
      </div>
    </div>
  )
}

export default ContextInfoPage
