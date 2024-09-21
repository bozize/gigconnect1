import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobDetails, selectJobDetails, selectJobStatus, selectJobError, applyForJob, selectApplicationStatus, selectApplicationError } from '../../redux/jobsSlice';
import { CurrencyDollarIcon, BriefcaseIcon, CalendarIcon, PencilIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'; // Importing icons

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jobDetails = useSelector((state) => selectJobDetails(state, id));
  const status = useSelector(selectJobStatus);
  const error = useSelector(selectJobError);
  const applicationStatus = useSelector(selectApplicationStatus);
  const applicationError = useSelector(selectApplicationError);
  const userInfo = useSelector((state) => state.login.userInfo);
  const isFreelancer = userInfo?.role === 'FREELANCER';
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedPay, setProposedPay] = useState('');
  const [estimatedCompletionTime, setEstimatedCompletionTime] = useState('');
  const [estimatedCompletionTimeUnit, setEstimatedCompletionTimeUnit] = useState('days');

  useEffect(() => {
    if (!jobDetails) {
      dispatch(fetchJobDetails(id));
    }
  }, [dispatch, id, jobDetails]);

  const handleApplyClick = () => {
    if (isFreelancer) {
      setShowApplicationForm(true);
    } else {
      alert('Only freelancers can apply for jobs');
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (isFreelancer) {
      try {
        await dispatch(applyForJob({
          jobId: id,
          coverLetter,
          proposedPay,
          estimatedCompletionTime: parseInt(estimatedCompletionTime, 10),
          estimatedCompletionTimeUnit,
          status: 'pending'
        })).unwrap();
        alert('Application submitted successfully!');
        setShowApplicationForm(false);
      } catch (err) {
        console.error('Application submission error:', err);
        alert(`Failed to submit application: ${err.message || 'Please try again.'}`);
      }
    } else {
      alert('Only freelancers can submit an application');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (!jobDetails) return <div>Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-black mb-4">{jobDetails.title || 'Untitled Job'}</h1>
      <p className="text-gray-600 mb-6">{jobDetails.description || 'No description available'}</p>
      
      {/* Pay and Category Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center text-[#5BC0BE] font-semibold">
          <CurrencyDollarIcon className="h-6 w-6 mr-2" />
          Pay: ${jobDetails.pay || 'N/A'}
        </span>
        <span className="flex items-center text-gray-500">
          <BriefcaseIcon className="h-6 w-6 mr-2" />
          Category: {jobDetails.category || 'Uncategorized'}
        </span>
      </div>

      {/* Required Skills Section */}
      <p className="text-gray-700 mb-4">
        <strong>Required Skills:</strong> {jobDetails.required_skills && Array.isArray(jobDetails.required_skills) 
          ? jobDetails.required_skills.join(', ') 
          : 'No skills specified'}
      </p>

      {/* Posted by and Date Section */}
      <div className="flex items-center text-gray-500 mb-6">
        <CalendarIcon className="h-6 w-6 mr-2" />
        <p>Posted by: {jobDetails.client || 'Unknown'} on {jobDetails.created_at 
            ? new Date(jobDetails.created_at).toLocaleDateString() 
            : 'Unknown date'}</p>
      </div>

      {!showApplicationForm && (
        <button 
          onClick={handleApplyClick} 
          className="bg-[#5BC0BE] text-white py-2 px-4 rounded-lg font-semibold flex items-center hover:bg-[#3b9c9d] transition"
        >
          Apply for this job
          <PaperAirplaneIcon className="h-5 w-5 ml-2" />
        </button>
      )}

      {showApplicationForm && (
        <form onSubmit={handleSubmitApplication} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write a cover letter..."
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Proposed Pay</label>
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-400" />
              <input
                type="number"
                value={proposedPay}
                onChange={(e) => setProposedPay(e.target.value)}
                placeholder="Proposed Pay"
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Estimated Completion Time</label>
            <div className="flex items-center">
              <input
                type="number"
                value={estimatedCompletionTime}
                onChange={(e) => setEstimatedCompletionTime(e.target.value)}
                placeholder="Estimated Time"
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]"
                required
              />
              <select
                value={estimatedCompletionTimeUnit}
                onChange={(e) => setEstimatedCompletionTimeUnit(e.target.value)}
                className="border rounded-lg p-3 ml-4 focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]"
                required
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="bg-[#5BC0BE] text-white py-2 px-4 rounded-lg font-semibold flex items-center hover:bg-[#3b9c9d] transition"
            disabled={applicationStatus === 'loading'}
          >
            {applicationStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
            <PencilIcon className="h-5 w-5 ml-2" />
          </button>

          {applicationStatus === 'failed' && (
            <p className="text-red-500">Error: {applicationError}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default JobDetails;

