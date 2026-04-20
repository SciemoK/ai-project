import CTAButton from '../../components/CTAButton'
import CharacterLayout from './CharacterLayout'

export default function JackToFrancoScreen({ onNext }) {
  return (
    <CharacterLayout
      faceSrc={import.meta.env.BASE_URL + "Assets/Jack face.png"}
      faceAlt="Jack — The Boss"
      bubbleContent={
        <h1
          className="font-nerko text-clover-text text-[36px] leading-[110%]"
          style={{ letterSpacing: '-1px' }}
        >
          Perfect. Now let me introduce you to Franco — he's our content guy.
          Words are everything on a website, and Franco is the best I've got.
          Give him two minutes.
        </h1>
      }
    >
      <CTAButton size="small" onClick={() => onNext()}>
        Meet Franco →
      </CTAButton>
    </CharacterLayout>
  )
}
