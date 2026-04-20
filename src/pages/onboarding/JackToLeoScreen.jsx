import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

export default function JackToLeoScreen({ onNext }) {
  return (
    <CharacterLayout
      faceSrc={import.meta.env.BASE_URL + "Assets/Jack face.png"}
      faceAlt="Jack — The Boss"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Looking great. Last person on the team — Leo. He's the one who
          actually builds it. Doesn't say much, but he ships fast. Leo, it's
          all yours.
        </h1>
      }
    >
      <CTAButton size="small" onClick={() => onNext()}>
        Meet Leo →
      </CTAButton>
    </CharacterLayout>
  )
}
