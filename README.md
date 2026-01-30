# Partnr Job Board Application

A feature-rich, responsive job board application built with React, Tailwind CSS, and Docker. This project demonstrates advanced client-side filtering, state management, and containerization.

## 🚀 Features

- **Job Listings**: Browse available jobs with a clean, responsive UI.
- **View Modes**: Toggle between Grid and List layouts.
- **Advanced Filtering**:
  - **Search**: Filter by job title or company name.
  - **Job Type**: Filter by Remote, Hybrid, or Onsite roles.
  - **Skills**: Multi-select filter (shows jobs containing _all_ selected skills).
  - **Salary Range**: Interactive slider to filter by salary (in INR ₹).
- **Sorting**: Sort jobs by Salary (High to Low).
- **Bookmarking**: Save jobs to a "Tracker" list (persisted via LocalStorage).
- **Pagination**: Client-side pagination for smooth navigation.

## 🛠️ Tech Stack

- **Frontend**: React 19 (Vite), Tailwind CSS 3.4
- **State Management**: React Context API
- **Icons**: Lucide React
- **UI Components**: rc-slider (for Range Slider)
- **Containerization**: Docker, Docker Compose

## 📦 How to Run

### Prerequisites

- Docker & Docker Compose installed on your machine.
- OR Node.js (v18+) for local execution.

### Using Docker (Recommended)

1.  **Build and Start**:
    ```bash
    docker-compose up --build
    ```
2.  **Access the App**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
3.  **Access**:
    Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal).

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (JobCard, FilterSidebar, etc.)
├── contexts/        # Global state (JobContext)
├── data/            # Mock data (jobs list)
├── pages/           # Page views (HomePage, TrackerPage)
└── App.jsx          # Main application component & Routing
```

## ✅ Verification

- **API/Health Check**: The application acts as a static client served by Vite. You can verify it is running by sending a GET request to `http://localhost:3000`.
- **Functionality**:
  - Select "Remote" to see only remote jobs.
  - Drag the salary slider to filter by LPA.
  - Click the bookmark icon and check the "Saved Jobs" page.
