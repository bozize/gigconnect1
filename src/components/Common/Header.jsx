import { Link } from 'react-router-dom';
import Logo from './Logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md fix top-0 left-0 w-full z-50">
      <nav className="px-2 py-3 max-w-screen-xl mx-auto"> {/* Reduced padding from px-4 to px-2 */}
        <ul className="flex items-center justify-between">
          <li className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="GigConnect" className="h-10 max-h-full" style={{ maxWidth: '100%' }} />
              <span className="ml-2 text-xl font-bold text-gray-800 sr-only">GigConnect</span>
            </Link>
          </li>
          <li className="flex items-center space-x-2"> {/* Reduced space-x-4 to space-x-2 */}
            <Link to="/login" className="text-gray-600 hover:text-gray-800">Login</Link>
            <Link 
              to="/signup" 
              className="bg-[#5BC0BE] text-white font-semibold py-1 px-3 rounded-md hover:bg-[#3aa7ab] transition-colors"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;




