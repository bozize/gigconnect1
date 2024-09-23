import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserIcon, BriefcaseIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const FreelancerProfile = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancerProfile = async () => {
      try {
        const response = await axios.get(`https://gigconnects.onrender.com/api/freelancers/${id}/`);
        setFreelancer(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch freelancer profile');
        setLoading(false);
      }
    };

    fetchFreelancerProfile();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;
  if (!freelancer) return <div className="text-center mt-4">No freelancer found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white  rounded-lg">
      <div className="flex items-center mb-6">
        <UserIcon className="w-10 h-10 text-gray-500 mr-4" />
        <h1 className="text-4xl font-poppins  text-gray-900">{freelancer.user.username}s Profile</h1>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <BriefcaseIcon className="w-6 h-6 text-gray-600 mr-2" />
          <h2 className="text-2xl font-light font-poppins text-gray-800">Bio</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">{freelancer.bio}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <BriefcaseIcon className="w-6 h-6 text-gray-600 mr-2" />
          <h2 className="text-2xl font-light font-poppins text-gray-800">Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {freelancer.skills.map(skill => (
            <span key={skill.id} className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <BriefcaseIcon className="w-6 h-6 text-gray-500 mr-2" />
          <h2 className="text-2xl font-light font-poppins text-gray-800">Job Categories</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {freelancer.job_categories.map(category => (
            <span key={category.id} className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-2">
          <EnvelopeIcon className="w-6 h-6 text-black-600 mr-2" />
          <h2 className="text-2xl font-light font-poppins text-gray-800">Contact</h2>
        </div>
        <p className="text-lg text-gray-700">
          <span className="font-medium font-roboto">Email:</span> {freelancer.user.email}
        </p>
      </div>
    </div>
  );
};

export default FreelancerProfile;


