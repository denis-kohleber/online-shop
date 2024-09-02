import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './fonts.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { preloadImageLinks } from './utils/preloadImages.ts'

preloadImageLinks();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
