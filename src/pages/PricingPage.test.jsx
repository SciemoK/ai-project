import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PricingPage from './PricingPage'

test('renders all three plan names', () => {
  render(<BrowserRouter><PricingPage /></BrowserRouter>)
  expect(screen.getByText('Starter')).toBeInTheDocument()
  expect(screen.getByText('Pro')).toBeInTheDocument()
  expect(screen.getByText('Enterprise')).toBeInTheDocument()
})

test('all prices show Coming Soon', () => {
  render(<BrowserRouter><PricingPage /></BrowserRouter>)
  const badges = screen.getAllByText('Coming Soon')
  expect(badges.length).toBeGreaterThanOrEqual(3)
})
