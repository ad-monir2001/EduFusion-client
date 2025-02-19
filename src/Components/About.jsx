import { Play } from 'lucide-react';

const About = () => {
    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <span className=" font-medium tracking-wide">
            DISTANCE LEARNING
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 leading-tight">
            Build Your Project Management Skills Online, Anytime
          </h1>
          
          <p className="text-gray-600 text-lg font-body">
            Want to learn and earn PDUs or CEUs on your schedule — anytime, anywhere? Or, pick up a new skill quickly like, project team leadership or agile? Browse our most popular online courses.
          </p>
          
          <p className="text-gray-600 text-lg font-body">
            Grow your knowledge and your opportunities with thought leadership, training and tools.
          </p>
          
          <button className="px-6 py-3 bg-[#2ECC71] text-white rounded-lg  duration-300 font-heading">
            Explore Learning
          </button>
        </div>

        {/* Right Video Section */}
        <div className="relative">
          {/* Video Thumbnail Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/images/about.jpg" 
              alt="Student learning online"
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-300 relative z-10">
                <Play size={32} className="ml-1" />
              </button>
            </div>

            {/* Circular Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-red-500 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-80" />
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === 0 ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-4 h-4 border-2 border-red-500 rounded-full" />
      <div className="absolute bottom-0 right-20 w-20 h-20 bg-yellow-400 rounded-full opacity-80" />
    </div>
    );
};

export default About;



