import { useState } from 'react'
import { Link } from 'react-router-dom'
import CharacterStage from './onboarding/CharacterStage'
import ConversationLog from './onboarding/ConversationLog'
import BuildingScreen from './onboarding/BuildingScreen'

/* ── Conversation script ── */
const STEPS = [
  {
    id: 'welcome',
    char: 'jack',
    text: "Welcome. I'm Jack — I run CLOVER. Think of me as the person who built this team and is now lending it to you. I'll walk you through everything personally. Ready?",
    type: 'choice',
    options: ['LOGIN', 'SIGN UP'],
    field: 'auth',
  },
  {
    id: 'biz-type',
    char: 'jack',
    text: "Good. What kind of business are we building for?",
    type: 'grid',
    options: [
      { id: 'restaurant', emoji: '🍽️', label: 'Restaurant' },
      { id: 'hotel',      emoji: '🏨', label: 'Hotel'      },
      { id: 'barbershop', emoji: '✂️', label: 'Barbershop' },
      { id: 'mechanic',   emoji: '🔧', label: 'Mechanic'   },
      { id: 'other',      emoji: '➕', label: 'Other'      },
    ],
    field: 'businessType',
  },
  {
    id: 'biz-name',
    char: 'jack',
    text: "Good choice. What's it called? And if you've already got a site, drop the link.",
    type: 'inputs',
    fields: [
      { key: 'businessName', placeholder: 'Business name',           required: true  },
      { key: 'existingUrl',  placeholder: 'https://... (optional)',  required: false, type: 'url' },
    ],
  },
  {
    id: 'intro-franco',
    char: 'jack',
    text: "Perfect. Now let me introduce you to Franco — he's our content guy. Words are everything on a website, and Franco is the best I've got.",
    type: 'bridge',
    nextChar: 'franco',
  },
  {
    id: 'language',
    char: 'franco',
    text: "Franco. Bad copy kills a great website — so let's get this right. What language should the site be in?",
    type: 'choice',
    options: [
      { id: 'en',    label: 'English', flag: '🇬🇧' },
      { id: 'it',    label: 'Italian', flag: '🇮🇹' },
      { id: 'fr',    label: 'French',  flag: '🇫🇷' },
      { id: 'es',    label: 'Spanish', flag: '🇪🇸' },
      { id: 'other', label: 'Other',   flag: '🌐'  },
    ],
    field: 'language',
  },
  {
    id: 'services',
    char: 'franco',
    text: "Perfect. What are your main services or menu items? Just list them — I'll make them shine.",
    type: 'textarea',
    field: 'services',
    placeholder: 'e.g. Pizza Margherita, Pasta Carbonara...',
  },
  {
    id: 'intro-luna',
    char: 'jack',
    text: "Franco's wrapped up. Now it's time for Luna — she's our designer. Honestly, I don't sign off on anything visual without her.",
    type: 'bridge',
    nextChar: 'luna',
  },
  {
    id: 'menu',
    char: 'luna',
    text: "Luna. I make sure this looks stunning — and I take that seriously. How should your menu work?",
    type: 'choice',
    options: [
      { id: 'hamburger', label: 'Hamburger', icon: '☰' },
      { id: 'topbar',    label: 'Top bar',   icon: '≡' },
      { id: 'sidebar',   label: 'Sidebar',   icon: '⋮' },
    ],
    field: 'menuBehavior',
  },
  {
    id: 'palette',
    char: 'luna',
    text: "Love it. Now pick a color vibe — you can always change this later.",
    type: 'palette',
    options: [
      { id: 'warm',   label: 'Warm',   colors: ['#A75716', '#FAF7F1'] },
      { id: 'ocean',  label: 'Ocean',  colors: ['#4A7C8E', '#E8F4F8'] },
      { id: 'forest', label: 'Forest', colors: ['#2D6A4F', '#F0F7F4'] },
      { id: 'earth',  label: 'Earth',  colors: ['#5C4033', '#F5EDE8'] },
    ],
    field: 'colorPalette',
  },
  {
    id: 'images',
    char: 'luna',
    text: "Last one — got any inspiration images? Drop them here, or skip.",
    type: 'file',
    field: 'referenceImages',
  },
  {
    id: 'intro-leo',
    char: 'jack',
    text: "Looking great. Last person on the team — Leo. He's the one who actually builds it. Doesn't say much, but he ships fast.",
    type: 'bridge',
    nextChar: 'leo',
  },
  {
    id: 'summary',
    char: 'leo',
    text: "Leo. I build things. Here's everything we've got — looking solid to me.",
    type: 'summary',
  },
]

function deriveIntroducedChars(currentStepIndex, answers) {
  const chars = ['jack']
  for (let i = 0; i <= currentStepIndex; i++) {
    const s = STEPS[i]
    if (s.type === 'bridge' && s.nextChar) {
      // Include nextChar only if this bridge step has been passed
      if (i < currentStepIndex || answers[s.id]) chars.push(s.nextChar)
    }
  }
  return [...new Set(chars)]
}

export default function OnboardingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [editingStep, setEditingStep] = useState(null)
  const [building, setBuilding] = useState(false)

  const activeChar = STEPS[currentStepIndex]?.char ?? 'jack'
  const introducedChars = deriveIntroducedChars(currentStepIndex, answers)

  function onAnswer(value) {
    const step = STEPS[currentStepIndex]

    setAnswers(prev => {
      const next = { ...prev }
      if (step.type === 'inputs') {
        Object.assign(next, value)
      } else if (step.type === 'bridge') {
        next[step.id] = true
      } else if (step.field) {
        next[step.field] = value
      }
      return next
    })

    if (step.type === 'summary') {
      setBuilding(true)
      return
    }

    setCurrentStepIndex(prev => prev + 1)
  }

  function onEdit(stepIndex) {
    setEditingStep(stepIndex)
  }

  function onEditSubmit(stepIndex, value) {
    const step = STEPS[stepIndex]
    setAnswers(prev => {
      const next = { ...prev }
      if (step.type === 'inputs') {
        Object.assign(next, value)
      } else if (step.field) {
        next[step.field] = value
      }
      return next
    })
    setEditingStep(null)
  }

  if (building) return <BuildingScreen />

  return (
    <div className="bg-clover-bg h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex-shrink-0 h-14 flex items-center px-10 border-b border-clover-muted/10">
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>
      </div>

      {/* Main: character stage + conversation */}
      <div className="flex-1 flex overflow-hidden">
        <CharacterStage
          activeChar={activeChar}
          introducedChars={introducedChars}
        />
        <ConversationLog
          steps={STEPS}
          currentStepIndex={currentStepIndex}
          answers={answers}
          editingStep={editingStep}
          onAnswer={onAnswer}
          onEdit={onEdit}
          onEditSubmit={onEditSubmit}
        />
      </div>
    </div>
  )
}
