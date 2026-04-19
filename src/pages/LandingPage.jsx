import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CTAButton from '../components/CTAButton'
import AgentCard from '../components/AgentCard'
import AvatarGroup from '../components/AvatarGroup'

const AGENTS = [
  {
    name: 'The Boss',
    tagline: 'Strategy & direction',
    description: 'Greets you, understands your business, and coordinates the whole team.',
    imageSrc: '/Assets/Jack face.png',
    imageAlt: 'Jack — The Boss',
  },
  {
    name: 'The Typewriter',
    tagline: 'Content & copy',
    description: 'Writes every word — menus, descriptions, headlines. Clear and persuasive.',
    imageSrc: '/Assets/Franco face.png',
    imageAlt: 'Franco — The Typewriter',
  },
  {
    name: 'The Painter',
    tagline: 'Design & visuals',
    description: 'Picks layouts, colors, and imagery that make your brand shine.',
    imageSrc: '/Assets/Luna face.png',
    imageAlt: 'Luna — The Painter',
  },
  {
    name: 'The Tech Guy',
    tagline: 'Build & deploy',
    description: 'Handles the code so your site goes live in minutes, not months.',
    imageSrc: '/Assets/Leo face.png',
    imageAlt: 'Leo — The Tech Guy',
  },
]

export default function LandingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="flex-1 flex items-start justify-between px-24 pt-16 pb-8 relative overflow-hidden">
        {/* Left: Copy column */}
        <div className="flex flex-col gap-7 max-w-[520px] pt-8">
          <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase">
            — AI-POWERED WEB SETUP
          </span>

          <h1
            className="font-nerko text-clover-brand text-[55px] leading-[103%]"
            style={{ letterSpacing: '-1.5px' }}
          >
            Stop paying<br />
            €800/yr for<br />
            outdated websites.
          </h1>

          <p className="font-spinnaker text-clover-dark text-[13.5px] leading-relaxed max-w-[420px]">
            Talk to a team of AI characters. Get a live, scannable, editable website —
            in under 5 minutes. You own it. No useless company fees in the middle.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/onboarding">
              <CTAButton size="small">Start building</CTAButton>
            </Link>
            <Link
              to="/chat"
              className="font-spinnaker text-[13.5px] text-[#473E31] hover:text-clover-brand transition-colors"
            >
              ▶ See live demo
            </Link>
          </div>

          <AvatarGroup count="48+" label="Restaurants already live" />
        </div>

        {/* Right: Character illustration */}
        <div className="relative flex-shrink-0">
          <div className="absolute -top-8 -left-8 w-[560px] h-[520px] bg-clover-blob rounded-[40%_60%_55%_45%/50%_40%_60%_50%] opacity-60" />
          <img
            src="/Assets/Jack.png"
            alt="Jack — your AI team leader"
            className="relative z-10 w-[480px] object-contain object-bottom"
            style={{ maxHeight: '580px' }}
          />
        </div>
      </section>

      {/* Agent Cards Row */}
      <section className="flex justify-center gap-16 px-24 py-12 bg-clover-bg">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </section>

      <Footer />
    </div>
  )
}
