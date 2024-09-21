import { useEffect, useState } from 'react';
import HeaderNew from '../components/Common/HeaderNew';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchClientDataThunk, updateClientProfileThunk } from '../redux/clientSlice';
import { fetchClientJobs, selectClientJobs, selectClientJobsStatus, selectClientJobsError } from '../redux/jobsSlice';
import { logout } from '../redux/actions/authActions';
import { PencilIcon, ArrowRightOnRectangleIcon, BriefcaseIcon, PlusCircleIcon, GlobeAltIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'; // Updated import paths

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status, error } = useSelector((state) => state.client);
  const clientJobs = useSelector(selectClientJobs);
  const clientJobsStatus = useSelector(selectClientJobsStatus);
  const clientJobsError = useSelector(selectClientJobsError);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    website: ''
  });

  useEffect(() => {
    dispatch(fetchClientDataThunk());
    dispatch(fetchClientJobs());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        company_name: profile.company_name || '',
        website: profile.website || ''
      });
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      company_name: profile.company_name || '',
      website: profile.website || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(updateClientProfileThunk(formData));
    if (updateClientProfileThunk.fulfilled.match(resultAction)) {
      setIsEditing(false);
      dispatch(fetchClientDataThunk());
    } else {
      console.error('Profile update failed:', resultAction.payload);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePostJob = () => {
    navigate('/post-job');
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}/applications`);
  };

  if (status === 'loading' || clientJobsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || clientJobsStatus === 'failed') {
    return <div>Error: {error || clientJobsError}</div>;
  }

  return (
    
    <div className="container mx-auto p-6">
      <HeaderNew />
      <h1 className="text-3xl font-poppins mb-6">Dashboard</h1>
      
      {/* Profile Section */}
      <section className="bg-white  shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-poppins mb-4">Profile Summary</h2>
        {!isEditing ? (
          <>
            <p className="flex items-center font-roboto text-lg mb-4">
              <BuildingOffice2Icon className="h-6 w-6 text-gray-500 mr-2" />
              <strong>Company Name:</strong> {profile.company_name || 'Not specified'}
            </p>
            <p className="flex items-center text-lg mb-4">
              <GlobeAltIcon className="h-6 w-6 text-gray-500 mr-2" />
              <strong>Website:</strong> {profile.website || 'Not specified'}
            </p>
            <button 
              onClick={handleEditClick} 
              className="bg-[#5BC0BE] text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition"
            >
              Edit Profile
              <PencilIcon className="h-5 w-5 ml-2" />
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Company Name:</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Website:</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
              />
            </div>
            <div className="flex space-x-4">
              <button 
                type="submit" 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={handleCancelEdit} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Posted Jobs Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-poppins mb-4">Your Posted Jobs</h2>
        {clientJobs.length > 0 ? (
          <ul className="space-y-2">
            {clientJobs.map((job) => (
              <li 
                key={job.id} 
                onClick={() => handleJobClick(job.id)} 
                className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <BriefcaseIcon className="h-5 w-5 text-gray-500 mr-2 font-roboto" />
                {job.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No jobs posted yet.</p>
        )}
        <button 
          onClick={handlePostJob} 
          className="bg-[#5BC0BE] text-white px-4 py-2 rounded-lg flex items-center mt-4 hover:bg-green-600 transition"
        >
          Post a New Job
          <PlusCircleIcon className="h-5 w-5 ml-2" />
        </button>
      </section>

      {/* Applications Section */}
      

      {/* Logout and Profile Link */}
      <div className="flex justify-between items-center">
        <Link to={`/client/${profile.company_name}`} className="text-blue-500 hover:underline">
          View Public Profile
        </Link>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-600 transition"
        >
          Logout
          <ArrowRightOnRectangleIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ClientDashboard;
