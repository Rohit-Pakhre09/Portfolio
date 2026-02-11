# Rohit Pakhre Portfolio

<p align="center">
  A modern, interactive, and performance-focused developer portfolio built with Next.js.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-Animation-ff4ecd" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-Personal-green" alt="License" />
</p>

## Overview
This project is a fully responsive personal portfolio with modern UI/UX patterns, smooth animations, and section-based content architecture.

It highlights:
- MERN-focused professional profile
- Interactive project showcase
- Education, experience, achievements, and resume download
- Contact form with EmailJS integration

## Live Links
- `Live Demo:` add your deployed URL here
- `GitHub Repo:` add your repository URL here

## Feature Highlights
- Animated hero section with particle effects
- Sci-fi styled digital globe background accent
- Custom modern cursor (desktop)
- 3D project interaction cards
- Smooth section scrolling and responsive navigation
- Structured skills visualization with progress bars
- Resume view/download support
- Contact form with validation and async submission state

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** React Icons
- **Code Quality:** Biome

## Project Sections
- Hero
- About
- Education
- Experience
- Skills
- Projects
- Achievements
- Resume
- Contact

## Folder Structure
```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    sections/
      Hero.tsx
      About.tsx
      Education.tsx
      Experience.tsx
      Skills.tsx
      Projects.tsx
      Achievements.tsx
      Resume.tsx
      Contact.tsx
      Header.tsx
      Navbar.tsx
      Footer.tsx
    ui/
      CustomCursor.tsx
      InteractiveParticles.tsx
      DigitalGlobe.tsx
      3d-pin.tsx
      ...
public/
  images/
  resume/
```

## Local Setup
### 1. Clone repository
```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Configure environment variables
Create `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_TO_NAME=Rohit
```

### 4. Run development server
```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts
- `pnpm dev` - start dev server
- `pnpm build` - create production build
- `pnpm start` - run production server
- `pnpm lint` - run Biome checks
- `pnpm format` - format codebase using Biome

## Deployment
Recommended platforms:
- Vercel
- Netlify

Build command:
```bash
pnpm build
```

## Customization Guide
- Profile image: `public/images/profileImage.png`
- Resume PDF: `public/resume/Rohit-Pakhre-Resume.pdf`
- Projects data: `src/components/sections/Projects.tsx`
- Skills and percentages: `src/components/sections/Skills.tsx`
- Contact details and EmailJS: `src/components/sections/Contact.tsx`
- Site metadata/title: `src/app/layout.tsx`

## Roadmap
- Add dark/light cursor variants toggle
- Add project filter by category
- Add blog/articles section
- Add analytics for portfolio traffic

## License
This repository is intended for personal portfolio use.
