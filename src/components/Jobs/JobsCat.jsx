import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobCategories, selectAllJobCategories, selectJobCategoriesStatus, selectJobCategoriesError } from '../../redux/jobcatSlice';
import JobCategoryItem from './JobCatItem';

const JobCategoriesList = () => {
  const dispatch = useDispatch();
  const jobCategories = useSelector(selectAllJobCategories);
  const status = useSelector(selectJobCategoriesStatus);
  const error = useSelector(selectJobCategoriesError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getJobCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="p-2  bg-white-50  ">
      <h2 className="text-3xl font-poppins text-center mb-8 text-gray-900">Find <span className='text-[#5BC0BE]'>Talent</span> By Category</h2>
      
      {jobCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-roboto gap-6  px-4 sm:px-6 lg:px-16">
        {jobCategories.map((category) => (
          <JobCategoryItem key={category.id} category={category} />
        ))}
      </div>
      ) : (
        <p className="text-center text-gray-500">No job categories available.</p>
      )}
    </section>
  );
};
  
export default JobCategoriesList;
