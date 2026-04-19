import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Nav from './Nav'

test('renders CLOVER logo', () => {
  render(<BrowserRouter><Nav /></BrowserRouter>)
  expect(screen.getByText('CLOVER')).toBeInTheDocument()
})

test('renders nav links', () => {
  render(<BrowserRouter><Nav /></BrowserRouter>)
  expect(screen.getByText('How it works')).toBeInTheDocument()
  expect(screen.getByText('Pricing')).toBeInTheDocument()
  expect(screen.getByText('Live sites')).toBeInTheDocument()
  expect(screen.getByText('Sign in →')).toBeInTheDocument()
})
