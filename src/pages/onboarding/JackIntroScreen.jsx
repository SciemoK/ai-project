import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

export default function JackIntroScreen({ onNext }) {
  return (
    <CharacterLayout
      faceSrc={import.meta.env.BASE_URL + "Assets/Jack face.png"}
      faceAlt="Jack — The Boss"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Welcome. I'm Jack — I run CLOVER. Think of me as the person who
          built this team and is now lending it to you. I'll walk you through
          everything personally. Ready to get started?
        </h1>
      }
    >
      <div className="flex items-center gap-8">
        <CTAButton size="large" onClick={() => onNext()}>LOGIN</CTAButton>
        <CTAButton size="large" onClick={() => onNext()}>SIGN UP</CTAButton>
      </div>
    </CharacterLayout>
  )
}
