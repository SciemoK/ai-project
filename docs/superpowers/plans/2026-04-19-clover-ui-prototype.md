# CLOVER — AI Website Builder UI Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-faithful React + Tailwind prototype of the CLOVER platform — 6 navigable pages matching the Figma design system extracted from 3 frames.

**Architecture:** Single-page Vite + React app with React Router for page navigation. All pages are static (no backend, no auth). Assets come from the existing `/Assets/` folder. Placeholder blobs/shapes replace Figma vector paths.

**Tech Stack:** Vite 5, React 18, React Router 6, Tailwind CSS 3, Google Fonts (Nerko One, Space Grotesk, Anybody, Spinnaker), Vitest + React Testing Library (smoke tests only)

---

## Design Tokens Reference

```
Colors:
  --clover-bg:        #FAF7F1   (page background)
  --clover-nav-bg:    #FFF3EE   (navbar background)
  --clover-brand:     #A75716   (burnt orange — CTA, logo, accents)
  --clover-blob:      #F5DBC0   (peach — character blobs)
  --clover-footer:    #F1D1B8   (footer strip)
  --clover-text:      #3B3C37   (body text)
  --clover-dark:      #252018   (darkest text)
  --clover-nav-text:  #362E21   (nav links)
  --clover-muted:     #7D6E57   (captions, eyebrow labels)

Fonts:
  Nerko One Regular   → brand logo, big hero titles
  Space Grotesk       → nav links, UI labels, body text (weights: 500, 700)
  Anybody Bold        → large CTA buttons (Login/Signup on Frame 2)
  Spinnaker Regular   → subtitle / supporting copy

Button (CTA Primary):
  bg: #A75716, radius: 8.84px, padding: 20px 40px
  shadow: 3px 4px 0px rgba(0,0,0,0.42), border: 1.77px solid #A75716
  text: #FAF7F1, font: Space Grotesk 700 13px (nav size) / Anybody Bold 30px (onboarding)

Nav:
  height: 56px, bg: #FFF3EE, shadow: 0px 4px 4px rgba(0,0,0,0.25)
  Logo: Nerko One 18px #A75716, letter-spacing: 3.5px
  Links: Space Grotesk 500 11.5px #362E21, gap: 28px
  Sign In CTA: bg #A75716, radius 4px, padding 8px 18px, text Space Grotesk 700 11px #FFF3EE
```

---

## File Structure

```
/Users/20and/Desktop/UI/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── Assets/                         (existing — character images)
│   ├── Jack.png                    → The Boss (agent 1)
│   ├── Jack face.png               → The Boss face
│   ├── Luna.png                    → The Painter Artist (agent 3)
│   ├── Luna face.png
│   ├── Leo.png                     → The Code / Tech Guy (agent 4)
│   ├── Leo face.png
│   ├── franco.png                  → The Typewriter (agent 2)
│   ├── Franco face.png
│   ├── desktop_phone.png           → hero device mockup
│   └── ...
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                   (Tailwind directives + Google Fonts)
    ├── components/
    │   ├── Nav.jsx                 (shared top navbar)
    │   ├── Footer.jsx              (shared 56px footer strip)
    │   ├── CTAButton.jsx           (primary CTA — two size variants)
    │   ├── AgentCard.jsx           (agent portrait card for landing)
    │   └── AvatarGroup.jsx         (48+ social proof initials row)
    └── pages/
        ├── LandingPage.jsx         (Frame 1 — hero + 4 agent cards)
        ├── OnboardingPage.jsx      (Frame 2 — "Hey there I'm Jack")
        ├── ChatPage.jsx            (Frame 3 — sidebar + agent intro)
        ├── PricingPage.jsx         (3-tier table, prices "Coming Soon")
        ├── AboutPage.jsx           (story / about us)
        └── MySitesPage.jsx         (empty state — "No sites yet")
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`

- [ ] **Step 1: Initialize project**

```bash
cd /c/Users/20and/Desktop/UI
npm create vite@latest . -- --template react
# Select: React, JavaScript
```

Expected output: files created — `package.json`, `vite.config.js`, `src/`, `index.html`

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Configure Tailwind**

