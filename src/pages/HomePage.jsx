import { Link } from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import JobCategoriesList from '../components/Jobs/JobsCat';

import freelancer from '../components/Common/freelancer.png';
import client from '../components/Common/client.png';


const HomePage = () => {
 

  
  return (
    <div className="min-h-screen flex flex-col font-roboto p-4">
      <Header />
      <section className="hero-section text-black py-12 flex flex-col items-center justify-center relative">
        {/* Hero content */}
        <h1 className="text-5xl font-poppins mb-4 text-center font-poppins animate-fade-in">
          Welcome to GigConnect
        </h1>
        <p className="text-lg font-roboto max-w-3xl mb-6 text-center">
          Connecting talented freelancers with clients around the globe. Find the right talent for your job or showcase your skills to potential clients.
        </p>

        {/* "Get Started" button placed at the bottom left */}
        <Link 
          to="/signup" 
          className="p-3 text-white rounded-full hover:bg-gray-100 transition-all mb-4" 
          style={{ backgroundColor: '#5BC0BE' }}>
          Get Started
        </Link>
        

        
        </section>
        <section className=" mx-auto mb-2 lg:mb-8 pt-8">
        <JobCategoriesList />
      </section>
        <section className="p-4 pt-14">
        <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-poppins mb-8">Why Choose GigConnect?</h2>

    {/* First card */}
    <div className="relative mx-auto mb-8" style={{ width: '100%', height: '500px' }}>
        <img
            src={freelancer}
            alt="Find Gig"
            className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4 rounded-md">
            <p className="mb-4 font-poppins">Search from a pool of Jobs</p>
            <Link
                to="/jobs"
                className="p-2 w-24 h-10 text-black font-roboto rounded-md hover:bg-opacity-90 transition-all"
                style={{ backgroundColor: '#5BC0BE' }}
            >
                Find Work
            </Link>
        </div>
    </div>

    {/* Second card */}
    <div className="relative mx-auto" style={{ width: '100%', height: '500px' }}>
        <img
            src={client}
            alt="Post Jobs"
            className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4 rounded-md">
            <h3 className="text-2xl font-poppins mb-4">Post Jobs Easily</h3>
            <p className="text-lg font-roboto mb-4">As a client, post jobs with all the details and let freelancers apply directly to your gig.</p>
            <Link
                to="/signup"
                className="p-2 w-24 h-10 text-black font-roboto rounded-md hover:bg-opacity-90 transition-all"
                style={{ backgroundColor: '#5BC0BE' }}
            >
                Post
            </Link>
        </div>
    </div>
</div>

 
</section>
<section className="p-20 w-3/4 bg-[#5BC0BE] text-white text-center mx-auto  mb-2 lg:mb-8 mt-16 pt-12 ">



  <h2 className="text-3xl font-poppins mb-6">Stay Updated!</h2>
  <p className="text-lg mb-4">Subscribe to our newsletter to receive the latest job postings and platform updates.</p>
  <form className="flex justify-center">
    <input type="email" placeholder="Enter your email" className="p-2 rounded-l-md text-black" />
    <button className="p-2 bg-white text-black rounded-r-md">Subscribe</button>
  </form>
</section>

        







      
<section   className="p-22 w-full  text-white text-center mx-auto mb-0 lg:mb-0 mt-2 pt-12 "><Footer /></section>
    </div>
  );
};

export default HomePage;




