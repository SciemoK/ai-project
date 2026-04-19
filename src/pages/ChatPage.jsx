import { Link } from 'react-router-dom'

const ALL_AGENTS = [
  { name: 'The Boss',       face: '/Assets/Jack face.png',   active: true  },
  { name: 'The Typewriter', face: '/Assets/Franco face.png', active: false },
  { name: 'The Painter',    face: '/Assets/Luna face.png',   active: false },
  { name: 'The Tech Guy',   face: '/Assets/Leo face.png',    active: false },
]

export default function ChatPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex">
      {/* Left sidebar */}
      <aside
        className="w-[260px] flex-shrink-0 bg-clover-nav border-r-[3px] border-clover-brand flex flex-col pt-8 pb-8 px-6 gap-8"
        style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
      >
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>

        <div className="flex flex-col gap-4 mt-4">
          {ALL_AGENTS.map((agent) => (
            <div
              key={agent.name}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                agent.active ? 'bg-clover-blob' : 'hover:bg-clover-blob/50'
              }`}
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-clover-blob rounded-full" />
                <img
                  src={agent.face}
                  alt={agent.name}
                  className="relative z-10 w-10 h-10 object-cover rounded-full"
                />
              </div>
              <span className="font-grotesk font-medium text-[12px] text-clover-navtext">
                {agent.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            to="/my-sites"
            className="font-grotesk text-[11px] text-clover-muted hover:text-clover-brand transition-colors"
          >
            My Sites →
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className="h-14 bg-clover-nav flex items-center px-8 border-b border-clover-blob"
          style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
        >
          <h2 className="font-nerko text-clover-dark text-[22px]">Introducing Your Team</h2>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex gap-8 p-10 items-start">
          {/* Agent portrait */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 w-[180px] h-[220px] bg-clover-blob rounded-[40%_60%_55%_45%/50%_40%_60%_50%] opacity-70" />
            <img
              src="/Assets/Jack.png"
              alt="Jack — The Boss"
              className="relative z-10 w-[160px] object-contain"
            />
          </div>

          {/* Chat bubble + input */}
          <div className="flex-1 flex flex-col gap-6 max-w-[600px]">
            {/* Boss message bubble */}
            <div className="bg-clover-blob rounded-[5px] rounded-tl-none p-6">
              <div
                data-agent="The Boss"
                className="font-grotesk font-bold text-[11px] text-clover-brand uppercase tracking-wider mb-2 before:content-[attr(data-agent)]"
              />
              <p className="font-spinnaker text-clover-dark text-[15px] leading-relaxed">
                Welcome! Tell me about your business so we can build the perfect website together.
              </p>
            </div>

            {/* Input row */}
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Tell me about your business..."
                className="flex-1 bg-white border border-clover-blob rounded-lg px-4 py-3 font-grotesk text-[13px] text-clover-text placeholder:text-clover-muted focus:outline-none focus:border-clover-brand"
              />
              <button
                type="button"
                className="bg-clover-brand text-[#FAF7F1] font-grotesk font-bold text-[12px] px-5 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send →
              </button>
            </div>

            {/* Smaller agent previews */}
            <div className="flex items-center gap-4 mt-4">
              <span className="font-grotesk text-[11px] text-clover-muted">Also on your team:</span>
              {ALL_AGENTS.filter((a) => !a.active).map((agent) => (
                <div key={agent.name} className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-clover-blob rounded-full opacity-70" />
                  <img
                    src={agent.face}
                    alt={agent.name}
                    className="relative z-10 w-10 h-10 object-cover rounded-full"
                    title={agent.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
