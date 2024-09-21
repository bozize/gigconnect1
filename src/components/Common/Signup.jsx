
import { Link } from 'react-router-dom';
import HeaderNew from './HeaderNew';
import { UserIcon, BriefcaseIcon } from '@heroicons/react/24/solid'; // Import Heroicons

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <HeaderNew />
      <div className="max-w-lg mx-auto mt-10 p-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 font-poppins">
          Sign Up for GigConnect
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Client Card */}
          <Link
            to="/signup/client"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center justify-center">
              <UserIcon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Join as a Client</h3>
              <p className="text-gray-600 text-center">Hire top freelancers for your projects.</p>
            </div>
          </Link>

          {/* Freelancer Card */}
          <Link
            to="/signup/freelancer"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center justify-center">
              <BriefcaseIcon className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Join as a Freelancer</h3>
              <p className="text-gray-600 text-center">Find freelance jobs and grow your career.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

