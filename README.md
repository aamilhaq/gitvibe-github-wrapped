# 🐙 GitVibe — Day 2 | #ProjectGetHired 🚀

> **Day 2 of 30** in the **#ProjectGetHired** challenge with [Ujwal]! Building and shipping a production-grade Developer GitHub "Wrapped" and Archetype Card Studio in 24 hours.

[![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20Tailwind%20v4%20%7C%20Vite%206-cyan-400?style=for-the-badge)](https://react.dev)
[![GitHub API](https://img.shields.io/badge/API-GitHub%20REST%20v3-black?style=for-the-badge&logo=github)](https://docs.github.com/en/rest)
[![Open Source](https://img.shields.io/badge/Open%20Source-GitHub-brightgreen?style=for-the-badge&logo=github)](https://github.com)

---

## 🌟 Overview

**GitVibe** is a real-time developer GitHub "Wrapped" story card studio. Enter any GitHub username (or click an instant demo profile), and GitVibe fetches public activity data via the GitHub REST API to generate interactive, 3D animated **9:16 Story Cards** (Instagram/LinkedIn) and **16:9 Social Cards** (Twitter/X).

---

## ✨ Key Features

- **🐙 Public GitHub API Integration**: Fetches user profile, public repositories, commit events, star counts, primary languages, and activity timing without requiring OAuth tokens.
- **🎭 AI Developer Archetype Classifier**: Evaluates user metrics to assign fun developer personas:
  - *The 2 AM Bug Hunter 🦇* (High late-night commit ratio)
  - *Full-Stack Speedrunner ⚡* (High commit velocity across 5+ languages)
  - *Open Source Crusader 👑* (High star & fork ratio)
  - *The Clean Code Monk 🏔️* (Focused language mastery)
  - *Weekend Warrior 🚀* (High weekend commit activity)
- **📸 Multi-Format & Multi-Theme Card Studio**:
  - **9:16 Vertical Story Format** (Instagram / LinkedIn Stories)
  - **16:9 Landscape Card Format** (Twitter / X preview cards)
  - **Themes**: Cyberpunk Neon, Amalfi Gold, Midnight Synthwave, Nord Minimal.
- **🖼️ HD Image Exporter**: 1-click client-side PNG image export (`html-to-image`) with celebratory confetti.
- **⚡ Instant Demo Profiles**: Pre-filled instant buttons (`torvalds`, `gaearon`, `yyx99`, `shadcn`) for 1-click testing.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism System
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Export**: [html-to-image](https://github.com/bubkoo/html-to-image)
- **Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)

---

## 🚀 Quick Start

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/gitvibe-github-wrapped.git
   cd gitvibe-github-wrapped
   ```

2. **Install Dependencies**:
   ```bash
   cmd /c npm install
   ```

3. **Start Development Server**:
   ```bash
   cmd /c npm run dev
   ```
   Open `http://localhost:5174` in your browser.

---

## 🏆 Project: Get Hired Challenge

Follow along with **#ProjectGetHired**:
- **30 Days | 30 MVPs**
- **100% Live Demos & Open Source**
- Created by Aamil & Ujwal.
