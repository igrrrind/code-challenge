import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BalanceProvider } from './context/BalanceContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BalanceProvider>
      <App />
    </BalanceProvider>
  </StrictMode>,
)
