import { useEffect, useState, useCallback } from 'react';
import HeaderNew from '../components/Common/HeaderNew';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchFreelancerDataThunk, updateFreelancerProfile, fetchSkillsThunk, fetchJobCategoriesThunk } from '../redux/freelancerSlice';
import { fetchFreelancerJobApplications, selectFreelancerJobApplications, selectFreelancerJobApplicationsStatus, selectFreelancerJobApplicationsError } from '../redux/jobsSlice';
import { logout } from '../redux/actions/authActions';                          
import { PencilSquareIcon, CheckIcon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';


const FreelancerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status, error, availableSkills, availableJobCategories } = useSelector((state) => state.freelancer);
  const freelancerJobApplications = useSelector(selectFreelancerJobApplications);
  const freelancerJobApplicationsStatus = useSelector(selectFreelancerJobApplicationsStatus);
  const freelancerJobApplicationsError = useSelector(selectFreelancerJobApplicationsError);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: [],
    jobCategories: []
  });

  const updateFormData = useCallback(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || '',
        skills: profile.skills?.map(skill => skill.id) || [],
        jobCategories: profile.job_categories?.map(category => category.id) || []
      });
    }
  }, [profile]);

  useEffect(() => {
    dispatch(fetchFreelancerDataThunk());
    dispatch(fetchSkillsThunk());
    dispatch(fetchJobCategoriesThunk());
    dispatch(fetchFreelancerJobApplications());
  }, [dispatch]);

  useEffect(() => {
    updateFormData();
  }, [profile, updateFormData]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleEditClick = () => {
    setIsEditing(true);
    updateFormData();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    updateFormData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      bio: formData.bio,
      skills: formData.skills,
      job_categories: formData.jobCategories
    };
    try {
      const resultAction = await dispatch(updateFreelancerProfile(updatedFormData));
      if (updateFreelancerProfile.fulfilled.match(resultAction)) {
        setIsEditing(false);
        dispatch(fetchFreelancerDataThunk());
      } else {
        throw new Error('Profile update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const values = Array.from(selectedOptions, option => parseInt(option.value, 10));
      setFormData(prevData => ({
        ...prevData,
        [name]: values
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <HeaderNew />
      <h1 className="text-3xl font-semibold text-black font-poppins mb-6">
        Welcome, {profile.user?.username || 'Freelancer'}!
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-black font-poppins mb-4">Profile Summary</h2>
        {!isEditing ? (
          <>
            <p className="mb-2 font-roboto"><strong>Bio:</strong> {profile.bio || 'No bio available'}</p>
            <p className="mb-2 font-roboto"><strong>Skills:</strong> {profile.skills?.map(skill => skill.name).join(', ') || 'No skills listed'}</p>
            <p className="mb-4 font-roboto"><strong>Job Categories:</strong> {profile.job_categories?.map(category => category.name).join(', ') || 'No categories listed'}</p>
            <button className="bg-[#5BC0BE] text-white py-2 px-4 rounded inline-flex items-center" onClick={handleEditClick}>
              <PencilSquareIcon className="h-5 w-5 mr-2" /> Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block mb-4 font-poppins font-bold">
              Bio:
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-4 font-poppins font-bold">
              Skills:
              <div className="flex flex-wrap">
                {availableSkills.map(skill => (
                  <div key={skill.id} className="mr-4 mb-2 flex items-center font-roboto font-light">
                    <input
                      type="checkbox"
                      id={`skill-${skill.id}`}
                      name="skills"
                      value={skill.id}
                      checked={formData.skills.includes(skill.id)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setFormData(prevData => ({
                          ...prevData,
                          skills: e.target.checked
                            ? [...prevData.skills, value]
                            : prevData.skills.filter(id => id !== value)
                        }));
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`skill-${skill.id}`}>{skill.name}</label>
                  </div>
                ))}
              </div>
            </label>
            <label className="block mb-6 font-poppins font-bold">
              Job Categories:
              <div className="flex flex-wrap">
                {availableJobCategories.map(category => (
                  <div key={category.id} className="mr-4 mb-2 flex items-center font-roboto font-light">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      name="jobCategories"
                      value={category.id}
                      checked={formData.jobCategories.includes(category.id)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setFormData(prevData => ({
                          ...prevData,
                          jobCategories: e.target.checked
                            ? [...prevData.jobCategories, value]
                            : prevData.jobCategories.filter(id => id !== value)
                        }));
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category.id}`}>{category.name}</label>
                  </div>
                ))}
              </div>
            </label>
            <div className="flex space-x-4">
              <button className="bg-[#5BC0BE] text-white py-2 px-4 rounded inline-flex items-center" type="submit">
                <CheckIcon className="h-5 w-5 mr-2" /> Save Changes
              </button>
              <button className="bg-gray-500 text-white py-2 px-4 rounded inline-flex items-center" type="button" onClick={handleCancelEdit}>
                <XMarkIcon className="h-5 w-5 mr-2" /> Cancel
              </button>
            </div>
          </form>
        )}
      </section>
      <section className="mb-6">
  
  <Link
    to="/jobs"
    className="bg-[#5BC0BE] text-white py-2 px-4 rounded inline-flex items-center"
  >
    Browse All Jobs
  </Link>
</section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-black font-poppins mb-4">Your Job Applications</h2>
        {freelancerJobApplicationsStatus === 'loading' && <p>Loading job applications...</p>}
        {freelancerJobApplicationsStatus === 'failed' && <p>Error: {freelancerJobApplicationsError}</p>}
        {freelancerJobApplicationsStatus === 'succeeded' && (
          freelancerJobApplications.length > 0 ? (
            <ul className="space-y-4">
              {freelancerJobApplications.map((application) => (
                <li key={application.id} className="border p-4 rounded shadow">
                  <h3 className="font-semibold font-poppins">{application.job_title}</h3>
                  <p className="font-roboto">Status: {application.status}</p>
                  <p className="font-roboto">Proposed Pay: ${application.proposed_pay}</p>
                  <p className="font-roboto">Estimated Completion Time: {application.estimated_completion_time}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job applications found.</p>
          )
        )}
      </section>
      


      <section>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded inline-flex items-center"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> Logout
        </button>
      </section>
    </div>
  );
};

export default FreelancerDashboard;
