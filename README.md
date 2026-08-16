<div align="center">
  <br />
  <a href="https://github.com/yourusername/the-sacred-timeline">
    <img src="https://upload.wikimedia.org/wikipedia/commons/1/10/Marvel_Studios_2016_logo.svg" alt="Marvel Studios" height="70">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/yourusername/the-sacred-timeline">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="Disney+" height="60">
  </a>
  <br />
  <br />

  <img src="https://media.giphy.com/media/xT9IgusfDcqpPFzO0g/giphy.gif" alt="Avengers Assemble" width="100%" style="border-radius: 12px; max-height: 300px; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />

  <h1 align="center">The Sacred Timeline</h1>

  <p align="center">
    <strong>The definitive, interactive database and timeline tracker for the Marvel Cinematic Universe.</strong>
  </p>

  <p align="center">
    <!-- Build & License Badges -->
    <a href="#"><img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version" /></a>
    <a href="#"><img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" /></a>
    <a href="#"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" /></a>
  </p>

  <p align="center">
    <!-- Tech Stack Badges -->
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

---

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Enterprise Features](#-enterprise-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Installation & Setup](#-installation--setup)
- [Deployment](#-deployment)
- [Extending the Database](#-extending-the-database)
- [License](#-license)

---

## 🌌 About the Project

**The Sacred Timeline** is an enterprise-grade, front-end web application built to catalog the entire Marvel Cinematic Universe (MCU). From the dawn of the *Infinity Saga* to the climax of the *Multiverse Saga*, this application offers fans a deeply interactive, visually stunning platform to track watch progress, explore rich character dossiers, and navigate complex chronological timelines.

Designed with a premium "Streaming Service" aesthetic, it features fluid animations, dynamic data rendering, and persistent local storage synchronization.

<div align="center">
  <img src="https://media.giphy.com/media/BWD3CtcaaTRRu/giphy.gif" width="48%" style="border-radius: 12px; display: inline-block; box-shadow: 0 5px 15px rgba(0,0,0,0.3);" alt="Spider-Man" />
  <img src="https://media.giphy.com/media/3oxHQpJKuzIN86K5Vu/giphy.gif" width="48%" style="border-radius: 12px; display: inline-block; box-shadow: 0 5px 15px rgba(0,0,0,0.3);" alt="Hulk Smash" />
</div>

<br />

## ✨ Enterprise Features

| Feature Layer | Capability |
| :--- | :--- |
| **Comprehensive Database** | Houses robust JSON metadata for all 65+ MCU properties across 6 Phases, including the fully integrated Defenders Saga. |
| **Dual Timelines** | Algorithmic sorting allows users to instantly toggle the UI between **Official Release Order** and strictly calculated **Chronological Order**. |
| **Interactive Watch Tracker** | Client-side persistent state management. Check off movies and shows, and your progress saves instantly to `localStorage`. |
| **Advanced Filtering Engine** | Dynamic dual-axis filtering algorithm allowing simultaneous queries by Phase (1-6) and Content Format (Movies, Series, Specials). |
| **Cinematic UI/UX** | OLED-optimized Dark Mode, fluid Framer Motion page transitions, glassmorphism UI components, and scrollbar stabilization. |
| **S.H.I.E.L.D Dossiers** | Deep-dive individual entry pages featuring official synopses, dynamic cast lists, and timeline placements. |

---

## 🏗️ Architecture & Tech Stack

This project is engineered for absolute maximum client-side performance, utilizing a modern, decoupled frontend architecture.

- **Core Framework:** React 18
- **Build Tool:** Vite (Ultra-fast HMR and optimized production bundling)
- **Routing:** React Router v6 (Configured for SPA routing with persistent Scroll-to-Top behaviors)
- **Animation Engine:** Framer Motion (Hardware-accelerated layout transitions)
- **Search Engine:** Fuse.js (Fuzzy-search indexing for the navigation bar)
- **Styling:** Vanilla CSS3 with CSS Variables for dynamic Dark/Light theming and Glassmorphism.

---

## 🚀 Installation & Setup

Ready to spin up a local instance of the timeline? Ensure you have Node.js (v16+) installed.

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/the-sacred-timeline.git

# 2. Navigate into the project directory
cd the-sacred-timeline

# 3. Install NPM dependencies
npm install

# 4. Ignite the development server
npm run dev
```

Navigate to `http://localhost:5173` to access the local S.H.I.E.L.D database.

---

## ☁️ Deployment

This application is strictly optimized for edge deployment via **Vercel**. 

1. Push your code to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
3. Import your GitHub repository.
4. Leave the Framework Preset as **Vite**.
5. Click **Deploy**.

> **Infrastructure Note:** A `vercel.json` configuration file is embedded in the root directory to enforce client-side routing fallback rules (`/* -> /index.html`), ensuring perfectly smooth React Router navigation in a production environment.

---

## 🗄️ Extending the Database

The database architecture is designed for effortless scalability. All universe data, phases, entries, and character bios are maintained centrally in `/src/data/mcuData.js`. 

To inject an upcoming movie or series into the timeline:
1. Open `/src/data/mcuData.js`.
2. Append a new structured object to the `entries` array.
3. The UI will automatically index the new entry, generate the appropriate Disney+/Marvel Studios branding cards, and position it within the chronological timeline!

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

<br />

<div align="center">
  <img src="https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif" alt="Iron Man Snap" width="100%" style="border-radius: 12px; max-height: 150px; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
  <br />
  <br />
  <i>"I am Iron Man."</i>
</div>
