import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BusinessNameScreen from './BusinessNameScreen'

function renderScreen(onNext = () => {}) {
  return render(
    <BrowserRouter>
      <BusinessNameScreen onNext={onNext} />
    </BrowserRouter>
  )
}

test('renders Jack question about business name', () => {
  renderScreen()
  expect(screen.getByText(/What's it called/i)).toBeInTheDocument()
})

test('CONTINUE is disabled when name is empty', () => {
  renderScreen()
  expect(screen.getByText('CONTINUE →')).toBeDisabled()
})

test('CONTINUE enables after typing a name', () => {
  renderScreen()
  fireEvent.change(screen.getByPlaceholderText('Business name'), {
    target: { value: 'Bella Vita' },
  })
  expect(screen.getByText('CONTINUE →')).not.toBeDisabled()
})

test('CONTINUE calls onNext with businessName and existingUrl', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.change(screen.getByPlaceholderText('Business name'), {
    target: { value: 'Bella Vita' },
  })
  fireEvent.change(screen.getByPlaceholderText('https://... (optional)'), {
    target: { value: 'https://bellavita.com' },
  })
  fireEvent.click(screen.getByText('CONTINUE →'))
  expect(onNext).toHaveBeenCalledWith({
    businessName: 'Bella Vita',
    existingUrl: 'https://bellavita.com',
  })
})
