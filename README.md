# Design Friend

An interactive mobile web app that helps users discover their unique interior design style through a two-stage image sorting and annotation process.

Built with the **Tactile Minimalism** design system featuring a warm Blush Plaster background, sharp editorial corners, and a refined color palette.

## App Overview

Design Friend guides users through a personalized interior design discovery journey:

1. **Onboarding & Authentication**: Users sign up or log in via email, Google, or Facebook
2. **Style Discovery**: Swipe through 25 curated interior design images (like/dislike/unsure)
3. **Initial Analysis**: AI analyzes preferences and provides a "Vibe Check" summary
4. **Deep Dive**: Users annotate liked images by tapping elements and explaining why they appeal
5. **Persona Generation**: AI synthesizes all data into a unique "Design Persona" with shopping keywords
6. **Inspiration Board**: Browse saved images with bookmarking for future reference

## Features

- **User Authentication**: Email/password, Google OAuth, and Facebook OAuth sign-in
- **Discovery Feed**: Tinder-style swipe mechanism with 25 curated interior design images
- **Vibe Check**: AI-powered intermediate summary after completing the swipe session
- **Deep Dive**: Annotation phase where users can pin and describe what caught their eye
- **Design Persona**: Personalized style profile with creative name, summary, and shopping keywords
- **Inspiration Board**: Masonry grid of liked images with bookmarking functionality
- **User Profile**: Dashboard with saved bookmarks and ability to retake the quiz

## Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Testing | Vitest + React Testing Library |
| State Management | React Context API |

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                               │
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │  AuthProvider   │  │         AppProvider              │  │
│  │  (Auth State)   │  │  (Quiz State, Bookmarks, etc.)  │  │
│  └────────┬────────┘  └────────────────┬────────────────┘  │
│           │                            │                    │
│           └────────────┬───────────────┘                    │
│                        ▼                                    │
│              ┌─────────────────┐                           │
│              │   AppContent    │                           │
│              │  (Stage Router) │                           │
│              └────────┬────────┘                           │
│                       │                                     │
│    ┌──────────────────┼──────────────────┐                 │
│    ▼                  ▼                  ▼                 │
│ ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│ │Disco-│  │Vibe  │  │Deep  │  │Design│  │Inspi-│         │
│ │very  │  │Check │  │Dive  │  │Perso-│  │ration│         │
│ │Feed  │  │      │  │      │  │na    │  │Board │         │
│ └──────┘  └──────┘  └──────┘  └──────┘  └──────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AnnotationModal.jsx   # Modal for adding notes to images
│   ├── AuthModal.jsx         # Sign in/sign up modal
│   ├── BookmarkButton.jsx    # Bookmark toggle button
│   ├── LoadingScreen.jsx     # Loading animation
│   ├── Navigation.jsx        # Bottom navigation bar
│   ├── ProfileDisplay.jsx    # User profile in header
│   ├── ProgressBar.jsx       # Progress indicator
│   └── SwipeCard.jsx         # Swipeable card component
│
├── context/              # React Context providers
│   ├── AppContext.jsx        # Quiz state, bookmarks, annotations
│   └── AuthContext.jsx       # Authentication state
│
├── data/                 # Static data
│   └── images.js             # 25 interior design images with metadata
│
├── pages/                # Page components (stages)
│   ├── DeepDive.jsx          # Image annotation phase
│   ├── DesignPersona.jsx     # Final persona results
│   ├── DiscoveryFeed.jsx     # Swipe interface
│   ├── InspirationBoard.jsx  # Masonry grid of liked images
│   ├── Profile.jsx           # User profile page
│   └── VibeCheck.jsx         # Intermediate summary
│
├── services/             # External services
│   └── ai.js                 # AI service (placeholder/mock)
│
├── test/                 # Test files
│   ├── setup.js              # Test configuration
│   ├── auth.test.jsx         # Authentication tests
│   ├── AuthModal.test.jsx    # Auth modal tests
│   ├── images.test.js        # Image data validation tests
│   └── ProfileDisplay.test.jsx # Profile display tests
│
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

### Data Flow

```
User Input → Context State → Components → UI

1. Authentication Flow:
   AuthContext → AuthModal → ProfileDisplay

2. Quiz Flow:
   AppContext.handleSwipe() → swipeResults → VibeCheck → DeepDive → DesignPersona

3. AI Analysis Flow:
   likedImages + annotations → ai.generateDesignPersona() → designPersona state
```

### Interior Design Styles

The app covers 11 distinct interior design styles:

- Japandi
- Mid-century Modern
- Colonial
- Traditional
- Coastal
- Craftsman
- Minimal
- Bohemian
- Eclectic/Maximalist
- Organic
- Modern Contemporary

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests once
npm run test:run
```

## Testing

The app uses Vitest with React Testing Library for testing:

- **40 tests** covering authentication, UI components, and data validation
- Tests follow TDD principles
- Image data is validated for style-appropriate content

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm run test:run
```

## Environment Variables

For production, configure the following:

```env
# Firebase Authentication (optional - currently using mock auth)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# AI Service (optional - currently using mock responses)
VITE_OPENAI_API_KEY=your_openai_key
```

## Deployment

The app is configured for GitHub Pages deployment:

```bash
# Build and deploy (via GitHub Actions)
git push origin main
```

Live URL: `https://widgetwix.github.io/design-friend/`
