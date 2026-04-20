import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

const BUSINESS_ICONS = {
  restaurant: '🍽️', hotel: '🏨', barbershop: '✂️', mechanic: '🔧', other: '➕',
}
const LANG_FLAGS = {
  en: '🇬🇧', it: '🇮🇹', fr: '🇫🇷', es: '🇪🇸', other: '🌐',
}
const MENU_LABELS = {
  hamburger: '☰ Hamburger', topbar: '≡ Top bar', sidebar: '⋮ Sidebar',
}
const PALETTE_LABELS = {
  warm: 'Warm', ocean: 'Ocean', forest: 'Forest', earth: 'Earth',
}

export default function LeoScreen({ data, onNext }) {
  const servicesExcerpt = data.services
    ? data.services.slice(0, 60) + (data.services.length > 60 ? '...' : '')
    : 'No services listed'

  return (
    <CharacterLayout
      faceSrc={import.meta.env.BASE_URL + "Assets/Leo face.png"}
      faceAlt="Leo — The Tech Guy"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Leo. I build things. Here's everything we've got — looking solid to me.
        </h1>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[560px]">
        <div className="w-full bg-clover-nav rounded-[16px] border border-clover-muted/20 px-8 py-6 font-spinnaker text-clover-text text-[15px] space-y-2">
          <div>
            {BUSINESS_ICONS[data.businessType]}{' '}
            <strong>{data.businessName}</strong>
            {data.existingUrl && (
              <span className="text-clover-muted ml-2 text-[13px]">{data.existingUrl}</span>
            )}
          </div>
          <div>
            {LANG_FLAGS[data.language]} {data.language} · {servicesExcerpt}
          </div>
          <div>
            {MENU_LABELS[data.menuBehavior]}{' '}
            {data.colorPalette ? `· ${PALETTE_LABELS[data.colorPalette]} palette` : ''}
          </div>
          {data.referenceImages.length > 0 && (
            <div>📁 {data.referenceImages.length} reference image(s)</div>
          )}
        </div>

        <CTAButton size="large" onClick={() => onNext()}>
          BUILD MY SITE 🚀
        </CTAButton>
      </div>
    </CharacterLayout>
  )
}
