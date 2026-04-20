import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

export default function JackToLunaScreen({ onNext }) {
  return (
    <CharacterLayout
      faceSrc={import.meta.env.BASE_URL + "Assets/Jack face.png"}
      faceAlt="Jack — The Boss"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Franco's wrapped up. Now it's time for Luna — she's our designer.
          Honestly, I don't sign off on anything visual without her. Luna,
          step in.
        </h1>
      }
    >
      <CTAButton size="small" onClick={() => onNext()}>
        Meet Luna →
      </CTAButton>
    </CharacterLayout>
  )
}
