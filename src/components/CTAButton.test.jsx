import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
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

test('disabled button does not fire onClick', () => {
  const handler = vi.fn()
  render(<CTAButton size="small" onClick={handler} disabled>GO</CTAButton>)
  fireEvent.click(screen.getByText('GO'))
  expect(handler).not.toHaveBeenCalled()
})

test('disabled button has reduced opacity class', () => {
  render(<CTAButton size="small" disabled>GO</CTAButton>)
  expect(screen.getByText('GO')).toHaveClass('opacity-40')
})
