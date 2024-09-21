import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobApplications, selectJobApplications, selectJobApplicationsStatus, selectJobApplicationsError } from '../../redux/jobsSlice';
import { UserIcon, CurrencyDollarIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const JobApplications = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const applications = useSelector(selectJobApplications);
  const status = useSelector(selectJobApplicationsStatus);
  const error = useSelector(selectJobApplicationsError);

  useEffect(() => {
    dispatch(fetchJobApplications(jobId));
  }, [dispatch, jobId]);

  if (status === 'loading') return <div className="text-center">Loading...</div>;
  if (status === 'failed') return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-black mb-6">Job Applications</h1>
      {applications.length === 0 ? (
        <p className="text-gray-500">No applications found.</p>
      ) : (
        <ul className="space-y-6">
          {applications.map((application) => (
            <li key={application.id} className="border border-gray-300 rounded-lg p-4 shadow-md">
              <div className="mb-2 flex items-center">
                <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
                <p className="text-lg font-medium">Applicant: {application.
user_username
}</p>
              </div>
              <div className="mb-2">
                <ExclamationCircleIcon className="h-5 w-5 text-gray-600 inline mr-2" />
                <p><strong>Cover Letter:</strong> {application.cover_letter}</p>
              </div>
              <div className="mb-2 flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-600 mr-2" />
                <p><strong>Proposed Pay:</strong> ${application.proposed_pay}</p>
              </div>
              <div className="mb-2 flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-600 mr-2" />
                <p><strong>Estimated Completion Time:</strong> {application.estimated_completion_time}</p>
              </div>
              <div className="flex items-center">
                <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-2" />
                <p><strong>Status:</strong> {application.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplications;

