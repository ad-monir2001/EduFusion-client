import Footer from '../Components/Shared/Footer';
import Navbar from '../Components/Shared/Navbar';

const Home = () => {
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
      <section></section>
      {/* Tutor section */}
      <section></section>
        {/* Footer section */}
        <Footer></Footer>
    </div>
  );
};

export default Home;
