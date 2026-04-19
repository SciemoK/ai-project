import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ChatPage from './ChatPage'

test('renders Introducing Your Team heading', () => {
  render(<BrowserRouter><ChatPage /></BrowserRouter>)
  expect(screen.getByText(/Introducing Your Team/i)).toBeInTheDocument()
})

test('renders The Boss agent name', () => {
  render(<BrowserRouter><ChatPage /></BrowserRouter>)
  expect(screen.getByText('The Boss')).toBeInTheDocument()
})

test('renders chat welcome message', () => {
  render(<BrowserRouter><ChatPage /></BrowserRouter>)
  expect(screen.getByText(/Tell me about your business/i)).toBeInTheDocument()
})
