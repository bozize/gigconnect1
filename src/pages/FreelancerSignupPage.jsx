import { useState, useEffect } from 'react';
import HeaderNew from '../components/Common/HeaderNew';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { freelancerSignup } from '../redux/actions/authActions';
import { FREELANCER_SIGNUP_RESET } from '../redux/constants/authConstants';
import { UserIcon,  EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const FreelancerSignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.freelancerSignup);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate('/login');
      dispatch({ type: FREELANCER_SIGNUP_RESET });
    }
  }, [success, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(freelancerSignup({ username, password, email }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <HeaderNew />
      <h2 className="text-4xl font-poppins text-black mb-10">Freelancer Signup</h2>
      <form className="space-y-4 w-96" onSubmit={handleSubmit} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px' }}>
        <div className="flex items-center bg-white border border-gray-300 rounded-md py-2 px-2">
          <UserIcon className="h-6 w-6 text-gray-500 mr-2" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-black font-roboto leading-tight focus:outline-none"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex items-center bg-white border border-gray-300 rounded-md py-2 px-2">
          < EnvelopeIcon className="h-6 w-6 text-gray-500 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-black font-roboto leading-tight focus:outline-none"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex items-center bg-white border border-gray-300 rounded-md py-2 px-2">
          <LockClosedIcon className="h-6 w-6 text-gray-500 mr-2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-black font-roboto leading-tight focus:outline-none"
            placeholder="Password"
            required
          />
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        
        <div className="flex justify-center py-2 px-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#5BC0BE] text-white font-poppins py-2 px-6 rounded-full hover:bg-[#3ca7b3] transition duration-300 text-sm"
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        </div>
        
      </form>
      
    </div>
  );
};

export default FreelancerSignupPage;
