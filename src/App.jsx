import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage    from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage'
import ChatPage       from './pages/ChatPage'
import PricingPage    from './pages/PricingPage'
import AboutPage      from './pages/AboutPage'
import MySitesPage    from './pages/MySitesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/chat"       element={<ChatPage />} />
        <Route path="/pricing"    element={<PricingPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/my-sites"   element={<MySitesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
