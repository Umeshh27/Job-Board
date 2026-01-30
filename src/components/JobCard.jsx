import React from 'react';
import { Bookmark, MapPin, Building, Briefcase, DollarSign } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';

const JobCard = ({ job }) => {
  const { bookmarkedIds, toggleBookmark, viewMode } = useJobs();
  const isBookmarked = bookmarkedIds.includes(job.id);

  // Format salary
  const formattedSalary = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(job.salary);

  return (
    <div
      data-testid={`job-card-${job.id}`}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex ${
        viewMode === 'list' ? 'flex-row items-center gap-6' : 'flex-col gap-4'
      }`}
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Building className="w-4 h-4 mr-1" />
          <span className="mr-4">{job.company}</span>
          <MapPin className="w-4 h-4 mr-1" />
          <span>{job.type}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {job.skills.map(skill => (
            <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center text-green-700 font-semibold" data-testid="job-salary">
          <DollarSign className="w-4 h-4 mr-1" />
          {formattedSalary}
        </div>
      </div>

      <button
        data-testid={`bookmark-btn-${job.id}`}
        data-bookmarked={isBookmarked}
        onClick={(e) => {
          e.preventDefault();
          toggleBookmark(job.id);
        }}
        className={`p-2 rounded-full transition-colors ${
          isBookmarked
            ? 'bg-yellow-100 text-yellow-600'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this job"}
      >
        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};

export default JobCard;
