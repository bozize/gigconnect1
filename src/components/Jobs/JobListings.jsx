import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, fetchJobsFiltered } from '../../redux/jobsSlice';
import { getJobCategories, getSkills } from '../../redux/jobcatSlice';
import JobItem from './JobItem';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'; // Updated imports

const JobListings = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const jobCategories = useSelector((state) => state.jobCategories.categories);
  const skills = useSelector((state) => state.jobCategories.skills);
  const status = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);

  const [filters, setFilters] = useState({
    category: '',
    skill: '',
    minPay: '',
    maxPay: ''
  });

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(getJobCategories());
    dispatch(getSkills());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    dispatch(fetchJobsFiltered(filters));
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg">Loading jobs...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error && typeof error === 'object' ? JSON.stringify(error) : error}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8 text-center">Job Listings</h2>
        
        {/* Filters Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center w-full sm:w-1/4">
              <FunnelIcon className="h-6 w-6 text-gray-500 mr-2" />
              <select
                name="category"
                onChange={handleFilterChange}
                value={filters.category}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BC0BE] outline-none"
              >
                <option value="">All Categories</option>
                {jobCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center w-full sm:w-1/4">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 mr-2" />
              <select
                name="skill"
                onChange={handleFilterChange}
                value={filters.skill}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BC0BE] outline-none"
              >
                <option value="">All Skills</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="number"
              name="minPay"
              placeholder="Min Pay"
              onChange={handleFilterChange}
              value={filters.minPay}
              className="w-full sm:w-1/5 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BC0BE] outline-none"
            />

            <input
              type="number"
              name="maxPay"
              placeholder="Max Pay"
              onChange={handleFilterChange}
              value={filters.maxPay}
              className="w-full sm:w-1/5 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BC0BE] outline-none"
            />

            <button
              onClick={applyFilters}
              className="w-full sm:w-auto bg-[#5BC0BE] text-white py-2 px-4 rounded-lg hover:bg-[#3b9c9d] transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => <JobItem key={job.id} job={job} />)
          ) : (
            <div className="col-span-full text-center text-gray-600">No jobs available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
