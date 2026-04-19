import { Link } from 'react-router-dom'
import CTAButton from '../components/CTAButton'

export default function OnboardingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col relative">
      {/* Logo top-left */}
      <div className="absolute top-8 left-10">
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-14 px-16">

        {/* Chat row: Jack face left + speech bubble right */}
        <div className="flex items-center gap-10 w-full max-w-[1000px]">

          {/* Jack face portrait with blob */}
          <div className="relative flex-shrink-0 w-[280px] h-[280px]">
            <div className="absolute inset-0 bg-clover-blob rounded-full opacity-70 scale-110" />
            <img
              src="/Assets/Jack face.png"
              alt="Jack — The Boss"
              className="relative z-10 w-[280px] h-[280px] object-cover object-top rounded-full"
            />
          </div>

          {/* Speech bubble */}
          <div className="relative bg-clover-blob rounded-[20px] px-12 py-10 flex-1">
            {/* Triangle tail pointing left toward Jack */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: '-24px',
                width: 0,
                height: 0,
                borderTop: '14px solid transparent',
                borderBottom: '14px solid transparent',
                borderRight: '24px solid #F5DBC0',
              }}
            />
            <h1
              className="font-nerko text-clover-text text-[52px] leading-[105%]"
              style={{ letterSpacing: '-1.5px' }}
            >
              Hey there I'm Jack...<br />
              First of all, it's your first time?
            </h1>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-8">
          <CTAButton size="large">LOGIN</CTAButton>
          <CTAButton size="large">SIGNUP</CTAButton>
        </div>
      </div>
    </div>
  )
}
