import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import JackIntroScreen     from './onboarding/JackIntroScreen'
import BusinessTypeScreen  from './onboarding/BusinessTypeScreen'
import BusinessNameScreen  from './onboarding/BusinessNameScreen'
import FrancoScreen        from './onboarding/FrancoScreen'
import LunaScreen          from './onboarding/LunaScreen'
import LeoScreen           from './onboarding/LeoScreen'
import BuildingScreen      from './onboarding/BuildingScreen'

const SCREENS = [
  JackIntroScreen,
  BusinessTypeScreen,
  BusinessNameScreen,
  FrancoScreen,
  LunaScreen,
  LeoScreen,
  BuildingScreen,
]

const slideVariants = {
  enter:  { x: 60,  opacity: 0 },
  center: { x: 0,   opacity: 1 },
  exit:   { x: -60, opacity: 0 },
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    businessType:    null,
    businessName:    '',
    existingUrl:     '',
    language:        'en',
    services:        '',
    menuBehavior:    null,
    colorPalette:    null,
    referenceImages: [],
  })

  function onNext(partialData = {}) {
    setData(prev => ({ ...prev, ...partialData }))
    setStep(prev => prev + 1)
  }

  const Screen = SCREENS[step]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ minHeight: '100vh' }}
      >
        <Screen data={data} onNext={onNext} />
      </motion.div>
    </AnimatePresence>
  )
}
