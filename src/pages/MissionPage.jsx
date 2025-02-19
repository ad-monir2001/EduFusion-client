import { Target, Users, Globe, Award } from 'lucide-react';
import Navbar from '../Components/Shared/Navbar';

const MissionPage = () => {
  return (
    <>
    <Navbar></Navbar>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Our Mission & Values
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to transforming education through innovation and
            accessibility, making quality learning available to everyone,
            everywhere.
          </p>
        </div>

        {/* Mission Statement Section */}
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To empower individuals through accessible, innovative education
              that breaks down barriers and creates opportunities for lifelong
              learning and professional growth.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Innovation */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                Constantly pushing boundaries to create cutting-edge learning
                experiences.
              </p>
            </div>

            {/* Accessibility */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Accessibility
              </h3>
              <p className="text-gray-600">
                Making quality education available to everyone, regardless of
                location or background.
              </p>
            </div>

            {/* Community */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                Building strong connections and fostering collaborative learning
                environments.
              </p>
            </div>

            {/* Excellence */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                Maintaining the highest standards in education and student
                support.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <h3 className="text-4xl font-bold text-green-500 mb-2">50K+</h3>
            <p className="text-gray-600">Students Empowered</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-4xl font-bold text-green-500 mb-2">100+</h3>
            <p className="text-gray-600">Countries Reached</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-4xl font-bold text-green-500 mb-2">95%</h3>
            <p className="text-gray-600">Student Satisfaction</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 font-heading">Join Our Mission</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Be part of our journey to transform education and create positive
            change in the world.
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-heading">
            Get Started Today
          </button>
        </div>
      </div>
    </>
  );
};

export default MissionPage;
