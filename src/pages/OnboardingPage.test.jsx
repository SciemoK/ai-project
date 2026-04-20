import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import OnboardingPage from './OnboardingPage'

function renderPage() {
  return render(
    <BrowserRouter>
      <OnboardingPage />
    </BrowserRouter>
  )
}

test('starts with Jack welcome message', () => {
  renderPage()
  expect(screen.getByText(/I'm Jack/i)).toBeInTheDocument()
})

test('shows LOGIN and SIGN UP options', () => {
  renderPage()
  expect(screen.getByText('LOGIN')).toBeInTheDocument()
  expect(screen.getByText('SIGN UP')).toBeInTheDocument()
})

test('answering welcome advances to business type question', () => {
  renderPage()
  fireEvent.click(screen.getByText('SIGN UP'))
  expect(screen.getByText(/what kind of business/i)).toBeInTheDocument()
})

test('selecting business type advances to name question', () => {
  renderPage()
  fireEvent.click(screen.getByText('SIGN UP'))
  fireEvent.click(screen.getByText('Restaurant'))
  expect(screen.getByText(/What's it called/i)).toBeInTheDocument()
})

test('past answers stay visible in the log', () => {
  renderPage()
  fireEvent.click(screen.getByText('SIGN UP'))
  // Jack welcome still visible
  expect(screen.getByText(/I'm Jack/i)).toBeInTheDocument()
  // Business type question now also visible
  expect(screen.getByText(/what kind of business/i)).toBeInTheDocument()
})
