import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FrancoScreen from './FrancoScreen'

function renderScreen(onNext = () => {}) {
  return render(
    <BrowserRouter>
      <FrancoScreen onNext={onNext} />
    </BrowserRouter>
  )
}

test('renders Franco intro text', () => {
  renderScreen()
  expect(screen.getByText(/Bad copy kills/i)).toBeInTheDocument()
})

test('renders language options', () => {
  renderScreen()
  expect(screen.getByText('English')).toBeInTheDocument()
  expect(screen.getByText('Italian')).toBeInTheDocument()
  expect(screen.getByText('French')).toBeInTheDocument()
})

test('CONTINUE is disabled before language selected', () => {
  renderScreen()
  expect(screen.getByText('CONTINUE →')).toBeDisabled()
})

test('services textarea appears after language selected', () => {
  renderScreen()
  expect(screen.queryByPlaceholderText(/Pizza Margherita/i)).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('English'))
  expect(screen.getByPlaceholderText(/Pizza Margherita/i)).toBeInTheDocument()
})

test('CONTINUE calls onNext with language and services', () => {
  const onNext = vi.fn()
  renderScreen(onNext)
  fireEvent.click(screen.getByText('Italian'))
  fireEvent.change(screen.getByPlaceholderText(/Pizza Margherita/i), {
    target: { value: 'Pizza, Pasta' },
  })
  fireEvent.click(screen.getByText('CONTINUE →'))
  expect(onNext).toHaveBeenCalledWith({ language: 'it', services: 'Pizza, Pasta' })
})