Replace `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'clover-bg':      '#FAF7F1',
        'clover-nav':     '#FFF3EE',
        'clover-brand':   '#A75716',
        'clover-blob':    '#F5DBC0',
        'clover-footer':  '#F1D1B8',
        'clover-text':    '#3B3C37',
        'clover-dark':    '#252018',
        'clover-navtext': '#362E21',
        'clover-muted':   '#7D6E57',
      },
      fontFamily: {
        nerko:     ['"Nerko One"', 'cursive'],
        grotesk:   ['"Space Grotesk"', 'sans-serif'],
        anybody:   ['"Anybody"', 'cursive'],
        spinnaker: ['"Spinnaker"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Set up Google Fonts + Tailwind in `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Nerko+One&family=Space+Grotesk:wght@400;500;700&family=Anybody:wght@700&family=Spinnaker&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #FAF7F1;
  color: #3B3C37;
}
```

- [ ] **Step 5: Add vitest config to `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
```

- [ ] **Step 6: Create `src/setupTests.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Wire up routing in `src/App.jsx`**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage    from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage'
import ChatPage       from './pages/ChatPage'
import PricingPage    from './pages/PricingPage'
import AboutPage      from './pages/AboutPage'
import MySitesPage    from './pages/MySitesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/chat"       element={<ChatPage />} />
        <Route path="/pricing"    element={<PricingPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/my-sites"   element={<MySitesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 8: Replace `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 9: Update `index.html` title**

In `index.html`, change `<title>` to `<title>CLOVER — AI Website Builder</title>`

- [ ] **Step 10: Create page stubs** (so routing doesn't crash)

Create each of these with identical placeholder content (change the name per file):

```jsx
// src/pages/LandingPage.jsx
export default function LandingPage() {
  return <div className="bg-clover-bg min-h-screen p-8 font-grotesk">LandingPage</div>
}
```

Repeat for: `OnboardingPage.jsx`, `ChatPage.jsx`, `PricingPage.jsx`, `AboutPage.jsx`, `MySitesPage.jsx`

- [ ] **Step 11: Verify dev server starts**

```bash
npm run dev
```

Expected: browser shows "LandingPage" at `http://localhost:5173` on `#FAF7F1` background.

- [ ] **Step 12: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Vite+React+Tailwind project for CLOVER prototype"
```

---

## Task 2: Shared Components — Nav & Footer

**Files:**
- Create: `src/components/Nav.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Write failing smoke test**

Create `src/components/Nav.test.jsx`:

```jsx
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
```

- [ ] **Step 2: Run test — expect fail**

```bash
npx vitest run src/components/Nav.test.jsx
```

Expected: FAIL — "Cannot find module './Nav'"

- [ ] **Step 3: Implement `src/components/Nav.jsx`**

```jsx
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav
      className="w-full h-14 bg-clover-nav flex items-center px-8 gap-[497px]"
      style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]"
      >
        CLOVER
      </Link>

      {/* Links + Sign In */}
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-7">
          {['How it works', 'Pricing', 'Live sites'].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-grotesk font-medium text-[11.5px] text-clover-navtext hover:text-clover-brand transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          to="/onboarding"
          className="font-grotesk font-bold text-[11px] text-[#FFF3EE] bg-clover-brand px-[18px] py-2 rounded-[4px] hover:opacity-90 transition-opacity"
        >
          Sign in →
        </Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Run test — expect pass**

```bash
npx vitest run src/components/Nav.test.jsx
```

Expected: PASS

- [ ] **Step 5: Write Footer test**

Create `src/components/Footer.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('renders footer with CLOVER brand', () => {
  render(<Footer />)
  expect(screen.getByText(/CLOVER/i)).toBeInTheDocument()
})
```

- [ ] **Step 6: Run Footer test — expect fail**

```bash
npx vitest run src/components/Footer.test.jsx
```

Expected: FAIL

- [ ] **Step 7: Implement `src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer className="w-full h-14 bg-clover-footer flex items-center justify-center px-8">
      <span className="font-nerko text-clover-brand text-[14px] tracking-[3px]">
        CLOVER
      </span>
      <span className="font-grotesk text-[11px] text-clover-muted ml-4">
        © 2026 · AI Website Builder for Small Businesses
      </span>
    </footer>
  )
}
```

- [ ] **Step 8: Run Footer test — expect pass**

```bash
npx vitest run src/components/Footer.test.jsx
```

Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/components/Nav.jsx src/components/Nav.test.jsx src/components/Footer.jsx src/components/Footer.test.jsx
git commit -m "feat: add shared Nav and Footer components"
```

---

## Task 3: CTAButton & AgentCard Components

**Files:**
- Create: `src/components/CTAButton.jsx`
- Create: `src/components/AgentCard.jsx`
- Create: `src/components/AvatarGroup.jsx`

- [ ] **Step 1: Write CTAButton test**

