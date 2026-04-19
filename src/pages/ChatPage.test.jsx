import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ChatPage from './ChatPage'

test('renders Introducing Your Team heading', () => {
  render(<BrowserRouter><ChatPage /></BrowserRouter>)
  expect(screen.getByText(/Introducing Your Team/i)).toBeInTheDocument()
})

test('renders The Boss agent name', () => {
  render(<BrowserRouter><ChatPage /></BrowserRouter>)
  const bosses = screen.getAllByText('The Boss')
  expect(bosses.length).toBeGreaterThanOrEqual(1)
})

test('renders chat welcome message', () => {
  render(<BrowserRouter><ChatPage /></BrowserRouter>)
  expect(screen.getByText(/Tell me about your business/i)).toBeInTheDocument()
})
