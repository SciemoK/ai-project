import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './LandingPage'

test('renders hero headline', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText(/Stop paying/i)).toBeInTheDocument()
})

test('renders all 4 agents', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText('The Boss')).toBeInTheDocument()
  expect(screen.getByText('The Typewriter')).toBeInTheDocument()
  expect(screen.getByText('The Painter')).toBeInTheDocument()
  expect(screen.getByText('The Tech Guy')).toBeInTheDocument()
})

test('renders Start building CTA', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText('Start building')).toBeInTheDocument()
})
