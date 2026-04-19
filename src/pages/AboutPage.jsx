import Nav from '../components/Nav'
import Footer from '../components/Footer'

const STATS = [
  { stat: '48+',   label: 'Businesses live'    },
  { stat: '5 min', label: 'Average setup time'  },
  { stat: '€0',    label: 'Agency fees'         },
]

export default function AboutPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col px-8 pt-16 pb-12 max-w-[800px] mx-auto w-full">
        <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase mb-4">
          — OUR STORY
        </span>

        <h1 className="font-nerko text-clover-brand text-[48px] leading-tight mb-8">
          Why we built CLOVER.
        </h1>

        <div className="flex flex-col gap-6 font-spinnaker text-clover-dark text-[15px] leading-relaxed">
          <p>
            Small businesses — restaurants, barbershops, mechanics, hotels — spend thousands every year
            on websites that take months to build, go out of date instantly, and cost €800+ annually in
            maintenance fees. Most don't even know how to update them.
          </p>

          <div className="bg-clover-blob rounded-xl p-6">
            <p className="font-nerko text-clover-brand text-[22px] mb-2">
              There had to be a better way.
            </p>
            <p>
              CLOVER is an all-in-one AI-powered solution: just talk to our team of AI characters,
              and they'll build, write, design, and launch your website — in minutes, not months.
              You own it. You can edit it. No agency in the middle.
            </p>
          </div>

          <p>
            We started with restaurants in mind — menus, booking, hours. But the vision is bigger:
            any small business, anywhere, deserves a professional online presence without the price tag.
          </p>
        </div>

        <div className="flex gap-12 mt-12">
          {STATS.map(({ stat, label }) => (
            <div key={label} className="flex flex-col">
              <span className="font-nerko text-clover-brand text-[36px]">{stat}</span>
              <span className="font-grotesk text-[12px] text-clover-muted">{label}</span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
