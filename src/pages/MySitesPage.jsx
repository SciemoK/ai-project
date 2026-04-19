import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CTAButton from '../components/CTAButton'

export default function MySitesPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col px-12 pt-12 pb-8">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase">
              — DASHBOARD
            </span>
            <h1 className="font-nerko text-clover-dark text-[36px] mt-1">Live Sites</h1>
          </div>
          <Link to="/onboarding">
            <CTAButton size="small">+ New site</CTAButton>
          </Link>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-clover-blob rounded-2xl py-24">
          <div className="w-24 h-24 bg-clover-blob rounded-full flex items-center justify-center">
            <span className="text-4xl">🌐</span>
          </div>

          <div className="text-center">
            <p className="font-nerko text-clover-dark text-[24px] mb-2">
              No sites created yet!
            </p>
            <p className="font-spinnaker text-clover-muted text-[14px]">
              Start your first project now and go live in minutes.
            </p>
          </div>

          <Link to="/onboarding">
            <CTAButton size="small">Start your first project →</CTAButton>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
