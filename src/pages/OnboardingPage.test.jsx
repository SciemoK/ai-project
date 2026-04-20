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

test('starts on step 1 — shows Jack greeting', () => {
  renderPage()
  expect(screen.getByText(/Hey, I'm Jack/i)).toBeInTheDocument()
})

test('clicking SIGNUP advances to step 2', () => {
  renderPage()
  fireEvent.click(screen.getByText('SIGNUP'))
  expect(screen.getByText(/what kind of business/i)).toBeInTheDocument()
})

test('selecting a business type advances to step 3', () => {
  renderPage()
  fireEvent.click(screen.getByText('SIGNUP'))
  fireEvent.click(screen.getByText('Restaurant'))
  expect(screen.getByText(/What's the name/i)).toBeInTheDocument()
})
