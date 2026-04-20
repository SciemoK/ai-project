import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CTAButton from '../../components/CTAButton'

const AGENTS = [
  { src: import.meta.env.BASE_URL + 'Assets/Jack face.png',   alt: 'Jack' },
  { src: import.meta.env.BASE_URL + 'Assets/Franco face.png', alt: 'Franco' },
  { src: import.meta.env.BASE_URL + 'Assets/Luna face.png',   alt: 'Luna' },
  { src: import.meta.env.BASE_URL + 'Assets/Leo face.png',    alt: 'Leo' },
]

const DURATION_MS = 4000

export default function BuildingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / DURATION_MS) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        setDone(true)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-clover-bg min-h-screen flex flex-col relative">
      <div className="absolute top-8 left-10">
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-16 gap-12">
        <div className="flex flex-col gap-4 flex-shrink-0">
          {AGENTS.map(a => (
            <div key={a.alt} className="relative w-[52px] h-[52px]">
              <div className="absolute inset-0 bg-clover-blob rounded-full opacity-80" />
              <img
                src={a.src}
                alt={a.alt}
                className="relative z-10 w-[52px] h-[52px] rounded-full object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 flex-1 max-w-[600px]">
          <div className="relative w-full">
            <img
              src={import.meta.env.BASE_URL + "Assets/desktop_phone.png"}
              alt="Site preview"
              className="w-full object-contain"
            />
            {!done && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-[12px]" />
            )}
          </div>

          <div className="w-full">
            <div className="bg-clover-muted/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-clover-brand h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-spinnaker text-clover-muted text-[16px] text-center mt-3">
              {done ? 'Done! 🎉' : 'Your site is being built...'}
            </p>
          </div>

          {done && (
            <CTAButton size="small" onClick={() => window.open('https://www.youtube.com/shorts/_6HzLIJPH2A', '_blank')}>
              SEE MY SITE →
            </CTAButton>
          )}
        </div>
      </div>
    </div>
  )
}
