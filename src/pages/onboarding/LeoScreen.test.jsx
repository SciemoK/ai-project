import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LeoScreen from './LeoScreen'

const sampleData = {
  businessType: 'restaurant',
  businessName: 'Bella Vita',
  existingUrl: 'https://bellavita.com',
  language: 'it',
  services: 'Pizza, Pasta, Tiramisu',
  menuBehavior: 'hamburger',
  colorPalette: 'warm',
  referenceImages: [],
}

function renderScreen(onNext = () => {}) {
  return render(
    <BrowserRouter>
      <LeoScreen data={sampleData} onNext={onNext} />
    </BrowserRouter>
  )
}

test('renders Leo intro text', () => {
  renderScreen()
  expect(screen.getByText(/Leo\. I build things/i)).toBeInTheDocument()
})

test('renders business name in summary', () => {
  renderScreen()
  expect(screen.getByText(/Bella Vita/)).toBeInTheDocument()
})

test('renders BUILD MY SITE button', () => {
  renderScreen()
  expect(screen.getByText(/BUILD MY SITE/i)).toBeInTheDocument()
})

test('BUILD MY SITE calls onNext', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.click(screen.getByText(/BUILD MY SITE/i))
  expect(onNext).toHaveBeenCalledTimes(1)
})
