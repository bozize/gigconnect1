import { useState, useEffect } from 'react';
import HeaderNew from '../components/Common/HeaderNew';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createJobThunk } from '../redux/jobsSlice';
import { 
  getJobCategories, 
  getSkills,
  selectAllJobCategories, 
  selectAllSkills,
  selectJobCategoriesStatus, 
  selectJobCategoriesError,
  selectSkillStatus,
  selectSkillError
} from '../redux/jobcatSlice';

import { BriefcaseIcon, CurrencyDollarIcon, DocumentTextIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const JobPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    pay: '',
    category: '',
    required_skills: [],
    level_of_expertise: '',
  });

  const jobCategories = useSelector(selectAllJobCategories);
  const skills = useSelector(selectAllSkills);
  const jobCategoriesStatus = useSelector(selectJobCategoriesStatus);
  const jobCategoriesError = useSelector(selectJobCategoriesError);
  const skillStatus = useSelector(selectSkillStatus);
  const skillError = useSelector(selectSkillError);
  const { createJobStatus, createJobError } = useSelector((state) => state.jobs || {});

  // Fetch job categories and skills
  useEffect(() => {
    if (jobCategoriesStatus === 'idle' || jobCategories.length === 0) {
      dispatch(getJobCategories());
    }
    if (skillStatus === 'idle' || skills.length === 0) {
      dispatch(getSkills());
    }
  }, [jobCategoriesStatus, skillStatus, jobCategories.length, skills.length, dispatch]);

  // Handle success or failure of job posting
  useEffect(() => {
    if (createJobStatus === 'succeeded') {
      setJobData({
        title: '',
        description: '',
        pay: '',
        category: '',
        required_skills: [],
        level_of_expertise: '',
      });
      navigate('/client-dashboard');
    } else if (createJobStatus === 'failed') {
      console.error('Failed to post job:', createJobError);
    }
  }, [createJobStatus, createJobError, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  // Handle skill selection change
  const handleSkillChange = (skillId) => {
    setJobData((prevData) => {
      const isSkillSelected = prevData.required_skills.includes(skillId);
      const updatedSkills = isSkillSelected 
        ? prevData.required_skills.filter((id) => id !== skillId)
        : [...prevData.required_skills, skillId];
      return { ...prevData, required_skills: updatedSkills };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJobThunk(jobData));
  };

  // Display loading or error messages
  if (jobCategoriesStatus === 'loading' || skillStatus === 'loading') return <div>Loading...</div>;
  if (jobCategoriesError) return <div>Error loading job categories: {jobCategoriesError}</div>;
  if (skillError) return <div>Error loading skills: {skillError}</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white-50">
      <HeaderNew />
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            <span className="text-black-600 font-poppins">Post a New Job</span>
          </h1>
          <p className="mt-4 text-gray-600">Fill in the details below to create a new job listing.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
          
          {/* Job Title */}
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6 text-[#5BC0BE]" />
            <label htmlFor="title" className="text-lg font-medium text-gray-900">Job Title</label>
          </div>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Job Description */}
          <div className="flex items-center space-x-2">
            <DocumentTextIcon className="h-6 w-6 text-[#5BC0BE]" />
            <label htmlFor="description" className="text-lg font-medium text-gray-900">Job Description</label>
          </div>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
          />

          {/* Pay/Budget */}
          <div className="flex items-center space-x-2">
            <CurrencyDollarIcon className="h-6 w-6 text-[#5BC0BE]" />
            <label htmlFor="pay" className="text-lg font-medium text-black">Budget</label>
          </div>
          <input
            type="number"
            id="pay"
            name="pay"
            value={jobData.pay}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Level of Expertise */}
          <div className="flex items-center space-x-2">
            <ClipboardDocumentIcon className="h-6 w-6 text-[#5BC0BE]" />
            <label htmlFor="level_of_expertise" className="text-lg font-medium text-black">Level of Expertise</label>
          </div>
          <select
            id="level_of_expertise"
            name="level_of_expertise"
            value={jobData.level_of_expertise}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a level</option>
            <option value="Entry">Entry</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          {/* Job Category */}
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6 text-[#5BC0BE]" />
            <label htmlFor="category" className="text-lg font-medium text-black-600">Job Category</label>
          </div>
          <select
            id="category"
            name="category"
            value={jobData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            {jobCategories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          {/* Required Skills (Checkboxes) */}
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6 text-[#5BC0BE]" />
            <label className="text-lg font-medium text-gray-900">Required Skills</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`skill-${skill.id}`}
                  value={skill.id}
                  checked={jobData.required_skills.includes(skill.id)}
                  onChange={() => handleSkillChange(skill.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={`skill-${skill.id}`} className="ml-2 text-sm text-gray-700">
                  {skill.name}
                </label>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button 
              type="submit" 
              className="w-full py-3 bg-[#5BC0BE] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default JobPostPage;



