# 🌍 Earthquake Data Visualizer

An interactive, responsive web application that visualizes real-time earthquake data from the USGS dataset. The app features a two-pane layout: one pane shows a dynamic scatter plot, and the other displays a scrollable, sortable table. Users can explore the data through linked interactivity between the table and chart.

---

## 🚀 Features

- Fetches live CSV data from USGS (limited to 100 rows for performance)
- Interactive scatter plot with selectable X and Y axes
- Scrollable table with all data columns and sort functionality
- Bi-directional interactivity between chart and table (click/hover)
- Tooltip with detailed earthquake info
- State management using:
  - Prop drilling
  - React Context API
  - Zustand global store

---

## 📦 Tech Stack

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Recharts**
- **PapaParse**
- **Zustand**
- **React Context API**

---

## ✅ Prerequisites

- Node.js (v16+ recommended)
- npm

---

## 🛠️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
