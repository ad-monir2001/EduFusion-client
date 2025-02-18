import { Brain, Monitor, Shield } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center space-y-4">
      <div className="p-3 rounded-full bg-blue-50 text-blue-600">
        <Icon size={24} className="animate-pulse" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-gray-800">
        {title}
      </h3>
      <p className="text-gray-600 font-body">{description}</p>
    </div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: Brain,
      title: 'Learn the Latest Top Skills',
      description:
        'Master the most in-demand skills with expert-led courses, interactive lessons, and hands-on projects to boost your career growth.',
    },
    {
      icon: Monitor,
      title: 'Go at Your Own Pace',
      description:
        'Learn at your own speed with flexible courses, personalized lessons, and lifetime access to materials—study anytime, anywhere.',
    },
    {
      icon: Shield,
      title: 'Learn from Industry Experts',
      description:
        'Gain valuable insights and practical knowledge from experienced industry professionals through expert-led courses and real-world case studies.',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
