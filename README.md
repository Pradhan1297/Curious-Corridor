# Birthday Puzzle Website — Requirements Document

## Project Overview

A personalised interactive birthday puzzle game built as a single-page web application. The user navigates through three puzzle levels, each unlocking a door, leading to a final birthday reveal screen.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js (v18+) |
| Styling | Tailwind CSS or CSS Modules |
| Animations | Framer Motion |
| Hosting | GitHub Pages / Netlify / Vercel |
| Build Tool | Vite |
| Package Manager | npm or yarn |

---

## Functional Requirements

### FR-01 — Landing Screen
- Display a mysterious title (e.g. "Three Doors") with no birthday reference
- Show three locked door icons side by side
- Display a short teaser subtitle
- Include a "Begin" call-to-action button
- Active door (current level) should have a pulsing glow animation

### FR-02 — Level 1: Riddle Puzzle
- Display a text-based riddle
- Provide a text input field for the user to type their answer
- Validate answer on button click or Enter key press
- Answer should be case-insensitive
- Show an error message on wrong answer
- On correct answer: unlock door 1 with animation and transition to Level 2

### FR-03 — Level 2: Multiple Choice Puzzle
- Display a personal question based on real conversation details
- Show 4 multiple choice options as clickable buttons
- Highlight correct answer in green on selection
- Highlight wrong answer in red with a shake animation
- On correct answer: unlock door 2 and transition to Level 3

### FR-04 — Level 3: Decode Puzzle
- Display a numeric sequence (e.g. 4 · 15 · 15 · 18)
- Provide a hint explaining the cipher (number = alphabet position)
- Provide a text input field for the decoded word
- Validate answer on button click or Enter key press
- On correct answer: unlock door 3, trigger confetti, and transition to Reveal

### FR-05 — Reveal Screen
- Display all three doors in unlocked/glowing state
- Show a subtle animated icon (e.g. sparkle or star)
- Display the personalised birthday wish
- Keep the message short — one to two lines maximum
- Include a small "Play again" option to restart from the landing screen

### FR-06 — Progress Indicator
- Show a 3-dot progress indicator on each puzzle level
- Dots change state: pending → current → completed
- Does not appear on the landing screen or reveal screen

### FR-07 — Door Unlock Animation
- Each door animates open (rotateY perspective transform) when unlocked
- Unlocked doors change colour to gold with a glow effect
- Icon inside the door changes from 🚪 to ✨ on unlock
- Next door pulses to indicate it is now active

### FR-08 — Confetti Effect
- Triggered on completion of Level 3
- Coloured dots fall from random positions across the screen
- Confetti fades out and is removed from the DOM after animation completes

### FR-09 — Restart Flow
- Clicking "Play again" resets all state to initial values
- All doors reset to locked
- All inputs are cleared
- User is returned to the landing screen

---

## Non-Functional Requirements

### NFR-01 — Personalisation
- The following must be easy to update without touching core logic:
  - Level 2 question and answer options
  - The correct answer for Level 2
  - The birthday person's name on the reveal screen
  - The sender's initial or nickname
  - The birthday wish message text

### NFR-02 — Responsive Design
- Fully functional on mobile screens (min 320px width)
- Fully functional on desktop screens
- Touch-friendly button sizes (min 44px tap target)

### NFR-03 — Performance
- Initial load under 2 seconds on a standard connection
- No external API calls
- All game logic runs client-side only

### NFR-04 — Accessibility
- Keyboard navigable (Tab + Enter for all interactions)
- Focus states visible on all interactive elements
- Screen reader friendly labels on inputs and buttons
- Respects prefers-reduced-motion for animations

### NFR-05 — Browser Support
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS 14+)
- Chrome for Android

---

## Component Structure

```
src/
│
├── App.jsx                   ← Root component, manages screen state
│
├── components/
│   ├── LandingScreen.jsx     ← Title, doors preview, begin button
│   ├── PuzzleLevel.jsx       ← Shared wrapper for all 3 levels
│   ├── Level1Riddle.jsx      ← Text input riddle
│   ├── Level2Choice.jsx      ← Multiple choice puzzle
│   ├── Level3Decode.jsx      ← Cipher decode puzzle
│   ├── RevealScreen.jsx      ← Final birthday wish
│   ├── DoorRow.jsx           ← Three door icons with unlock state
│   ├── ProgressDots.jsx      ← 3-dot level indicator
│   └── Confetti.jsx          ← Confetti animation component
│
├── config/
│   └── gameConfig.js         ← All personalisation values live here
│
├── hooks/
│   └── useGameState.js       ← Game state management hook
│
└── styles/
    └── globals.css           ← Base styles and CSS variables
```

