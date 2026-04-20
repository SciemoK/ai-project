import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import JackIntroScreen from './JackIntroScreen'

function renderScreen(onNext = () => {}) {
  return render(
    <BrowserRouter>
      <JackIntroScreen onNext={onNext} />
    </BrowserRouter>
  )
}

test('renders Jack greeting text', () => {
  renderScreen()
  expect(screen.getByText(/I'm Jack/i)).toBeInTheDocument()
})

test('renders LOGIN and SIGN UP buttons', () => {
  renderScreen()
  expect(screen.getByText('LOGIN')).toBeInTheDocument()
  expect(screen.getByText('SIGN UP')).toBeInTheDocument()
})

test('SIGN UP calls onNext', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.click(screen.getByText('SIGN UP'))
  expect(onNext).toHaveBeenCalledTimes(1)
})

test('LOGIN calls onNext', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.click(screen.getByText('LOGIN'))
  expect(onNext).toHaveBeenCalledTimes(1)
})

test('Jack face image has no rounded-full class', () => {
  renderScreen()
  const img = screen.getByAltText(/Jack/i)
  expect(img.className).not.toContain('rounded-full')
})
