import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CurrencyDollarIcon, BriefcaseIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; // Importing icons

const JobItem = ({ job }) => {
  if (!job) {
    return null; // or return a placeholder component
  }

  const renderSkills = (skills) => {
    if (!skills || skills.length === 0) return 'None specified';
    return skills.map(skill => (typeof skill === 'object' ? skill.name : skill)).join(', ');
  };

  const renderCategory = (category) => {
    if (typeof category === 'object' && category !== null) {
      return category.name;
    } else if (typeof category === 'string') {
      return category;
    }
    return 'Uncategorized';
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-black mb-2">
        {job.title || 'Untitled Job'}
      </h3>
      <p className="text-gray-600 mb-4">
        {(job.description && job.description.substring(0, 100)) || 'No description available'}...
      </p>
      
      {/* Pay and Category Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center text-[#5BC0BE] font-bold">
          <CurrencyDollarIcon className="h-5 w-5 mr-1" />
          Pay: ${parseFloat(job.pay) || 'N/A'}
        </span>
        <span className="flex items-center text-gray-500">
          <BriefcaseIcon className="h-5 w-5 mr-1" />
          Category: {renderCategory(job.category)}
        </span>
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <strong className="text-gray-700">Required Skills: </strong>
        <span className="text-gray-500">{renderSkills(job.required_skills)}</span>
      </div>

      {/* View Details Button */}
      <Link
        to={`/jobs/${job.id}`}
        className="inline-flex items-center bg-[#5BC0BE] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#3b9c9d] transition-colors"
      >
        View Details
        <ArrowRightIcon className="h-5 w-5 ml-2" />
      </Link>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    pay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow both string and number
    category: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ]),
    required_skills: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ])
    ),
  }).isRequired,
};

export default JobItem;

