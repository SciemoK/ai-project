import CharacterLayout from './CharacterLayout'

const TYPES = [
  { id: 'restaurant', emoji: '🍽️', label: 'Restaurant' },
  { id: 'hotel',      emoji: '🏨', label: 'Hotel' },
  { id: 'barbershop', emoji: '✂️', label: 'Barbershop' },
  { id: 'mechanic',   emoji: '🔧', label: 'Mechanic' },
  { id: 'other',      emoji: '➕', label: 'Other' },
]

export default function BusinessTypeScreen({ onNext }) {
  return (
    <CharacterLayout
      faceSrc="/Assets/Jack face.png"
      faceAlt="Jack — The Boss"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Nice. First things first — what kind of business are we building this for?
        </h1>
      }
    >
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => onNext({ businessType: t.id })}
            className="w-[120px] h-[110px] border-2 border-clover-muted/30 rounded-[12px] bg-clover-nav flex flex-col items-center justify-center gap-2 font-grotesk font-bold text-[13px] text-clover-navtext hover:border-clover-brand hover:bg-clover-blob/40 transition-colors"
          >
            <span className="text-[36px]">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>
    </CharacterLayout>
  )
}
