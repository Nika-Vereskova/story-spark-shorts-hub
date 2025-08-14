import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LanguageSwitcher from './components/LanguageSwitcher'

createRoot(document.getElementById("root")!).render(<App />);

const langEl = document.getElementById('lang-switcher')
if (langEl) {
  createRoot(langEl).render(<LanguageSwitcher />)
}
