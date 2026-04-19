import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CTAButton from '../components/CTAButton'
import AvatarGroup from '../components/AvatarGroup'

const CHARACTERS = [
  { src: '/Assets/Jack.png',   alt: 'Jack — The Boss',       label: 'The Boss'       },
  { src: '/Assets/franco.png', alt: 'Franco — The Typewriter', label: 'The Typewriter' },
  { src: '/Assets/Luna.png',   alt: 'Luna — The Painter',    label: 'The Painter'    },
  { src: '/Assets/Leo.png',    alt: 'Leo — The Tech Guy',    label: 'The Tech Guy'   },
]

export default function LandingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="flex items-center justify-between px-24 pt-12 pb-0 relative overflow-hidden" style={{ minHeight: '560px' }}>
        {/* Left: Copy column */}
        <div className="flex flex-col gap-7 max-w-[520px] pt-4 z-10">
          <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase">
            — AI-POWERED WEB SETUP
          </span>

          <h1
            className="font-nerko text-clover-brand text-[55px] leading-[103%]"
            style={{ letterSpacing: '-1.5px' }}
          >
            Stop paying<br />
            €800/yr for<br />
            uoudated websites.
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

        {/* Right: Device mockup */}
        <div className="relative flex-shrink-0">
          <img
            src="/Assets/desktop_phone.png"
            alt="CLOVER website builder on desktop and phone"
            className="w-[500px] object-contain"
          />
        </div>
      </section>

      {/* Characters row — full body illustrated, sitting together */}
      <section className="flex items-end justify-center px-16 pt-0 pb-0 bg-clover-bg overflow-hidden" style={{ height: '320px' }}>
        {CHARACTERS.map((char, i) => (
          <div key={char.alt} className="relative flex-shrink-0" style={{ marginLeft: i === 0 ? 0 : '-24px' }}>
            <img
              src={char.src}
              alt={char.alt}
              className="h-[320px] w-auto object-contain object-bottom"
            />
            <span className="sr-only">{char.label}</span>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  )
}
