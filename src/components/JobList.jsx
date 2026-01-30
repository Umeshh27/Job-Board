import React, { useState, useEffect } from 'react';
import { LayoutGrid, List as ListIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
import JobCard from './JobCard';

const ITEMS_PER_PAGE = 10;

const JobList = ({ jobs, showViewToggle = true }) => {
  const { viewMode, setViewMode } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filtered jobs change
  useEffect(() => {
    setCurrentPage(1);
  }, [jobs.length]); // Dependency on jobs.length or jobs implies reset logic

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div>
      {/* View Toggle & Count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Showing {jobs.length} Jobs
        </h2>
        {showViewToggle && (
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              data-testid="grid-view-btn"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              data-testid="list-view-btn"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label="List View"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Check if no jobs */}
      {jobs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <>
          {/* Job Container */}
          <div
            data-testid="job-list-container"
            data-view-mode={viewMode}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2' // Adjust cols as needed
                : 'grid-cols-1'
            }`}
          >
            {currentJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div data-testid="pagination-controls" className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                data-testid="pagination-next"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobList;
