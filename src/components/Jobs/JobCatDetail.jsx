import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobCategoryDetails } from '../../apis/jobcatAPI';
import { filteredFreelancers } from '../../redux/freelancerSlice';
import FreelancerItem from './FreelancerItem';

const JobCategoryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [jobCategoryDetails, setJobCategoryDetails] = useState(null);
  const [error, setError] = useState(null);
  const { filteredFreelancers: freelancers, status: freelancersStatus } = useSelector(state => state.freelancer);

  useEffect(() => {
    const getJobCategoryDetails = async () => {
      try {
        const data = await fetchJobCategoryDetails(id);
        setJobCategoryDetails(data);
        dispatch(filteredFreelancers(id));
      } catch (error) {
        setError('No job category details available.');
      }
    };

    if (id && id !== 'undefined') {
      getJobCategoryDetails();
    } else {
      setError('Invalid job category ID.');
    }
  }, [id, dispatch]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!jobCategoryDetails || freelancersStatus === 'loading') {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <Header />
    <section className="p-6 bg-white shadow-sm rounded-lg max-w-6xl mx-auto mt-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">Home</Link> &gt; <Link to="/categories" className="hover:text-blue-600">Job Categories</Link> &gt; <span>{jobCategoryDetails.name}</span>
      </nav>

      {/* Job Category Info Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">{jobCategoryDetails.name}</h2>
        <p className="text-gray-700 leading-relaxed">{jobCategoryDetails.description}</p>
      </div>

      {/* Featured Freelancer */}
      <div className="mb-12 bg-blue-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Featured Freelancer</h3>
        {freelancers && freelancers.length > 0 ? (
          <div className="flex items-center">
           
            <div>
              <h4 className="text-lg font-semibold">{freelancers[0].user.username}</h4>
              <p className="text-gray-600">{freelancers[0].bio.substring(0, 80)}...</p>
              <Link to={`/freelancers/${freelancers[0].id}`} className="text-white  bg-[#5BC0BE] rounded p-1 text-sm">View Profile</Link>
            </div>
          </div>
        ) : (
          <p>No featured freelancer available.</p>
        )}
      </div>

      {/* Category Stats */}
      <div className="mb-12 bg-gray-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Category Stats</h3>
        <ul className="text-gray-700 space-y-2">
          <li><strong>Number of Freelancers:</strong> {freelancers.length}</li>
          <li><strong>Completed Projects:</strong> {Math.floor(Math.random() * 1000)}</li>
          <li><strong>Average Rating:</strong> {Math.random().toFixed(2) * 5} ⭐</li>
        </ul>
      </div>

      {/* Freelancers Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Freelancers in this Category</h3>
        {freelancers && freelancers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {freelancers.map(freelancer => (
              <FreelancerItem key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">No freelancers available for this category.</p>
        )}
      </div>

      {/* Related Job Categories */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Job Categories</h3>
        <div className="flex space-x-4 overflow-x-auto py-2">
          <Link to="/categories/tech" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
            Tech
          </Link>
          <Link to="/categories/marketing" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
            Marketing
          </Link>
          <Link to="/categories/design" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
            Design
          </Link>
          <Link to="/categories/writing" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
            Writing
          </Link>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="mb-12 bg-yellow-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">What Clients Are Saying</h3>
        <div className="space-y-4">
          <div>
            <p className="text-gray-700 italic">I found the perfect freelancer for my project! The platform is easy to use, and the quality of work was excellent</p>
            <p className="text-gray-500 text-sm mt-1">- John Doe, CEO of XYZ Corp</p>
          </div>
          <div>
            <p className="text-gray-700 italic">The freelancers in this category are highly skilled. Im extremely satisfied with the results</p>
            <p className="text-gray-500 text-sm mt-1">- Jane Smith, Marketing Director</p>
          </div>
        </div>
      </div>
    </section>
    <section   className="p-20 w-full  text-white text-center mx-auto mb-0 lg:mb-0 mt-2 pt-12 "><Footer /></section>
    </div>
  );
};

export default JobCategoryDetail;



//"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-roboto gap-6  px-4 sm:px-6 lg:px-16"










