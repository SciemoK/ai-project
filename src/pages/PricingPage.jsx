import Nav from '../components/Nav'
import Footer from '../components/Footer'

const PLANS = [
  {
    name: 'Starter',
    description: 'Perfect for getting your first site live fast.',
    features: ['1 website', 'AI chat setup', 'Mobile-ready', 'QR menu or landing page'],
  },
  {
    name: 'Pro',
    description: 'For businesses that want more control and pages.',
    features: ['3 websites', 'All Starter features', 'Booking integrations', 'Custom domain', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'Multi-location businesses and agencies.',
    features: ['Unlimited websites', 'All Pro features', 'Team access', 'White-label option', 'Dedicated support'],
  },
]

export default function PricingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col items-center px-8 pt-16 pb-12">
        <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase mb-4">
          — PRICING
        </span>
        <h1 className="font-nerko text-clover-brand text-[48px] leading-tight mb-2">
          Simple, transparent pricing.
        </h1>
        <p className="font-spinnaker text-clover-muted text-[14px] mb-12">
          No hidden fees. No surprises. Prices coming soon.
        </p>

        <div className="flex gap-6 items-stretch max-w-[900px] w-full">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex-1 rounded-xl p-8 flex flex-col gap-5 border-2 ${
                plan.highlight
                  ? 'border-clover-brand bg-clover-nav shadow-lg scale-105'
                  : 'border-clover-blob bg-white'
              }`}
            >
              <div>
                <h2 className="font-nerko text-clover-dark text-[26px]">{plan.name}</h2>
                <p className="font-spinnaker text-clover-muted text-[12px] mt-1">
                  {plan.description}
                </p>
              </div>

              {/* Price placeholder */}
              <div className="bg-clover-blob rounded-lg px-4 py-3 text-center">
                <span className="font-grotesk font-bold text-[13px] text-clover-brand tracking-wide">
                  Coming Soon
                </span>
              </div>

              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-grotesk text-[12px] text-clover-navtext">
                    <span className="text-clover-brand mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled
                className="mt-auto bg-clover-blob text-clover-muted font-grotesk font-bold text-[12px] py-3 rounded-lg cursor-not-allowed"
              >
                Notify me
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
