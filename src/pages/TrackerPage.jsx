import React from 'react';
import JobList from '../components/JobList';
import { useJobs } from '../contexts/JobContext';
import { Link } from 'react-router-dom';

const TrackerPage = () => {
  const { jobs, bookmarkedIds } = useJobs();

  const bookmarkedJobs = jobs.filter(job => bookmarkedIds.includes(job.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Jobs</h1>
      
      {bookmarkedJobs.length > 0 ? (
        <JobList jobs={bookmarkedJobs} showViewToggle={true} />
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg mb-4">You haven't bookmarked any jobs yet.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default TrackerPage;
