import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BuildingScreen from './BuildingScreen'

function renderScreen() {
  return render(
    <BrowserRouter>
      <BuildingScreen />
    </BrowserRouter>
  )
}

test('renders building message', () => {
  renderScreen()
  expect(screen.getByText(/Your site is being built/i)).toBeInTheDocument()
})

test('renders all 4 agent avatars', () => {
  renderScreen()
  expect(screen.getByAltText('Jack')).toBeInTheDocument()
  expect(screen.getByAltText('Franco')).toBeInTheDocument()
  expect(screen.getByAltText('Luna')).toBeInTheDocument()
  expect(screen.getByAltText('Leo')).toBeInTheDocument()
})

test('SEE MY SITE button is not shown initially', () => {
  renderScreen()
  expect(screen.queryByText(/SEE MY SITE/i)).not.toBeInTheDocument()
})
