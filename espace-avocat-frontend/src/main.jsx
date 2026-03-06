import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'        // ← cette ligne doit exister !
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)