import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderNew from '../components/Common/HeaderNew';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/actions/authActions';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'; // Correct import for Heroicons v2

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.login);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'FREELANCER') {
        navigate('/freelancer-dashboard');
      } else if (userInfo.role === 'CLIENT') {
        navigate('/client-dashboard');
      }
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username, password }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white-50">
      <HeaderNew />
      <h2 className="text-4xl font-poppins text-black mb-10">Login</h2>
      <form className="  space-y-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100px', width: '50', borderRadius: '8px'}} onSubmit={handleSubmit}>


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
        <div className="flex justify-center py-2 px-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5BC0BE] text-white font-poppins py-2 px-6 rounded-full hover:bg-[#3ca7b3] transition duration-300 text-sm border border-gray-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
      
    </div>
  );
};

export default LoginPage;




