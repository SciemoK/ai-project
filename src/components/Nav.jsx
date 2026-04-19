import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'How it works', to: '/about' },
  { label: 'Pricing',      to: '/pricing' },
  { label: 'Live sites',   to: '/my-sites' },
]

export default function Nav() {
  return (
    <nav
      className="w-full h-14 bg-clover-nav flex items-center px-8 gap-[497px]"
      style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]"
      >
        CLOVER
      </Link>

      {/* Links + Sign In */}
      <div className="flex items-center gap-7">
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="font-grotesk font-medium text-[11.5px] text-clover-navtext hover:text-clover-brand transition-colors"
          >
            {label}
          </Link>
        ))}

        <Link
          to="/onboarding"
          className="font-grotesk font-bold text-[11px] text-clover-nav bg-clover-brand px-[18px] py-2 rounded-[4px] hover:opacity-90 transition-opacity"
        >
          Sign in →
        </Link>
      </div>
    </nav>
  )
}
