import { useState } from 'react'
import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

const MENU_OPTIONS = [
  { id: 'hamburger', icon: '☰', label: 'Hamburger' },
  { id: 'topbar',    icon: '≡', label: 'Top bar' },
  { id: 'sidebar',   icon: '⋮', label: 'Sidebar' },
]

const PALETTES = [
  { id: 'warm',   label: 'Warm',   colors: ['#A75716', '#FAF7F1'] },
  { id: 'ocean',  label: 'Ocean',  colors: ['#4A7C8E', '#E8F4F8'] },
  { id: 'forest', label: 'Forest', colors: ['#2D6A4F', '#F0F7F4'] },
  { id: 'earth',  label: 'Earth',  colors: ['#5C4033', '#F5EDE8'] },
]

export default function LunaScreen({ onNext }) {
  const [menuBehavior, setMenuBehavior] = useState(null)
  const [colorPalette, setColorPalette] = useState(null)
  const [referenceImages, setReferenceImages] = useState([])
  const [showImages, setShowImages] = useState(false)

  function handlePalettePick(id) {
    setColorPalette(id)
    setShowImages(true)
  }

  return (
    <CharacterLayout
      faceSrc={import.meta.env.BASE_URL + "Assets/Luna face.png"}
      faceAlt="Luna — The Painter"
      bubbleContent={
        <div>
          <h1
            className="font-nerko text-clover-text text-[36px] leading-[110%]"
            style={{ letterSpacing: '-1px' }}
          >
            Luna. I make sure this looks stunning — and I take that seriously.
            A few quick choices and I'll handle the rest. How should your menu work?
          </h1>

          <div className="flex flex-wrap gap-2 mt-4">
            {MENU_OPTIONS.map(o => (
              <button
                key={o.id}
                onClick={() => setMenuBehavior(o.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[8px] font-spinnaker text-[14px] border transition-colors ${
                  menuBehavior === o.id
                    ? 'bg-clover-brand text-clover-bg border-clover-brand'
                    : 'bg-clover-bg text-clover-text border-clover-muted/40 hover:border-clover-brand'
                }`}
              >
                <span>{o.icon}</span> {o.label}
              </button>
            ))}
          </div>

          {menuBehavior && (
            <div className="mt-6">
              <p
                className="font-nerko text-clover-text text-[28px] leading-[115%]"
                style={{ letterSpacing: '-0.5px' }}
              >
                Love it. Now pick a color vibe — you can always change this later.
              </p>
              <div className="flex gap-4 mt-4 flex-wrap">
                {PALETTES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handlePalettePick(p.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-[8px] border-2 transition-colors ${
                      colorPalette === p.id ? 'border-clover-dark' : 'border-transparent hover:border-clover-muted/40'
                    }`}
                  >
                    <div className="flex gap-1">
                      {p.colors.map((c, i) => (
                        <div
                          key={i}
                          style={{ background: c }}
                          className="w-7 h-7 rounded-full border border-black/10"
                        />
                      ))}
                    </div>
                    <span className="font-spinnaker text-[12px] text-clover-muted">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showImages && (
            <div className="mt-6">
              <p
                className="font-nerko text-clover-text text-[28px] leading-[115%]"
                style={{ letterSpacing: '-0.5px' }}
              >
                Last one — got any inspiration images? Drop them here, or just skip.
              </p>
              <label className="mt-3 flex items-center justify-center border-2 border-dashed border-clover-muted/40 rounded-[12px] p-6 cursor-pointer hover:border-clover-brand transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={e => setReferenceImages(Array.from(e.target.files))}
                  className="hidden"
                />
                <span className="font-spinnaker text-clover-muted text-[14px]">
                  {referenceImages.length > 0
                    ? `${referenceImages.length} image(s) selected`
                    : '📁 Click to upload'}
                </span>
              </label>
            </div>
          )}
        </div>
      }
    >
      <CTAButton
        size="small"
        onClick={() => onNext({ menuBehavior, colorPalette, referenceImages })}
        disabled={!menuBehavior}
      >
        CONTINUE →
      </CTAButton>
    </CharacterLayout>
  )
}
