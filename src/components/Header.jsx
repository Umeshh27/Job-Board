import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Bookmark } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">JobBoard</span>
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Find Jobs
            </Link>
            <Link
              to="/tracker"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 ${
                location.pathname === '/tracker' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Jobs</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
