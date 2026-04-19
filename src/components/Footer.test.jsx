import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('renders footer with CLOVER brand', () => {
  render(<Footer />)
  expect(screen.getByText(/CLOVER/i)).toBeInTheDocument()
})
