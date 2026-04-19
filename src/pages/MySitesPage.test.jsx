import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MySitesPage from './MySitesPage'

test('renders Live Sites heading', () => {
  render(<BrowserRouter><MySitesPage /></BrowserRouter>)
  expect(screen.getByRole('heading', { name: /Live Sites/i })).toBeInTheDocument()
})

test('shows empty state message', () => {
  render(<BrowserRouter><MySitesPage /></BrowserRouter>)
  expect(screen.getByText(/No sites created yet/i)).toBeInTheDocument()
})
