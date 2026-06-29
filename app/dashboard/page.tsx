'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [tenant, setTenant] = useState<any>(null)

  useEffect(() => {
    const t = localStorage.getItem('tenant')
    const token = localStorage.getItem('token')
    if (!token) { router.push('/'); return }
    if (t) setTenant(JSON.parse(t))
  }, [])

  return (
    <div style={{minHeight:'100vh',background:'#030712',color:'white',padding:'2rem'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:'bold',color:'#22c55e'}}>BotZap</h1>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <span style={{color:'#9ca3af'}}>{tenant?.name}</span>
            <button
              onClick={() => { localStorage.clear(); router.push('/') }}
              style={{background:'#1f2937',color:'#9ca3af',border:'1px solid #374151',padding:'0.5rem 1rem',borderRadius:'0.5rem',cursor:'pointer'}}
            >
              Sair
            </button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'2rem'}}>
          <div style={{background:'#111827',border:'1px solid #1f2937',borderRadius:'1rem',padding:'1.5rem'}}>
            <p style={{color:'#9ca3af',fontSize:'0.875rem'}}>Plano atual</p>
            <p style={{fontSize:'1.5rem',fontWeight:'bold',textTransform:'capitalize'}}>{tenant?.plan}</p>
          </div>
          <div style={{background:'#111827',border:'1px solid #1f2937',borderRadius:'1rem',padding:'1.5rem'}}>
            <p style={{color:'#9ca3af',fontSize:'0.875rem'}}>Status</p>
            <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'#22c55e'}}>Ativo</p>
          </div>
          <div style={{background:'#111827',border:'1px solid #1f2937',borderRadius:'1rem',padding:'1.5rem'}}>
            <p style={{color:'#9ca3af',fontSize:'0.875rem'}}>Bot WhatsApp</p>
            <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'#facc15'}}>Configurar</p>
          </div>
        </div>

        <div style={{background:'#111827',border:'1px solid #1f2937',borderRadius:'1rem',padding:'1.5rem'}}>
          <h2 style={{fontSize:'1.125rem',fontWeight:'500',marginBottom:'1rem'}}>Bem-vindo ao painel!</h2>
          <p style={{color:'#9ca3af'}}>Aqui você vai gerenciar seus contatos, disparar campanhas e configurar o bot de WhatsApp.</p>
        </div>
      </div>
    </div>
  )
}