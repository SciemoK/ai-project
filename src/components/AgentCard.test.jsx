import { render, screen } from '@testing-library/react'
import AgentCard from './AgentCard'

test('renders agent name and tagline', () => {
  render(
    <AgentCard
      name="The Boss"
      tagline="Strategy & direction"
      imageSrc="/Assets/Jack face.png"
      imageAlt="Jack"
    />
  )
  expect(screen.getByText('The Boss')).toBeInTheDocument()
  expect(screen.getByText('Strategy & direction')).toBeInTheDocument()
})

test('renders description when provided', () => {
  render(
    <AgentCard
      name="The Boss"
      tagline="Strategy & direction"
      description="Provides strategic oversight"
      imageSrc="/Assets/Jack face.png"
      imageAlt="Jack"
    />
  )
  expect(screen.getByText('Provides strategic oversight')).toBeInTheDocument()
})
