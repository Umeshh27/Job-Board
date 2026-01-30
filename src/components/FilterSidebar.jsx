import React, { useMemo } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useJobs } from '../contexts/JobContext';

const FilterSidebar = () => {
  const { 
    filters, 
    setFilters, 
    jobs, 
    clearFilters, 
    sort, 
    setSort 
  } = useJobs();

  // Extract unique skills from all jobs
  const allSkills = useMemo(() => {
    const skills = new Set();
    jobs.forEach(job => job.skills.forEach(s => skills.add(s)));
    return Array.from(skills).sort();
  }, [jobs]);

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (type) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleSkillChange = (skill) => {
    setFilters(prev => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
  };

  const handleSalaryChange = (value) => {
    setFilters(prev => ({ ...prev, salaryRange: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search items..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter by Type */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Job Type</h3>
        <div className="space-y-2">
           <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="jobType"
              value=""
              checked={filters.type === ""}
              onChange={() => handleTypeChange("")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">All Types</span>
          </label>
          {['Remote', 'Hybrid', 'Onsite'].map(type => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="jobType"
                value={type}
                data-testid={`filter-job-type-${type.toLowerCase()}`}
                checked={filters.type === type}
                onChange={() => handleTypeChange(type)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter by Skills */}
      <div data-testid="filter-skills">
        <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
        <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-100 p-2 rounded">
          {allSkills.map(skill => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter by Salary */}
      <div data-testid="filter-salary-slider">
        <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Salary Range</h3>
            <span className="text-xs text-gray-500">
                ₹{(filters.salaryRange[0]/100000).toFixed(1)}L - ₹{(filters.salaryRange[1]/100000).toFixed(1)}L
            </span>
        </div>
        <Slider
          range
          min={0}
          max={3000000}
          step={1000}
          value={filters.salaryRange}
          onChange={handleSalaryChange}
          trackStyle={[{ backgroundColor: '#3b82f6' }]}
          handleStyle={[
            { borderColor: '#3b82f6', backgroundColor: '#fff' },
            { borderColor: '#3b82f6', backgroundColor: '#fff' }
          ]}
        />
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
        <select
          data-testid="sort-salary-desc"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Default</option>
          <option value="salary-desc">Salary (High to Low)</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        data-testid="clear-filters-btn"
        onClick={clearFilters}
        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
