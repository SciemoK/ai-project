import { Link } from 'react-router-dom'

export default function CharacterLayout({ faceSrc, faceAlt, bubbleContent, children }) {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col relative">
      {/* CLOVER logo */}
      <div className="absolute top-8 left-10">
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-16">
        {/* Chat row: face left + bubble right */}
        <div className="flex items-center gap-10 w-full max-w-[1000px]">
          {/* Face + peach blob */}
          <div className="relative flex-shrink-0 w-[280px] h-[280px]">
            <div className="absolute inset-0 bg-clover-blob rounded-full opacity-70 scale-110" />
            <img
              src={faceSrc}
              alt={faceAlt}
              className="relative z-10 w-[280px] h-[280px] object-contain"
            />
          </div>

          {/* Speech bubble */}
          <div className="relative bg-clover-blob rounded-[20px] px-12 py-10 flex-1">
            {/* Triangle tail pointing left toward face */}
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
            {bubbleContent}
          </div>
        </div>

        {/* Action area (buttons, inputs, etc.) */}
        {children}
      </div>
    </div>
  )
}
