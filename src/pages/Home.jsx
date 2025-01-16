import { useEffect, useState } from 'react';
import Footer from '../Components/Shared/Footer';
import Navbar from '../Components/Shared/Navbar';
import axios from 'axios';
import TutorCard from '../Components/Cards/TutorCard';

const Home = () => {
  const isRegistrationClosed = false;
  const [tutors, setTutors ] = useState([])
  
    useEffect(()=> {
      const fetchTutors = async ()=> {
        try{
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/tutor`)
          setTutors(response.data)
        }catch(error){
          console.log(error);
        }
      }
      fetchTutors()
    },[])
  return (
    <div>
      <Navbar></Navbar>
      {/* Banner section */}
      <section>
        <div className="bg-[url(/images/banner.jpg)] bg-cover bg-center h-[60vh] md:h-[70vh] bg-gray-600 bg-blend-overlay flex flex-col justify-center items-center text-white">
          <div className="lg:w-6/12 mx-auto text-center space-y-6 px-4">
            <h1 className="text-2xl md:text-5xl font-heading font-semibold">
              Simplifying Education, Amplifying Success
            </h1>
            <p className="font-body md:text-lg text-[#EECF75] italic">
              EduFusion brings students, tutors, and administrators together on
              a seamless platform to enhance collaboration, streamline study
              sessions, and provide access to valuable resources. Join us to
              experience a smarter, more connected way of learning
            </p>
          </div>
        </div>
      </section>
      {/* Study session section */}
      <section>
        {/* heading */}
        <div className="text-center py-6 md:py-12">
          <h1 className="font-heading text-xl md:text-3xl font-semibold text-[#2C3E50]">
            Study Together, Succeed Together
          </h1>
          <p className="font-body text-[#95A5A6] italic text-base md:text-lg">
            Empowering Collaboration, One Session at a Time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    Lorem, ipsum dolor.
                  </h3>
                  <p className="text-gray-600 overflow-hidden line-clamp-2 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Explicabo perspiciatis porro consequatur officia? Dicta qui
                    provident deserunt! Voluptatem, accusantium tempora.
                  </p>
                </div>
                <span
                  className={`ml-4 px-3 py-1 rounded-full text-sm font-medium 
              ${
                isRegistrationClosed
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-green-100 text-green-800'
              } 
              transition-colors duration-300`}
                >
                  {isRegistrationClosed ? 'Closed' : 'Ongoing'}
                </span>
              </div>

              <button
                // onClick={onReadMore}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg
            transform transition-all duration-300
            hover:bg-blue-700 active:scale-95
            flex items-center justify-center group"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Tutor section */}
      <section>
        {/* heading */}
        <div className="text-center py-6 md:py-12">
          <h1 className="font-heading text-xl md:text-3xl font-semibold text-[#2C3E50]">
            Expert Tutors at Your Fingertips
          </h1>
          <p className="font-body text-[#95A5A6] italic text-base md:text-lg">
            Learn from the Best, Achieve the Greatest
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {
            tutors.map(tutor=> <TutorCard key={tutor._id} tutor={tutor}></TutorCard>)
          }
        </div>
      </section>
      {/* Footer section */}
      <Footer></Footer>
    </div>
  );
};

export default Home;
