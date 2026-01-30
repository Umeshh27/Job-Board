import React from 'react';
import FilterSidebar from '../components/FilterSidebar';
import JobList from '../components/JobList';
import { useJobs } from '../contexts/JobContext';

const HomePage = () => {
  const { filteredJobs } = useJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
           {/* Sticky sidebar on large screens */}
           <div className="lg:sticky lg:top-24">
             <FilterSidebar />
           </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          <JobList jobs={filteredJobs} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
