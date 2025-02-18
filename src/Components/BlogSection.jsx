import { Calendar } from 'lucide-react';

const BlogSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-red-500 font-medium">NEWS</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
          Check Out Our Latest Blog
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Featured Post */}
        <div className="space-y-4">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src="/images/laptoptyping.jpg"
              alt="Person typing on laptop"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="space-y-3">
            <span className="text-sm font-medium text-gray-600 uppercase">
              ONLINE
            </span>
            <h3 className="text-2xl font-bold text-gray-900 hover:text-red-500 transition-colors duration-300">
              What is the Mlb Summer Slugger Program?
            </h3>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <img
                  src="/images/man.jpg"
                  alt="Jone Smit"
                  className="w-8 h-8 rounded-full"
                />
                <span>Jone Smit</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>2020-05-06</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Posts */}
        <div className="space-y-8">
          {/* First Sidebar Post */}
          <div className="flex gap-4">
            <img
              src="/images/educationapp.jpg"
              alt="Online education app"
              className="w-48 h-32 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 hover:text-red-500 transition-colors duration-300">
                28 Student-Centered Instructional Strategies
              </h3>
            </div>
          </div>

          {/* Second Sidebar Post */}
          <div className="flex gap-4">
            <img
              src="/images/student.jpg"
              alt="Student with headphones"
              className="w-48 h-32 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 hover:text-red-500 transition-colors duration-300">
                100 Blended Learning Resources for Teachers
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
