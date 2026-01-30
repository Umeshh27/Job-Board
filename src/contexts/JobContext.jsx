import { createContext, useContext, useEffect, useState, useMemo } from "react";
import mockJobs from "../data/mock-data.json";

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    type: "",      // "Remote", "Hybrid", "Onsite"
    skills: [],    // Array of strings
    salaryRange: [0, 3000000], 
    search: "",
  });
  const [sort, setSort] = useState(""); // "salary-desc" or ""
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem("bookmarkedJobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // Load jobs
  useEffect(() => {
    setJobs(mockJobs);
  }, []);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      skills: [],
      salaryRange: [0, 3000000],
      search: "",
    });
    setSort("");
  };

  // Derived state: Filtered Jobs
  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Filter by Type
    if (filters.type) {
      result = result.filter((job) => job.type === filters.type);
    }

    // Filter by Skills (must have ALL selected)
    if (filters.skills.length > 0) {
      result = result.filter((job) =>
        filters.skills.every((skill) => job.skills.includes(skill))
      );
    }

    // Filter by Salary
    result = result.filter(
      (job) =>
        job.salary >= filters.salaryRange[0] &&
        job.salary <= filters.salaryRange[1]
    );
    // Wait, typo in logic above: filters.filtersRange? should be filters.salaryRange
    
    // Filter by Search
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sort === "salary-desc") {
      result = [...result].sort((a, b) => b.salary - a.salary);
    }

    return result;
  }, [jobs, filters, sort]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        filters,
        setFilters,
        sort,
        setSort,
        bookmarkedIds,
        toggleBookmark,
        viewMode,
        setViewMode,
        filteredJobs,
        clearFilters
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
