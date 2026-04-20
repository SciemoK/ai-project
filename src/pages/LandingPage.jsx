import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import CTAButton from '../components/CTAButton'
import AvatarGroup from '../components/AvatarGroup'

// y = vertical offset px (negative = up)
const CHARACTERS = [
  { src: import.meta.env.BASE_URL + 'Assets/Jack.png',   alt: 'Jack — The Boss',         label: 'The Boss',       y: -17 },
  { src: import.meta.env.BASE_URL + 'Assets/franco.png', alt: 'Franco — The Typewriter', label: 'The Typewriter', y: 0  },
  { src: import.meta.env.BASE_URL + 'Assets/Luna.png',   alt: 'Luna — The Painter',      label: 'The Painter',    y: -5 },
  { src: import.meta.env.BASE_URL + 'Assets/Leo.png',    alt: 'Leo — The Tech Guy',      label: 'The Tech Guy',   y: 0  },
]

const CHAR_STRIP_H = 40
const CHAR_IMG_H = 190

export default function LandingPage() {
  return (
    <div className="bg-clover-bg h-screen relative overflow-hidden">
      <Nav />

      {/* Hero — fills gap between nav and character strip */}
      <div
        className="absolute left-0 right-0 flex items-center justify-between px-16"
        style={{ top: 56, bottom: CHAR_STRIP_H }}
      >
        {/* Left: Copy */}
        <div className="flex flex-col gap-5 max-w-[500px] ml-[30px]">
          <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase">
            — AI-POWERED WEB SETUP
          </span>

          <h1
            className="font-nerko text-clover-brand text-[62px] leading-[103%]"
            style={{ letterSpacing: '-1.5px' }}
          >
            Stop paying<br />
            €800/yr for<br />
            outdated websites.
          </h1>

          <p className="font-spinnaker text-clover-dark text-[14px] leading-relaxed max-w-[420px]">
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
        <div className="relative flex-shrink-0 mr-[60px]">
          <img
            src={import.meta.env.BASE_URL + "Assets/desktop_phone.png"}
            alt="CLOVER website builder on desktop and phone"
            className="w-[430px] object-contain"
          />
        </div>
      </div>

      {/* Character strip — absolute bottom, exact height, no overflow tricks */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center px-16 bg-clover-footer"
        style={{ height: CHAR_STRIP_H }}
      >
        {CHARACTERS.map((char, i) => (
          <div
            key={char.alt}
            className="relative flex-shrink-0"
            style={{ marginLeft: i === 0 ? 0 : '-20px' }}
          >
            <img
              src={char.src}
              alt={char.alt}
              className="w-auto object-contain object-bottom"
              style={{ height: CHAR_IMG_H, transform: `translateY(${char.y}px)` }}
            />
            <span className="sr-only">{char.label}</span>
          </div>
        ))}

        {/* Footer tag */}
        <span className="absolute bottom-3 right-8 font-grotesk text-[11px] text-clover-muted tracking-wide">
          © 2026 CLOVER
        </span>
      </div>
    </div>
  )
}
