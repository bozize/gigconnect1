import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const JobCategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (category?.id) {
      navigate(`/categories/${category.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick} 
      onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
      role="button"
      tabIndex={0}
      className="cursor-pointer p-10 bg-gray-100 rounded-lg  hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1" 
    >
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name || 'No name available'}</h3>
      </div>
    </div>
  );
};
  
JobCategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default JobCategoryItem;

