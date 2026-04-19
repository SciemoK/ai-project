import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

export default function JackIntroScreen({ onNext }) {
  return (
    <CharacterLayout
      faceSrc="/Assets/Jack face.png"
      faceAlt="Jack — The Boss"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Hey, I'm Jack — think of me as your project manager. Before we build
          anything... is this your first time here?
        </h1>
      }
    >
      <div className="flex items-center gap-8">
        <CTAButton size="large" onClick={() => onNext()}>LOGIN</CTAButton>
        <CTAButton size="large" onClick={() => onNext()}>SIGNUP</CTAButton>
      </div>
    </CharacterLayout>
  )
}
