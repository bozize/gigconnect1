import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline'; // Correct import for v2

const FreelancerItem = ({ freelancer }) => {
  return (
    <div className="border p-2 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-xs">
      <div className="flex items-center mb-2">
        <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">{freelancer.user.username}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{freelancer.bio.substring(0, 100)}...</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {freelancer.skills.map(skill => (
          <span key={skill.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
            <BriefcaseIcon className="h-3 w-3 inline-block mr-1" /> {skill.name}
          </span>
        ))}
      </div>

      <Link to={`/freelancers/${freelancer.id}`} className="text-white  bg-[#5BC0BE] rounded p-1 text-sm">
        View Profile
      </Link>
    </div>
  );
};

FreelancerItem.propTypes = {
  freelancer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    bio: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default FreelancerItem;




