import { Link } from 'react-router-dom';
import Logo from './Logo.png';

const HeaderNew = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="px-2 py-3 max-w-screen-xl mx-auto">
        <ul className="flex items-center justify-left"> {/* Centering the logo */}
          <li className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="GigConnect" className="h-10 max-h-full" style={{ maxWidth: '100%' }} />
              <span className="ml-2 text-xl font-bold text-gray-800 sr-only">GigConnect</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNew;
