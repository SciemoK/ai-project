import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BusinessTypeScreen from './BusinessTypeScreen'

function renderScreen(onNext = () => {}) {
  return render(
    <BrowserRouter>
      <BusinessTypeScreen onNext={onNext} />
    </BrowserRouter>
  )
}

test('renders Jack question', () => {
  renderScreen()
  expect(screen.getByText(/what kind of business/i)).toBeInTheDocument()
})

test('renders all 5 business type options', () => {
  renderScreen()
  expect(screen.getByText('Restaurant')).toBeInTheDocument()
  expect(screen.getByText('Hotel')).toBeInTheDocument()
  expect(screen.getByText('Barbershop')).toBeInTheDocument()
  expect(screen.getByText('Mechanic')).toBeInTheDocument()
  expect(screen.getByText('Other')).toBeInTheDocument()
})

test('clicking a card calls onNext with businessType', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.click(screen.getByText('Restaurant'))
  expect(onNext).toHaveBeenCalledWith({ businessType: 'restaurant' })
})

test('clicking Hotel calls onNext with hotel', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.click(screen.getByText('Hotel'))
  expect(onNext).toHaveBeenCalledWith({ businessType: 'hotel' })
})
