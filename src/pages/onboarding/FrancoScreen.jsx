import { useState } from 'react'
import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

const LANGUAGES = [
  { code: 'en',    flag: '🇬🇧', label: 'English' },
  { code: 'it',    flag: '🇮🇹', label: 'Italian' },
  { code: 'fr',    flag: '🇫🇷', label: 'French' },
  { code: 'es',    flag: '🇪🇸', label: 'Spanish' },
  { code: 'other', flag: '🌐',  label: 'Other' },
]

export default function FrancoScreen({ onNext }) {
  const [language, setLanguage] = useState(null)
  const [services, setServices] = useState('')

  return (
    <CharacterLayout
      faceSrc={import.meta.env.BASE_URL + "Assets/Franco face.png"}
      faceAlt="Franco — The Typewriter"
      bubbleContent={
        <div>
          <h1
            className="font-nerko text-clover-text text-[36px] leading-[110%]"
            style={{ letterSpacing: '-1px' }}
          >
            Franco. Bad copy kills a great website — so let's get this right
            before we touch anything else. What language should the site be in?
          </h1>

          <div className="flex flex-wrap gap-2 mt-4">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-spinnaker text-[14px] border transition-colors ${
                  language === l.code
                    ? 'bg-clover-brand text-clover-bg border-clover-brand'
                    : 'bg-clover-bg text-clover-text border-clover-muted/40 hover:border-clover-brand'
                }`}
              >
                <span aria-hidden="true">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>

          {language && (
            <div className="mt-6">
              <p
                className="font-nerko text-clover-text text-[28px] leading-[115%]"
                style={{ letterSpacing: '-0.5px' }}
              >
                Perfect. What are your main services or menu items? Just list
                them — I'll make them shine.
              </p>
              <textarea
                value={services}
                onChange={e => setServices(e.target.value)}
                placeholder="e.g. Pizza Margherita, Pasta Carbonara, Tiramisu..."
                rows={3}
                className="mt-3 bg-clover-bg border border-clover-muted/40 rounded-[8px] px-4 py-3 font-spinnaker text-clover-text w-full focus:outline-none focus:border-clover-brand resize-none"
              />
            </div>
          )}
        </div>
      }
    >
      <CTAButton
        size="small"
        onClick={() => onNext({ language, services })}
        disabled={!language}
      >
        CONTINUE →
      </CTAButton>
    </CharacterLayout>
  )
}
