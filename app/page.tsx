'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: any) {
    e.preventDefault()
    setLoading(true)
    setErro('')

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.erro || 'Erro ao entrar')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('tenant', JSON.stringify(data.tenant))
      router.push('/dashboard')
    } catch (err) {
      setErro('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#030712',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#111827',padding:'2rem',borderRadius:'1rem',width:'100%',maxWidth:'400px',border:'1px solid #1f2937'}}>
        <h1 style={{color:'white',fontSize:'1.5rem',fontWeight:'bold',marginBottom:'0.5rem'}}>BotZap</h1>
        <p style={{color:'#9ca3af',marginBottom:'2rem'}}>Entre na sua conta</p>

        <form onSubmit={handleLogin}>
          <div style={{marginBottom:'1rem'}}>
            <label style={{color:'#9ca3af',fontSize:'0.875rem',display:'block',marginBottom:'0.25rem'}}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              style={{width:'100%',background:'#1f2937',color:'white',borderRadius:'0.5rem',padding:'0.75rem 1rem',border:'1px solid #374151',outline:'none',boxSizing:'border-box'}}
            />
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{color:'#9ca3af',fontSize:'0.875rem',display:'block',marginBottom:'0.25rem'}}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              style={{width:'100%',background:'#1f2937',color:'white',borderRadius:'0.5rem',padding:'0.75rem 1rem',border:'1px solid #374151',outline:'none',boxSizing:'border-box'}}
            />
          </div>

          {erro && <p style={{color:'#f87171',fontSize:'0.875rem',marginBottom:'1rem'}}>{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{width:'100%',background:loading?'#166534':'#22c55e',color:'white',fontWeight:'500',padding:'0.75rem',borderRadius:'0.5rem',border:'none',cursor:'pointer',fontSize:'1rem'}}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{color:'#9ca3af',fontSize:'0.875rem',marginTop:'1.5rem',textAlign:'center'}}>
          Não tem conta? <a href="/registro" style={{color:'#4ade80'}}>Criar conta</a>
        </p>
      </div>
    </div>
  )
}