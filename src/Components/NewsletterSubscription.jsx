import { useState } from 'react';
import { Send } from 'lucide-react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="w-11/12 flex justify-center mx-auto p-8 my-12">
      
      {/* content */}
      <div className="flex-1 text-center md:text-left max-w-xl">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4 text-center">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6 font-body text-center">
          Stay Ahead with EduFusion – Get the Latest Learning Trends & Updates
          Delivered to Your Inbox!
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="px-6 py-3 bg-[#2ECC71] text-white rounded-lg hover:bg-[#15e66c] transition-colors duration-300 flex items-center justify-center gap-2 font-heading">
            <Send size={20} />
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
