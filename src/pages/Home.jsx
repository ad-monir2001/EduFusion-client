import { useEffect, useState } from 'react';
import Footer from '../Components/Shared/Footer';
import Navbar from '../Components/Shared/Navbar';
import axios from 'axios';
import TutorCard from '../Components/Cards/TutorCard';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { compareAsc, parse } from 'date-fns';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FeatureCards from '../Components/Cards/FeatureCards';
import NewsletterSubscription from '../Components/NewsletterSubscription';
import LoadingSpinner from '../Components/Shared/LoadingSpinner';
import About from '../Components/About';
import BlogSection from '../Components/BlogSection';
const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [tutors, setTutors] = useState([]);
  const [visibleSessions, setVisibleSessions] = useState(6);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/tutor`
        );
        setTutors(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutors();
  }, []);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session`);
      return data;
    },
  });
  const approvedSessions = sessions.filter(
    (session) => session.status === 'approved'
  );

  return (
    <div>
      <Helmet>
        <title>Home | EduFusion</title>
      </Helmet>
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
      {/* motives */}
      <section className="my-12">
        {/* heading */}
        <div className="text-center py-6 md:py-12">
          <h1 className="font-heading text-xl md:text-3xl font-semibold text-[#2C3E50]">
            Online Coaching Sessions for Effective Remote Learning
          </h1>
          <p className="font-body text-[#95A5A6] italic text-base md:text-lg">
            Inclusive Education for All
          </p>
        </div>
        {/* cards */}
        <div>
          <FeatureCards></FeatureCards>
        </div>
      </section>

      {/* About us */}
      <section className="w-11/12 mx-auto my-12">
        <About></About>
      </section>

      {/* Study session section */}
      <section className="w-11/12 mx-auto ">
        {/* heading */}
        <div className="text-center py-6 md:py-12">
          <h1 className="font-heading text-xl md:text-3xl font-semibold text-[#2C3E50]">
            Study Together, Succeed Together
          </h1>
          <p className="font-body text-[#95A5A6] italic text-base md:text-lg">
            Empowering Collaboration, One Session at a Time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mb-8">
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          {approvedSessions.slice(0, visibleSessions).map((session) => (
            <div
              key={session._id}
              className="w-full max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <img
                      className="w-full rounded-lg h-56"
                      src={session.sessionImage}
                      alt=""
                    />
                    <h3 className="text-xl font-bold text-gray-800 font-heading py-4">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 overflow-hidden font-body line-clamp-2 mb-4">
                      {session.description}
                    </p>
                    <span
                      className={`ml-4 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 absolute top-4 right-4 ${
                        compareAsc(
                          new Date(),
                          parse(
                            session.sessionEndDate,
                            'dd/MM/yyyy',
                            new Date()
                          )
                        ) < 0
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {compareAsc(
                        new Date(),
                        parse(session.sessionEndDate, 'dd/MM/yyyy', new Date())
                      ) < 0
                        ? 'Ongoing'
                        : 'Closed'}
                    </span>
                  </div>
                </div>

                <div>
                  <Link
                    to={`read-more/${session._id}`}
                    className="w-full mt-4 px-4 py-2 bg-[#2ECC71] text-white rounded-lg
                  transform transition-all duration-300
                  hover:bg-[#3498DB] active:scale-95
                  flex items-center justify-center group font-heading"
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
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/all-session"
          className="m-8 p-3 outline-2 outline text-[#2ECC71] rounded-lg hover:bg-[#2ECC71] hover:text-white active:scale-95 text-center transition-transform duration-300 font-heading"
        >
          View More Sessions
        </Link>
      </section>
      {/* Tutor section */}
      <section className="w-11/12 mx-auto my-12">
        {/* heading */}
        <div className="text-center py-6 md:py-12">
          <h1 className="font-heading text-xl md:text-3xl font-semibold text-[#2C3E50]">
            Expert Tutors at Your Fingertips
          </h1>
          <p className="font-body text-[#95A5A6] italic text-base md:text-lg">
            Learn from the Best, Achieve the Greatest
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7 p-4 my-8">
          {tutors.slice(0, 4).map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
          ))}
        </div>
        <Link
          to="/all-tutor"
          className="m-8 p-3 outline-2 outline text-[#2ECC71] rounded-lg hover:bg-[#2ECC71] hover:text-white active:scale-95 text-center transition-transform duration-300 font-heading"
        >
          View All Tutor
        </Link>
      </section>
      {/* Blog section */}
      <section>
        <BlogSection></BlogSection>
      </section>
      {/* FAQ */}
      <section className="w-11/12 mx-auto my-14">
        {/* heading */}
        <div className="text-center py-10">
          <p className="font-body italic text-gray-500">
            Drive Your Questions Away – Everything You Need to Know!
          </p>
          <h1 className="font-heading font-semibold text-3xl">
            Frequently Asked Question
          </h1>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-4 md:gap-14">
          <div className="w-1/2">
            <img src="/images/faq.jpg" alt="" />
          </div>
          {/* accordion */}
          <div className="space-y-2 md:w-1/2">
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium font-heading ">
                What is EduFusion?
              </div>
              <div className="collapse-content">
                <p className="font-body">
                  {' '}
                  EduFusion is an online learning platform that offers
                  expert-led courses, interactive lessons, and resources to help
                  you master new skills.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 ">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium font-heading">
                Are the courses self-paced?
              </div>
              <div className="collapse-content">
                <p className="font-body">
                  Yes! Our courses are designed for flexibility, allowing you to
                  learn at your own pace, anytime, anywhere.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 ">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium font-heading">
                Do I get a certificate after completing a course?
              </div>
              <div className="collapse-content">
                <p className="font-body">
                  Yes, you’ll receive a certificate of completion for each
                  course, which you can showcase on your resume or LinkedIn
                  profile.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 ">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium font-heading">
                Are there free courses available?
              </div>
              <div className="collapse-content">
                <p className="font-body">
                  Yes! We offer both free and premium courses to make quality
                  education accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News letter */}
      <NewsletterSubscription></NewsletterSubscription>
      {/* Footer section */}
      <Footer></Footer>
    </div>
  );
};

export default Home;
