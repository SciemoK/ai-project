import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LunaScreen from './LunaScreen'

function renderScreen(onNext = () => {}) {
  return render(
    <BrowserRouter>
      <LunaScreen onNext={onNext} />
    </BrowserRouter>
  )
}

test('renders Luna intro text', () => {
  renderScreen()
  expect(screen.getByText(/Luna\. I make sure/i)).toBeInTheDocument()
})

test('renders menu behavior options', () => {
  renderScreen()
  expect(screen.getByText('Hamburger')).toBeInTheDocument()
  expect(screen.getByText('Top bar')).toBeInTheDocument()
  expect(screen.getByText('Sidebar')).toBeInTheDocument()
})

test('CONTINUE is disabled before menu behavior selected', () => {
  renderScreen()
  expect(screen.getByText('CONTINUE →')).toBeDisabled()
})

test('palette options appear after menu behavior selected', () => {
  renderScreen()
  expect(screen.queryByText('Warm')).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('Hamburger'))
  expect(screen.getByText('Warm')).toBeInTheDocument()
  expect(screen.getByText('Ocean')).toBeInTheDocument()
})

test('image upload appears after palette selected', () => {
  renderScreen()
  fireEvent.click(screen.getByText('Hamburger'))
  expect(screen.queryByText(/inspiration images/i)).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('Warm'))
  expect(screen.getByText(/inspiration images/i)).toBeInTheDocument()
})

test('CONTINUE calls onNext with menuBehavior and colorPalette', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.click(screen.getByText('Hamburger'))
  fireEvent.click(screen.getByText('Ocean'))
  fireEvent.click(screen.getByText('CONTINUE →'))
  expect(onNext).toHaveBeenCalledWith(
    expect.objectContaining({ menuBehavior: 'hamburger', colorPalette: 'ocean' })
  )
})
