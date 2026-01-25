# Design Friend

An interactive mobile web app that helps users discover their unique interior design style through a two-stage image sorting and annotation process.

## Features

- **Discovery Feed**: Tinder-style swipe mechanism with 25 curated interior design images
- **Vibe Check**: AI-powered intermediate summary after completing the swipe session
- **Deep Dive**: Annotation phase where users can pin and describe what caught their eye
- **Design Persona**: Personalized style profile with creative name, summary, and shopping keywords
- **Inspiration Board**: Masonry grid of liked images with bookmarking functionality
- **User Profile**: Dashboard with saved bookmarks and ability to retake the quiz

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion

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
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── context/          # React context for state management
├── data/             # Static data (design images)
├── pages/            # Page components
├── services/         # AI service placeholder
└── App.jsx           # Main app component
```
