# Muskan Kumari — Personal Developer Portfolio

> **"Building scalable full-stack web applications for real-world campus & industry solutions."**

A complete, modern, responsive personal portfolio website for **Muskan Kumari**, Full-Stack Developer & Frontend Developer. Built with **React 19**, **Vite**, **Tailwind CSS**, **Motion for React**, and live **GitHub REST API** integration.

---

## ✨ Key Features

- **Personal Brand & Hero**:
  - Dynamic rotating role titles (*Full-Stack Developer*, *Frontend Developer*, *React.js Developer*, *Problem Solver*).
  - Quick action buttons: **View Projects**, **Contact Me**, and **Download Resume**.
  - Abstract developer monogram avatar with live tech badges and glowing gradients.
- **Interactive Project Showcase**:
  - Highlights 3 core projects:
    1. **Student Placement Tracker** (Full-Stack: React, Node.js, Express.js, MongoDB/SQL, Tailwind CSS)
    2. **QR Code Generator** (Frontend: JavaScript, HTML5, CSS3)
    3. **Student Study Planner** (Frontend: JavaScript, HTML5, CSS3)
  - Animated category filters: **All**, **Full-Stack**, **Frontend**, **JavaScript**.
  - Direct links to source code and interactive feature highlights.
- **Live GitHub REST API Integration**:
  - Live fetching from `https://api.github.com/users/muskan9973m/repos`.
  - Automatically filters out forks and sorts repositories by most recently updated.
  - Displays stars, forks, primary programming languages, and formatted update dates.
  - Includes loading skeleton states and resilient error handling with retry capability.
- **Dark / Light Theme System**:
  - Default deep black/dark navy aesthetic with violet, purple, and indigo gradients.
  - One-click toggle in the navbar with animated transitions.
  - User preference stored and persisted in `localStorage`.
- **Contact Form**:
  - Full client-side input validation (Name, Email format, Subject, Message).
  - Server-side email delivery through the Vercel API route and Resend.
  - Optional external form endpoint override (`VITE_CONTACT_API_URL`).
  - Accessible feedback states and submit protection.
- **Accessibility & SEO**:
  - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - Open Graph and Twitter card meta tags.
  - Full `prefers-reduced-motion` compliance.

---

## 🛠️ Technology Stack

- **Framework**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion for React](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons
- **Data Fetching**: GitHub REST API v3
- **Deployment**: Configured for Vercel

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18 or newer) installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Contact Email Delivery
The contact form sends submissions to `muskansingh9973m@gmail.com` through the server-side
`api/contact.js` route. Email delivery needs a Resend account, an API key, and a sender
address on a domain verified with Resend. Set these server-only variables in a local
`.env.local` file and in the Vercel project's **Settings → Environment Variables**:
```env
RESEND_API_KEY=re_your_resend_api_key
CONTACT_FROM=Portfolio Contact <contact@your-verified-domain.com>
```
Never use a `VITE_` prefix for the API key; that would expose it in the browser. For local
development, use `vercel dev` so the `/api/contact` function is available, then open the
local URL it prints. For deployment, add both variables to Vercel and redeploy. The form
shows an error rather than claiming success if delivery is not configured or the provider
rejects a message.

An optional `VITE_CONTACT_API_URL` can point to an external form endpoint instead. Configure
that endpoint to deliver to the inbox above.

### 4. Start Development Server
Run the Vercel development server to use the contact API locally (install the Vercel CLI
first if needed with `npm install -g vercel`):
```bash
vercel dev
```
Open the local URL printed by Vercel. `npm run dev` remains available for frontend-only
work, but the contact API route requires the Vercel development server.

### 5. Create Production Build
```bash
npm run build
```
The optimized bundle will be created in the `dist/` directory.

---

## ⚙️ Customization Guide

All personal links, text, and placeholders are centralized in [`src/config/siteConfig.js`](src/config/siteConfig.js):

### 1. Update Contact Email & LinkedIn URL
Open `src/config/siteConfig.js` and edit the `socialLinks` object:
```javascript
socialLinks: {
  github: "https://github.com/muskan9973m",
  linkedin: "https://www.linkedin.com/in/YOUR_REAL_LINKEDIN_USERNAME",
  email: "your.real.email@example.com",
}
```

### 2. Update Resume PDF
Place your real resume file in the `public/` folder and name it `resume.pdf`:
```
public/resume.pdf
```
The "Download Resume" button in the Hero section is pre-configured to download this file directly.

---

## 🌐 Deploying to Vercel

### Option A: Via Vercel Web Dashboard (Recommended)
1. Push this repository to your GitHub account (`muskan9973m`).
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **"Deploy"**.

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📁 Project Architecture

```
my-portfolio/
├── public/
│   ├── favicon.svg          # Custom SVG Brand Favicon
│   └── resume.pdf           # Downloadable Resume PDF
├── api/
│   └── contact.js            # Server-side contact email delivery via Resend
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── BrandIcons.jsx   # GitHub & LinkedIn SVGs
│   │   ├── About.jsx            # About section & 3 highlight cards
│   │   ├── Contact.jsx          # Contact form with validation & mailto
│   │   ├── Footer.jsx           # Clean footer with dynamic year
│   │   ├── GitHubProjects.jsx   # Live GitHub REST API integration
│   │   ├── Hero.jsx             # Hero section with animated roles
│   │   ├── Navbar.jsx           # Sticky nav with active highlight & mobile drawer
│   │   ├── ProjectCard.jsx      # Reusable interactive project card
│   │   ├── Projects.jsx         # Featured projects with category filters
│   │   ├── SectionHeading.jsx   # Reusable section heading
│   │   └── ThemeToggle.jsx      # Animated theme switcher
│   ├── config/
│   │   └── siteConfig.js        # Centralized configurations & placeholders
│   ├── data/
│   │   ├── projects.js          # Featured projects dataset
│   │   └── skills.js            # Categorized skills dataset
│   ├── hooks/
│   │   ├── useGitHubRepos.js    # Custom hook with abort & retry handling
│   │   └── useTheme.js          # Custom hook for dark/light mode persistence
│   ├── App.jsx                  # Main application wrapper
│   ├── index.css                # Global styles, glassmorphism, utilities
│   └── main.jsx                 # Vite application entry point
├── index.html                   # SEO metadata, Google Fonts
├── tailwind.config.js           # Dark mode, custom palette, shadows
├── vite.config.js               # Vite configuration
└── package.json                 # Project dependencies & scripts
```
