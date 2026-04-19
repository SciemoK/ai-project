const INITIALS = [
  { letter: 'R', color: '#DFDFDF' },
  { letter: 'M', color: '#DFDFDF' },
  { letter: 'A', color: '#A75716' },
]

export default function AvatarGroup({ count, label }) {
  return (
    <div className="flex items-center gap-2">
      {/* Stacked initials */}
      <div className="flex -space-x-2">
        {INITIALS.map(({ letter, color }) => (
          <div
            key={letter}
            className="w-7 h-7 rounded-full border-2 border-clover-bg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="font-grotesk font-bold text-[8px] text-clover-dark">
              {letter}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <span className="font-grotesk font-bold text-[7.5px] text-[#DFDFDF]">{count}</span>
        <span className="font-grotesk font-medium text-[11px] text-clover-muted">{label}</span>
      </div>
    </div>
  )
}
