import { render, screen } from '@testing-library/react'
import AvatarGroup from './AvatarGroup'

test('renders count and label', () => {
  render(<AvatarGroup count="48+" label="Restaurants already live" />)
  expect(screen.getByText('48+')).toBeInTheDocument()
  expect(screen.getByText('Restaurants already live')).toBeInTheDocument()
})
