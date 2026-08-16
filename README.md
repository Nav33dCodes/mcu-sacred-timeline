<div align="center">
  <br />
  <a href="#">
    <img src="https://upload.wikimedia.org/wikipedia/commons/1/10/Marvel_Studios_2016_logo.svg" alt="Marvel Studios" height="70">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="Disney+" height="60">
  </a>
  <br />
  <br />

  <img src="https://media.giphy.com/media/xT9IgusfDcqpPFzO0g/giphy.gif" alt="Avengers Assemble" width="100%" style="border-radius: 10px; max-height: 250px; object-fit: cover;" />

  <h1 align="center">The Sacred Timeline</h1>

  <p align="center">
    <strong>The ultimate interactive database, timeline, and watch-tracker for the Marvel Cinematic Universe.</strong>
  </p>

  <p align="center">
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    </a>
    <a href="https://vercel.com/">
      <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
    </a>
    <a href="https://framer.com/motion/">
      <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    </a>
  </p>
</div>

<br />

## 🌌 Welcome to the Multiverse

Explore the entire Marvel Cinematic Universe like never before. From the dawn of the Infinity Saga to the climax of the Multiverse Saga, this application allows you to seamlessly track your watch progress, explore rich character dossiers, and navigate the complex, interwoven timelines of both movies and Disney+ series.

<div align="center">
  <img src="https://media.giphy.com/media/BWD3CtcaaTRRu/giphy.gif" width="48%" style="border-radius: 10px; display: inline-block;" alt="Spider-Man" />
  <img src="https://media.giphy.com/media/3oxHQpJKuzIN86K5Vu/giphy.gif" width="48%" style="border-radius: 10px; display: inline-block;" alt="Hulk Smash" />
</div>

<br />

## ✨ Core Features

| 🛡️ Feature | 📜 Description |
| --- | --- |
| **Comprehensive Database** | Data on all 65+ MCU properties across 6 Phases (including the Defenders Saga). |
| **Dual Timelines** | Seamlessly toggle the layout between the **Official Release Order** and the true **Chronological Order**. |
| **Interactive Watch Tracker** | Check off movies and shows as you watch them. Your progress saves instantly to local storage! |
| **Advanced Filtering** | Dynamic dual-axis filtering to search by Phase (1-6) and Format (Movies, Series, Specials). |
| **Cinematic UI/UX** | Stunning OLED Dark Mode, fluid Framer Motion page transitions, and glassmorphism styling that mimics Disney+. |
| **S.H.I.E.L.D Dossiers** | Read official synopses, view cast lists, and track timeline placements. |

<br />

## 🚀 Quick Start Guide

Ready to assemble the code? Follow these instructions to get the React application running on your local machine.

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/mcu-encyclopedia.git
cd mcu-encyclopedia

# 2. Install the necessary dependencies
npm install

# 3. Ignite the development server!
npm run dev
```

Navigate to `http://localhost:5173` to enter the database.

<br />

## ☁️ Deployment to Vercel

This project is deeply optimized and pre-configured for a seamless deployment on Vercel. 

1. Push your code to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
3. Import your GitHub repository.
4. Leave the Framework Preset as **Vite**.
5. Click **Deploy**.

> **Note:** A `vercel.json` file is already included in the root directory to handle client-side routing, ensuring perfectly smooth React Router navigation in production without throwing 404 errors!

<br />

## 🗄️ Extending the Database

All universe data, phases, entries, and character bios are maintained entirely in a central javascript file: `/src/data/mcuData.js`. 

To add an upcoming Phase 6 movie, simply append a new object to the `entries` array, and the UI will automatically build the timeline node and generate the Disney+ card!

<br />

---
<div align="center">
  <img src="https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif" alt="Iron Man Snap" width="100%" style="border-radius: 10px; max-height: 150px; object-fit: cover;" />
  <br />
  <br />
  <i>"I am Iron Man."</i>
</div>
