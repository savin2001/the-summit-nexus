# The Summit Nexus

**A Unified Tech & Security Intelligence Platform**

The Summit Nexus is a modern, high-performance web application connecting tech executives with strategic insights, sector trends, and exclusive C-Suite networking events. It combines practical tech knowledge with high-level sector management in a secure, professional digital environment.

## 🚀 Features

*   **Cyber-Corporate Aesthetic**: A professional dark-themed UI with sleek glassmorphism effects, animated grids, and "Security Blue" accents.
*   **Strategic Sectors**: A responsive grid showcasing critical tech pillars like AI, Cyber Defense, and Quantum Computing.
*   **Knowledge Hub**: A filterable insights section featuring "How-to" guides, Security Alerts, and Market Trends.
*   **Event Calendar**: A comprehensive list of global C-Level summits with registration capabilities and exclusive access indicators.
*   **Executive Portal**: A restricted access dashboard with simulated secure login (Admin/Executive roles) and **AI-powered strategic briefings** using the Google Gemini API.
*   **Responsive Design**: Fully optimized for mobile and desktop experiences with light/dark mode toggling.

## 🛠️ Tech Stack

*   **Frontend**: React (v19), TypeScript
*   **Styling**: Tailwind CSS (PostCSS pipeline)
*   **Build Tool**: Vite
*   **Icons**: Lucide React
*   **AI Integration**: Google Gemini API (`@google/genai`)

## ⚙️ Setup & Deployment

### Local Development
1.  Run `npm install`
2.  Run `npm run dev`

### Environment Variables
To enable the AI Strategic Briefing feature in the Executive Portal, you must provide a valid Google Gemini API Key.

*   `API_KEY`: Your Google GenAI API key.

### Netlify Deployment
This project is configured as a Vite SPA.
1.  Connect your repository to Netlify.
2.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
3.  **Environment Variables**:
    *   Go to **Site Configuration > Environment Variables**.
    *   Add `API_KEY` with your actual Google Gemini API key.

## 🎨 Visual Identity

The design language revolves around "Intelligence" and "Security":
*   **Primary Colors**: Nexus Blue (`#0ea5e9`), Cyan Glow (`#22d3ee`), Slate Dark (`#0f172a`).
*   **Typography**: Inter (UI) and Fira Code (Data/Technical elements).

## 🔮 User Roles (Simulation)

The Executive Portal simulates a secure login. You can use the "Quick Simulation Access" buttons to login as:
*   **Admin**: Full access, including the ability to deploy (create) new events.
*   **Executive**: Read-only access to dashboards and exclusive content.

---
*Concept inspired by TechWiser, Clarion Events, and Next IT Security.*