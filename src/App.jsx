import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './contexts/JobContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TrackerPage from './pages/TrackerPage';

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tracker" element={<TrackerPage />} />
            </Routes>
            <footer className="bg-white border-t border-gray-200 mt-auto py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    &copy; 2026 Partnr. All rights reserved.
                </div>
            </footer>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;
