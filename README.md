Influencer Search & Shortlist Application
This is a production-ready influencer discovery application built with React, TypeScript, Vite, and Tailwind CSS. The project was developed as part of an assignment to modernize a starter influencer search dashboard, focusing on clean UI/UX, robust state management, and performance.

🚀 Live Demo
[https://vibe-coder-assignment-cop19hm2w-saurab4.vercel.app/]

🛠 Features Implemented
Modern UI/UX: Completely redesigned the interface using a "Glassmorphism" aesthetic with a consistent dark-mode theme, improved visual hierarchy, and responsive layout for mobile and desktop.

State Management: Migrated from React Context to Zustand for efficient, centralized state management.

Persistent Shortlist: Implemented a "Select & Add" feature that persists data across page reloads using browser local storage.

Performance Optimizations: * Applied memoization and efficient state handling to prevent unnecessary re-renders.

Optimized image loading with lazy loading and smart fallbacks.

Resolved layout shift issues with fixed-height card containers and robust text truncation.

Accessibility: Improved UI accessibility with screen-reader friendly labels and semantic HTML.

Dynamic Data Loading: Implemented async JSON loading for detailed profile views based on URL parameters.

📦 Tech Stack & Libraries
Core: React, TypeScript, Vite

Styling: Tailwind CSS

State Management: Zustand

Routing: React Router DOM

Utilities: Lucide React (for icons)

📋 Submission Checklist
[x] npm run build completes successfully

[x] Application is bug-free and responsive

[x] Repository is public

[x] State management switched to Zustand

[x] Shortlist feature implemented with persistence

[x] README documented with changes and trade-offs

🔧 Engineering Decisions & Trade-offs
Zustand vs Context: Switched to Zustand to reduce boilerplate and eliminate unnecessary re-renders triggered by top-level Context providers.

Responsive Strategy: Adopted a "Mobile-First" approach using Tailwind's breakpoint system to ensure the card grid and sidebar remain usable on small devices.

Dynamic Imports: Used await import() for detailed profile data to keep the initial bundle size small, only loading detailed stats when a user clicks a specific profile.

💡 How to Run
Bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Create production build
npm run build
📝 Remaining Improvements / Future Scope
Adding search/filter persistence in the URL params for easier sharing of search results.

Implementing unit tests using Vitest to verify the data filtering logic.

Adding micro-animations via Framer Motion for a smoother transition between search results and the shortlist.

Built with care by saurab gautam 
