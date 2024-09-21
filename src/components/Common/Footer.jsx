

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 ">
      <div className="container mx-auto w-3/4 text-center">
        <p className="text-sm md:text-base">&copy; 2024 GigConnect. All rights reserved.</p>
        <ul className="flex justify-center space-x-6 mt-4">
          <li>
            <a href="#" className="hover:text-[#5BC0BE] transition duration-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#5BC0BE] transition duration-300">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#5BC0BE] transition duration-300">
              Contact Us
            </a>
          </li>
        </ul>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-[#5BC0BE] transition duration-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-[#5BC0BE] transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-[#5BC0BE] transition duration-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-[#5BC0BE] transition duration-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


