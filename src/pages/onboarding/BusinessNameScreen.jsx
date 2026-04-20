import { useState } from 'react'
import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

export default function BusinessNameScreen({ onNext }) {
  const [businessName, setBusinessName] = useState('')
  const [existingUrl, setExistingUrl] = useState('')

  const canContinue = businessName.trim().length > 0

  return (
    <CharacterLayout
      faceSrc="/Assets/Jack face.png"
      faceAlt="Jack — The Boss"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Good choice. What's the name? And if you've got an existing website,
          drop the link — I'll take a look.
        </h1>
      }
    >
      <div className="flex flex-col gap-4 w-full max-w-[480px]">
        <input
          type="text"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          placeholder="Business name"
          className="bg-clover-bg border border-clover-muted/40 rounded-[8px] px-4 py-3 font-spinnaker text-clover-text w-full focus:outline-none focus:border-clover-brand"
        />
        <input
          type="url"
          value={existingUrl}
          onChange={e => setExistingUrl(e.target.value)}
          placeholder="https://... (optional)"
          className="bg-clover-bg border border-clover-muted/40 rounded-[8px] px-4 py-3 font-spinnaker text-clover-text w-full focus:outline-none focus:border-clover-brand"
        />
        <CTAButton
          size="small"
          onClick={() => onNext({ businessName: businessName.trim(), existingUrl })}
          disabled={!canContinue}
        >
          CONTINUE →
        </CTAButton>
      </div>
    </CharacterLayout>
  )
}