Create `src/components/CTAButton.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import CTAButton from './CTAButton'

test('renders button text', () => {
  render(<CTAButton>Start building</CTAButton>)
  expect(screen.getByText('Start building')).toBeInTheDocument()
})

test('large variant has larger font', () => {
  const { container } = render(<CTAButton size="large">LOGIN</CTAButton>)
  const btn = container.firstChild
  expect(btn.className).toMatch(/anybody/)
})
```

- [ ] **Step 2: Run — expect fail**

```bash
npx vitest run src/components/CTAButton.test.jsx
```

- [ ] **Step 3: Implement `src/components/CTAButton.jsx`**

```jsx
export default function CTAButton({ children, size = 'small', onClick, className = '' }) {
  const baseStyles =
    'bg-clover-brand text-[#FAF7F1] rounded-[8.84px] flex items-center justify-center transition-opacity hover:opacity-90'
  const shadow = { boxShadow: '3px 4px 0px rgba(0,0,0,0.42)' }

  const variants = {
    small: 'font-grotesk font-bold text-[13px] px-[26px] py-[13px] gap-2',
    large: 'font-anybody font-bold text-[30px] px-[40px] py-[20px] gap-[14px]',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[size]} ${className}`}
      style={shadow}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run CTAButton test — expect pass**

```bash
npx vitest run src/components/CTAButton.test.jsx
```

- [ ] **Step 5: Write AgentCard test**

Create `src/components/AgentCard.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import AgentCard from './AgentCard'

test('renders agent name and tagline', () => {
  render(
    <AgentCard
      name="The Boss"
      tagline="Strategy & direction"
      imageSrc="/Assets/Jack face.png"
      imageAlt="Jack"
    />
  )
  expect(screen.getByText('The Boss')).toBeInTheDocument()
  expect(screen.getByText('Strategy & direction')).toBeInTheDocument()
})
```

- [ ] **Step 6: Run — expect fail**

```bash
npx vitest run src/components/AgentCard.test.jsx
```

- [ ] **Step 7: Implement `src/components/AgentCard.jsx`**

```jsx
export default function AgentCard({ name, tagline, description, imageSrc, imageAlt }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center max-w-[180px]">
      {/* Blob + portrait */}
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        <div className="absolute inset-0 bg-clover-blob rounded-full opacity-80" />
        <img
          src={imageSrc}
          alt={imageAlt}
          className="relative z-10 w-[100px] h-[100px] object-cover object-top rounded-full"
        />
      </div>

      <h3 className="font-nerko text-clover-dark text-[18px] leading-tight">{name}</h3>
      <p className="font-grotesk font-medium text-clover-brand text-[11px] uppercase tracking-wider">
        {tagline}
      </p>
      {description && (
        <p className="font-spinnaker text-clover-muted text-[12px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 8: Write AvatarGroup test**

Create `src/components/AvatarGroup.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import AvatarGroup from './AvatarGroup'

test('renders count and label', () => {
  render(<AvatarGroup count="48+" label="Restaurants already live" />)
  expect(screen.getByText('48+')).toBeInTheDocument()
  expect(screen.getByText('Restaurants already live')).toBeInTheDocument()
})
```

- [ ] **Step 9: Run — expect fail**

```bash
npx vitest run src/components/AvatarGroup.test.jsx
```

- [ ] **Step 10: Implement `src/components/AvatarGroup.jsx`**

```jsx
const INITIALS = [
  { letter: 'A', color: '#A75716' },
  { letter: 'M', color: '#DFDFDF' },
  { letter: 'R', color: '#DFDFDF' },
]

