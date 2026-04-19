import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import OnboardingPage from './OnboardingPage'

test('renders Jack greeting', () => {
  render(<BrowserRouter><OnboardingPage /></BrowserRouter>)
  expect(screen.getByText(/Hey there I'm Jack/i)).toBeInTheDocument()
})

test('renders LOGIN and SIGNUP buttons', () => {
  render(<BrowserRouter><OnboardingPage /></BrowserRouter>)
  expect(screen.getByText('LOGIN')).toBeInTheDocument()
  expect(screen.getByText('SIGNUP')).toBeInTheDocument()
})