---

## Game Config File (Personalisation Layer)

All editable content should be centralised in one config file:

```javascript
// src/config/gameConfig.js

export const gameConfig = {
  // Reveal screen
  birthdayPersonName: "Sophia",
  senderInitial: "J",
  birthdayWish: "Hope your birthday is as fun as you are.",

  // Level 1
  level1: {
    riddle: "I travel the world but never leave my corner. What am I?",
    hint: "Think small and sticky.",
    answer: "stamp",                // case-insensitive match
  },

  // Level 2
  level2: {
    question: "If she could live anywhere for a year, where would she choose?",
    hint: "Think back to what she told you.",
    options: [
      { label: "🗼 Paris, France",     correct: false },
      { label: "🌴 Bali, Indonesia",   correct: true  },
      { label: "🏯 Tokyo, Japan",      correct: false },
      { label: "🗽 New York, USA",     correct: false },
    ],
  },

  // Level 3
  level3: {
    sequence: [4, 15, 15, 18],
    hint: "D = 4 · O = 15 · O = 15 · R = 18",
    answer: "door",               // case-insensitive match
  },
};
```

---

## State Management

All game state managed via a single custom hook `useGameState`:

```javascript
// Tracked state values
{
  currentScreen: 'landing' | 'level1' | 'level2' | 'level3' | 'reveal',
  doorsUnlocked: [false, false, false],   // one per door
  levelErrors: { l1: null, l2: null, l3: null },
  levelSuccess: { l1: false, l2: false, l3: false },
}
```

---

## Screen Flow

```
Landing
  └── Begin
        └── Level 1 (Riddle)
              └── Correct answer
                    └── Level 2 (Multiple Choice)
                          └── Correct answer
                                └── Level 3 (Decode)
                                      └── Correct answer
                                            └── Reveal Screen
                                                  └── Play again → Landing
```

---

## Design Tokens

```css
:root {
  --bg-primary:     #0d0d1a;
  --bg-card:        #0f172a;
  --text-primary:   #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted:     #475569;
  --accent-purple:  #c084fc;
  --accent-pink:    #f472b6;
  --door-gold:      #fbbf24;
  --success:        #4ade80;
  --error:          #f87171;
  --border-default: #1e293b;
  --border-accent:  #334155;
  --radius-sm:      8px;
  --radius-md:      12px;
  --radius-full:    50px;
  --font-display:   'Playfair Display', serif;
  --font-body:      'Inter', sans-serif;
}
```

---

## Animation Specs

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Screen transition | fadeUp (opacity + translateY) | 600ms | ease |
| Door unlock | perspective rotateY(-25deg) + scale(1.05) | 500ms | cubic-bezier(.25,.8,.25,1) |
| Active door pulse | box-shadow oscillate | 2s loop | ease-in-out |
| Wrong answer shake | translateX shake | 300ms | ease |
| Confetti fall | translateY + rotate | 1.2–2.4s | linear |
| Reveal glow | box-shadow pulse | 2s loop | ease-in-out |

---

## Deployment Checklist

- [ ] Personalise `gameConfig.js` with real values
- [ ] Test all three puzzle answers
- [ ] Test on mobile screen (Chrome DevTools)
- [ ] Test keyboard navigation
- [ ] Run `npm run build` — no errors
- [ ] Deploy to Netlify Drop or GitHub Pages
- [ ] Open the live URL and test the full flow end to end
- [ ] Send link with no explanation — just "Found something for you"

---

## Out of Scope (v1)

- Backend or database of any kind
- User authentication
- Score tracking or leaderboard
- Multiple language support
- Analytics or tracking

---

## Future Enhancements (v2 ideas)

- Custom background music that plays on reveal
- Her photo fading in on the reveal screen
- A countdown timer per level for added pressure
- Shareable score card after completion
- Swappable themes (dark / light / pastel)