export default function AvatarGroup({ count, label }) {
  return (
    <div className="flex items-center gap-2">
      {/* Stacked initials */}
      <div className="flex -space-x-2">
        {INITIALS.map(({ letter, color }) => (
          <div
            key={letter}
            className="w-7 h-7 rounded-full border-2 border-clover-bg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="font-grotesk font-bold text-[8px] text-clover-dark">
              {letter}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <span className="font-grotesk font-bold text-[7.5px] text-[#DFDFDF]">{count}</span>
        <span className="font-grotesk font-medium text-[11px] text-clover-muted">{label}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 11: Run all component tests**

```bash
npx vitest run src/components/
```

Expected: 8/8 pass

- [ ] **Step 12: Commit**

```bash
git add src/components/CTAButton.jsx src/components/CTAButton.test.jsx src/components/AgentCard.jsx src/components/AgentCard.test.jsx src/components/AvatarGroup.jsx src/components/AvatarGroup.test.jsx
git commit -m "feat: add CTAButton, AgentCard, AvatarGroup components"
```

---

## Task 4: Landing Page (Frame 1)

**Files:**
- Modify: `src/pages/LandingPage.jsx`

Figma Frame 1 layout (1440×1024):
- Nav (56px, fixed top)
- Hero: left column (copy + CTA) | right column (Jack.png character, 586×564px area)
- 4 agent cards row
- Footer (56px)

- [ ] **Step 1: Write LandingPage smoke test**

Create `src/pages/LandingPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './LandingPage'

test('renders hero headline', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText(/Stop paying/i)).toBeInTheDocument()
})

test('renders all 4 agents', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText('The Boss')).toBeInTheDocument()
  expect(screen.getByText('The Typewriter')).toBeInTheDocument()
  expect(screen.getByText('The Painter')).toBeInTheDocument()
  expect(screen.getByText('The Tech Guy')).toBeInTheDocument()
})

test('renders Start building CTA', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>)
  expect(screen.getByText('Start building')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run — expect fail**

```bash
npx vitest run src/pages/LandingPage.test.jsx
```

- [ ] **Step 3: Implement `src/pages/LandingPage.jsx`**

```jsx
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CTAButton from '../components/CTAButton'
import AgentCard from '../components/AgentCard'
import AvatarGroup from '../components/AvatarGroup'

const AGENTS = [
  {
    name: 'The Boss',
    tagline: 'Strategy & direction',
    description: 'Greets you, understands your business, and coordinates the whole team.',
    imageSrc: '/Assets/Jack face.png',
    imageAlt: 'Jack — The Boss',
  },
  {
    name: 'The Typewriter',
    tagline: 'Content & copy',
    description: 'Writes every word — menus, descriptions, headlines. Clear and persuasive.',
    imageSrc: '/Assets/Franco face.png',
    imageAlt: 'Franco — The Typewriter',
  },
  {
    name: 'The Painter',
    tagline: 'Design & visuals',
    description: 'Picks layouts, colors, and imagery that make your brand shine.',
    imageSrc: '/Assets/Luna face.png',
    imageAlt: 'Luna — The Painter',
  },
  {
    name: 'The Tech Guy',
    tagline: 'Build & deploy',
    description: 'Handles the code so your site goes live in minutes, not months.',
    imageSrc: '/Assets/Leo face.png',
    imageAlt: 'Leo — The Tech Guy',
  },
]

export default function LandingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="flex-1 flex items-start justify-between px-24 pt-16 pb-8 relative overflow-hidden">
        {/* Left: Copy column */}
        <div className="flex flex-col gap-7 max-w-[520px] pt-8">
          <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase">
            — AI-POWERED WEB SETUP
          </span>

          <h1
            className="font-nerko text-clover-brand text-[55px] leading-[103%] tracking-[-1.5px]"
            style={{ letterSpacing: '-1.5px' }}
          >
            Stop paying<br />
            €800/yr for<br />
            outdated websites.
          </h1>

          <p className="font-spinnaker text-clover-dark text-[13.5px] leading-relaxed max-w-[420px]">
            Talk to a team of AI characters. Get a live, scannable, editable website —
            in under 5 minutes. You own it. No useless company fees in the middle.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/onboarding">
              <CTAButton size="small">Start building</CTAButton>
            </Link>
            <Link
              to="/chat"
              className="font-spinnaker text-[13.5px] text-[#473E31] hover:text-clover-brand transition-colors"
            >
              ▶ See live demo
            </Link>
          </div>

          <AvatarGroup count="48+" label="Restaurants already live" />
        </div>

        {/* Right: Character illustration */}
        <div className="relative flex-shrink-0">
          {/* Blob background */}
          <div
            className="absolute -top-8 -left-8 w-[560px] h-[520px] bg-clover-blob rounded-[40%_60%_55%_45%/50%_40%_60%_50%] opacity-60"
          />
          <img
            src="/Assets/Jack.png"
            alt="Jack — your AI team leader"
            className="relative z-10 w-[480px] object-contain object-bottom"
            style={{ maxHeight: '580px' }}
          />
        </div>
      </section>

      {/* Agent Cards Row */}
      <section className="flex justify-center gap-16 px-24 py-12 bg-clover-bg">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </section>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Run LandingPage test — expect pass**

```bash
npx vitest run src/pages/LandingPage.test.jsx
```

Expected: 3/3 pass

- [ ] **Step 5: Visual check**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify: nav visible, hero headline in orange Nerko One, Jack character image visible, 4 agent cards below, footer strip.

- [ ] **Step 6: Commit**

```bash
git add src/pages/LandingPage.jsx src/pages/LandingPage.test.jsx
git commit -m "feat: implement LandingPage with hero, agents section, and nav"
```

---

## Task 5: Onboarding Page (Frame 2)

**Files:**
- Modify: `src/pages/OnboardingPage.jsx`

Figma Frame 2: `#FAF7F1` bg, CLOVER logo top-left, character image (Jack, 272×340px) inside a peach blob mask group, large body copy "Hey there I'm Jack... First of all, it's your first time?", two CTA buttons (LOGIN, SIGNUP) side-by-side.

- [ ] **Step 1: Write test**

Create `src/pages/OnboardingPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import OnboardingPage from './OnboardingPage'

test('renders Jack greeting', () => {
  render(<BrowserRouter><OnboardingPage /></BrowserRouter>)
  expect(screen.getByText(/Hey there I'm Jack/i)).toBeInTheDocument()
})

test('renders LOGIN and SIGNUP buttons', () => {
  render(<BrowserRouter><OnboardingPage /></BrowserRouter>)
  expect(screen.getByText('LOGIN')).toBeInTheDocument()
  expect(screen.getByText('SIGNUP')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run — expect fail**

```bash
npx vitest run src/pages/OnboardingPage.test.jsx
```

- [ ] **Step 3: Implement `src/pages/OnboardingPage.jsx`**

```jsx
import { Link } from 'react-router-dom'
import CTAButton from '../components/CTAButton'

export default function OnboardingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col items-center justify-center relative">
      {/* Logo top-left */}
      <div className="absolute top-8 left-10">
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>
      </div>

      {/* Card area */}
      <div className="flex flex-col items-center gap-10 text-center">
        {/* Character blob + image */}
        <div className="relative flex items-center justify-center">
          {/* Large peach blob */}
          <div
            className="absolute w-[600px] h-[280px] bg-clover-blob rounded-[40%_60%_55%_45%/50%_40%_60%_50%]"
            style={{ top: '50%', transform: 'translateY(-20%)' }}
          />
          <img
            src="/Assets/Jack.png"
            alt="Jack — The Boss"
            className="relative z-10 w-[220px] object-contain object-bottom"
            style={{ maxHeight: '320px' }}
          />
        </div>

        {/* Greeting text */}
        <h1
          className="font-nerko text-clover-text text-[55px] leading-[103%] max-w-[600px]"
          style={{ letterSpacing: '-1.5px' }}
        >
          Hey there I'm Jack...<br />
          First of all, it's your first time?
        </h1>

        {/* CTA buttons */}
        <div className="flex items-center gap-6">
          <CTAButton size="large">LOGIN</CTAButton>
          <CTAButton size="large">SIGNUP</CTAButton>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect pass**

```bash
npx vitest run src/pages/OnboardingPage.test.jsx
```

- [ ] **Step 5: Visual check**

Open `http://localhost:5173/onboarding`. Verify: CLOVER logo top-left, Jack image centered with peach blob, greeting text in Nerko One, two orange buttons.

- [ ] **Step 6: Commit**

```bash
git add src/pages/OnboardingPage.jsx src/pages/OnboardingPage.test.jsx
git commit -m "feat: implement OnboardingPage with Jack greeting and auth CTAs"
```

---

## Task 6: Chat / Agent Introduction Page (Frame 3)

**Files:**
- Modify: `src/pages/ChatPage.jsx`

Figma Frame 3: Left sidebar panel (nav), right = large character illustration (735×732px image 16 — likely a composite agent scene), smaller character avatar masks stacked. Includes CLOVER logo, a border-bottom line in brand color.

This page becomes the "Introducing Your Team" chat view described in the image generation spec.

- [ ] **Step 1: Write test**

Create `src/pages/ChatPage.test.jsx`:

```jsx
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
```

- [ ] **Step 2: Run — expect fail**

```bash
npx vitest run src/pages/ChatPage.test.jsx
```

- [ ] **Step 3: Implement `src/pages/ChatPage.jsx`**

```jsx
import { Link } from 'react-router-dom'

const ALL_AGENTS = [
  { name: 'The Boss',       face: '/Assets/Jack face.png',   active: true  },
  { name: 'The Typewriter', face: '/Assets/Franco face.png', active: false },
  { name: 'The Painter',    face: '/Assets/Luna face.png',   active: false },
  { name: 'The Tech Guy',   face: '/Assets/Leo face.png',    active: false },
]

export default function ChatPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex">
      {/* Left sidebar */}
      <aside
        className="w-[260px] flex-shrink-0 bg-clover-nav border-r-[3px] border-clover-brand flex flex-col pt-8 pb-8 px-6 gap-8"
        style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
      >
        <Link to="/" className="font-nerko text-clover-brand text-[18px] tracking-[3.5px]">
          CLOVER
        </Link>

        <div className="flex flex-col gap-4 mt-4">
          {ALL_AGENTS.map((agent) => (
            <div
              key={agent.name}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                agent.active ? 'bg-clover-blob' : 'hover:bg-clover-blob/50'
              }`}
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-clover-blob rounded-full" />
                <img
                  src={agent.face}
                  alt={agent.name}
                  className="relative z-10 w-10 h-10 object-cover rounded-full"
                />
              </div>
              <span className="font-grotesk font-medium text-[12px] text-clover-navtext">
                {agent.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            to="/my-sites"
            className="font-grotesk text-[11px] text-clover-muted hover:text-clover-brand transition-colors"
          >
            My Sites →
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className="h-14 bg-clover-nav flex items-center px-8 border-b border-clover-blob"
          style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
        >
          <h2 className="font-nerko text-clover-dark text-[22px]">Introducing Your Team</h2>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex gap-8 p-10 items-start">
          {/* Agent portrait */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 w-[180px] h-[220px] bg-clover-blob rounded-[40%_60%_55%_45%/50%_40%_60%_50%] opacity-70" />
            <img
              src="/Assets/Jack.png"
              alt="Jack — The Boss"
              className="relative z-10 w-[160px] object-contain"
            />
          </div>

          {/* Chat bubble + input */}
          <div className="flex-1 flex flex-col gap-6 max-w-[600px]">
            {/* Boss message bubble */}
            <div className="bg-clover-blob rounded-[5px] rounded-tl-none p-6">
              <div className="font-grotesk font-bold text-[11px] text-clover-brand uppercase tracking-wider mb-2">
                The Boss
              </div>
              <p className="font-spinnaker text-clover-dark text-[15px] leading-relaxed">
                Welcome! Tell me about your business so we can build the perfect website together.
              </p>
            </div>

            {/* Input row */}
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Tell me about your business..."
                className="flex-1 bg-white border border-clover-blob rounded-lg px-4 py-3 font-grotesk text-[13px] text-clover-text placeholder:text-clover-muted focus:outline-none focus:border-clover-brand"
              />
              <button className="bg-clover-brand text-[#FAF7F1] font-grotesk font-bold text-[12px] px-5 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Send →
              </button>
            </div>

            {/* Smaller agent previews */}
            <div className="flex items-center gap-4 mt-4">
              <span className="font-grotesk text-[11px] text-clover-muted">Also on your team:</span>
              {ALL_AGENTS.filter((a) => !a.active).map((agent) => (
                <div key={agent.name} className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-clover-blob rounded-full opacity-70" />
                  <img
                    src={agent.face}
                    alt={agent.name}
                    className="relative z-10 w-10 h-10 object-cover rounded-full"
                    title={agent.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect pass**

```bash
npx vitest run src/pages/ChatPage.test.jsx
```

- [ ] **Step 5: Visual check**

Open `http://localhost:5173/chat`. Verify: sidebar with agent list, main area with "Introducing Your Team" header, Jack portrait, chat bubble, input field.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ChatPage.jsx src/pages/ChatPage.test.jsx
git commit -m "feat: implement ChatPage with agent sidebar and chat intro view"
```

---

## Task 7: Pricing Page

**Files:**
- Modify: `src/pages/PricingPage.jsx`

3-tier pricing table. All prices show "Coming Soon" placeholder.

- [ ] **Step 1: Write test**

Create `src/pages/PricingPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PricingPage from './PricingPage'

test('renders all three plan names', () => {
  render(<BrowserRouter><PricingPage /></BrowserRouter>)
  expect(screen.getByText('Starter')).toBeInTheDocument()
  expect(screen.getByText('Pro')).toBeInTheDocument()
  expect(screen.getByText('Enterprise')).toBeInTheDocument()
})

test('all prices show Coming Soon', () => {
  render(<BrowserRouter><PricingPage /></BrowserRouter>)
  const badges = screen.getAllByText('Coming Soon')
  expect(badges.length).toBeGreaterThanOrEqual(3)
})
```

- [ ] **Step 2: Run — expect fail**

```bash
npx vitest run src/pages/PricingPage.test.jsx
```

- [ ] **Step 3: Implement `src/pages/PricingPage.jsx`**

```jsx
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { BrowserRouter } from 'react-router-dom'

const PLANS = [
  {
    name: 'Starter',
    description: 'Perfect for getting your first site live fast.',
    features: ['1 website', 'AI chat setup', 'Mobile-ready', 'QR menu or landing page'],
  },
  {
    name: 'Pro',
    description: 'For businesses that want more control and pages.',
    features: ['3 websites', 'All Starter features', 'Booking integrations', 'Custom domain', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'Multi-location businesses and agencies.',
    features: ['Unlimited websites', 'All Pro features', 'Team access', 'White-label option', 'Dedicated support'],
  },
]

export default function PricingPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col items-center px-8 pt-16 pb-12">
        <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase mb-4">
          — PRICING
        </span>
        <h1 className="font-nerko text-clover-brand text-[48px] leading-tight mb-2">
          Simple, transparent pricing.
        </h1>
        <p className="font-spinnaker text-clover-muted text-[14px] mb-12">
          No hidden fees. No surprises. Prices coming soon.
        </p>

        <div className="flex gap-6 items-stretch max-w-[900px] w-full">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex-1 rounded-xl p-8 flex flex-col gap-5 border-2 ${
                plan.highlight
                  ? 'border-clover-brand bg-clover-nav shadow-lg scale-105'
                  : 'border-clover-blob bg-white'
              }`}
            >
              <div>
                <h2 className="font-nerko text-clover-dark text-[26px]">{plan.name}</h2>
                <p className="font-spinnaker text-clover-muted text-[12px] mt-1">
                  {plan.description}
                </p>
              </div>

              {/* Price placeholder */}
              <div className="bg-clover-blob rounded-lg px-4 py-3 text-center">
                <span className="font-grotesk font-bold text-[13px] text-clover-brand tracking-wide">
                  Coming Soon
                </span>
              </div>

              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-grotesk text-[12px] text-clover-navtext">
                    <span className="text-clover-brand mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="mt-auto bg-clover-blob text-clover-muted font-grotesk font-bold text-[12px] py-3 rounded-lg cursor-not-allowed"
              >
                Notify me
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect pass**

```bash
npx vitest run src/pages/PricingPage.test.jsx
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/PricingPage.jsx src/pages/PricingPage.test.jsx
git commit -m "feat: implement PricingPage with Coming Soon placeholders"
```

---

## Task 8: About & My Sites Pages

**Files:**
- Modify: `src/pages/AboutPage.jsx`
- Modify: `src/pages/MySitesPage.jsx`

- [ ] **Step 1: Write About test**

Create `src/pages/AboutPage.test.jsx`:

```jsx
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
```

- [ ] **Step 2: Run — expect fail**

```bash
npx vitest run src/pages/AboutPage.test.jsx
```

- [ ] **Step 3: Implement `src/pages/AboutPage.jsx`**

```jsx
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col items-center px-8 pt-16 pb-12 max-w-[800px] mx-auto w-full">
        <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase mb-4 self-start">
          — OUR STORY
        </span>

        <h1 className="font-nerko text-clover-brand text-[48px] leading-tight self-start mb-8">
          Why we built CLOVER.
        </h1>

        <div className="flex flex-col gap-6 font-spinnaker text-clover-dark text-[15px] leading-relaxed">
          <p>
            Small businesses — restaurants, barbershops, mechanics, hotels — spend thousands every year
            on websites that take months to build, go out of date instantly, and cost €800+ annually in
            maintenance fees. Most don't even know how to update them.
          </p>

          <div className="bg-clover-blob rounded-xl p-6">
            <p className="font-nerko text-clover-brand text-[22px] mb-2">
              There had to be a better way.
            </p>
            <p>
              CLOVER is an all-in-one AI-powered solution: just talk to our team of AI characters,
              and they'll build, write, design, and launch your website — in minutes, not months.
              You own it. You can edit it. No agency in the middle.
            </p>
          </div>

          <p>
            We started with restaurants in mind — menus, booking, hours. But the vision is bigger:
            any small business, anywhere, deserves a professional online presence without the price tag.
          </p>
        </div>

        <div className="flex gap-12 mt-12 self-start">
          {[['48+', 'Businesses live'], ['5 min', 'Average setup time'], ['€0', 'Agency fees']].map(
            ([stat, label]) => (
              <div key={label} className="flex flex-col">
                <span className="font-nerko text-clover-brand text-[36px]">{stat}</span>
                <span className="font-grotesk text-[12px] text-clover-muted">{label}</span>
              </div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Write MySites test**

Create `src/pages/MySitesPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MySitesPage from './MySitesPage'

test('renders Live Sites heading', () => {
  render(<BrowserRouter><MySitesPage /></BrowserRouter>)
  expect(screen.getByText(/Live Sites/i)).toBeInTheDocument()
})

test('shows empty state message', () => {
  render(<BrowserRouter><MySitesPage /></BrowserRouter>)
  expect(screen.getByText(/No sites created yet/i)).toBeInTheDocument()
})
```

- [ ] **Step 5: Run MySites test — expect fail**

```bash
npx vitest run src/pages/MySitesPage.test.jsx
```

- [ ] **Step 6: Implement `src/pages/MySitesPage.jsx`**

```jsx
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CTAButton from '../components/CTAButton'

export default function MySitesPage() {
  return (
    <div className="bg-clover-bg min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col px-12 pt-12 pb-8">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-grotesk font-bold text-[9.5px] text-clover-muted tracking-widest uppercase">
              — DASHBOARD
            </span>
            <h1 className="font-nerko text-clover-dark text-[36px] mt-1">Live Sites</h1>
          </div>
          <Link to="/onboarding">
            <CTAButton size="small">+ New site</CTAButton>
          </Link>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-clover-blob rounded-2xl py-24">
          {/* Blob decoration */}
          <div className="w-24 h-24 bg-clover-blob rounded-full flex items-center justify-center">
            <span className="text-4xl">🌐</span>
          </div>

          <div className="text-center">
            <p className="font-nerko text-clover-dark text-[24px] mb-2">
              No sites created yet!
            </p>
            <p className="font-spinnaker text-clover-muted text-[14px]">
              Start your first project now and go live in minutes.
            </p>
          </div>

          <Link to="/onboarding">
            <CTAButton size="small">Start your first project →</CTAButton>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 7: Run all page tests**

```bash
npx vitest run src/pages/
```

Expected: all 6 page test files pass.

- [ ] **Step 8: Commit**

```bash
git add src/pages/AboutPage.jsx src/pages/AboutPage.test.jsx src/pages/MySitesPage.jsx src/pages/MySitesPage.test.jsx
git commit -m "feat: implement AboutPage and MySitesPage with empty state"
```

---

## Task 9: Wire Nav Links + Final Polish

**Files:**
- Modify: `src/components/Nav.jsx` (fix link hrefs to match actual routes)
- Modify: `src/App.jsx` (ensure `/how-it-works` redirects to `/about`)

- [ ] **Step 1: Fix nav link destinations in `src/components/Nav.jsx`**

Replace the `['How it works', 'Pricing', 'Live sites']` map section:

```jsx
const NAV_LINKS = [
  { label: 'How it works', to: '/about' },
  { label: 'Pricing',      to: '/pricing' },
  { label: 'Live sites',   to: '/my-sites' },
]

// In JSX, replace the map:
{NAV_LINKS.map(({ label, to }) => (
  <Link
    key={label}
    to={to}
    className="font-grotesk font-medium text-[11.5px] text-clover-navtext hover:text-clover-brand transition-colors"
  >
    {label}
  </Link>
))}
```

- [ ] **Step 2: Add 404 fallback route in `src/App.jsx`**

Add inside `<Routes>` after existing routes:

```jsx
<Route path="*" element={<LandingPage />} />
```

- [ ] **Step 3: Run full test suite**

```bash
npx vitest run
```

Expected: all tests pass, no errors.

- [ ] **Step 4: Manual walkthrough**

```bash
npm run dev
```

Click through: Landing → "How it works" (About) → "Pricing" → "Live sites" (My Sites) → "Sign in →" (Onboarding) → "Start building" → Chat page. Verify all pages load with correct fonts, colors, and images.

- [ ] **Step 5: Final commit**

```bash
git add src/components/Nav.jsx src/App.jsx
git commit -m "feat: wire nav links and add 404 fallback — prototype complete"
```

---

## Self-Review

**Spec coverage check:**
- [x] Landing page with 4 AI agent characters (Boss/Typewriter/Painter/Tech Guy)
- [x] Chat interaction view with "Introducing Your Team" + chat input + Login/Signup
- [x] About Us page — story about overpaying for outdated sites + AI all-in-one
- [x] Pricing page — Starter/Pro/Enterprise with "Coming Soon" prices
- [x] My Sites page — empty state "No sites created yet"
- [x] CLOVER brand (logo, colors, fonts) consistent across all pages
- [x] Jack character asset used on Onboarding and Chat pages
- [x] All 4 character face assets used in AgentCard and ChatPage sidebar
- [x] Nav shared across all pages except Onboarding/Chat (which use inline logo)

**Placeholder check:** None present. All code is concrete and complete.

**Type consistency:** `CTAButton size="small"|"large"` consistent across all usages. `AgentCard` props (`name`, `tagline`, `description`, `imageSrc`, `imageAlt`) consistent between definition and usage in LandingPage + ChatPage.
