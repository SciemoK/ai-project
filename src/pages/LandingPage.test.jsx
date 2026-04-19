import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './LandingPage'

test('renders hero headline', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText(/Stop paying/i)).toBeInTheDocument()
})

test('renders all 4 character images', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByAltText(/Jack — The Boss/i)).toBeInTheDocument()
  expect(screen.getByAltText(/Franco — The Typewriter/i)).toBeInTheDocument()
  expect(screen.getByAltText(/Luna — The Painter/i)).toBeInTheDocument()
  expect(screen.getByAltText(/Leo — The Tech Guy/i)).toBeInTheDocument()
})

test('renders Start building CTA', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText('Start building')).toBeInTheDocument()
})
