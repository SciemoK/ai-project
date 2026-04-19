import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AboutPage from './AboutPage'

test('renders about heading', () => {
  render(<BrowserRouter><AboutPage /></BrowserRouter>)
  expect(screen.getByText(/Why we built CLOVER/i)).toBeInTheDocument()
})

test('mentions AI-powered solution', () => {
  render(<BrowserRouter><AboutPage /></BrowserRouter>)
  expect(screen.getByText(/all-in-one/i)).toBeInTheDocument()
})
