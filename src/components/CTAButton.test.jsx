import { render, screen } from '@testing-library/react'
import CTAButton from './CTAButton'

test('renders button text', () => {
  render(<CTAButton>Start building</CTAButton>)
  expect(screen.getByText('Start building')).toBeInTheDocument()
})

test('large variant has anybody font class', () => {
  const { container } = render(<CTAButton size="large">LOGIN</CTAButton>)
  const btn = container.firstChild
  expect(btn.className).toMatch(/anybody/)
})
