import { Link } from 'react-router-dom'
import CTAButton from '../components/CTAButton'

export default function OnboardingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col items-center justify-center relative">
      {/* Logo top-left */}
      <div className="absolute top-8 left-10">
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>
      </div>

      {/* Card area */}
      <div className="flex flex-col items-center gap-10 text-center">
        {/* Character blob + image */}
        <div className="relative flex items-center justify-center">
          {/* Large peach blob */}
          <div
            className="absolute w-[600px] h-[280px] bg-clover-blob rounded-[40%_60%_55%_45%/50%_40%_60%_50%]"
            style={{ top: '50%', transform: 'translateY(-20%)' }}
          />
          <img
            src="/Assets/Jack.png"
            alt="Jack — The Boss"
            className="relative z-10 w-[220px] object-contain object-bottom"
            style={{ maxHeight: '320px' }}
          />
        </div>

        {/* Greeting text */}
        <h1
          className="font-nerko text-clover-text text-[55px] leading-[103%] max-w-[600px]"
          style={{ letterSpacing: '-1.5px' }}
        >
          Hey there I'm Jack...<br />
          First of all, it's your first time?
        </h1>

        {/* CTA buttons */}
        <div className="flex items-center gap-6">
          <CTAButton size="large">LOGIN</CTAButton>
          <CTAButton size="large">SIGNUP</CTAButton>
        </div>
      </div>
    </div>
  )
}
